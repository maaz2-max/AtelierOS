// ==========================================================================
// AtelierOS - Master TypeScript Domain Types
// ==========================================================================

export type CountryCode = 'FR' | 'CH';
export type CurrencyCode = 'EUR' | 'CHF';
export type SupportedLanguage = 'en' | 'fr' | 'fr-CH' | 'de-CH';

export type UserRole = 'GARAGE_ADMIN' | 'MECHANIC' | 'CUSTOMER' | 'SUPER_ADMIN';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  tenantId?: string;
  mechanicId?: string;
  customerId?: string;
  avatarUrl?: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  country: CountryCode;
  currency: CurrencyCode;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    countryCode: CountryCode;
    regionOrCanton?: string;
  };
  taxIdentity: {
    siret?: string;        // France: 14-digit SIRET
    siren?: string;        // France: 9-digit SIREN
    vatNumber?: string;    // FR: FRxx... or CH: CHE-...
    uid?: string;          // Switzerland: CHE-xxx.xxx.xxx
    chorusProId?: string;  // France E-invoicing Service Code
    iban?: string;
    bic?: string;
  };
  settings: {
    openingTime: string;      // e.g. "08:00"
    closingTime: string;      // e.g. "18:30"
    lunchStart: string;       // e.g. "12:00"
    lunchEnd: string;         // e.g. "13:30"
    workDays: number[];       // 1 = Monday, 6 = Saturday
    defaultLaborRate: number; // EUR or CHF per hour
    standardVatRate: number;  // 20.0 (FR) or 8.1 (CH)
    slotDurationMin: number;  // 30
    slotHoldTimeoutMin: number; // 10 minutes
    autoConfirmEligible: boolean;
  };
  subscriptionTier: 'starter' | 'pro' | 'ai';
  active: boolean;
}

export type CustomerType = 'INDIVIDUAL' | 'BUSINESS';

export interface Customer {
  id: string;
  tenantId: string;
  type: CustomerType;
  firstName: string;
  lastName: string;
  companyName?: string;
  email: string;
  phone: string;
  country: CountryCode;
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
  preferredLanguage: SupportedLanguage;
  gdprConsent: {
    consentedAt: string;
    marketingConsent: boolean;
    smsConsent: boolean;
    whatsappConsent: boolean;
  };
  createdAt: string;
}

export type FuelType = 'PETROL' | 'DIESEL' | 'ELECTRIC' | 'HYBRID' | 'LPG';
export type TransmissionType = 'MANUAL' | 'AUTOMATIC';

export interface Vehicle {
  id: string;
  tenantId: string;
  customerId: string;
  licensePlate: string; // e.g. "AB-123-CD" or "GE 452 891"
  vin: string;
  make: string;
  model: string;
  year: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  mileage: number;
  lastServiceDate?: string;
  notes?: string;
}

export type MechanicSkill = 
  | 'BRAKES' 
  | 'ENGINE' 
  | 'DIAGNOSTICS' 
  | 'EV_HYBRID' 
  | 'SUSPENSION' 
  | 'TRANSMISSION' 
  | 'TIRES' 
  | 'AIR_CONDITIONING' 
  | 'GENERAL_SERVICE';

export interface Mechanic {
  id: string;
  tenantId: string;
  name: string;
  avatarUrl?: string;
  email: string;
  phone: string;
  skills: MechanicSkill[];
  hourlyCost: number;
  workingHours: {
    start: string; // "08:00"
    end: string;   // "17:30"
  };
  leaves: Array<{
    id: string;
    startDate: string;
    endDate: string;
    reason: string;
  }>;
  active: boolean;
}

export type ResourceBayType = 
  | 'TWO_POST_LIFT' 
  | 'FOUR_POST_ALIGNMENT' 
  | 'DIAGNOSTIC_STATION' 
  | 'EV_CERTIFIED_BAY' 
  | 'QUICK_SERVICE_BAY';

export interface WorkshopBay {
  id: string;
  tenantId: string;
  name: string;
  type: ResourceBayType;
  maxWeightCapacityKg: number;
  isEvEquipped: boolean;
  active: boolean;
}

export type BookingApprovalMode = 'AUTO' | 'MANUAL' | 'DIAGNOSTIC_FIRST' | 'DISABLED';

export interface IntakeQuestion {
  id: string;
  question: string;
  questionFr?: string;
  type: 'TEXT' | 'SELECT' | 'BOOLEAN';
  options?: string[];
  required: boolean;
}

export interface ServiceItem {
  id: string;
  tenantId: string;
  name: string;
  nameFr: string;
  category: 'MAINTENANCE' | 'BRAKES' | 'DIAGNOSTIC' | 'TIRES' | 'ENGINE' | 'EV' | 'SUSPENSION';
  description: string;
  descriptionFr: string;
  estimatedDurationMin: number;
  requiredSkills: MechanicSkill[];
  requiredBayType: ResourceBayType;
  baseLaborPrice: number;
  onlineBookable: boolean;
  approvalMode: BookingApprovalMode;
  bufferBeforeMin: number;
  bufferAfterMin: number;
  intakeQuestions: IntakeQuestion[];
  active: boolean;
}

export interface SlotHold {
  id: string;
  tenantId: string;
  serviceId: string;
  mechanicId: string;
  bayId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  expiresAt: number; // Epoch timestamp ms (e.g. now + 10 mins)
  token: string;
}

export type AppointmentStatus = 'PENDING_APPROVAL' | 'CONFIRMED' | 'CHECKED_IN' | 'COMPLETED' | 'CANCELLED';
export type AppointmentSource = 'STAFF' | 'ONLINE_WEB' | 'AI_ASSISTANT';

export interface Appointment {
  id: string;
  tenantId: string;
  customerId: string;
  vehicleId: string;
  serviceId: string;
  mechanicId: string;
  bayId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string;   // HH:mm
  status: AppointmentStatus;
  source: AppointmentSource;
  intakeNotes?: string;
  customerAnswers?: Record<string, any>;
  confirmationCode: string;
  createdAt: string;
}

export type WorkOrderStage = 
  | 'REQUEST' 
  | 'APPOINTMENT' 
  | 'DIAGNOSIS' 
  | 'QUOTE' 
  | 'AWAITING_APPROVAL' 
  | 'APPROVED' 
  | 'IN_PROGRESS' 
  | 'QUALITY_CHECK' 
  | 'READY' 
  | 'DELIVERED' 
  | 'INVOICED';

export interface OBDErrorRecord {
  code: string; // e.g. "P0300"
  description: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  suggestedCheck: string;
  verifiedByTech: boolean;
}

export interface QualityCheckItem {
  id: string;
  title: string;
  status: 'PASS' | 'FAIL' | 'NOT_APPLICABLE';
  notes?: string;
}

export interface WorkOrder {
  id: string;
  tenantId: string;
  orderNumber: string; // e.g. "WO-2026-0042"
  appointmentId?: string;
  customerId: string;
  vehicleId: string;
  mechanicId: string;
  bayId: string;
  stage: WorkOrderStage;
  symptoms: string[];
  diagnosisNotes: string;
  obdCodes: OBDErrorRecord[];
  photos: string[];
  checklist: QualityCheckItem[];
  partsUsed: Array<{
    partId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  laborTimeRecordedMin: number;
  quoteId?: string;
  invoiceId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteLine {
  id: string;
  type: 'LABOR' | 'PART' | 'CONSUMABLE' | 'DISCOUNT';
  description: string;
  quantity: number;
  unitPrice: number;
  costPrice?: number; // Internal margin tracking
  vatRate: number; // e.g. 20.0 or 8.1
  totalExclVat: number;
  totalInclVat: number;
}

export type QuoteStatus = 'DRAFT' | 'SENT_AWAITING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

export interface Quote {
  id: string;
  tenantId: string;
  quoteNumber: string; // e.g. "DEV-2026-0089"
  workOrderId: string;
  customerId: string;
  vehicleId: string;
  currency: CurrencyCode;
  lines: QuoteLine[];
  subtotalExclVat: number;
  vatBreakdown: Array<{ rate: number; vatAmount: number; taxableBase: number }>;
  totalVat: number;
  totalAmount: number;
  status: QuoteStatus;
  magicToken: string;
  approvalSignature?: string;
  approvalRejectionReason?: string;
  validUntil: string;
  createdAt: string;
  approvedAt?: string;
}

export type EInvoiceStatus = 'NOT_SUBMITTED' | 'VALIDATED' | 'SUBMITTED' | 'IN_PROCESSING' | 'ACCEPTED' | 'REJECTED';

export interface Invoice {
  id: string;
  tenantId: string;
  invoiceNumber: string; // e.g. "FAC-FR-2026-0077"
  quoteId?: string;
  workOrderId: string;
  customerId: string;
  vehicleId: string;
  currency: CurrencyCode;
  issueDate: string;
  dueDate: string;
  lines: QuoteLine[];
  subtotalExclVat: number;
  vatBreakdown: Array<{ rate: number; vatAmount: number; taxableBase: number }>;
  totalVat: number;
  totalAmount: number;
  taxTreatment: string; // "FR Domestic 20%", "CH Standard 8.1%", "Intra-EU Reverse Charge"
  paid: boolean;
  paidAt?: string;
  eInvoiceStatus: EInvoiceStatus;
  eInvoicePlatform?: 'CHORUS_PRO' | 'PPF' | 'PDP_GENERIC';
  eInvoiceSubmissionId?: string;
  eInvoiceSubmittedAt?: string;
  qrBillReference?: string; // Swiss QR-Bill reference
  createdAt: string;
}

export type CommunicationChannel = 'SMS' | 'EMAIL' | 'WHATSAPP';
export type MessageDeliveryStatus = 'QUEUED' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';

export interface CommunicationLog {
  id: string;
  tenantId: string;
  customerId: string;
  recipient: string;
  channel: CommunicationChannel;
  templateType: 'BOOKING_CONFIRMATION' | 'REMINDER_24H' | 'QUOTE_APPROVAL_LINK' | 'VEHICLE_READY' | 'INVOICE_ISSUED' | 'REVIEW_REQUEST';
  subject?: string;
  messageBody: string;
  status: MessageDeliveryStatus;
  sentAt: string;
}
