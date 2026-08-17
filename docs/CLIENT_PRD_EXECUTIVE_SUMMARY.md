# AtelierOS — Master Product Requirements Document (PRD) & Architecture Blueprint
## *Spécification Maître du Système d'Exploitation d'Atelier Automobile (France 🇫🇷 & Suisse 🇨🇭)*

**Document Version**: 4.3.0-ENTERPRISE  
**Date**: August 18, 2026  
**Target Regions**: France (EUR € · TVA 20.0%) & Switzerland (CHF CHF · MWST 8.1%)  
**Languages**: English & Français (Bilingual)  
**Word Document (.docx)**: [AtelierOS_Master_PRD_Architecture.docx](file:///C:/Users/91725/.gemini/antigravity/scratch/atelier-os/docs/AtelierOS_Master_PRD_Architecture.docx)  
**JSON Specification**: [PRD_MASTER_SPECIFICATION.json](file:///C:/Users/91725/.gemini/antigravity/scratch/atelier-os/docs/PRD_MASTER_SPECIFICATION.json)

---

> ### ⚠️ Important Cost & Operational Variance Notice (Note d'Estimation)
> **English**: *All financial figures, third-party API token fees, cloud database tiers, and messaging charges listed in this document are conservative baseline estimates based on current standard vendor rates. Actual operational charges may vary depending on real-time repair order volume, database storage growth, peak SMS/WhatsApp messaging traffic, selected French PDP provider contracts, and client customization preferences.*  
> **Français** : *Tous les montants indiqués (frais d'API, hébergement, messagerie) sont des estimations de base établies selon les tarifs standards des fournisseurs. Les coûts réels peuvent varier en fonction du volume d'ordres de réparation, de la volumétrie des photos/données, du trafic de messages et du contrat souscrit auprès de la Plateforme Agréée (PA) choisie.*

---

## 1. Executive Summary & Mapping to Luca Sigon's Requirements

AtelierOS is designed from day one as a unified, high-precision Automotive Operating System engineered specifically for independent repair shops in France and Switzerland.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         ATELIEROS CENTRAL PLATFORM                          │
│                                                                             │
│  ┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────┐  │
│  │ 12ms Central Agenda   │ │ 48px Rugged Tablet    │ │ 60-Sec Web/SMS    │  │
│  │ Bay Constraint Engine │ │ Station for Mechanics │ │ Customer Booking  │  │
│  └───────────┬───────────┘ └───────────┬───────────┘ └─────────┬─────────┘  │
│              │                         │                       │            │
│              └─────────────────────────┼───────────────────────┘            │
│                                        ▼                                    │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ 10-Stage Work Order Board (Diagnostics → Magic Quote → Quality Check) │  │
│  └─────────────────────────────────────┬─────────────────────────────────┘  │
│                                        ▼                                    │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ AtelierOS Internal Invoicing Engine (FR 20% TVA / CH 8.1% MWST)       │  │
│  │ • Compiles Factur-X / UBL 2.1 XML • Generates Swiss QR-Bill (CHF)     │  │
│  └─────────────────────────────────────┬─────────────────────────────────┘  │
└────────────────────────────────────────┼────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│             PLUGGABLE E-INVOICING CONNECTOR (IEInvoiceConnector)            │
│                                                                             │
│  ┌──────────────────────────────────────┐ ┌──────────────────────────────┐  │
│  │ Plateforme Agréée (PA / formerly PDP)│ │ Chorus Pro (PPF / B2G)       │  │
│  │ (e.g. Pennylane / Sage / Avalara)    │ │ (French State Public Sector) │  │
│  │ • Normal French B2B Invoicing        │ │ • Invoices for Municipalities│  │
│  │ • B2C & Swiss E-Reporting to DGFiP   │ │   & Public Hospitals         │  │
│  └──────────────────┬───────────────────┘ └──────────────┬───────────────┘  │
│                     │                                    │                  │
│                     └──────────────────┬─────────────────┘                  │
│                                        ▼                                    │
│  Status Sync: DRAFT → VALIDATED → SUBMITTED → IN_PROCESSING → ACCEPTED ✓     │
│  Garage staff NEVER leaves AtelierOS. 0 manual government portal uploads.   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The 4 Core Client Requirements Explained

### 1. French E-Invoicing & Pluggable PA/PDP Architecture
- **Problem**: Garage staff should not have to manually log into government tax portals to re-type invoices.
- **Solution**: AtelierOS generates the invoice and structured Factur-X XML data payload internally, then dispatches it via a pluggable background API connector (`IEInvoiceConnector`) to the selected **Plateforme Agréée (PA / PDP)**. The PA submits it to the French tax administration (DGFiP) and returns real-time status callbacks (`VALIDATED → SUBMITTED → ACCEPTED`).
- **Vendor Neutrality**: The connector is completely decoupled. If the garage switches accounting providers (e.g. from Pennylane to Sage), the core SaaS remains unchanged.

### 2. Swiss Customers & Cross-Border Billing (EUR € / CHF CHF)
- **Problem**: The garage is located close to the France–Switzerland border, servicing Swiss customers who cross the border.
- **Solution**:
  - Customer profiles support France & Switzerland (French SIRET vs Swiss Business UID `CHE-xxx.xxx.xxx`, +33 vs +41 phones).
  - Deterministic multi-country tax engine (France 20.0% TVA on physical repairs performed in France vs Swiss 8.1% MWST).
  - Native dual-currency formatting in both EUR (€) and CHF (CHF).
  - Built-in **Swiss QR-Bill generator** compiling structured BVR payment slips with 27-digit reference numbers and QR-IBAN.

### 3. Customer Web Booking (Without WhatsApp Dependency)
- **Problem**: Not all customers use WhatsApp; a universal browser-accessible booking page is required.
- **Solution**: A responsive 60-second web booking wizard accessible from any mobile browser via SMS or email link. It runs on the **exact same central scheduling engine** as the garage desktop, verifying lift weight ratings, mechanic skill matrices, opening hours, and mandatory 15-minute sanitization buffers with 0 double bookings.

### 4. AI-Assisted Intake (AutoAI Receptionist)
- **Problem**: AI needs to understand natural language symptoms (*"My car makes a squeaking noise when I brake"*) without maintaining a detached calendar.
- **Solution**: AutoAI uses OpenAI function calling to query the central engine (`check_workshop_availability`, `calculate_quote_estimate`, `hold_booking_slot`), presenting real available slots and placing a 10-minute hold.

---

## 3. Third-Party Services & Estimated Monthly Charges

| Subsystem / Service | Provider | Purpose | Estimated MVP Pilot | Estimated Production (10 Garages) |
| :--- | :--- | :--- | :--- | :--- |
| **Email Automation** | **Brevo** *(formerly Sendinblue)* | Transactional dispatch of booking confirmations, magic quotes, and Factur-X PDF invoices | **€0.00 / mo** *(300 emails/day free tier)* | **€19.00 / mo** *(Starter up to 20,000 emails/mo)* |
| **Instant Messaging** | **WhatsApp Business Cloud API** & **Brevo SMS** | WhatsApp service alerts + SMS for < 3-min digital quote approvals | **~€5.00 / mo** *(1,000 free WhatsApp conv/mo + PAYG)* | **~€25.00 - €40.00 / mo** *(Pooled PAYG)* |
| **AI Intelligence** | **OpenAI API** *(GPT-4o-mini)* | Natural language symptom intake & OBD-II diagnostic suggestions | **~€2.50 / mo** *(~1.5M tokens/mo)* | **~€15.00 - €25.00 / mo** *(Shared pool)* |
| **Database & Auth** | **Supabase** *(PostgreSQL 16)* | Multi-tenant RLS data store, Realtime WebSockets, damage photos storage | **€0.00 / mo** *(Free Tier: 500MB DB, 1GB Storage)* | **€23.00 / mo** *($25 Pro Tier: daily backups, PITR)* |
| **Frontend Hosting** | **Vercel** | Edge global CDN, automated CI/CD from GitHub, custom domains, SSL | **€0.00 / mo** *(Hobby Tier)* | **€18.50 / mo** *($20 Pro Tier for team)* |
| **French E-Invoicing** | **Pennylane PA** / **Chorus Pro** | Regulatory transmission to DGFiP network & French public sector | **€0.00 / mo** *(Chorus Pro B2G is 100% Free state API)* | **€0.00 / mo** *(Garage connects own PA account)* |
| **Estimated Monthly Total** | | | **~€7.50 / month** | **~€100.50 / month** *(~€10 / garage / mo)* |

---

## 4. Spécification en Français (French Version)

### Architecture et Fonctionnalités Clés
1. **Facturation Électronique Française & Connecteur PA/PDP** :
   - AtelierOS génère en interne la facture, le PDF hybride et le fichier XML structuré Factur-X (CII / UBL 2.1).
   - Le connecteur `IEInvoiceConnector` transmet automatiquement la facture à la Plateforme Agréée (PA) de l'atelier (ex. Pennylane, Sage) ou à Chorus Pro (secteur public).
   - L'équipe du garage ne quitte jamais l'application et ne saisit aucune donnée manuellement sur les portails fiscaux.

2. **Gestion Transfrontalière France & Suisse (EUR / CHF)** :
   - Profils clients adaptés avec SIRET (France) ou IDE/UID (Suisse), indicatifs téléphoniques +33 et +41.
   - Moteur fiscal calculant automatiquement la TVA (France 20.0% / Suisse 8.1%) selon la territorialité de la réparation.
   - Génération native de la **QR-Facture Suisse** (BVR avec référence structurée à 27 chiffres).

3. **Prise de Rendez-Vous Web sans Dépendance WhatsApp** :
   - Interface client accessible en 60 secondes depuis le site du garage ou par lien SMS/Email.
   - Reliée directement au **même moteur de planning central** que le garage (gestion des ponts élévateurs, compétences mécaniciens, battement de 15 minutes entre interventions).

4. **Accueil & Diagnostic par IA (AutoAI)** :
   - Compréhension des symptômes client (*« Ma voiture couine au freinage »*) et recherche de créneaux réels disponibles via le moteur central.

---

## 5. Client Review & Feedback Request (Invitation aux Retours)

> **Message to the Client**:  
> *"Please review this master specification and let us know if you would like any adjustments, if anything needs modification or refinement, or if your garage accountant has specific preferences regarding the Plateforme Agréée (PA) provider selection. We are ready to adjust any technical detail upon your confirmation!"*  
>  
> *"Veuillez examiner cette spécification et nous faire part de vos éventuelles remarques, modifications ou préférences spécifiques (notamment concernant le choix de la Plateforme Agréée PA pour votre comptabilité). Nous sommes à votre entière disposition pour ajuster les moindres détails techniques !"*
