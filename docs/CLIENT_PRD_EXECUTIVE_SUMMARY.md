# Client Requirements — Functional & Technical Specification
## *Spécification Fonctionnelle & Technique des Exigences Client (France 🇫🇷 & Suisse 🇨🇭)*

**Document Type**: Functional & Technical Specification  
**Languages**: English & Français (Bilingual)  
**Word Document (.docx)**: [`docs/Client_Requirements_Technical_PRD_EN_FR_Verified.docx`](file:///C:/Users/91725/.gemini/antigravity/scratch/atelier-os/docs/Client_Requirements_Technical_PRD_EN_FR_Verified.docx)  
**Master JSON**: [`docs/PRD_MASTER_SPECIFICATION.json`](file:///C:/Users/91725/.gemini/antigravity/scratch/atelier-os/docs/PRD_MASTER_SPECIFICATION.json)  
**Generated Date**: August 18, 2026

---

> ### 📝 Document Note
> **English**: *The SaaS/product name and marketing tagline are intentionally omitted. This document contains only the consolidated client requirements, the corrected technical architecture, and items that still require provider/accountant confirmation. No pricing, quotation amounts, subscription prices, or third-party cost estimates are included.*  
>  
> **Français** : *Le nom du SaaS/produit et toute signature marketing sont volontairement omis. Ce document contient uniquement les exigences client consolidées, l’architecture technique corrigée et les éléments restant à confirmer avec le prestataire ou l’expert-comptable. Aucun prix, montant de devis, tarif d’abonnement ou estimation de coût tiers n’est inclus.*

---

# 🇬🇧 PART 1: ENGLISH SPECIFICATION

## 1. Executive Requirements Summary
The client requires a scalable, multi-tenant automotive workshop SaaS that can be deployed across multiple garages. The platform must manage the full operational lifecycle from customer intake and booking through diagnosis, quote approval, repair, quality check, delivery, invoicing, regulatory transmission/reporting, and post-service communications.

- Strict role-based access for owner/manager, mechanic, admin/front desk, customer, and SaaS super-admin.
- Customer and multi-vehicle registry with VIN, mileage, documents, service history, quotes, invoices, and communication preferences.
- One central scheduling engine shared by staff, customer self-booking, and AI-assisted booking.
- Mechanic skills, working hours, service bay/lift availability, service duration, closures, holidays, and blocked slots included in availability calculations.
- Work-order state machine controlling the full repair lifecycle.
- Deterministic pricing, labor, parts, consumables, margins, discounts, VAT/tax, quotes, approvals, and invoices.
- France + Switzerland-ready customer, currency, address, phone, tax identity, and reporting architecture.
- French e-invoicing through a replaceable approved-platform connector; Chorus Pro only for French public-sector invoicing.
- Customer-facing web booking accessible without WhatsApp, with secure SMS/email links.
- AI assistants must call approved application functions/APIs and must not maintain a separate calendar, write directly to the database, or invent prices.
- French-first UI with i18n from day one; English supported.
- EU-hosted production data, GDPR workflows, audit trails, and tenant isolation.

---

## 2. Roles & Workspaces

| Role | Primary access and responsibilities |
| :--- | :--- |
| **Garage Owner / Manager** | Full workshop operations, scheduling, customers, vehicles, work orders, quotes, invoices, staff, pricing, settings, reporting and integrations. |
| **Mechanic** | Assigned work orders, diagnosis, OBD/DTC code lookup, parts/labor usage, repair progress, photos/documents, timer, and quality checklist. |
| **Admin / Front Desk** | Customers, vehicles, booking, calendar, documents, quotes, invoices, communications and customer coordination. |
| **Customer** | Secure booking, vehicle/service selection, quote approve/reject, booking status and permitted invoice/service information. |
| **SaaS Super Admin** | Garage onboarding, tenant lifecycle, plan entitlements, operational health and integration status without bypassing tenant privacy. |

---

## 3. Full Workshop Lifecycle

```
Request  ➔  Appointment  ➔  Diagnosis  ➔  Quote  ➔  Approval
In Progress  ➔  Quality Check  ➔  Ready  ➔  Delivered  ➔  Invoice
Validate  ➔  E-Invoice / Reporting Connector  ➔  External Platform  ➔  Status Returned  ➔  Records Updated
```

> **State-Machine Rule**: *Statuses are controlled transitions, not free-text labels. Role permissions and business rules must prevent invalid jumps, preserve auditability, and allow only defined exceptions.*

---

## 4. Customer & Vehicle Registry
- One customer may own multiple vehicles.
- Customer type: Individual / Business.
- Country classification: France / Switzerland / EU / International.
- Country-aware addresses and phone numbers (+33, +41, future country rules).
- Business/tax identifiers stored as structured data; Swiss business/VAT identifiers supported.
- Preferred invoice language and currency.
- GDPR consent, communication consent, retention/deletion metadata.
- Vehicle make/model/year, registration, VIN, mileage, fuel type, transmission, last/next service, service history and documents.
- Customer, vehicle, work order, quote, invoice, document and communication timelines remain linked.

---

## 5. Central Scheduling Engine

> **Non-Negotiable Architecture**: *Staff booking, public/customer web booking, and AI-assisted booking must all use the same Scheduling Service and the same appointment data. No separate AI calendar and no separate customer calendar.*

```
Booking Source  ➔  Service Rules  ➔  Availability Engine  ➔  Temporary Hold  ➔  Confirm / Request
```

### Availability Must Consider:
- Workshop opening hours and location.
- Existing appointments and work orders.
- Mechanic schedules, leave and skill requirements.
- Bay/lift/resource capability and availability.
- Estimated service duration.
- Configurable buffer before/after a service (not hard-coded globally).
- Blocked time slots, maintenance periods and internal holds.
- Public holidays and workshop closures.
- Service-specific online booking policy.
- Temporary slot holds and final revalidation before confirmation.

### Conflict Prevention:
- No overlapping mechanic booking.
- No overlapping bay/lift booking.
- No booking outside working hours or during closure/leave.
- Required consecutive duration must remain available.
- Production confirmation must re-check availability transactionally to prevent race-condition double booking.
- Alternative valid slots should be proposed when a requested time is unavailable.

---

## 6. Service Catalog & Booking Policies

| Field | Purpose |
| :--- | :--- |
| **Service name/category** | Customer and staff-facing service classification. |
| **Estimated duration** | Default duration used by scheduling. |
| **Required mechanic skills** | Example: BRAKES, DIAGNOSTICS, ENGINE. |
| **Required resource type** | Example: two-post lift, diagnostic bay, quick-service bay. |
| **Online bookable** | Whether the customer may self-book this service. |
| **Approval policy** | AUTO / MANUAL / DISABLED / DIAGNOSTIC-FIRST. |
| **Buffer rules** | Optional workshop-configured setup/cleanup time. |
| **Intake questions** | Required questions before slot selection/confirmation. |

---

## 7. Customer Web Booking Without WhatsApp Dependency

```
Garage Website / SMS / Email  ➔  Booking Link  ➔  Vehicle + Service  ➔  Live Availability  ➔  Select Slot  ➔  Confirm
```

- Mobile-first booking page accessible from the garage website or a secure SMS/email link.
- No WhatsApp account is required.
- Customer selects or enters vehicle, selects a service or describes the issue, and answers service-specific questions.
- Available slots are fetched from the central scheduling engine in real time.
- Eligible services can auto-confirm; selected services can create a pending request requiring garage approval.
- Appointment/request is written into the central agenda and visible to staff.
- Customer receives booking reference and confirmation through configured channels.
- Secure tokenized links should expire and be rate-limited in production.
- Slot confirmation must be idempotent so repeated clicks do not create duplicate appointments.

---

## 8. AI-Assisted Booking

```
Customer Description  ➔  AI Clarifying Questions  ➔  Service Classification  ➔  Scheduling API  ➔  Suitable Slots  ➔  Customer Choice
```

*Example*: a customer writes, *“My car makes a noise when I brake.”* The assistant may ask clarifying questions, classify the request as a brake inspection/diagnostic category, and call the central Scheduling Service using the configured duration, mechanic skill and resource requirements.

- AI is an orchestration layer, not an authoritative workshop system.
- Use typed/structured function calls to approved APIs such as `check_availability`, `hold_slot`, `lookup_service`, `lookup_diagnostic_code` and `prepare_quote_draft`.
- AI does not write directly to the database.
- AI does not calculate authoritative availability independently.
- AI does not invent parts or labor prices.
- Diagnostic suggestions must be clearly marked for technician verification.

---

## 9. Work Orders, Diagnosis & Quality

```
REQUEST → APPOINTMENT → DIAGNOSIS → QUOTE → AWAITING APPROVAL → APPROVED → IN PROGRESS → QUALITY CHECK → READY → DELIVERED → INVOICED
```

- Work order includes customer, vehicle, mileage, appointment, mechanic, bay, complaint, diagnosis, parts, labor, documents, internal notes and timeline.
- Mechanic records findings, fault/error codes, inspection results, recommended checks and urgency.
- OBD/DTC code lookup is supported as an information/diagnostic-assistance feature; direct hardware scanner integration is optional unless separately specified.
- Mechanic timer may track labor time, but pricing remains controlled by approved labor rules/templates.
- Photos and documents may be attached to the work order.
- Quality checklist must be completed before vehicle-ready status where configured.
- All material workflow changes create audit events.

---

## 10. Quotes & Customer Approval
- Configurable labor templates and hourly rates.
- Parts and consumables with quantity, unit price, margin/markup configuration and stock metadata.
- Deterministic quote calculations: subtotal, discount, tax/VAT treatment, total.
- Server-side production PDF/structured document generation.
- Secure magic-link portal for approve/reject without requiring a normal customer login.
- Approval evidence includes secure token use, timestamp, quote version and audit log; optional signature may be added if legally/business-required.
- Approved quote updates the work order automatically.
- AI may prepare a draft using approved templates/history, but prices must come from deterministic services.

---

## 11. Multi-Country Customer, Currency & Tax Architecture

| Dimension | France | Switzerland | Future EU / International |
| :--- | :--- | :--- | :--- |
| **Country code** | FR | CH | ISO country code |
| **Currency** | EUR | CHF or EUR by workshop policy | Configurable ISO currency |
| **Phone** | French-aware | Swiss-aware | Country-aware |
| **Address** | French fields/validation | Swiss fields/validation | Country-aware |
| **Customer type** | Individual / Business | Individual / Business | Individual / Business |
| **Tax identity** | French identifiers | Swiss business/VAT identifiers | Country-specific |
| **Tax treatment** | Rule-engine decision | Rule-engine decision | Rule-engine decision |
| **Reporting route** | Transaction-dependent | Cross-border transaction-dependent | Country/transaction-dependent |

> **Critical Correction**: *Do NOT implement “French customer = 20% VAT” and “Swiss customer = 8.1% VAT” as a simple customer-country rule. The Swiss standard VAT rate is 8.1%, but the tax treatment of a repair performed by a French workshop depends on the place of supply, customer status (B2B/B2C), transaction context and validated accounting rules. The tax engine must be configurable and legally reviewed before production.*

---

## 12. Tax Engine

```
Seller / Repair Location  ➔  Customer Country  ➔  B2B / B2C  ➔  Tax Identity  ➔  Transaction Context  ➔  Tax Rule Result
```

- Central Tax Service; no scattered tax percentages inside UI components.
- Effective dates/versioning for tax rules.
- Invoice stores the actual tax rule/treatment applied at issue time.
- Support EUR and CHF from day one.
- Exchange-rate storage can be added where accounting/reporting requires it.
- Production tax rules must be supplied or validated by the client's accountant/compliance advisor.

---

## 13. Swiss QR-Bill Support (Optional / Conditional)

> **Verified Scope Note**: *A Swiss QR-bill is a payment instrument, not an automatic requirement merely because the customer is Swiss. A 27-digit QR reference requires a QR-IBAN. Add this as a configurable module only if the garage's banking/payment setup supports it and the client confirms it is required.*

- Support Swiss address and business identifiers independently of QR-bill support.
- If enabled, generate payment-part data according to current Swiss Payment Standards.
- Do not use legacy BVR/ESR wording as the primary modern terminology; the QR-bill replaced the old payment slips.
- Banking requirements must be confirmed with the garage/accountant/bank before production activation.

---

## 14. Invoice Generation vs E-Invoicing Transmission

The SaaS generates the invoice internally. The approved French platform is an external regulatory transmission/reporting connector; it is not the invoice generator.

```
Repair Completed  ➔  Invoice Engine  ➔  Validate  ➔  E-Invoice Connector  ➔  Approved Platform / Chorus Pro  ➔  Status Callback
Callback / Provider Status → Invoice → Work Order → Customer / Vehicle Timeline → Audit Log
```

---

## 15. French Approved-Platform Connector
- Provider-neutral `EInvoiceConnector` interface.
- Provider authentication/credentials stored server-side.
- Map internal invoice model to the selected provider's supported structured format and API.
- Submit applicable B2B e-invoices or required e-reporting data.
- Receive lifecycle status through webhook and/or polling.
- Normalize provider-specific statuses into internal statuses.
- Idempotent submissions, retry strategy, error handling and technical logs.
- Store provider/external reference IDs.
- Allow another approved platform to be added later without rebuilding customers, work orders, quotes or the invoice engine.

> **Provider Status**: *PROVIDER SELECTION PENDING. The final production provider should be chosen after checking the current DGFiP list of approved platforms, API documentation, sandbox access, status/webhook support, e-reporting support, interoperability and the garage/accountant preference. Pennylane may be evaluated as one candidate, but is not hard-coded as the selected provider.*

---

## 16. Chorus Pro Boundary

| Route | Use |
| :--- | :--- |
| **Approved French Platform (PA; formerly PDP)** | Applicable French B2B e-invoicing and e-reporting flows under the French reform. |
| **Chorus Pro** | French public-sector (B2G) invoicing / public buyer workflow. |
| **Cross-border / B2C e-reporting** | Route through the selected approved platform where legally applicable; do not treat it as the same as domestic B2B e-invoicing. |

> **Important Correction**: *Do not describe French e-invoicing as “DGFiP clearance” or promise a “DGFiP compliance seal” for each invoice. The system should track the lifecycle/status returned by the approved platform and official workflow specifications.*

---

## 17. Communications

| Trigger | Channels / behavior |
| :--- | :--- |
| **Booking link** | SMS / Email; WhatsApp optional. |
| **Appointment confirmation/reminder** | Email / SMS / WhatsApp according to consent and tenant configuration. |
| **Quote ready/reminder** | Secure magic link through configured channels. |
| **Vehicle ready** | Customer-ready notification and delivery status logging. |
| **Invoice available** | Email / customer portal / configured channel. |
| **Review request** | Optional post-delivery automation. |

- Central Communication Service and editable templates per tenant/language.
- Delivery log with queued/sent/delivered/read/failed where supported by provider.
- Customer consent/preferences must be honored.
- All production provider accounts should be client-owned; application receives only required integration access.

---

## 18. SaaS Administration & Multi-Tenancy
- Strict tenant isolation using `tenant_id` on business records plus server-side authorization.
- PostgreSQL Row Level Security is recommended where applicable; a separate physical schema/database per garage is not required for the core design.
- Tenant-aware storage paths, background jobs, unique constraints and integration configuration.
- Automated tenant-leakage tests.
- SaaS super-admin can onboard/suspend tenants, manage plan entitlements and monitor platform/integration health without silently bypassing tenant privacy.
- Starter / Pro / AI plan names may be supported as feature-entitlement groups; no pricing is defined in this requirements document.

---

## 19. Proposed Production Architecture

```
Staff Web / Tablet + Customer Web Portal: Next.js / responsive tablet-first UI / French-first i18n
Identity + Tenant Context: Authentication • RBAC • magic links • public booking tokens
Application/API Layer: Customer • Booking • Scheduling • Work Order • Quote • Invoice APIs
Domain Services: Scheduling • Pricing • Tax • Invoice • Communications • Audit
Connector Layer: PA e-invoicing • Chorus Pro • Email • SMS • WhatsApp • AI • Storage
Data Layer: PostgreSQL/Supabase direction • RLS • EU-region data hosting • audit history
```

---

## 20. Core Data Model

| Domain | Key entities / records |
| :--- | :--- |
| **Tenancy & Access** | Tenant, Location, User, Membership, Role, Permission. |
| **Customer** | Customer, Address, CustomerTaxIdentity, Consent, SecureToken. |
| **Vehicle** | Vehicle, ServiceHistory, VehicleDocument. |
| **Workshop Resources** | Mechanic, MechanicSkill, MechanicSchedule, Bay/Resource, ResourceCapability, Closure, AvailabilityBlock. |
| **Services & Booking** | Service, ServiceRequirement, BookingPolicy, IntakeQuestion, BookingRequest, SlotHold, Appointment. |
| **Operations** | WorkOrder, Diagnosis, WorkOrderStatusHistory, QualityCheck, Attachment. |
| **Commercial** | LaborTemplate, Part, Consumable, Quote, QuoteLine, Approval. |
| **Tax & Currency** | TaxProfile, TaxRule, Currency, optional ExchangeRate. |
| **Invoicing** | Invoice, InvoiceLine, EInvoiceSubmission, ProviderEvent, ReportingRecord. |
| **Communications** | Message, MessageTemplate, DeliveryEvent. |
| **Platform** | Notification, AuditLog, PlanEntitlement, IntegrationConfig. |

---

## 21. Module / API Boundaries

| Module | Responsibilities |
| :--- | :--- |
| **BookingService** | Public booking sessions, secure tokens, policy, booking requests, slot holds and confirmation. |
| **SchedulingService** | Availability, conflicts, resource matching, alternative slots and final reservation validation. |
| **CustomerService** | Customer/country/tax profile/consent management. |
| **VehicleService** | Vehicle registry and history. |
| **WorkOrderService** | Repair lifecycle and controlled state transitions. |
| **PricingService** | Labor, parts, consumables, discounts and deterministic commercial calculations. |
| **TaxService** | Country/customer/transaction tax determination. |
| **QuoteService** | Quote generation, versions, approval/rejection lifecycle. |
| **InvoiceService** | Invoice creation, validation, immutable issued snapshot and document generation. |
| **EInvoiceConnector** | Provider-neutral transmission/reporting abstraction. |
| **CommunicationService** | Email/SMS/WhatsApp dispatch and logging. |
| **AI Orchestrator** | Structured function-calling against approved APIs only. |
| **AuditService** | Immutable business-event history. |

---

## 22. Security, GDPR & Reliability
- EU-region production hosting for relevant personal data, subject to final hosting architecture.
- Strict tenant isolation at database and service layers.
- RBAC with server-side authorization; hiding buttons is not sufficient.
- TLS in transit, managed secrets, secure tokens and rate limiting.
- GDPR consent, data access/export, deletion workflow and retention configuration.
- Audit logs for approvals, invoice submission, status changes, communication and scheduling.
- Idempotent booking and invoice submission operations.
- Backups, structured logs, monitoring and recoverability.
- No production API secrets in frontend code.

---

## 23. MVP Planning

| Phase | Scope |
| :--- | :--- |
| **Month 1 - Foundation** | Multi-tenancy, auth/RBAC, i18n, customer/vehicle registry, France/Switzerland data model, service catalog, workshop resources, tax/currency model and audit foundations. |
| **Month 2 - Booking & Operations** | Central scheduling engine, calendar, staff booking, public booking portal, SMS/email link flow, closures/blocks, appointments, work orders, diagnosis and quality workflow. |
| **Month 3 - Commercial & Connectors** | Quotes, customer approval, pricing/tax services, invoice engine, EUR/CHF handling, communications, e-invoicing connector interface, reports and SaaS administration. |
| **Month 4 - Live Pilot & Stabilization** | Real workshop validation, booking/resource edge cases, France/Swiss scenarios, provider sandbox integration if selected/available, security/performance hardening and production-readiness fixes. |

---

## 24. Pending Decisions / Validation

| Item | Status |
| :--- | :--- |
| **French approved e-invoicing platform** | Pending provider/client/accountant selection. |
| **Exact France/Switzerland tax rules** | Must be validated by accountant/compliance advisor. |
| **Swiss QR-bill module** | Optional; confirm bank/QR-IBAN/payment requirement. |
| **Production SMS provider** | Pending. |
| **Production email provider** | Pending. |
| **WhatsApp Business account/provider** | Pending. |
| **Production AI model/provider configuration** | Pending; keep model selection configurable. |
| **Accountant export format/integration** | Pending. |
| **Direct OBD-II hardware integration** | Not assumed; confirm if required. |

---

## 25. Verified Corrections Applied

| Source assumption | Corrected treatment in this PRD |
| :--- | :--- |
| **Simple FR 20% vs CH 8.1% by customer country** | Removed. Tax depends on transaction/place of supply/customer status and validated rules. |
| **Swiss QR-bill automatically for Swiss customer** | Changed to optional/conditional feature requiring compatible Swiss banking/QR-IBAN setup. |
| **27-digit QR reference described as BVR** | Use modern QR-bill terminology; 27-digit QR reference requires QR-IBAN. |
| **Pennylane endpoint/path hard-coded** | Removed. Provider is pending; connector is provider-neutral and endpoints are implemented from current provider documentation. |
| **DGFiP 'clearance seal' / per-invoice clearance** | Removed. Track official/provider lifecycle statuses instead. |
| **Chorus Pro mixed with normal B2B PA flow** | Separated: Chorus Pro for public-sector invoicing; approved platform for reform B2B/e-reporting flows. |
| **12ms AI/scheduling guarantee** | Removed as unverified. Performance targets should be measured and defined separately. |
| **15-minute buffer globally mandatory** | Changed to configurable per tenant/service. |
| **Separate PostgreSQL schema per tenant** | Replaced with tenant-aware relational model + RLS/service authorization; separate schemas are optional, not required. |
| **Vendors/models/cost assumptions** | Removed from client requirements document because they are time-sensitive and were not required here. |

---

# 🇫🇷 PART 2: SYNTHÈSE EN FRANÇAIS

*(Le document Word `.docx` complet et le fichier JSON contiennent l'intégralité des 27 sections en français et en anglais avec toutes les tables, flux et descriptions techniques détaillées).*
