// ==========================================================================
// AtelierOS - Master Seed Data Fixtures (France & Switzerland)
// ==========================================================================

import { Tenant, Customer, Vehicle, Mechanic, WorkshopBay, ServiceItem, Appointment, WorkOrder, Quote, Invoice, CommunicationLog } from '../types';

export const SEED_TENANTS: Tenant[] = [
  {
    id: 'tenant-fr-paris',
    name: 'Atelier Mécanique Étoile Paris',
    slug: 'etoile-paris',
    tagline: 'Service Premium & Diagnostic Avancé Multimarque',
    country: 'FR',
    currency: 'EUR',
    phone: '+33 1 42 68 55 00',
    email: 'contact@atelier-etoile-paris.fr',
    address: {
      street: '142 Avenue des Champs-Élysées',
      city: 'Paris',
      postalCode: '75008',
      countryCode: 'FR',
      regionOrCanton: 'Île-de-France'
    },
    taxIdentity: {
      siret: '84920391200014',
      siren: '849203912',
      vatNumber: 'FR84849203912',
      chorusProId: 'CHORUS-FR-75008-01',
      iban: 'FR76 3000 6000 0112 3456 7890 189',
      bic: 'BNPAFRPPXXX'
    },
    settings: {
      openingTime: '08:00',
      closingTime: '18:30',
      lunchStart: '12:00',
      lunchEnd: '13:30',
      workDays: [1, 2, 3, 4, 5, 6],
      defaultLaborRate: 88.00,
      standardVatRate: 20.0,
      slotDurationMin: 30,
      slotHoldTimeoutMin: 10,
      autoConfirmEligible: true
    },
    subscriptionTier: 'ai',
    active: true
  },
  {
    id: 'tenant-ch-geneva',
    name: 'Garage des Alpes & Léman',
    slug: 'des-alpes-geneve',
    tagline: 'Excellence Mécanique Suisse & Entretien Véhicules Électriques',
    country: 'CH',
    currency: 'CHF',
    phone: '+41 22 731 45 90',
    email: 'service@garage-alpes-leman.ch',
    address: {
      street: '45 Rue de Lausanne',
      city: 'Genève',
      postalCode: '1201',
      countryCode: 'CH',
      regionOrCanton: 'Genève (GE)'
    },
    taxIdentity: {
      uid: 'CHE-114.829.401',
      vatNumber: 'CHE-114.829.401 TVA',
      iban: 'CH93 0076 2011 6238 5295 7',
      bic: 'UBSWCHZH12A'
    },
    settings: {
      openingTime: '07:30',
      closingTime: '18:00',
      lunchStart: '12:00',
      lunchEnd: '13:15',
      workDays: [1, 2, 3, 4, 5],
      defaultLaborRate: 145.00,
      standardVatRate: 8.1,
      slotDurationMin: 30,
      slotHoldTimeoutMin: 10,
      autoConfirmEligible: true
    },
    subscriptionTier: 'pro',
    active: true
  }
];

export const SEED_CUSTOMERS: Customer[] = [
  {
    id: 'cust-fr-01',
    tenantId: 'tenant-fr-paris',
    type: 'INDIVIDUAL',
    firstName: 'Laurent',
    lastName: 'Dubois',
    email: 'laurent.dubois@gmail.com',
    phone: '+33 6 12 34 56 78',
    country: 'FR',
    address: {
      street: '18 Rue de la Paix',
      city: 'Paris',
      postalCode: '75002',
      country: 'France'
    },
    preferredLanguage: 'fr',
    gdprConsent: {
      consentedAt: '2026-01-15T09:00:00Z',
      marketingConsent: true,
      smsConsent: true,
      whatsappConsent: true
    },
    createdAt: '2026-01-15T09:00:00Z'
  },
  {
    id: 'cust-fr-02',
    tenantId: 'tenant-fr-paris',
    type: 'BUSINESS',
    firstName: 'Sophie',
    lastName: 'Vidal',
    companyName: 'Transports & Logistique Île-de-France SAS',
    email: 'gestion-flotte@transports-idf.fr',
    phone: '+33 1 45 88 90 12',
    country: 'FR',
    taxIdentity: {
      siret: '51289034200028',
      vatNumber: 'FR34512890342'
    },
    address: {
      street: '88 Boulevard Haussmann',
      city: 'Paris',
      postalCode: '75009',
      country: 'France'
    },
    preferredLanguage: 'fr',
    gdprConsent: {
      consentedAt: '2026-02-01T11:00:00Z',
      marketingConsent: true,
      smsConsent: true,
      whatsappConsent: false
    },
    createdAt: '2026-02-01T11:00:00Z'
  },
  {
    id: 'cust-ch-01',
    tenantId: 'tenant-ch-geneva',
    type: 'INDIVIDUAL',
    firstName: 'Marc',
    lastName: 'Favre',
    email: 'marc.favre@bluewin.ch',
    phone: '+41 79 432 10 98',
    country: 'CH',
    address: {
      street: '12 Chemin des Tulipes',
      city: 'Genève',
      postalCode: '1208',
      country: 'Switzerland'
    },
    preferredLanguage: 'fr-CH',
    gdprConsent: {
      consentedAt: '2026-02-10T14:30:00Z',
      marketingConsent: true,
      smsConsent: true,
      whatsappConsent: true
    },
    createdAt: '2026-02-10T14:30:00Z'
  },
  {
    id: 'cust-ch-02',
    tenantId: 'tenant-ch-geneva',
    type: 'BUSINESS',
    firstName: 'Elena',
    lastName: 'Rossi',
    companyName: 'Helvetia Tech Consult SA',
    email: 'admin@helvetiatech.ch',
    phone: '+41 22 908 77 44',
    country: 'CH',
    taxIdentity: {
      uid: 'CHE-203.491.882',
      vatNumber: 'CHE-203.491.882 TVA'
    },
    address: {
      street: '5 Route de Chêne',
      city: 'Genève',
      postalCode: '1207',
      country: 'Switzerland'
    },
    preferredLanguage: 'en',
    gdprConsent: {
      consentedAt: '2026-03-01T08:15:00Z',
      marketingConsent: true,
      smsConsent: true,
      whatsappConsent: true
    },
    createdAt: '2026-03-01T08:15:00Z'
  }
];

export const SEED_VEHICLES: Vehicle[] = [
  {
    id: 'veh-01',
    tenantId: 'tenant-fr-paris',
    customerId: 'cust-fr-01',
    licensePlate: 'EK-892-TZ',
    vin: 'VF3MCYHZRKS198421',
    make: 'Peugeot',
    model: '3008 GT 2.0 BlueHDi',
    year: 2021,
    fuelType: 'DIESEL',
    transmission: 'AUTOMATIC',
    mileage: 64200,
    lastServiceDate: '2025-10-12',
    notes: 'Front brake pads near wear limit'
  },
  {
    id: 'veh-02',
    tenantId: 'tenant-fr-paris',
    customerId: 'cust-fr-02',
    licensePlate: 'GF-314-MK',
    vin: 'VF1RJA00567123901',
    make: 'Renault',
    model: 'Master III 2.3 dCi 150',
    year: 2022,
    fuelType: 'DIESEL',
    transmission: 'MANUAL',
    mileage: 112000,
    lastServiceDate: '2025-12-05',
    notes: 'Fleet delivery van - check suspension'
  },
  {
    id: 'veh-03',
    tenantId: 'tenant-ch-geneva',
    customerId: 'cust-ch-01',
    licensePlate: 'GE 582 194',
    vin: 'XP7YGCEL6NB092834',
    make: 'Tesla',
    model: 'Model Y Long Range Dual Motor',
    year: 2023,
    fuelType: 'ELECTRIC',
    transmission: 'AUTOMATIC',
    mileage: 38400,
    lastServiceDate: '2025-08-20',
    notes: 'Laser alignment & cabin filter required'
  },
  {
    id: 'veh-04',
    tenantId: 'tenant-ch-geneva',
    customerId: 'cust-ch-02',
    licensePlate: 'GE 921 405',
    vin: 'WBA5P71060FD81273',
    make: 'BMW',
    model: '330e xDrive Touring (Hybrid)',
    year: 2022,
    fuelType: 'HYBRID',
    transmission: 'AUTOMATIC',
    mileage: 51200,
    lastServiceDate: '2025-11-18',
    notes: 'Check engine light intermittent code P0420'
  }
];

export const SEED_MECHANICS: Mechanic[] = [
  {
    id: 'mech-fr-01',
    tenantId: 'tenant-fr-paris',
    name: 'Antoine Lefèvre',
    email: 'antoine.l@atelier-etoile.fr',
    phone: '+33 6 45 10 20 30',
    skills: ['BRAKES', 'ENGINE', 'DIAGNOSTICS', 'SUSPENSION', 'GENERAL_SERVICE'],
    hourlyCost: 45.00,
    workingHours: { start: '08:00', end: '17:00' },
    leaves: [],
    active: true
  },
  {
    id: 'mech-fr-02',
    tenantId: 'tenant-fr-paris',
    name: 'Karim Benali',
    email: 'karim.b@atelier-etoile.fr',
    phone: '+33 6 45 10 20 31',
    skills: ['EV_HYBRID', 'DIAGNOSTICS', 'AIR_CONDITIONING', 'GENERAL_SERVICE'],
    hourlyCost: 48.00,
    workingHours: { start: '09:00', end: '18:00' },
    leaves: [],
    active: true
  },
  {
    id: 'mech-ch-01',
    tenantId: 'tenant-ch-geneva',
    name: 'Stefan Meyer',
    email: 's.meyer@garage-alpes.ch',
    phone: '+41 79 112 34 56',
    skills: ['EV_HYBRID', 'DIAGNOSTICS', 'BRAKES', 'SUSPENSION'],
    hourlyCost: 75.00,
    workingHours: { start: '07:30', end: '17:00' },
    leaves: [],
    active: true
  },
  {
    id: 'mech-ch-02',
    tenantId: 'tenant-ch-geneva',
    name: 'Julien Mercier',
    email: 'j.mercier@garage-alpes.ch',
    phone: '+41 79 112 34 57',
    skills: ['ENGINE', 'TRANSMISSION', 'BRAKES', 'GENERAL_SERVICE'],
    hourlyCost: 70.00,
    workingHours: { start: '08:00', end: '17:30' },
    leaves: [],
    active: true
  }
];

export const SEED_BAYS: WorkshopBay[] = [
  {
    id: 'bay-fr-01',
    tenantId: 'tenant-fr-paris',
    name: 'Pont 1 (Élévateur 2 Colonnes 4.0T)',
    type: 'TWO_POST_LIFT',
    maxWeightCapacityKg: 4000,
    isEvEquipped: false,
    active: true
  },
  {
    id: 'bay-fr-02',
    tenantId: 'tenant-fr-paris',
    name: 'Pont 2 (Géométrie Laser 4 Colonnes)',
    type: 'FOUR_POST_ALIGNMENT',
    maxWeightCapacityKg: 5000,
    isEvEquipped: false,
    active: true
  },
  {
    id: 'bay-fr-03',
    tenantId: 'tenant-fr-paris',
    name: 'Baie 3 (Station Diagnostic & Hybride/VE)',
    type: 'EV_CERTIFIED_BAY',
    maxWeightCapacityKg: 3500,
    isEvEquipped: true,
    active: true
  },
  {
    id: 'bay-ch-01',
    tenantId: 'tenant-ch-geneva',
    name: 'Poste 1 (Pont Haut Voltage EV/Tesla)',
    type: 'EV_CERTIFIED_BAY',
    maxWeightCapacityKg: 4200,
    isEvEquipped: true,
    active: true
  },
  {
    id: 'bay-ch-02',
    tenantId: 'tenant-ch-geneva',
    name: 'Poste 2 (Pont 2 Colonnes Hydraulique)',
    type: 'TWO_POST_LIFT',
    maxWeightCapacityKg: 4000,
    isEvEquipped: false,
    active: true
  }
];

export const SEED_SERVICES: ServiceItem[] = [
  {
    id: 'srv-01',
    tenantId: 'tenant-fr-paris',
    name: 'Brake Pad & Rotor Inspection / Replacement',
    nameFr: 'Contrôle & Remplacement Plaquettes / Disques de Frein',
    category: 'BRAKES',
    description: 'Complete inspection of disc thickness, caliper operation, fluid moisture, and pad wear.',
    descriptionFr: 'Contrôle d’épaisseur disques, étriers, liquide et remplacement plaquettes.',
    estimatedDurationMin: 60,
    requiredSkills: ['BRAKES'],
    requiredBayType: 'TWO_POST_LIFT',
    baseLaborPrice: 88.00,
    onlineBookable: true,
    approvalMode: 'AUTO',
    bufferBeforeMin: 10,
    bufferAfterMin: 10,
    intakeQuestions: [
      {
        id: 'q1',
        question: 'Do you hear squeaking or grinding when braking?',
        questionFr: 'Entendez-vous un sifflement ou frottement au freinage ?',
        type: 'BOOLEAN',
        required: true
      },
      {
        id: 'q2',
        question: 'Does the brake pedal or steering wheel vibrate?',
        questionFr: 'Ressentez-vous des vibrations dans la pédale ou le volant ?',
        type: 'BOOLEAN',
        required: false
      }
    ],
    active: true
  },
  {
    id: 'srv-02',
    tenantId: 'tenant-fr-paris',
    name: 'Full Synthetic Oil Service & 35-Point Safety Check',
    nameFr: 'Vidange Huile Synthétique & Révision 35 Points',
    category: 'MAINTENANCE',
    description: 'Engine oil flush, OEM filter replacement, fluid top-ups, and 35-point safety inspection.',
    descriptionFr: 'Vidange huile moteur homologuée constructeur, filtre à huile et 35 points de contrôle.',
    estimatedDurationMin: 60,
    requiredSkills: ['GENERAL_SERVICE'],
    requiredBayType: 'TWO_POST_LIFT',
    baseLaborPrice: 88.00,
    onlineBookable: true,
    approvalMode: 'AUTO',
    bufferBeforeMin: 5,
    bufferAfterMin: 10,
    intakeQuestions: [
      {
        id: 'q3',
        question: 'Current odometer mileage reading:',
        questionFr: 'Kilométrage actuel au compteur :',
        type: 'TEXT',
        required: true
      }
    ],
    active: true
  },
  {
    id: 'srv-03',
    tenantId: 'tenant-fr-paris',
    name: 'Advanced Electronic OBD-II Diagnostic & Live Data',
    nameFr: 'Diagnostic Électronique OBD-II & Analyse calculateurs',
    category: 'DIAGNOSTIC',
    description: 'Deep scan of ECU, ABS, Airbag, and powertrain error codes with live sensor logging.',
    descriptionFr: 'Lecture complète calculateurs moteur, ABS, injection et analyse des codes défauts.',
    estimatedDurationMin: 60,
    requiredSkills: ['DIAGNOSTICS'],
    requiredBayType: 'DIAGNOSTIC_STATION',
    baseLaborPrice: 95.00,
    onlineBookable: true,
    approvalMode: 'AUTO',
    bufferBeforeMin: 0,
    bufferAfterMin: 15,
    intakeQuestions: [
      {
        id: 'q4',
        question: 'Is the check engine light flashing or steady?',
        questionFr: 'Le voyant moteur est-il fixe ou clignotant ?',
        type: 'SELECT',
        options: ['Steady / Fixe', 'Flashing / Clignotant', 'Intermittent', 'No light / Pas de voyant'],
        required: true
      }
    ],
    active: true
  },
  {
    id: 'srv-04',
    tenantId: 'tenant-ch-geneva',
    name: 'Tesla / EV Battery & High-Voltage System Health Check',
    nameFr: 'Contrôle Santé Batterie Haute Tension & Système VE',
    category: 'EV',
    description: 'HV battery degradation test, thermal cooling loop check, isolation resistance & 12V test.',
    descriptionFr: 'Test de dégradation batterie HT, contrôle liquide de refroidissement thermique et isolation.',
    estimatedDurationMin: 90,
    requiredSkills: ['EV_HYBRID'],
    requiredBayType: 'EV_CERTIFIED_BAY',
    baseLaborPrice: 215.00,
    onlineBookable: true,
    approvalMode: 'AUTO',
    bufferBeforeMin: 10,
    bufferAfterMin: 15,
    intakeQuestions: [
      {
        id: 'q5',
        question: 'Vehicle current battery charge level (%):',
        questionFr: 'Niveau de charge actuel de la batterie (%) :',
        type: 'TEXT',
        required: true
      }
    ],
    active: true
  }
];

export const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: 'app-01',
    tenantId: 'tenant-fr-paris',
    customerId: 'cust-fr-01',
    vehicleId: 'veh-01',
    serviceId: 'srv-01',
    mechanicId: 'mech-fr-01',
    bayId: 'bay-fr-01',
    date: '2026-08-18',
    startTime: '09:00',
    endTime: '10:00',
    status: 'CONFIRMED',
    source: 'ONLINE_WEB',
    intakeNotes: 'Customer reported pedal squeak at low speeds',
    customerAnswers: { q1: true, q2: false },
    confirmationCode: 'BK-78921',
    createdAt: '2026-08-17T10:15:00Z'
  },
  {
    id: 'app-02',
    tenantId: 'tenant-fr-paris',
    customerId: 'cust-fr-02',
    vehicleId: 'veh-02',
    serviceId: 'srv-02',
    mechanicId: 'mech-fr-01',
    bayId: 'bay-fr-01',
    date: '2026-08-18',
    startTime: '10:30',
    endTime: '11:30',
    status: 'CONFIRMED',
    source: 'STAFF',
    intakeNotes: 'Scheduled fleet maintenance',
    customerAnswers: { q3: '112000' },
    confirmationCode: 'BK-78922',
    createdAt: '2026-08-17T11:00:00Z'
  },
  {
    id: 'app-03',
    tenantId: 'tenant-ch-geneva',
    customerId: 'cust-ch-01',
    vehicleId: 'veh-03',
    serviceId: 'srv-04',
    mechanicId: 'mech-ch-01',
    bayId: 'bay-ch-01',
    date: '2026-08-18',
    startTime: '09:30',
    endTime: '11:00',
    status: 'CONFIRMED',
    source: 'AI_ASSISTANT',
    intakeNotes: 'AI Assistant booked after symptom triage on range query',
    customerAnswers: { q5: '65%' },
    confirmationCode: 'BK-CH-4412',
    createdAt: '2026-08-17T15:20:00Z'
  }
];

export const SEED_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'wo-01',
    tenantId: 'tenant-fr-paris',
    orderNumber: 'OR-2026-0042',
    appointmentId: 'app-01',
    customerId: 'cust-fr-01',
    vehicleId: 'veh-01',
    mechanicId: 'mech-fr-01',
    bayId: 'bay-fr-01',
    stage: 'IN_PROGRESS',
    symptoms: ['Squeaking noise under brake application', 'Brake pad warning lamp lit on dash'],
    diagnosisNotes: 'Front brake pads worn to 2.2mm (limit 2.0mm). Discs measured 25.4mm (minimum allowable 24.0mm). Rotors are reusable; pad replacement and slider lubrication recommended.',
    obdCodes: [
      {
        code: 'C0035',
        description: 'Left Front Wheel Speed Sensor Circuit',
        severity: 'WARNING',
        suggestedCheck: 'Inspect sensor wiring harness for debris and connector corrosion.',
        verifiedByTech: true
      }
    ],
    photos: ['https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80'],
    checklist: [
      { id: 'c1', title: 'Brake fluid level & boiling point test', status: 'PASS' },
      { id: 'c2', title: 'Front brake pads thickness check', status: 'FAIL', notes: 'Worn to 2.2mm' },
      { id: 'c3', title: 'Front brake rotors runout & thickness', status: 'PASS', notes: '25.4mm' },
      { id: 'c4', title: 'Tire tread depth & pressure', status: 'PASS', notes: '5.5mm even wear' },
      { id: 'c5', title: 'Suspension ball joints & bushings', status: 'PASS' }
    ],
    partsUsed: [
      { partId: 'p-brk-01', name: 'Brembo Front Brake Pad Set (P68060)', quantity: 1, unitPrice: 78.50, total: 78.50 },
      { partId: 'p-cln-01', name: 'Brake Cleaner Aerosol 500ml', quantity: 1, unitPrice: 9.80, total: 9.80 }
    ],
    laborTimeRecordedMin: 50,
    quoteId: 'quote-01',
    createdAt: '2026-08-17T10:30:00Z',
    updatedAt: '2026-08-18T09:15:00Z'
  },
  {
    id: 'wo-02',
    tenantId: 'tenant-fr-paris',
    orderNumber: 'OR-2026-0043',
    customerId: 'cust-fr-02',
    vehicleId: 'veh-02',
    mechanicId: 'mech-fr-01',
    bayId: 'bay-fr-01',
    stage: 'READY',
    symptoms: ['Scheduled 110,000 km fleet service'],
    diagnosisNotes: 'Full synthetic oil changed, oil filter and cabin filter replaced. Multipoint safety check clear.',
    obdCodes: [],
    photos: [],
    checklist: [
      { id: 'c1', title: 'Engine Oil Drain & Fill', status: 'PASS' },
      { id: 'c2', title: 'Oil Filter Replacement', status: 'PASS' },
      { id: 'c3', title: 'Underbody & Exhaust Inspection', status: 'PASS' }
    ],
    partsUsed: [
      { partId: 'p-oil-01', name: 'Total Quartz Ineo 5W-30 (7 Liters)', quantity: 1, unitPrice: 84.00, total: 84.00 },
      { partId: 'p-flt-01', name: 'Purflux Oil Filter Element', quantity: 1, unitPrice: 16.50, total: 16.50 }
    ],
    laborTimeRecordedMin: 60,
    quoteId: 'quote-02',
    invoiceId: 'inv-02',
    createdAt: '2026-08-17T11:00:00Z',
    updatedAt: '2026-08-18T08:45:00Z'
  },
  {
    id: 'wo-03',
    tenantId: 'tenant-ch-geneva',
    orderNumber: 'OR-CH-2026-0019',
    appointmentId: 'app-03',
    customerId: 'cust-ch-01',
    vehicleId: 'veh-03',
    mechanicId: 'mech-ch-01',
    bayId: 'bay-ch-01',
    stage: 'AWAITING_APPROVAL',
    symptoms: ['Cabin air smell & slight steering pull at highway speeds'],
    diagnosisNotes: 'Laser alignment required to correct +0.22° front toe miscalibration. High-voltage battery SOH at 97.4% (Excellent). HEPA cabin filter requires replacement.',
    obdCodes: [],
    photos: [],
    checklist: [
      { id: 'c1', title: 'HV Battery State of Health Diagnostics', status: 'PASS', notes: 'SOH: 97.4%' },
      { id: 'c2', title: 'Laser Alignment Geometry Scan', status: 'FAIL', notes: 'Front toe +0.22°' },
      { id: 'c3', title: 'HEPA Dual Cabin Filter Test', status: 'FAIL', notes: 'Heavy pollen clogging' }
    ],
    partsUsed: [
      { partId: 'p-ch-01', name: 'OEM Tesla Model Y Dual HEPA Cabin Filter Set', quantity: 1, unitPrice: 65.00, total: 65.00 }
    ],
    laborTimeRecordedMin: 75,
    quoteId: 'quote-03',
    createdAt: '2026-08-17T15:30:00Z',
    updatedAt: '2026-08-18T09:40:00Z'
  }
];

export const SEED_QUOTES: Quote[] = [
  {
    id: 'quote-01',
    tenantId: 'tenant-fr-paris',
    quoteNumber: 'DEV-FR-2026-0042',
    workOrderId: 'wo-01',
    customerId: 'cust-fr-01',
    vehicleId: 'veh-01',
    currency: 'EUR',
    lines: [
      {
        id: 'ql-1',
        type: 'LABOR',
        description: 'Main d\'œuvre : Remplacement plaquettes de frein avant & nettoyage étriers',
        quantity: 1.0,
        unitPrice: 88.00,
        costPrice: 45.00,
        vatRate: 20.0,
        totalExclVat: 88.00,
        totalInclVat: 105.60
      },
      {
        id: 'ql-2',
        type: 'PART',
        description: 'Jeu de plaquettes de frein avant Brembo Premium (P68060)',
        quantity: 1,
        unitPrice: 78.50,
        costPrice: 48.00,
        vatRate: 20.0,
        totalExclVat: 78.50,
        totalInclVat: 94.20
      },
      {
        id: 'ql-3',
        type: 'CONSUMABLE',
        description: 'Nettoyant freins haute pression & graisse céramique haute température',
        quantity: 1,
        unitPrice: 9.80,
        costPrice: 4.50,
        vatRate: 20.0,
        totalExclVat: 9.80,
        totalInclVat: 11.76
      }
    ],
    subtotalExclVat: 176.30,
    vatBreakdown: [
      { rate: 20.0, vatAmount: 35.26, taxableBase: 176.30 }
    ],
    totalVat: 35.26,
    totalAmount: 211.56,
    status: 'APPROVED',
    magicToken: 'tok-magic-quote-01-paris',
    approvalSignature: 'Laurent Dubois',
    validUntil: '2026-09-17',
    createdAt: '2026-08-17T11:00:00Z',
    approvedAt: '2026-08-17T11:12:00Z'
  },
  {
    id: 'quote-03',
    tenantId: 'tenant-ch-geneva',
    quoteNumber: 'DEV-CH-2026-0019',
    workOrderId: 'wo-03',
    customerId: 'cust-ch-01',
    vehicleId: 'veh-03',
    currency: 'CHF',
    lines: [
      {
        id: 'ql-ch-1',
        type: 'LABOR',
        description: 'Main d\'œuvre : Géométrie & Réglage Laser 4 Roues (Précision EV)',
        quantity: 1.0,
        unitPrice: 165.00,
        costPrice: 75.00,
        vatRate: 8.1,
        totalExclVat: 165.00,
        totalInclVat: 178.37
      },
      {
        id: 'ql-ch-2',
        type: 'PART',
        description: 'Filtre d\'habitacle HEPA Haute Efficacité Tesla OEM',
        quantity: 1,
        unitPrice: 65.00,
        costPrice: 38.00,
        vatRate: 8.1,
        totalExclVat: 65.00,
        totalInclVat: 70.27
      }
    ],
    subtotalExclVat: 230.00,
    vatBreakdown: [
      { rate: 8.1, vatAmount: 18.63, taxableBase: 230.00 }
    ],
    totalVat: 18.63,
    totalAmount: 248.63,
    status: 'SENT_AWAITING_APPROVAL',
    magicToken: 'tok-magic-quote-03-geneva',
    validUntil: '2026-09-17',
    createdAt: '2026-08-17T16:00:00Z'
  }
];

export const SEED_INVOICES: Invoice[] = [
  {
    id: 'inv-02',
    tenantId: 'tenant-fr-paris',
    invoiceNumber: 'FAC-FR-2026-0038',
    quoteId: 'quote-02',
    workOrderId: 'wo-02',
    customerId: 'cust-fr-02',
    vehicleId: 'veh-02',
    currency: 'EUR',
    issueDate: '2026-08-18',
    dueDate: '2026-09-18',
    lines: [
      {
        id: 'inv-l-1',
        type: 'LABOR',
        description: 'Forfait Révision Constructeur & Vidange Moteur',
        quantity: 1.0,
        unitPrice: 88.00,
        vatRate: 20.0,
        totalExclVat: 88.00,
        totalInclVat: 105.60
      },
      {
        id: 'inv-l-2',
        type: 'PART',
        description: 'Huile Moteur Synthèse Total Quartz 5W-30 (7L)',
        quantity: 1,
        unitPrice: 84.00,
        vatRate: 20.0,
        totalExclVat: 84.00,
        totalInclVat: 100.80
      },
      {
        id: 'inv-l-3',
        type: 'PART',
        description: 'Filtre à Huile Purflux',
        quantity: 1,
        unitPrice: 16.50,
        vatRate: 20.0,
        totalExclVat: 16.50,
        totalInclVat: 19.80
      }
    ],
    subtotalExclVat: 188.50,
    vatBreakdown: [
      { rate: 20.0, vatAmount: 37.70, taxableBase: 188.50 }
    ],
    totalVat: 37.70,
    totalAmount: 226.20,
    taxTreatment: 'TVA France standard 20.0% (Art. 256 du CGI)',
    paid: true,
    paidAt: '2026-08-18T09:00:00Z',
    eInvoiceStatus: 'ACCEPTED',
    eInvoicePlatform: 'CHORUS_PRO',
    eInvoiceSubmissionId: 'CP-2026-894102-FR',
    eInvoiceSubmittedAt: '2026-08-18T09:05:00Z',
    createdAt: '2026-08-18T08:50:00Z'
  }
];

export const SEED_COMMUNICATIONS: CommunicationLog[] = [
  {
    id: 'comm-01',
    tenantId: 'tenant-fr-paris',
    customerId: 'cust-fr-01',
    recipient: '+33 6 12 34 56 78',
    channel: 'SMS',
    templateType: 'BOOKING_CONFIRMATION',
    messageBody: 'Atelier Étoile : Votre RDV du 18/08 à 09:00 est confirmé (Réf: BK-78921). Peugeot 3008 GT.',
    status: 'DELIVERED',
    sentAt: '2026-08-17T10:16:00Z'
  },
  {
    id: 'comm-02',
    tenantId: 'tenant-fr-paris',
    customerId: 'cust-fr-01',
    recipient: 'laurent.dubois@gmail.com',
    channel: 'EMAIL',
    templateType: 'QUOTE_APPROVAL_LINK',
    subject: 'Devis pour votre Peugeot 3008 - Atelier Étoile',
    messageBody: 'Bonjour M. Dubois, votre devis de 211.56 € TTC est prêt. Vous pouvez le consulter et le valider ici : https://atelier-os.mars.app/quote/tok-magic-quote-01-paris',
    status: 'READ',
    sentAt: '2026-08-17T11:02:00Z'
  }
];
