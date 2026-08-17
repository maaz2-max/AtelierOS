# AtelierOS — French & Swiss E-Invoicing, PA/PDP & Cross-Border Billing Architecture

**Document Version**: 2.0.0 (Updated to DGFiP PA/PDP & ESTV Standards)  
**Target Scope**: French Plateforme Agréée (PA/PDP), Chorus Pro (B2G Public Sector), and Swiss QR-Bill (CHF) Invoicing Engine

---

## 1. The Core Invoicing Architecture Clarified

There is a fundamental separation of duties between **our software (AtelierOS)** and the **external regulatory platform (PA/PDP / Chorus Pro)**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ATELIEROS (OUR SAAS CORE)                           │
│                                                                             │
│  Repair Order Completed (WO-2026-0042)                                      │
│  ↓                                                                          │
│  AtelierOS Internal Invoicing Engine                                        │
│  • Parts + Labor Computation                                                │
│  • Deterministic Tax Engine:                                                │
│    - France Domestic: 20.0% TVA                                             │
│    - Switzerland Domestic: 8.1% MWST                                        │
│    - Cross-Border Territorial Rules & Intra-EU Reverse Charge               │
│  • Dual-Currency Formatting (EUR € / CHF CHF)                               │
│  • Generates Invoice FAC-FR-2026-0058                                       │
│  • Compiles Factur-X / UBL 2.1 Structured CII XML Data Payload              │
│  • Generates Swiss QR-Bill (27-digit structured reference + QR-IBAN)        │
│  • Renders Visual Hybrid PDF Document                                       │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│               PLUGGABLE E-INVOICE CONNECTOR (IEInvoiceConnector)            │
│                                                                             │
│  Standardized Interface: submit(), pollStatus(), handleWebhook()            │
└──────────────┬────────────────────────────────────────┬─────────────────────┘
               │ (French B2B & E-Reporting)             │ (French Public Sector B2G)
               ▼                                        ▼
┌──────────────────────────────────────┐ ┌────────────────────────────────────┐
│   PLATEFORME AGRÉÉE (PA / PDP)       │ │     CHORUS PRO (PPF / B2G)         │
│   (e.g., Pennylane / Sage / Avalara) │ │     (French State Public Sector)   │
│   • B2B Electronic Transmission      │ │     • Invoices for Municipalities, │
│   • B2C / Cross-Border E-Reporting   │ │       Hospitals & State Bodies     │
│   • Transmits data to DGFiP          │ │     • 100% Free Public Platform    │
└──────────────────┬───────────────────┘ └─────────────────┬──────────────────┘
                   │                                       │
                   └───────────────────┬───────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        REAL-TIME STATUS SYNCHRONIZATION                     │
│                                                                             │
│  DGFiP Network Lifecycle: DRAFT → VALIDATED → SUBMITTED → ACCEPTED / REJECTED│
│  AtelierOS automatically updates: Invoice + Work Order + Customer + Vehicle │
│  Garage staff NEVER leaves AtelierOS. Zero manual portal uploads.           │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Distinction: Plateforme Agréée (PA/PDP) vs. Chorus Pro (PPF)

| Feature | Plateforme Agréée (PA / formerly PDP) | Chorus Pro (PPF) |
| :--- | :--- | :--- |
| **Primary Scope** | **French B2B Invoicing & E-Reporting** | **French Public Sector (B2G)** |
| **Who is Billed** | Private companies, corporate fleets, domestic businesses | French government agencies, town halls (*mairies*), public hospitals |
| **E-Reporting Role** | Transmits regulatory transaction/payment data for **private B2C customers** and **foreign/Swiss customers** | Not applicable for private/cross-border reporting |
| **AtelierOS Platform Cost** | **€0.00 / month surcharge from AtelierOS** | **€0.00 / month from AtelierOS** |
| **Third-Party Provider Cost** | Paid directly by the garage to their chosen PA provider (e.g. Pennylane, Sage, etc.) | **100% Free** (French state-funded service) |
| **AtelierOS Connector Status** | Pluggable `PAConnector` interface | Pluggable `ChorusProConnector` interface |

---

## 3. The 4 Luca Sigon Client Requirements Mapped to Architecture

### Requirement 1: French E-Invoicing (PA/PDP Connector)
- **Problem Solved**: Staff don't have to manually upload PDFs to government websites.
- **Implementation**: AtelierOS creates the invoice and structured XML, then calls the PA API in the background. The PA transmits it to the French tax network and returns real-time status callbacks (`SUBMITTED` → `ACCEPTED`).

### Requirement 2: Swiss Customers & Cross-Border Invoicing
- **Problem Solved**: Garage is near the France–Switzerland border; Swiss customers cross the border for repairs.
- **Implementation**:
  - Customer profiles support France & Switzerland (SIRET vs Swiss Business UID `CHE-xxx.xxx.xxx`, +33 vs +41 phones).
  - Native dual-currency (`EUR €` and `CHF CHF`).
  - Configurable Tax Engine calculates territorial VAT (20.0% FR TVA on repair labor performed in France, 8.1% CH MWST for Swiss entities).
  - Native Swiss QR-Bill generation with 27-digit structured reference numbers.

### Requirement 3: Customer Web Booking (Without WhatsApp Dependency)
- **Problem Solved**: Not all customers use WhatsApp; needs a universal browser-accessible booking page.
- **Implementation**: 60-second public booking wizard accessible on the garage website or via SMS/Email link, connecting to the **exact same central scheduling engine** (checking bay lifts, technician skills, and 15m cleaning buffers with zero double bookings).

### Requirement 4: AI-Assisted Booking (Central Engine Integration)
- **Problem Solved**: AI needs to understand customer symptoms (e.g., *"My car squeaks when braking"*) and book appropriate slots without having a separate calendar.
- **Implementation**: OpenAI function calling bound directly to the central engine (`check_workshop_availability`, `calculate_quote_estimate`, `hold_booking_slot`).
