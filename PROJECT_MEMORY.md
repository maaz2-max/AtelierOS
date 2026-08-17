# AtelierOS - Master Project Memory & Architecture Context

**Platform**: AtelierOS (Automotive Workshop SaaS)  
**Maintained by**: MARS Association & Antigravity  
**Target Markets**: France (FR), Switzerland (CH), Cross-Border EU  
**Current Phase**: MVP Release 1.0 (LocalStorage Domain Layer, Supabase-Ready Schema)  

---

## 1. Domain Entities & Database Mapping (Supabase/PostgreSQL Ready)

### 1.1 Tenant & Locations
```typescript
interface Tenant {
  id: string; // e.g. "tenant-fr-01"
  name: string; // "Atelier Mécanique Étoile"
  slug: string; // "etoile-paris"
  country: 'FR' | 'CH';
  currency: 'EUR' | 'CHF';
  phone: string; // "+33 1 42 68 55 00"
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    countryCode: string;
    cantonOrRegion?: string;
  };
  taxIdentity: {
    siret?: string; // FR: 14 digits
    siren?: string; // FR: 9 digits
    vatNumber?: string; // FR: FR... or CH: CHE-...
    uid?: string; // CH: CHE-xxx.xxx.xxx
    chorusProId?: string; // FR E-Invoicing Identifier
  };
  settings: {
    openingTime: string; // "08:00"
    closingTime: string; // "18:30"
    lunchStart: string; // "12:00"
    lunchEnd: string; // "13:30"
    workDays: number[]; // [1,2,3,4,5,6] (1=Mon, 6=Sat)
    defaultLaborRatePerHour: number; // e.g. 85.00 EUR or 120.00 CHF
    defaultVatRate: number; // 20.0 (FR) or 8.1 (CH)
    slotDurationMinutes: number; // 30
    slotHoldTimeoutMinutes: number; // 10
    autoConfirmEligibleServices: boolean;
  };
  subscriptionTier: 'starter' | 'pro' | 'ai';
  active: boolean;
}
```

### 1.2 Customer & Vehicle Registry
```typescript
interface Customer {
  id: string;
  tenantId: string;
  type: 'INDIVIDUAL' | 'BUSINESS';
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  phone: string;
  country: 'FR' | 'CH' | 'OTHER';
  taxIdentity?: {
    siret?: string;
    uid?: string;
    vatNumber?: string;
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  preferredLanguage: 'en' | 'fr' | 'fr-CH' | 'de-CH';
  gdprConsent: {
    consentedAt: string;
    marketingConsent: boolean;
    smsConsent: boolean;
    whatsappConsent: boolean;
  };
  createdAt: string;
}

interface Vehicle {
  id: string;
  tenantId: string;
  customerId: string;
  licensePlate: string; // e.g. "AB-123-CD" (FR) or "GE 452 891" (CH)
  vin: string; // 17 characters
  make: string; // "Peugeot", "Tesla", "Renault", "BMW", "Audi"
  model: string; // "3008 GT", "Model Y", "Clio V", "X3 xDrive"
  year: number;
  fuelType: 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'LPG';
  transmission: 'MANUAL' | 'AUTOMATIC';
  mileage: number;
  serviceHistoryCount: number;
  notes?: string;
}
```

### 1.3 Workshop Resources & Mechanics
```typescript
type MechanicSkill = 'BRAKES' | 'ENGINE' | 'DIAGNOSTICS' | 'EV_HYBRID' | 'SUSPENSION' | 'TRANSMISSION' | 'TIRES' | 'AIR_CONDITIONING';
type ResourceBayType = 'TWO_POST_LIFT' | 'FOUR_POST_ALIGNMENT' | 'DIAGNOSTIC_STATION' | 'EV_CERTIFIED_BAY' | 'QUICK_SERVICE_BAY';

interface Mechanic {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  phone: string;
  skills: MechanicSkill[];
  hourlyCost: number;
  workingHours: {
    start: string; // "08:00"
    end: string;   // "17:30"
  };
  leaves: Array<{ start: string; end: string; reason: string }>;
  active: boolean;
}

interface WorkshopBay {
  id: string;
  tenantId: string;
  name: string; // "Bay 1 (2-Post Hydraulic Lift)"
  type: ResourceBayType;
  maxWeightCapacityKg: number;
  isEvEquipped: boolean;
  active: boolean;
}
```

### 1.4 Service Catalog & Booking Rules
```typescript
interface ServiceItem {
  id: string;
  tenantId: string;
  name: string;
  category: 'MAINTENANCE' | 'BRAKES' | 'DIAGNOSTIC' | 'TIRES' | 'ENGINE' | 'ELECTRIC';
  description: string;
  estimatedDurationMin: number; // e.g. 60, 90, 120
  requiredSkills: MechanicSkill[];
  requiredBayType: ResourceBayType;
  baseLaborPrice: number; // in tenant currency
  onlineBookable: boolean;
  approvalMode: 'AUTO' | 'MANUAL' | 'DIAGNOSTIC_FIRST';
  bufferBeforeMin: number;
  bufferAfterMin: number;
  intakeQuestions: Array<{
    id: string;
    question: string;
    type: 'TEXT' | 'SELECT' | 'BOOLEAN';
    options?: string[];
    required: boolean;
  }>;
  active: boolean;
}
```

### 1.5 Central Scheduling & Slot Holds
```typescript
interface SlotHold {
  id: string;
  tenantId: string;
  serviceId: string;
  mechanicId: string;
  bayId: string;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  expiresAt: string; // ISO String (now + 10 mins)
  token: string;
  clientIpOrSession: string;
}

interface Appointment {
  id: string;
  tenantId: string;
  customerId: string;
  vehicleId: string;
  serviceId: string;
  mechanicId: string;
  bayId: string;
  scheduledStartTime: string;
  scheduledEndTime: string;
  status: 'PENDING_APPROVAL' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED';
  source: 'STAFF' | 'ONLINE_WEB' | 'AI_ASSISTANT';
  intakeNotes?: string;
  customerAnswers?: Record<string, any>;
  createdAt: string;
}
```

### 1.6 Work Order State Machine (10-Stage Lifecycle)
```
REQUEST ➔ APPOINTMENT ➔ DIAGNOSIS ➔ QUOTE ➔ AWAITING APPROVAL ➔ APPROVED ➔ IN PROGRESS ➔ QUALITY CHECK ➔ READY ➔ DELIVERED ➔ INVOICED
```

### 1.7 Quotation & Deterministic Invoicing
- **Quote**: Labor lines (hours × rate), Parts lines (quantity × unit price × margin markup), Discounts, Deterministic VAT breakdown (FR: 20%, 10%, 5.5%; CH: 8.1%, 2.6%), Customer magic-link signature token, validity timestamp.
- **Invoice**: Immutable snapshot, sequential invoice number (e.g. `INV-FR-2026-0042` / `INV-CH-2026-0018`), tax decision rationale, EUR / CHF currency, Swiss QR-Bill reference, E-Invoice submission records.

### 1.8 French E-Invoicing Connector (`EInvoiceConnector`)
- Connector interface providing normalized payload schema (Factur-X / UBL CII compliant).
- Providers: `CHORUS_PRO` (Public portal for public/commercial procurement), `PPF` (Portail Public de Facturation), `PDP_GENERIC` (Plateforme de Dématérialisation Partenaire).
- Status cycle: `DRAFT` ➔ `PAYLOAD_VALIDATED` ➔ `SUBMITTED` ➔ `IN_PROCESSING` ➔ `ACCEPTED` (or `REJECTED` with error codes).

---

## 2. Architectural Principles & Rules
1. **Unified Scheduling Engine**: No component ever generates or reserves a slot without passing through `SchedulingService.calculateAvailability()` and `SchedulingService.createSlotHold()`.
2. **Deterministic Cross-Border Tax Calculation**: Tax calculation is handled purely by `TaxService.determineTaxRule({ sellerCountry, customerCountry, customerType, taxIdentity })`.
3. **Apple Design Tokens**:
   - Monochromatic elegance with high-contrast accents (Apple Blue `#0071e3`, Apple Dark Navy `#1d1d1f`, Frosted Gray `#f5f5f7`, Border `#e5e5ea`).
   - 16px font-size for mobile input fields.
   - Acrylic glassmorphism: `backdrop-filter: blur(20px); background: rgba(255,255,255,0.75)`.
   - Hidden scrollbars with smooth scroll containers.
4. **Offline / Prototype Ready**: Complete business functionality runs client-side via LocalStorage with instant JSON export/import and demo reset.
