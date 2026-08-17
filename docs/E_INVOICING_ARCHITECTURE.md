# AtelierOS — French & Swiss E-Invoicing & Cross-Border Billing Architecture

**Document Version**: 1.0.0  
**Author**: Antigravity AI Engineering  
**Scope**: Invoicing Engine, Pluggable PDP/PPF E-Invoicing Connectors, Multi-Country Tax Determination (France 🇫🇷 & Switzerland 🇨🇭)

---

## 1. Executive Summary & Core Principle

### Internal Invoicing Engine vs. Approved E-Invoicing Platform (PDP / PPF)

```
┌──────────────────────────────────────────────────────────────────────────┐
│                      ATELIER OS (OUR SAAS CORE)                          │
│                                                                          │
│  Repair Completed → Work Order (WO-2026-0042)                            │
│  ↓                                                                       │
│  AtelierOS Invoice Engine                                                │
│  • Parts + Labor Calculation                                             │
│  • Deterministic Multi-Country Tax Engine (FR 20.0% / CH 8.1%)           │
│  • Dual-Currency Formatting (EUR € / CHF CHF)                            │
│  • Sequential Fiscal Numbering (FAC-FR-2026-0058 / FAC-CH-2026-0012)     │
│  • Visual Hybrid PDF Generation (Factur-X Profile)                       │
│  • Structured XML Generation (CrossIndustryInvoice UBL / CII)            │
│  • Swiss QR-Bill Structured Payload (27-digit reference + QR-IBAN)       │
└─────────────────────────────────────┬────────────────────────────────────┘
                                      │
                                      ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                     PLUGGABLE E-INVOICE CONNECTOR                        │
│                                                                          │
│  Interface: IEInvoiceConnector                                           │
│  • authenticate(credentials)                                             │
│  • submitInvoice(payload: FacturXPayload)                                │
│  • checkStatus(submissionId)                                             │
│  • handleWebhook(event)                                                  │
└──────────────┬──────────────────┬───────────────────┬────────────────────┘
               │                  │                   │
               ▼                  ▼                   ▼
     ┌──────────────────┐ ┌───────────────┐ ┌───────────────────┐
     │ Pennylane PDP    │ │ Chorus Pro    │ │ Sage / Avalara    │
     │ (French B2B PDP) │ │ (French B2G)  │ │ (International)   │
     │ REST API v2      │ │ PISTE OAuth2  │ │ REST API          │
     └─────────┬────────┘ └───────┬───────┘ └─────────┬─────────┘
               │                  │                   │
               ▼                  ▼                   ▼
     ┌──────────────────────────────────────────────────────────┐
     │              FRENCH E-INVOICING ECOSYSTEM                │
     │       (DGFiP / Approved Platforms Network / Recipient)   │
     └────────────────────────────┬─────────────────────────────┘
                                  │
                                  ▼
               Status Callback / Webhook: ACCEPTED ✓
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                      ATELIER OS REAL-TIME UPDATE                         │
│                                                                          │
│  Invoice Status: DRAFT → VALIDATED → SUBMITTED → ACCEPTED                │
│  External Reference: FR-DEMO-2026-0085                                   │
│  Audit Trail: Timestamped DGFiP lifecycle tracking                       │
└──────────────────────────────────────────────────────────────────────────┘
```

> **Key Rule**: The garage technician or administrator **never leaves AtelierOS**. They do not log into government or third-party tax portals manually. All generation, validation, transmission, and status tracking occur seamlessly inside the AtelierOS interface.

---

## 2. Pluggable E-Invoicing Connector Architecture

To ensure vendor neutrality and prevent vendor lock-in, all external platform communication is decoupled behind the `IEInvoiceConnector` interface:

```typescript
export interface IEInvoiceConnector {
  readonly providerId: string;
  readonly providerName: string;
  
  validateInvoice(invoice: Invoice, tenant: Tenant, customer: Customer): Promise<ValidationResult>;
  submitInvoice(payload: FacturXPayload, options?: SubmissionOptions): Promise<SubmissionResponse>;
  pollStatus(submissionId: string): Promise<EInvoiceStatusUpdate>;
  handleWebhookPayload(rawPayload: any, signature: string): Promise<WebhookEventResult>;
}
```

### Concrete Implementations:

1. **`PennylaneConnector`** *(Recommended Primary PDP for France)*:
   - Uses Pennylane Company API v2 (`POST /api/v2/customer_invoices`).
   - Supports direct ingestion of generated Factur-X structured XML and PDF attachments.
   - Built-in sandbox environment for development and staging validation.
   
2. **`ChorusProConnector`** *(French Public Sector & B2G Reference)*:
   - Uses French government PISTE OAuth2 authentication.
   - Ingests UBL 2.1 / Factur-X payloads with required Service Code and Engagement Reference.

3. **`SagePDPConnector` / `AvalaraConnector`** *(Alternative Enterprise Options)*:
   - Available as drop-in pluggable adapters for multi-national scaling.

4. **`SwissQRBillConnector`** *(Switzerland Invoicing)*:
   - Generates compliant Swiss QR-Bill payment parts (BVR) with 27-digit structured reference, QR-IBAN, and CHF currency specifications.

---

## 3. Cross-Border Customer & Vehicle Data Model

### Customer Data Structure:
```typescript
export interface Customer {
  id: string;
  tenantId: string;
  type: 'INDIVIDUAL' | 'BUSINESS';
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  phone: string;              // e.g. +33 6 12 34 56 78 or +41 79 123 45 67
  country: 'FR' | 'CH' | 'OTHER_EU' | 'INTERNATIONAL';
  taxIdentity?: {
    siret?: string;           // France: 14-digit SIRET
    siren?: string;           // France: 9-digit SIREN
    vatNumber?: string;       // EU VAT (e.g. FR32123456789)
    uid?: string;             // Swiss Business UID (e.g. CHE-123.456.789)
    chorusServiceCode?: string; // Chorus Pro service routing
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    cantonOrRegion?: string;
  };
  preferredCurrency: 'EUR' | 'CHF';
  preferredLanguage: 'en' | 'fr' | 'fr-CH' | 'de-CH';
}
```

---

## 4. Deterministic Multi-Country Tax Engine

```typescript
export class TaxEngine {
  public static calculateTax(
    garageTenant: Tenant,
    customer: Customer,
    serviceType: 'WORKSHOP_LABOR' | 'SPARE_PARTS' | 'EXPORT_SERVICE'
  ): TaxTreatmentResult {
    // Scenario 1: French Garage + French Customer (Domestic)
    if (garageTenant.country === 'FR' && customer.country === 'FR') {
      return {
        vatRate: 20.0,
        currency: 'EUR',
        taxTreatmentCode: 'FR_DOMESTIC_STANDARD_20',
        requiresFacturX: true,
        requiresSwissQr: false
      };
    }

    // Scenario 2: Swiss Garage + Swiss Customer (Domestic)
    if (garageTenant.country === 'CH' && customer.country === 'CH') {
      return {
        vatRate: 8.1,
        currency: 'CHF',
        taxTreatmentCode: 'CH_DOMESTIC_STANDARD_8_1',
        requiresFacturX: false,
        requiresSwissQr: true
      };
    }

    // Scenario 3: French Garage + Swiss Customer (Cross-border repair in France)
    if (garageTenant.country === 'FR' && customer.country === 'CH') {
      // Physical vehicle service performed on French territory is subject to FR VAT
      return {
        vatRate: 20.0,
        currency: customer.preferredCurrency || 'EUR',
        taxTreatmentCode: 'FR_TERRITORIAL_TVA_20_CROSS_BORDER',
        requiresFacturX: true,
        requiresSwissQr: customer.preferredCurrency === 'CHF'
      };
    }

    // Scenario 4: Swiss Garage + French Customer (Cross-border repair in Switzerland)
    if (garageTenant.country === 'CH' && customer.country === 'FR') {
      return {
        vatRate: 8.1,
        currency: 'CHF',
        taxTreatmentCode: 'CH_TERRITORIAL_MWST_8_1',
        requiresFacturX: false,
        requiresSwissQr: true
      };
    }

    // Default Fallback
    return {
      vatRate: garageTenant.settings.standardVatRate,
      currency: garageTenant.currency,
      taxTreatmentCode: 'STANDARD_DEFAULT',
      requiresFacturX: garageTenant.country === 'FR',
      requiresSwissQr: garageTenant.country === 'CH'
    };
  }
}
```

---

## 5. Lifecycle Status Progression

Every invoice in AtelierOS follows the state machine:

```
[ DRAFT ] 
    │
    ▼ (Validated by Garage Admin)
[ VALIDATED ] 
    │
    ▼ (Dispatched via EInvoiceConnector)
[ SUBMITTED ] 
    │
    ▼ (PDP / PPF Interoperability Processing)
[ IN_PROCESSING ] 
    │
    ├──▶ [ ACCEPTED ] (Official Tax Clearance / Recipient Delivered)
    └──▶ [ REJECTED ] (Validation Fault with Detailed Error Code & Reason)
```

---

## 6. Implementation Status & Next Milestones

- [x] **Internal Invoicing Engine**: Calculates labor, parts, subtotal, TVA/MWST, and grand total in both EUR (€) and CHF (CHF).
- [x] **Factur-X CII/UBL XML Generator**: Deterministic generation of compliant `urn:factur-x.eu:1p0:basic` structured XML.
- [x] **Swiss QR-Bill Engine**: Generates 27-digit structured reference numbers and visual QR payment codes.
- [x] **Provider-Neutral Simulator**: Allows immediate demonstration of `SUBMITTED → ACCEPTED` workflow with external tax reference IDs.
- [ ] **Production Pennylane API Key Ingestion**: Awaiting client onboarding and sandbox API credentials.
