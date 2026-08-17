# CLIENT REQUIREMENTS SPECIFICATION
**Project**: Auto Workshop SaaS (AtelierOS)  
**Version**: 3.0 Consolidated Client PRD + Direct Requirements from Luca Sigon  
**Client / Lead**: Luca Sigon  
**Development Partner**: MARS Association  
**Target Markets**: France (Initial Deployment & Primary Pilot) + Switzerland (Cross-Border & Dual Currency)  

---

## 1. Executive Summary & Core Objective
Build a tablet-first, multi-tenant automotive workshop operating system (SaaS) that manages the complete customer and vehicle lifecycle:
- Online customer booking (without requiring WhatsApp)
- Central real-time scheduling engine
- Workshop floor & bay operations (Mechanic tablet mode)
- Diagnosis, OBD-II error code logging, inspections
- Quotation engine with markup margins & customer magic-link approval
- Deterministic cross-border invoicing (EUR € and CHF)
- French E-invoicing connector (Chorus Pro / PPF / Factur-X / PDP)
- Omnichannel customer communications (SMS, Email, WhatsApp)
- AI-assisted reception, diagnosis, and quote drafting via controlled function calling
- Multi-tenant SaaS administration and subscription tier management

---

## 2. Non-Negotiables & Critical Architecture Rules

### Rule 1: Single Source of Truth for Scheduling (ONE Central Scheduling Engine)
There must be **ONE** unified scheduling engine across the entire platform.
- Staff calendar booking
- Public customer web booking
- AI booking assistant
All **must call the exact same availability APIs** and write to the same central agenda.
No separate calendars, no shadow availability.

### Rule 2: Multi-Country Architecture (France + Switzerland From Day 1)
The garage is located near the French-Swiss border and serves both French and Swiss customers.
- **France**: EUR (€), +33 phone format, French address structure, SIRET / SIREN / N° TVA FR, French TVA rates (20% standard, 10% intermediate, 5.5% reduced).
- **Switzerland**: CHF (and EUR), +41 phone format, Swiss NPA/canton format, IDE / UID (CHE-xxx.xxx.xxx), Swiss TVA rates (8.1% standard, 2.6% reduced, 3.8% special), Swiss QR-Bill reference support.
- **Cross-Border Tax**: Automated tax determination based on seller garage country, customer location, and B2B/B2C status (e.g. Reverse charge for intra-EU B2B, domestic VAT for local repairs).

### Rule 3: Provider-Neutral French E-Invoicing Connector
The SaaS owns invoice generation and immutability. Transmission to French tax authorities (Chorus Pro / PPF / PDP) must be handled through a modular, replaceable connector interface (`EInvoiceConnector`).
- Workflow: `Repair Completed` → `Invoice Generated` → `Validated` → `Sent to Approved Platform` → `Status Returned` → `Records Updated`.

### Rule 4: Tablet-First & Apple-Inspired Design
Workshop staff operate on iPads/tablets mounted in bays.
- Large touch targets (min 44px)
- High contrast, dark/light mode elegance, frosted glass aesthetics
- 16px minimum font size for mobile inputs to prevent unwanted iOS auto-zoom
- Hidden scrollbars with smooth scrolling
- Skeleton loading animations

### Rule 5: Controlled AI Layer (Function Calling Only)
The AI Assistant acts strictly as an orchestration agent using approved application APIs.
- AI must **never** diagnose with certainty, **never** invent prices, **never** write directly to the database, and **never** calculate availability independently.

---

## 3. End-to-End Operational Lifecycle State Machine
```
REQUEST → APPOINTMENT → DIAGNOSIS → QUOTE → AWAITING APPROVAL → APPROVED → IN PROGRESS → QUALITY CHECK → READY → DELIVERED → INVOICED
```

---

## 4. User Roles & RBAC
1. **Owner**: Full tenant control, settings, user management, pricing templates, reporting, subscription tier.
2. **Manager**: Calendar management, customer/vehicle registry, work orders, quotes, invoice issuance, operational oversight.
3. **Mechanic**: Bay tablet interface, assigned work, checklists, OBD-II error codes, labor/parts tracking, quality inspection.
4. **Admin**: Customer reception, appointment booking, documentation, invoices, communication dispatches.
5. **Customer**: Public online booking portal, repair status tracking, magic-link quote review and digital signature approval.
6. **SaaS Super Admin**: Multi-tenant onboarding, tenant suspension, subscription tiers (Starter, Pro, AI), platform analytics, audit logging.

---

## 5. Timeline & Engagement Model (Luca Sigon Directives)
- **Phase 1 (90 Days)**: Core MVP (Auth/RBAC, Customers/Vehicles, Central Calendar with Conflict Detection, Appointments, Quotes with PDF, Customer Approval Portal, Invoicing with EUR/CHF, SMS/Email/WhatsApp reminders, E-invoicing connector).
- **Phase 2 (30 Days)**: Live pilot in French workshop to refine real-world edge cases.
- **Engagement**: 3-month contract, milestone-based payments with long-term technical partnership.

---
*Maintained by MARS Association for AtelierOS Project.*
