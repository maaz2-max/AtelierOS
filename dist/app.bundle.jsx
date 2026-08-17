var React = window.React;

var ReactDOM = window.ReactDOM;

var useState = React.useState;

var useEffect = React.useEffect;

var useRef = React.useRef;

var useMemo = React.useMemo;

var useCallback = React.useCallback;


const _Icons = (function() {
  const mk = (svg) => ({ size=18, color='currentColor', style={}, className='' }) =>
    React.createElement('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', style: { display:'inline-block', verticalAlign:'middle', flexShrink:0, ...style }, className, dangerouslySetInnerHTML: { __html: svg } });
  return {
    Wrench: mk('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
    Calendar: mk('<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>'),
    ClipboardList: mk('<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>'),
    Tablet: mk('<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>'),
    Users: mk('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    Car: mk('<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>'),
    FileCheck2: mk('<path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/>'),
    Receipt: mk('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/>'),
    Globe2: mk('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>'),
    Sparkles: mk('<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>'),
    ShieldCheck: mk('<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>'),
    RotateCcw: mk('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
    ChevronDown: mk('<path d="m6 9 6 6 6-6"/>'),
    ChevronLeft: mk('<path d="m15 18-6-6 6-6"/>'),
    ChevronRight: mk('<path d="m9 18 6-6-6-6"/>'),
    MessageSquare: mk('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    Building2: mk('<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>'),
    ExternalLink: mk('<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>'),
    Plus: mk('<path d="M5 12h14"/><path d="M12 5v14"/>'),
    Trash2: mk('<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>'),
    Edit3: mk('<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>'),
    Search: mk('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
    Send: mk('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
    Copy: mk('<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
    Check: mk('<path d="M20 6 9 17l-5-5"/>'),
    CheckCircle2: mk('<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>'),
    XCircle: mk('<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>'),
    AlertTriangle: mk('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>'),
    Clock: mk('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'),
    ArrowRight: mk('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
    ArrowLeft: mk('<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>'),
    Timer: mk('<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>'),
    PenTool: mk('<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>'),
    Cpu: mk('<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>'),
    DollarSign: mk('<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
    Server: mk('<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>'),
    QrCode: mk('<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>'),
    Smartphone: mk('<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>'),
    Mail: mk('<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>'),
    Phone: mk('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'),
    User: mk('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
    UserPlus: mk('<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>'),
    Calculator: mk('<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>'),
    Zap: mk('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
    Layers: mk('<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>'),
    X: mk('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'),
    FileText: mk('<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>'),
    Printer: mk('<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>'),
    Code: mk('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
    Activity: mk('<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>'),
    AlertCircle: mk('<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'),
    Info: mk('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  };
})();

// Shorthand icon destructuring for use in JSX
const { Wrench, Calendar, ClipboardList, Tablet, Users, Car, FileCheck2, Receipt, Globe2, Sparkles, ShieldCheck, RotateCcw, ChevronDown, ChevronLeft, ChevronRight, MessageSquare, Building2, ExternalLink, Plus, Trash2, Edit3, Search, Send, Copy, Check, CheckCircle2, XCircle, AlertTriangle, Clock, ArrowRight, ArrowLeft, Timer, PenTool, Cpu, DollarSign, Server, QrCode, Smartphone, Mail, Phone, User, UserPlus, Calculator, Zap, Layers, X, FileText, Printer, Code, Activity, AlertCircle, Info } = _Icons;


// ==========================================================================
// AtelierOS - Master Seed Data Fixtures (France & Switzerland)
// ==========================================================================



const SEED_TENANTS = [
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

const SEED_CUSTOMERS = [
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

const SEED_VEHICLES = [
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

const SEED_MECHANICS = [
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

const SEED_BAYS = [
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

const SEED_SERVICES = [
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

const SEED_APPOINTMENTS = [
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

const SEED_WORK_ORDERS = [
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

const SEED_QUOTES = [
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

const SEED_INVOICES = [
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

const SEED_COMMUNICATIONS = [
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


// ==========================================================================
// AtelierOS - LocalStorage Repository Service (Supabase-Ready)
// ==========================================================================




const STORAGE_KEYS = {
  TENANTS: 'atelieros_tenants',
  ACTIVE_TENANT_ID: 'atelieros_active_tenant_id',
  CUSTOMERS: 'atelieros_customers',
  VEHICLES: 'atelieros_vehicles',
  MECHANICS: 'atelieros_mechanics',
  BAYS: 'atelieros_bays',
  SERVICES: 'atelieros_services',
  APPOINTMENTS: 'atelieros_appointments',
  WORK_ORDERS: 'atelieros_work_orders',
  QUOTES: 'atelieros_quotes',
  INVOICES: 'atelieros_invoices',
  COMMUNICATIONS: 'atelieros_communications',
  SLOT_HOLDS: 'atelieros_slot_holds',
  LANGUAGE: 'atelieros_language'
};

class StorageService {
  static init() {
    if (!localStorage.getItem(STORAGE_KEYS.TENANTS)) {
      this.resetDemoData();
    }
  }

  static resetDemoData() {
    localStorage.setItem(STORAGE_KEYS.TENANTS, JSON.stringify(SEED_TENANTS));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TENANT_ID, SEED_TENANTS[0].id);
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(SEED_CUSTOMERS));
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(SEED_VEHICLES));
    localStorage.setItem(STORAGE_KEYS.MECHANICS, JSON.stringify(SEED_MECHANICS));
    localStorage.setItem(STORAGE_KEYS.BAYS, JSON.stringify(SEED_BAYS));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(SEED_SERVICES));
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(SEED_APPOINTMENTS));
    localStorage.setItem(STORAGE_KEYS.WORK_ORDERS, JSON.stringify(SEED_WORK_ORDERS));
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(SEED_QUOTES));
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(SEED_INVOICES));
    localStorage.setItem(STORAGE_KEYS.COMMUNICATIONS, JSON.stringify(SEED_COMMUNICATIONS));
    localStorage.setItem(STORAGE_KEYS.SLOT_HOLDS, JSON.stringify([]));
  }

  // Active Tenant
  static getActiveTenantId() {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_TENANT_ID) || 'tenant-fr-paris';
  }

  static setActiveTenantId(id: string) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TENANT_ID, id);
    window.dispatchEvent(new Event('tenantChanged'));
  }

  static getActiveTenant(): Tenant {
    const tenants = this.getTenants();
    const activeId = this.getActiveTenantId();
    return tenants.find(t => t.id === activeId) || tenants[0];
  }

  // Language
  static getLanguage() {
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'en';
  }

  static setLanguage(lang: string) {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    window.dispatchEvent(new Event('languageChanged'));
  }

  // Generic Getters
  static getTenants(): Tenant[] {
    const data = localStorage.getItem(STORAGE_KEYS.TENANTS);
    return data ? JSON.parse(data) : SEED_TENANTS;
  }

  static getCustomers(tenantId?: string): Customer[] {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    const list = data ? JSON.parse(data) : SEED_CUSTOMERS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(c => c.tenantId === tid);
  }

  static getAllCustomers(): Customer[] {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return data ? JSON.parse(data) : SEED_CUSTOMERS;
  }

  static saveCustomers(customers: Customer[]) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }

  static getVehicles(tenantId?: string): Vehicle[] {
    const data = localStorage.getItem(STORAGE_KEYS.VEHICLES);
    const list = data ? JSON.parse(data) : SEED_VEHICLES;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(v => v.tenantId === tid);
  }

  static saveVehicles(vehicles: Vehicle[]) {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  }

  static getMechanics(tenantId?: string): Mechanic[] {
    const data = localStorage.getItem(STORAGE_KEYS.MECHANICS);
    const list = data ? JSON.parse(data) : SEED_MECHANICS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(m => m.tenantId === tid);
  }

  static saveMechanics(mechanics: Mechanic[]) {
    localStorage.setItem(STORAGE_KEYS.MECHANICS, JSON.stringify(mechanics));
  }

  static getBays(tenantId?: string): WorkshopBay[] {
    const data = localStorage.getItem(STORAGE_KEYS.BAYS);
    const list = data ? JSON.parse(data) : SEED_BAYS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(b => b.tenantId === tid);
  }

  static saveBays(bays: WorkshopBay[]) {
    localStorage.setItem(STORAGE_KEYS.BAYS, JSON.stringify(bays));
  }

  static getServices(tenantId?: string): ServiceItem[] {
    const data = localStorage.getItem(STORAGE_KEYS.SERVICES);
    const list = data ? JSON.parse(data) : SEED_SERVICES;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(s => s.tenantId === tid);
  }

  static saveServices(services: ServiceItem[]) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }

  static getAppointments(tenantId?: string): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    const list = data ? JSON.parse(data) : SEED_APPOINTMENTS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(a => a.tenantId === tid);
  }

  static getAllAppointments(): Appointment[] {
    const data = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return data ? JSON.parse(data) : SEED_APPOINTMENTS;
  }

  static saveAppointments(appointments: Appointment[]) {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }

  static getWorkOrders(tenantId?: string): WorkOrder[] {
    const data = localStorage.getItem(STORAGE_KEYS.WORK_ORDERS);
    const list = data ? JSON.parse(data) : SEED_WORK_ORDERS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(w => w.tenantId === tid);
  }

  static getAllWorkOrders(): WorkOrder[] {
    const data = localStorage.getItem(STORAGE_KEYS.WORK_ORDERS);
    return data ? JSON.parse(data) : SEED_WORK_ORDERS;
  }

  static saveWorkOrders(orders: WorkOrder[]) {
    localStorage.setItem(STORAGE_KEYS.WORK_ORDERS, JSON.stringify(orders));
  }

  static getQuotes(tenantId?: string): Quote[] {
    const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
    const list = data ? JSON.parse(data) : SEED_QUOTES;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(q => q.tenantId === tid);
  }

  static getAllQuotes(): Quote[] {
    const data = localStorage.getItem(STORAGE_KEYS.QUOTES);
    return data ? JSON.parse(data) : SEED_QUOTES;
  }

  static saveQuotes(quotes: Quote[]) {
    localStorage.setItem(STORAGE_KEYS.QUOTES, JSON.stringify(quotes));
  }

  static getInvoices(tenantId?: string): Invoice[] {
    const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
    const list = data ? JSON.parse(data) : SEED_INVOICES;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(i => i.tenantId === tid);
  }

  static getAllInvoices(): Invoice[] {
    const data = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return data ? JSON.parse(data) : SEED_INVOICES;
  }

  static saveInvoices(invoices: Invoice[]) {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }

  static getCommunications(tenantId?: string): CommunicationLog[] {
    const data = localStorage.getItem(STORAGE_KEYS.COMMUNICATIONS);
    const list = data ? JSON.parse(data) : SEED_COMMUNICATIONS;
    const tid = tenantId || this.getActiveTenantId();
    return list.filter(c => c.tenantId === tid);
  }

  static saveCommunications(logs: CommunicationLog[]) {
    localStorage.setItem(STORAGE_KEYS.COMMUNICATIONS, JSON.stringify(logs));
  }

  // Slot Holds
  static getSlotHolds(): SlotHold[] {
    const data = localStorage.getItem(STORAGE_KEYS.SLOT_HOLDS);
    const list = data ? JSON.parse(data) : [];
    const now = Date.now();
    return list.filter(h => h.expiresAt > now);
  }

  static saveSlotHolds(holds: SlotHold[]) {
    localStorage.setItem(STORAGE_KEYS.SLOT_HOLDS, JSON.stringify(holds));
  }
}


// ==========================================================================
// AtelierOS - Deterministic Cross-Border Tax Engine (France & Switzerland)
// ==========================================================================







class TaxService {
  /**
   * Determine the exact deterministic VAT rate & tax treatment rationale
   */
  static determineTaxRule(req: TaxDeterminationRequest): TaxDeterminationResult {
    const { sellerCountry, customerCountry, customerType, customerVatNumber } = req;

    // Case 1: Seller is in France (FR)
    if (sellerCountry === 'FR') {
      // Domestic French Customer
      if (customerCountry === 'FR') {
        return {
          vatRate: 20.0,
          taxTreatment: 'TVA France standard 20.0% (Art. 256 du CGI)',
          isReverseCharge: false,
          legalNotice: 'TVA acquittée selon les débits. Facturation électronique conforme Chorus Pro / PPF.'
        };
      }

      // Customer in Switzerland (CH) or Other Non-EU Country
      if (customerCountry === 'CH') {
        if (customerType === 'BUSINESS' && customerVatNumber) {
          // B2B Cross-Border with verified UID
          return {
            vatRate: 0.0,
            taxTreatment: 'Exonération TVA - Prestation de services B2B internationale / Autoliquidation',
            isReverseCharge: true,
            legalNotice: 'Exonération de TVA selon l\'article 259 B du CGI - Autoliquidation par le preneur suisse.'
          };
        } else {
          // Swiss Individual (B2C) taking physical vehicle repair in French garage
          // Physical automotive repairs carried out in France are subject to French VAT
          return {
            vatRate: 20.0,
            taxTreatment: 'TVA France 20.0% (Prestation matérielle exécutée en France - Art. 259 A 4° du CGI)',
            isReverseCharge: false,
            legalNotice: 'Prestation localisée en France au lieu d\'exécution matérielle des travaux.'
          };
        }
      }
    }

    // Case 2: Seller is in Switzerland (CH)
    if (sellerCountry === 'CH') {
      // Standard Swiss VAT rate (8.1% from Jan 1, 2024)
      return {
        vatRate: 8.1,
        taxTreatment: 'TVA Suisse standard 8.1% (MWSTG Art. 18 / 25)',
        isReverseCharge: false,
        legalNotice: 'TVA suisse 8.1% incluse. Bulletin de versement QR avec référence structurée.'
      };
    }

    // Default Fallback
    return {
      vatRate: 20.0,
      taxTreatment: 'TVA standard 20.0%',
      isReverseCharge: false,
      legalNotice: 'Taux légal en vigueur.'
    };
  }

  /**
   * Compute line items and VAT totals deterministically
   */
  static calculateTotals(lines: Array<{ quantity: number; unitPrice: number; vatRate: number; discount?: number }>) {
    let subtotalExclVat = 0;
    const rateMap = new Map();

    for (const line of lines) {
      const discountAmount = line.discount || 0;
      const lineTotalExcl = (line.quantity * line.unitPrice) - discountAmount;
      subtotalExclVat += lineTotalExcl;

      const rate = line.vatRate;
      const lineVat = lineTotalExcl * (rate / 100);

      const existing = rateMap.get(rate) || { taxableBase: 0, vatAmount: 0 };
      existing.taxableBase += lineTotalExcl;
      existing.vatAmount += lineVat;
      rateMap.set(rate, existing);
    }

    const vatBreakdown: Array<{ rate: number; vatAmount: number; taxableBase: number }> = [];
    let totalVat = 0;

    rateMap.forEach((val, rate) => {
      const roundedVat = Math.round(val.vatAmount * 100) / 100;
      const roundedBase = Math.round(val.taxableBase * 100) / 100;
      vatBreakdown.push({
        rate,
        taxableBase: roundedBase,
        vatAmount: roundedVat
      });
      totalVat += roundedVat;
    });

    const roundedSubtotal = Math.round(subtotalExclVat * 100) / 100;
    const roundedTotalAmount = Math.round((roundedSubtotal + totalVat) * 100) / 100;

    return {
      subtotalExclVat: roundedSubtotal,
      vatBreakdown,
      totalVat: Math.round(totalVat * 100) / 100,
      totalAmount: roundedTotalAmount
    };
  }
}


// ==========================================================================
// AtelierOS - Central Scheduling Engine (Single Source of Truth)
// Unified engine shared by Staff Calendar, Customer Web Booking & AI Assistant
// ==========================================================================








class SchedulingService {
  /**
   * Helper: Parse "HH:mm" into minutes from start of day
   */
  static timeToMinutes(timeStr: string) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  }

  /**
   * Helper: Convert minutes from start of day to "HH:mm"
   */
  static minutesToTime(mins: number) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }

  /**
   * Central Availability Calculator
   * Returns all available slots for a given service & date range
   */
  static getAvailableSlots(
    tenantId: string,
    serviceId: string,
    date: string // YYYY-MM-DD
  ): AvailableSlot[] {
    const tenant = StorageService.getTenants().find(t => t.id === tenantId) || StorageService.getActiveTenant();
    const service = StorageService.getServices(tenantId).find(s => s.id === serviceId);
    if (!service) return [];

    const mechanics = StorageService.getMechanics(tenantId).filter(m => m.active);
    const bays = StorageService.getBays(tenantId).filter(b => b.active);
    const existingAppointments = StorageService.getAppointments(tenantId).filter(
      a => a.date === date && a.status !== 'CANCELLED'
    );
    const activeHolds = StorageService.getSlotHolds().filter(h => h.tenantId === tenantId && h.date === date);

    // Eligible mechanics matching required skills
    const qualifiedMechanics = mechanics.filter(mech => {
      // Check leave
      const onLeave = mech.leaves.some(l => date >= l.startDate && date <= l.endDate);
      if (onLeave) return false;
      // Check skill
      if (service.requiredSkills.length === 0) return true;
      return service.requiredSkills.some(skill => mech.skills.includes(skill));
    });

    // Eligible bays matching required type
    const qualifiedBays = bays.filter(bay => bay.type === service.requiredBayType || bays.length === 1);

    if (qualifiedMechanics.length === 0 || qualifiedBays.length === 0) {
      return [];
    }

    const totalDuration = service.bufferBeforeMin + service.estimatedDurationMin + service.bufferAfterMin;
    const openMins = this.timeToMinutes(tenant.settings.openingTime);
    const closeMins = this.timeToMinutes(tenant.settings.closingTime);
    const lunchStartMins = this.timeToMinutes(tenant.settings.lunchStart);
    const lunchEndMins = this.timeToMinutes(tenant.settings.lunchEnd);
    const slotStep = tenant.settings.slotDurationMin || 30;

    const availableSlots = [];

    // Iterate across workday slots
    for (let current = openMins; current + totalDuration <= closeMins; current += slotStep) {
      const slotStart = current;
      const slotEnd = current + totalDuration;

      // Skip if overlapping lunch break
      const overlapsLunch = !(slotEnd <= lunchStartMins || slotStart >= lunchEndMins);
      if (overlapsLunch) continue;

      const slotStartTimeStr = this.minutesToTime(slotStart);
      const slotEndTimeStr = this.minutesToTime(slotEnd);

      // Find an available qualified mechanic and bay combo
      for (const mech of qualifiedMechanics) {
        // Check mechanic working hours
        const mechStart = this.timeToMinutes(mech.workingHours.start);
        const mechEnd = this.timeToMinutes(mech.workingHours.end);
        if (slotStart < mechStart || slotEnd > mechEnd) continue;

        // Check if mechanic is busy in existing appointments
        const mechBusyInApp = existingAppointments.some(app => {
          if (app.mechanicId !== mech.id) return false;
          const appStart = this.timeToMinutes(app.startTime);
          const appEnd = this.timeToMinutes(app.endTime);
          return !(slotEnd <= appStart || slotStart >= appEnd);
        });

        // Check if mechanic is held
        const mechBusyInHold = activeHolds.some(h => {
          if (h.mechanicId !== mech.id) return false;
          const hStart = this.timeToMinutes(h.startTime);
          const hEnd = this.timeToMinutes(h.endTime);
          return !(slotEnd <= hStart || slotStart >= hEnd);
        });

        if (mechBusyInApp || mechBusyInHold) continue;

        // Now find an available qualified bay
        for (const bay of qualifiedBays) {
          const bayBusyInApp = existingAppointments.some(app => {
            if (app.bayId !== bay.id) return false;
            const appStart = this.timeToMinutes(app.startTime);
            const appEnd = this.timeToMinutes(app.endTime);
            return !(slotEnd <= appStart || slotStart >= appEnd);
          });

          const bayBusyInHold = activeHolds.some(h => {
            if (h.bayId !== bay.id) return false;
            const hStart = this.timeToMinutes(h.startTime);
            const hEnd = this.timeToMinutes(h.endTime);
            return !(slotEnd <= hStart || slotStart >= hEnd);
          });

          if (!bayBusyInApp && !bayBusyInHold) {
            availableSlots.push({
              date,
              startTime: slotStartTimeStr,
              endTime: slotEndTimeStr,
              mechanicId: mech.id,
              mechanicName: mech.name,
              bayId: bay.id,
              bayName: bay.name
            });
            break; // Found valid pair for this time slot
          }
        }
      }
    }

    return availableSlots;
  }

  /**
   * Conflict Detection Engine
   */
  static checkConflict(params: {
    tenantId: string;
    date: string;
    startTime: string;
    endTime: string;
    mechanicId: string;
    bayId: string;
    excludeAppointmentId?: string;
  }): ConflictCheckResult {
    const { tenantId, date, startTime, endTime, mechanicId, bayId, excludeAppointmentId } = params;
    const startMins = this.timeToMinutes(startTime);
    const endMins = this.timeToMinutes(endTime);

    const appointments = StorageService.getAppointments(tenantId).filter(
      a => a.date === date && a.status !== 'CANCELLED' && a.id !== excludeAppointmentId
    );

    const mechanics = StorageService.getMechanics(tenantId);
    const bays = StorageService.getBays(tenantId);

    for (const app of appointments) {
      const appStart = this.timeToMinutes(app.startTime);
      const appEnd = this.timeToMinutes(app.endTime);
      const isOverlap = !(endMins <= appStart || startMins >= appEnd);

      if (isOverlap) {
        if (app.mechanicId === mechanicId) {
          const m = mechanics.find(mech => mech.id === mechanicId);
          return {
            hasConflict: true,
            reason: `Mechanic ${m?.name || mechanicId} is already booked from ${app.startTime} to ${app.endTime}`,
            conflictingMechanic: m?.name
          };
        }
        if (app.bayId === bayId) {
          const b = bays.find(bay => bay.id === bayId);
          return {
            hasConflict: true,
            reason: `Bay ${b?.name || bayId} is already occupied from ${app.startTime} to ${app.endTime}`,
            conflictingBay: b?.name
          };
        }
      }
    }

    return { hasConflict: false };
  }

  /**
   * Create a 10-minute temporary slot hold during customer web checkout
   */
  static createSlotHold(params: {
    tenantId: string;
    serviceId: string;
    mechanicId: string;
    bayId: string;
    date: string;
    startTime: string;
    endTime: string;
  }): SlotHold | null {
    // Re-verify availability
    const conflict = this.checkConflict(params);
    if (conflict.hasConflict) return null;

    const timeoutMinutes = 10;
    const hold = {
      id: `hold-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      tenantId: params.tenantId,
      serviceId: params.serviceId,
      mechanicId: params.mechanicId,
      bayId: params.bayId,
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      expiresAt: Date.now() + timeoutMinutes * 60 * 1000,
      token: `tok_hold_${Date.now()}`
    };

    const holds = StorageService.getSlotHolds();
    holds.push(hold);
    StorageService.saveSlotHolds(holds);
    return hold;
  }

  /**
   * Release a temporary slot hold
   */
  static releaseSlotHold(holdId: string) {
    const holds = StorageService.getSlotHolds().filter(h => h.id !== holdId);
    StorageService.saveSlotHolds(holds);
  }

  /**
   * Confirm an appointment and release hold
   */
  static confirmAppointment(params: {
    tenantId: string;
    customerId: string;
    vehicleId: string;
    serviceId: string;
    mechanicId: string;
    bayId: string;
    date: string;
    startTime: string;
    endTime: string;
    source: 'STAFF' | 'ONLINE_WEB' | 'AI_ASSISTANT';
    intakeNotes?: string;
    customerAnswers?: Record<string, any>;
    holdId?: string;
  }): Appointment {
    if (params.holdId) {
      this.releaseSlotHold(params.holdId);
    }

    const refNumber = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const appointment = {
      id: `app-${Date.now()}`,
      tenantId: params.tenantId,
      customerId: params.customerId,
      vehicleId: params.vehicleId,
      serviceId: params.serviceId,
      mechanicId: params.mechanicId,
      bayId: params.bayId,
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      status: 'CONFIRMED',
      source: params.source,
      intakeNotes: params.intakeNotes,
      customerAnswers: params.customerAnswers,
      confirmationCode: refNumber,
      createdAt: new Date().toISOString()
    };

    const allApps = StorageService.getAllAppointments();
    allApps.push(appointment);
    StorageService.saveAppointments(allApps);

    // Automatically create a linked Work Order in 'APPOINTMENT' stage
    const workOrderNumber = `OR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const workOrder = {
      id: `wo-${Date.now()}`,
      tenantId: params.tenantId,
      orderNumber: workOrderNumber,
      appointmentId: appointment.id,
      customerId: params.customerId,
      vehicleId: params.vehicleId,
      mechanicId: params.mechanicId,
      bayId: params.bayId,
      stage: 'APPOINTMENT',
      symptoms: [params.intakeNotes || 'Online booking service requested'],
      diagnosisNotes: '',
      obdCodes: [],
      photos: [],
      checklist: [
        { id: 'chk-1', title: 'Vehicle exterior walkaround & fluid check', status: 'PASS' },
        { id: 'chk-2', title: 'Brake, tire & suspension visual check', status: 'PASS' },
        { id: 'chk-3', title: 'OBD-II diagnostic health scan', status: 'PASS' }
      ],
      partsUsed: [],
      laborTimeRecordedMin: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const allWorkOrders = StorageService.getAllWorkOrders();
    allWorkOrders.push(workOrder);
    StorageService.saveWorkOrders(allWorkOrders);

    return appointment;
  }
}


// ==========================================================================
// AtelierOS - Quotation & Invoice Management Service
// ==========================================================================





class QuoteInvoiceService {
  /**
   * Create a structured Quote from a Work Order
   */
  static createQuoteFromWorkOrder(params: {
    tenantId: string;
    workOrderId: string;
    lines: QuoteLine[];
  }): Quote {
    const tenant = StorageService.getTenants().find(t => t.id === params.tenantId) || StorageService.getActiveTenant();
    const workOrders = StorageService.getAllWorkOrders();
    const workOrder = workOrders.find(w => w.id === params.workOrderId);
    if (!workOrder) throw new Error('Work order not found');

    const customer = StorageService.getAllCustomers().find(c => c.id === workOrder.customerId);
    const totals = TaxService.calculateTotals(params.lines);

    const quoteNumber = `DEV-${tenant.country}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const magicToken = `tok-magic-quote-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Expiry: 30 days
    const validUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const quote = {
      id: `quote-${Date.now()}`,
      tenantId: params.tenantId,
      quoteNumber,
      workOrderId: params.workOrderId,
      customerId: workOrder.customerId,
      vehicleId: workOrder.vehicleId,
      currency: tenant.currency,
      lines: params.lines,
      subtotalExclVat: totals.subtotalExclVat,
      vatBreakdown: totals.vatBreakdown,
      totalVat: totals.totalVat,
      totalAmount: totals.totalAmount,
      status: 'SENT_AWAITING_APPROVAL',
      magicToken,
      validUntil,
      createdAt: new Date().toISOString()
    };

    const quotes = StorageService.getAllQuotes();
    quotes.push(quote);
    StorageService.saveQuotes(quotes);

    // Update Work Order
    workOrder.quoteId = quote.id;
    workOrder.stage = 'AWAITING_APPROVAL';
    workOrder.updatedAt = new Date().toISOString();
    StorageService.saveWorkOrders(workOrders);

    return quote;
  }

  /**
   * Approve a Quote (Customer Action)
   */
  static approveQuote(quoteId: string, signature: string): Quote {
    const quotes = StorageService.getAllQuotes();
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) throw new Error('Quote not found');

    quote.status = 'APPROVED';
    quote.approvalSignature = signature;
    quote.approvedAt = new Date().toISOString();
    StorageService.saveQuotes(quotes);

    // Auto-advance linked work order to APPROVED
    const workOrders = StorageService.getAllWorkOrders();
    const workOrder = workOrders.find(w => w.id === quote.workOrderId);
    if (workOrder) {
      workOrder.stage = 'APPROVED';
      workOrder.updatedAt = new Date().toISOString();
      StorageService.saveWorkOrders(workOrders);
    }

    return quote;
  }

  /**
   * Reject a Quote (Customer Action)
   */
  static rejectQuote(quoteId: string, reason: string): Quote {
    const quotes = StorageService.getAllQuotes();
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) throw new Error('Quote not found');

    quote.status = 'REJECTED';
    quote.approvalRejectionReason = reason;
    StorageService.saveQuotes(quotes);

    return quote;
  }

  /**
   * Generate an immutable Invoice from a completed Work Order
   */
  static generateInvoiceFromWorkOrder(workOrderId: string): Invoice {
    const workOrders = StorageService.getAllWorkOrders();
    const workOrder = workOrders.find(w => w.id === workOrderId);
    if (!workOrder) throw new Error('Work order not found');

    const tenant = StorageService.getTenants().find(t => t.id === workOrder.tenantId) || StorageService.getActiveTenant();
    const customer = StorageService.getAllCustomers().find(c => c.id === workOrder.customerId);
    const quotes = StorageService.getAllQuotes();
    const quote = quotes.find(q => q.id === workOrder.quoteId);

    // Lines from quote or fallback from work order parts & labor
    let lines = [];
    if (quote && quote.lines.length > 0) {
      lines = quote.lines;
    } else {
      const taxRes = TaxService.determineTaxRule({
        sellerCountry: tenant.country,
        customerCountry: customer?.country || tenant.country,
        customerType: customer?.type || 'INDIVIDUAL',
        customerVatNumber: customer?.taxIdentity?.vatNumber
      });

      // Default labor line
      lines.push({
        id: `inv-l-labor`,
        type: 'LABOR',
        description: `Main d'œuvre atelier (${workOrder.laborTimeRecordedMin || 60} min)`,
        quantity: Math.max(0.5, (workOrder.laborTimeRecordedMin || 60) / 60),
        unitPrice: tenant.settings.defaultLaborRate,
        vatRate: taxRes.vatRate,
        totalExclVat: ((workOrder.laborTimeRecordedMin || 60) / 60) * tenant.settings.defaultLaborRate,
        totalInclVat: ((workOrder.laborTimeRecordedMin || 60) / 60) * tenant.settings.defaultLaborRate * (1 + taxRes.vatRate / 100)
      });

      // Parts lines
      for (const p of workOrder.partsUsed) {
        lines.push({
          id: `inv-l-${p.partId}`,
          type: 'PART',
          description: p.name,
          quantity: p.quantity,
          unitPrice: p.unitPrice,
          vatRate: taxRes.vatRate,
          totalExclVat: p.total,
          totalInclVat: p.total * (1 + taxRes.vatRate / 100)
        });
      }
    }

    const totals = TaxService.calculateTotals(lines);
    const taxRes = TaxService.determineTaxRule({
      sellerCountry: tenant.country,
      customerCountry: customer?.country || tenant.country,
      customerType: customer?.type || 'INDIVIDUAL',
      customerVatNumber: customer?.taxIdentity?.vatNumber
    });

    const invoiceNumber = `FAC-${tenant.country}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const issueDate = new Date().toISOString().split('T')[0];
    const dueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const invoice = {
      id: `inv-${Date.now()}`,
      tenantId: tenant.id,
      invoiceNumber,
      quoteId: quote?.id,
      workOrderId: workOrder.id,
      customerId: workOrder.customerId,
      vehicleId: workOrder.vehicleId,
      currency: tenant.currency,
      issueDate,
      dueDate,
      lines,
      subtotalExclVat: totals.subtotalExclVat,
      vatBreakdown: totals.vatBreakdown,
      totalVat: totals.totalVat,
      totalAmount: totals.totalAmount,
      taxTreatment: taxRes.taxTreatment,
      paid: false,
      eInvoiceStatus: 'NOT_SUBMITTED',
      qrBillReference: tenant.country === 'CH' ? `21 00000 00003 ${Math.floor(10000000000 + Math.random() * 90000000000)}` : undefined,
      createdAt: new Date().toISOString()
    };

    const invoices = StorageService.getAllInvoices();
    invoices.push(invoice);
    StorageService.saveInvoices(invoices);

    // Update Work Order to INVOICED
    workOrder.invoiceId = invoice.id;
    workOrder.stage = 'INVOICED';
    workOrder.updatedAt = new Date().toISOString();
    StorageService.saveWorkOrders(workOrders);

    return invoice;
  }
}


// ==========================================================================
// AtelierOS - Provider-Neutral French E-Invoicing Connector
// Interfaces with Chorus Pro / Portail Public de Facturation (PPF) & Factur-X
// ==========================================================================






class EInvoiceConnector {
  /**
   * Generate Factur-X / UBL XML structured payload for any invoice
   */
  static generatePayload(invoice: Invoice): FacturXPayload {
    const tenant = StorageService.getTenants().find(t => t.id === invoice.tenantId) || StorageService.getActiveTenant();
    const customer = StorageService.getAllCustomers().find(c => c.id === invoice.customerId);

    const xmlLines = invoice.lines.map((l, idx) => `
    <ram:IncludedSupplyChainTradeLineItem>
      <ram:AssociatedDocumentLineDocument>
        <ram:LineID>${idx + 1}</ram:LineID>
      </ram:AssociatedDocumentLineDocument>
      <ram:SpecifiedTradeProduct>
        <ram:Name>${l.description.replace(/&/g, '&amp;')}</ram:Name>
      </ram:SpecifiedTradeProduct>
      <ram:SpecifiedLineTradeAgreement>
        <ram:NetPriceProductTradePrice>
          <ram:ChargeAmount>${l.unitPrice.toFixed(2)}</ram:ChargeAmount>
        </ram:NetPriceProductTradePrice>
      </ram:SpecifiedLineTradeAgreement>
      <ram:SpecifiedLineTradeDelivery>
        <ram:BilledQuantity unitCode="C62">${l.quantity.toFixed(2)}</ram:BilledQuantity>
      </ram:SpecifiedLineTradeDelivery>
      <ram:SpecifiedLineTradeSettlement>
        <ram:ApplicableTradeTax>
          <ram:RateApplicablePercent>${l.vatRate.toFixed(2)}</ram:RateApplicablePercent>
        </ram:ApplicableTradeTax>
        <ram:SpecifiedTradeSettlementLineMonetarySummation>
          <ram:LineTotalAmount>${l.totalExclVat.toFixed(2)}</ram:LineTotalAmount>
        </ram:SpecifiedTradeSettlementLineMonetarySummation>
      </ram:SpecifiedLineTradeSettlement>
    </ram:IncludedSupplyChainTradeLineItem>`).join('');

    const xmlPreview = `<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:factur-x.eu:1p0:basic</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>
  <rsm:ExchangedDocument>
    <ram:ID>${invoice.invoiceNumber}</ram:ID>
    <ram:TypeCode>380</ram:TypeCode>
    <ram:IssueDateTime>
      <udt:DateTimeString format="102">${invoice.issueDate.replace(/-/g, '')}</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>
  <rsm:SupplyChainTradeTransaction>
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>${tenant.name}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0009">${tenant.taxIdentity.siret || tenant.taxIdentity.uid || 'SIRET_PENDING'}</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:LineOne>${tenant.address.street}</ram:LineOne>
          <ram:PostcodeCode>${tenant.address.postalCode}</ram:PostcodeCode>
          <ram:CityName>${tenant.address.city}</ram:CityName>
          <ram:CountryID>${tenant.country}</ram:CountryID>
        </ram:PostalTradeAddress>
      </ram:SellerTradeParty>
      <ram:BuyerTradeParty>
        <ram:Name>${customer?.companyName || `${customer?.firstName} ${customer?.lastName}`}</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0009">${customer?.taxIdentity?.siret || customer?.taxIdentity?.uid || 'B2C_INDIVIDUAL'}</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:LineOne>${customer?.address.street || ''}</ram:LineOne>
          <ram:PostcodeCode>${customer?.address.postalCode || ''}</ram:PostcodeCode>
          <ram:CityName>${customer?.address.city || ''}</ram:CityName>
          <ram:CountryID>${customer?.country || tenant.country}</ram:CountryID>
        </ram:PostalTradeAddress>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>
    <ram:IncludedSupplyChainTradeLineItems>
      ${xmlLines}
    </ram:IncludedSupplyChainTradeLineItems>
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>${invoice.currency}</ram:InvoiceCurrencyCode>
      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>${invoice.subtotalExclVat.toFixed(2)}</ram:LineTotalAmount>
        <ram:TaxTotalAmount currencyID="${invoice.currency}">${invoice.totalVat.toFixed(2)}</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>${invoice.totalAmount.toFixed(2)}</ram:GrandTotalAmount>
        <ram:DuePayableAmount>${invoice.totalAmount.toFixed(2)}</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>`;

    return {
      specification: tenant.country === 'FR' ? 'ChorusPro UBL 2.1' : 'Factur-X BASIC',
      invoiceNumber: invoice.invoiceNumber,
      issueDate: invoice.issueDate,
      seller: {
        name: tenant.name,
        siret: tenant.taxIdentity.siret,
        vatNumber: tenant.taxIdentity.vatNumber,
        country: tenant.country,
        address: `${tenant.address.street}, ${tenant.address.postalCode} ${tenant.address.city}`
      },
      buyer: {
        name: customer?.companyName || `${customer?.firstName} ${customer?.lastName}`,
        siretOrUid: customer?.taxIdentity?.siret || customer?.taxIdentity?.uid,
        vatNumber: customer?.taxIdentity?.vatNumber,
        country: customer?.country || tenant.country,
        address: `${customer?.address.street || ''}, ${customer?.address.postalCode || ''} ${customer?.address.city || ''}`
      },
      financials: {
        currency: invoice.currency,
        subtotalExclTax: invoice.subtotalExclVat,
        vatTotal: invoice.totalVat,
        grandTotal: invoice.totalAmount,
        taxBreakdown: invoice.vatBreakdown.map(b => ({
          rate: b.rate,
          taxableBase: b.taxableBase,
          taxAmount: b.vatAmount
        }))
      },
      lines: invoice.lines.map(l => ({
        itemDescription: l.description,
        quantity: l.quantity,
        unitPrice: l.unitPrice,
        vatRate: l.vatRate,
        lineTotal: l.totalExclVat
      })),
      xmlPreview
    };
  }

  /**
   * Submit to French Chorus Pro / PPF / PDP Simulator
   */
  static submitToChorusPro(invoiceId: string, platform: 'CHORUS_PRO' | 'PPF' | 'PDP_GENERIC' = 'CHORUS_PRO'): {
    success: boolean;
    submissionId: string;
    status: 'ACCEPTED' | 'IN_PROCESSING' | 'REJECTED';
    message: string;
  } {
    const invoices = StorageService.getAllInvoices();
    const invoice = invoices.find(i => i.id === invoiceId);
    if (!invoice) throw new Error('Invoice not found');

    const submissionId = `CP-FR-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    invoice.eInvoiceStatus = 'ACCEPTED';
    invoice.eInvoicePlatform = platform;
    invoice.eInvoiceSubmissionId = submissionId;
    invoice.eInvoiceSubmittedAt = new Date().toISOString();

    StorageService.saveInvoices(invoices);

    return {
      success: true,
      submissionId,
      status: 'ACCEPTED',
      message: `Invoice ${invoice.invoiceNumber} successfully transmitted to ${platform} (Validation Code: 200 OK / Chorus ID: ${submissionId}).`
    };
  }
}


// ==========================================================================
// AtelierOS - Omnichannel Communication Service (SMS, Email, WhatsApp)
// ==========================================================================




class CommunicationService {
  /**
   * Send simulated notification and record immutable communication audit log
   */
  static sendNotification(params: {
    tenantId: string;
    customerId: string;
    recipient: string;
    channel: CommunicationChannel;
    templateType: CommunicationLog['templateType'];
    subject?: string;
    messageBody: string;
  }): CommunicationLog {
    const log = {
      id: `comm-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      tenantId: params.tenantId,
      customerId: params.customerId,
      recipient: params.recipient,
      channel: params.channel,
      templateType: params.templateType,
      subject: params.subject,
      messageBody: params.messageBody,
      status: 'DELIVERED',
      sentAt: new Date().toISOString()
    };

    const logs = StorageService.getCommunications(params.tenantId);
    logs.unshift(log);
    StorageService.saveCommunications(logs);

    return log;
  }

  /**
   * Dispatch Booking Confirmation
   */
  static notifyBookingConfirmed(app: Appointment, customer: Customer, tenant: Tenant) {
    // 1. SMS
    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.phone,
      channel: 'SMS',
      templateType: 'BOOKING_CONFIRMATION',
      messageBody: `${tenant.name}: Votre RDV du ${app.date} à ${app.startTime} est confirmé (Réf: ${app.confirmationCode}). Adresse: ${tenant.address.street}, ${tenant.address.city}.`
    });

    // 2. Email
    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.email,
      channel: 'EMAIL',
      templateType: 'BOOKING_CONFIRMATION',
      subject: `Confirmation de votre réservation - ${tenant.name}`,
      messageBody: `Bonjour ${customer.firstName} ${customer.lastName},\n\nVotre rendez-vous a bien été confirmé pour le ${app.date} de ${app.startTime} à ${app.endTime}.\nRéférence dossier: ${app.confirmationCode}\n\nÀ très bientôt dans notre atelier,\nL'équipe ${tenant.name}`
    });
  }

  /**
   * Dispatch Quote Approval Magic Link
   */
  static notifyQuoteReady(quote: Quote, customer: Customer, tenant: Tenant, magicLinkUrl: string) {
    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.phone,
      channel: 'SMS',
      templateType: 'QUOTE_APPROVAL_LINK',
      messageBody: `${tenant.name}: Votre devis ${quote.quoteNumber} de ${quote.totalAmount.toFixed(2)} ${quote.currency} est prêt. Consultez et validez-le ici : ${magicLinkUrl}`
    });

    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.email,
      channel: 'EMAIL',
      templateType: 'QUOTE_APPROVAL_LINK',
      subject: `Devis de réparation ${quote.quoteNumber} - ${tenant.name}`,
      messageBody: `Bonjour ${customer.firstName},\n\nLe diagnostic de votre véhicule est terminé. Votre devis de ${quote.totalAmount.toFixed(2)} ${quote.currency} est consultable en ligne.\nLien direct sécurisé : ${magicLinkUrl}\n\nCordialement,\n${tenant.name}`
    });
  }

  /**
   * Dispatch Vehicle Ready Notice
   */
  static notifyVehicleReady(customer: Customer, tenant: Tenant, licensePlate: string) {
    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.phone,
      channel: 'SMS',
      templateType: 'VEHICLE_READY',
      messageBody: `${tenant.name}: Votre véhicule (${licensePlate}) est prêt ! Tous les contrôles de sécurité sont validés. Vous pouvez venir le récupérer à l'accueil.`
    });

    this.sendNotification({
      tenantId: tenant.id,
      customerId: customer.id,
      recipient: customer.phone,
      channel: 'WHATSAPP',
      templateType: 'VEHICLE_READY',
      messageBody: `🚗 *${tenant.name}* : Votre véhicule immatriculé *${licensePlate}* est terminé et disponible à notre atelier. Nos équipes se tiennent à votre disposition !`
    });
  }
}


// ==========================================================================
// AtelierOS - AI Receptionist & Diagnostic Orchestrator (Function-Calling Architecture)
// AI never writes directly to DB or invents prices - it calls application APIs
// ==========================================================================









class AIService {
  /**
   * Safe Function Calling Orchestration for Intake & Diagnosis
   */
  static async processCustomerIntake(
    tenantId: string,
    userInput: string,
    targetDate?: string
  ): Promise<AIResponse> {
    const functionCalls = [];
    const dateToQuery = targetDate || new Date().toISOString().split('T')[0];
    const lower = userInput.toLowerCase();

    const services = StorageService.getServices(tenantId);
    let matchedService: ServiceItem | undefined = undefined;
    let suggestedOBDChecks = [];

    // Step 1: Simulated Tool Call: classifySymptoms(input)
    if (lower.includes('brake') || lower.includes('frein') || lower.includes('squeak') || lower.includes('grincement') || lower.includes('vibrat')) {
      matchedService = services.find(s => s.category === 'BRAKES') || services[0];
      suggestedOBDChecks = [
        'Inspect brake pad thickness (front & rear)',
        'Check rotor runout with dial gauge',
        'Verify ABS wheel speed sensors and wiring harnesses'
      ];
    } else if (lower.includes('oil') || lower.includes('vidange') || lower.includes('service') || lower.includes('revision') || lower.includes('filter')) {
      matchedService = services.find(s => s.category === 'MAINTENANCE') || services[0];
      suggestedOBDChecks = [
        'Perform 35-point multipoint vehicle inspection',
        'Check engine oil condition and oil filter seal',
        'Inspect auxiliary drive belt and coolant freeze point'
      ];
    } else if (lower.includes('battery') || lower.includes('tesla') || lower.includes('electric') || lower.includes('charge') || lower.includes('batterie') || lower.includes('hybride')) {
      matchedService = services.find(s => s.category === 'EV') || services[0];
      suggestedOBDChecks = [
        'High-Voltage isolation resistance diagnostic test',
        'BMS State of Health (SOH) cell balance measurement',
        'Thermal cooling pump flow rate check'
      ];
    } else {
      matchedService = services.find(s => s.category === 'DIAGNOSTIC') || services[0];
      suggestedOBDChecks = [
        'Full ECU OBD-II Diagnostic Scan (powertrain & CAN bus)',
        'Live sensor telemetry data recording',
        'Fuel trim (STFT/LTFT) and oxygen sensor verification'
      ];
    }

    functionCalls.push({
      functionName: 'ServiceCatalog.matchSymptoms',
      arguments: {
        rawInput: userInput,
        detectedCategory: matchedService?.category,
        serviceId: matchedService?.id
      },
      result: {
        serviceId: matchedService?.id,
        serviceName: matchedService?.name,
        estimatedDurationMin: matchedService?.estimatedDurationMin,
        basePrice: matchedService?.baseLaborPrice
      },
      timestamp: new Date().toISOString()
    });

    // Step 2: Tool Call: SchedulingService.getAvailableSlots(tenantId, serviceId, date)
    let availableSlots = [];
    if (matchedService) {
      availableSlots = SchedulingService.getAvailableSlots(tenantId, matchedService.id, dateToQuery);

      functionCalls.push({
        functionName: 'SchedulingService.getAvailableSlots',
        arguments: {
          tenantId,
          serviceId: matchedService.id,
          date: dateToQuery,
          durationMin: matchedService.estimatedDurationMin,
          requiredBay: matchedService.requiredBayType
        },
        result: {
          slotsFoundCount: availableSlots.length,
          slots: availableSlots.slice(0, 4)
        },
        timestamp: new Date().toISOString()
      });
    }

    // Step 3: Natural Language Response
    let responseText = '';
    if (matchedService) {
      responseText = `Based on your description, I recommend our **${matchedService.name}** (estimated duration: ${matchedService.estimatedDurationMin} min). I queried our central workshop agenda and found ${availableSlots.length} available slots for ${dateToQuery}.`;
    } else {
      responseText = `I have received your request. I recommend scheduling an **Electronic Diagnostic Inspection** to scan for error codes and isolate the issue.`;
    }

    return {
      message: responseText,
      classifiedService: matchedService,
      suggestedSlots: availableSlots.slice(0, 4),
      functionCalls,
      suggestedOBDChecks
    };
  }
}


// ==========================================================================
// AtelierOS - Comprehensive Internationalization Dictionaries
// English (Default), Français (France), Français Suisse (CH), Deutsch Schweiz (CH)
// ==========================================================================

const translations = {
  en: {
    brandName: "AtelierOS",
    tagline: "The Workshop Operating System. Reimagined.",
    underDevBadge: "Under development by MARS Association",
    
    nav: {
      landing: "Overview",
      calendar: "Calendar",
      workOrders: "Work Orders",
      mechanicBay: "Mechanic Tablet",
      customers: "Customers",
      vehicles: "Vehicles",
      quotes: "Quotes",
      invoices: "Invoices",
      bookingPortal: "Customer Web Booking",
      communications: "Communications",
      superAdmin: "SaaS Admin",
      aiAssistant: "AutoAI Assistant",
      resetDemo: "Reset Demo Data",
      tenantSwitch: "Active Garage:"
    },

    common: {
      search: "Search...",
      filter: "Filter",
      all: "All",
      save: "Save Changes",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      confirm: "Confirm",
      back: "Back",
      status: "Status",
      actions: "Actions",
      date: "Date",
      time: "Time",
      phone: "Phone",
      email: "Email",
      address: "Address",
      country: "Country",
      currency: "Currency",
      total: "Total",
      subtotal: "Subtotal Excl. Tax",
      taxVat: "VAT / TVA",
      notes: "Notes",
      viewDetails: "View Details",
      print: "Print / Export PDF",
      sendEmail: "Send Email",
      sendSms: "Send SMS",
      sendWhatsApp: "Send WhatsApp",
      close: "Close",
      loading: "Loading...",
      success: "Operation successful",
      error: "An error occurred",
      required: "Required",
      optional: "Optional"
    },

    landing: {
      heroTitle: "Precision Workshop Management for Europe's Elite Garages.",
      heroSubtitle: "Engineered for France and Switzerland from day one. Single central scheduling engine, tablet-first mechanic stations, cross-border deterministic invoicing, and Chorus Pro e-invoicing.",
      ctaLaunchApp: "Launch Workshop App",
      ctaCustomerBooking: "Try Customer Web Booking",
      ctaAiReception: "Ask AI Receptionist",
      badgeMultiTenant: "Multi-Tenant Architecture",
      badgeUnifiedEngine: "ONE Central Scheduling Engine",
      badgeTaxReady: "France & Switzerland Tax Compliant",
      badgeEinvoice: "Chorus Pro / Factur-X Ready",
      
      stat1Number: "1 Engine",
      stat1Label: "Shared by Staff, Customer Web & AI",
      stat2Number: "100%",
      stat2Label: "Conflict-Free Bay & Lift Allocation",
      stat3Number: "< 3 Min",
      stat3Label: "From Inspection to Customer Approved Quote",
      stat4Number: "EUR & CHF",
      stat4Label: "Native Cross-Border Compliance",

      featuresTitle: "Crafted for speed, clarity, and zero administrative friction.",
      feat1Title: "Central Scheduling Engine",
      feat1Desc: "One availability pipeline across staff agenda, customer web booking, and AI assistants. Instant conflict detection for mechanics, lifts, and buffers.",
      feat2Title: "Mechanic Tablet Bay Mode",
      feat2Desc: "48px large touch targets designed for workshop bays. Fast OBD-II diagnostic code logging, step-by-step checklists, and photo inspection attachments.",
      feat3Title: "Cross-Border FR & CH Invoicing",
      feat3Desc: "Automatic tax determination for France (20% TVA) and Switzerland (8.1% TVA). Structured Swiss QR-Bills and France SIRET / Chorus Pro compliance.",
      feat4Title: "Customer Magic Approval Links",
      feat4Desc: "Send instant quote approval links by SMS or Email. Customers review itemized parts/labor and digitally sign in seconds without phone tag.",
      feat5Title: "Provider-Neutral E-Invoicing",
      feat5Desc: "Built-in generator for French Factur-X and Chorus Pro (PPF / PDP) payloads with live validation and transaction tracking.",
      feat6Title: "Controlled AI Voice & Web Intake",
      feat6Desc: "Natural language symptom intake with strictly bounded function calling. AI never invents prices or bypasses database rules.",

      roiTitle: "Calculate Your Workshop ROI",
      roiSubtitle: "See how much time and administrative revenue AtelierOS recovers for your garage every month.",
      roiMechanicsLabel: "Number of Mechanics:",
      roiMonthlyWorkOrders: "Work Orders per Month:",
      roiHoursSaved: "Hours Saved / Month:",
      roiRevenueGain: "Estimated Monthly Revenue Gain:",

      pricingTitle: "Transparent, predictable pricing for modern workshops.",
      pricingSubtitle: "Switch between EUR (€) and CHF (CHF) anytime.",
      tierStarterName: "Starter",
      tierStarterPriceEur: "€89",
      tierStarterPriceChf: "CHF 99",
      tierStarterPeriod: "/ month per garage",
      tierStarterDesc: "For independent single-bay garages looking to digitize appointments and invoicing.",
      tierStarterFeat1: "Up to 3 Mechanics & 2 Bays",
      tierStarterFeat2: "Central Calendar & Online Web Booking",
      tierStarterFeat3: "Quotes, Invoices & PDF Export",
      tierStarterFeat4: "SMS & Email Notifications",

      tierProName: "Pro Workshop",
      tierProBadge: "Most Popular",
      tierProPriceEur: "€189",
      tierProPriceChf: "CHF 199",
      tierProPeriod: "/ month per garage",
      tierProDesc: "For growing workshops requiring full tablet bay mode, magic link approvals, and e-invoicing.",
      tierProFeat1: "Unlimited Mechanics & Bays",
      tierProFeat2: "Tablet Bay Mode & OBD-II Diagnostics",
      tierProFeat3: "Customer Magic-Link Quote Approvals",
      tierProFeat4: "French Chorus Pro / Factur-X Connector",
      tierProFeat5: "Swiss QR-Bill Invoicing",

      tierAiName: "AI Enterprise",
      tierAiPriceEur: "€299",
      tierAiPriceChf: "CHF 329",
      tierAiPeriod: "/ month per garage",
      tierAiDesc: "For high-volume workshops and multi-location groups seeking automated AI intake and scheduling.",
      tierAiFeat1: "Everything in Pro",
      tierAiFeat2: "AI Receptionist & Voice/Text Intake",
      tierAiFeat3: "AI Diagnostic Assistant & OBD Suggestions",
      tierAiFeat4: "Multi-Garage Super Admin Platform",
      tierAiFeat5: "Dedicated Priority Support & API Access"
    },

    calendar: {
      title: "Workshop Agenda & Central Scheduling",
      subtitle: "Live view of all mechanics, bays, and customer bookings with instant conflict prevention.",
      dayView: "Day View",
      weekView: "Week View",
      bayView: "Bay Resource View",
      filterMechanic: "All Mechanics",
      filterBay: "All Bays",
      newAppointment: "+ New Appointment",
      noAppointments: "No appointments scheduled for this time slot.",
      conflictWarning: "Scheduling Conflict Detected! Either mechanic or bay is already reserved.",
      suggestAlternatives: "Suggested Alternative Available Slots:"
    },

    workOrders: {
      title: "Work Order Operations",
      subtitle: "10-stage lifecycle from customer request to payment and e-invoice issuance.",
      newWorkOrder: "+ Create Work Order",
      stages: {
        REQUEST: "1. Request",
        APPOINTMENT: "2. Appointment",
        DIAGNOSIS: "3. Diagnosis",
        QUOTE: "4. Quote",
        AWAITING_APPROVAL: "5. Awaiting Approval",
        APPROVED: "6. Approved",
        IN_PROGRESS: "7. In Progress",
        QUALITY_CHECK: "8. Quality Check",
        READY: "9. Ready for Pickup",
        DELIVERED: "10. Delivered",
        INVOICED: "Invoiced & Paid"
      }
    },

    mechanicTablet: {
      title: "Mechanic Bay Station (Tablet Mode)",
      subtitle: "Large touch interface for bay inspection, OBD-II diagnostic codes, checklist & parts logging.",
      activeVehicle: "Current Vehicle on Lift",
      checklistTitle: "Multipoint Safety Inspection",
      obdScannerTitle: "OBD-II Diagnostic Error Scanner",
      obdCodePlaceholder: "Enter OBD code (e.g. P0300, P0420)...",
      addCode: "Analyze Code",
      suggestedInspection: "Suggested Diagnostic Action:",
      recordLaborTime: "Record Labor Time (Minutes):",
      partsTrackerTitle: "Parts & Consumables Used",
      addPart: "+ Add Spare Part",
      signOffQuality: "Pass Quality Inspection & Mark Ready"
    },

    quotes: {
      title: "Commercial Quotations",
      subtitle: "Deterministic labor & parts markup with customer magic-link approvals.",
      createQuote: "+ New Quote",
      quoteNumber: "Quote #",
      customer: "Customer",
      vehicle: "Vehicle",
      amount: "Amount",
      status: "Status",
      validUntil: "Valid Until",
      sendApprovalLink: "Send Magic Approval Link",
      copyLink: "Copy Portal Link",
      linkCopied: "Magic Approval Link copied to clipboard!"
    },

    invoices: {
      title: "Invoices & Cross-Border Billing",
      subtitle: "France (EUR 20%) & Switzerland (CHF 8.1%) with Chorus Pro / Factur-X submission.",
      createInvoice: "+ Generate Invoice",
      invoiceNumber: "Invoice #",
      eInvoiceStatus: "E-Invoice Status",
      submitChorusPro: "Submit to Chorus Pro / PPF",
      previewFacturX: "Inspect Factur-X / XML Payload",
      swissQrBill: "Generate Swiss QR-Bill",
      markPaid: "Mark"
    },

    bookingPortal: {
      title: "Online Appointment Booking",
      subtitle: "Book your service in 60 seconds with live garage availability.",
      step1: "1. Vehicle Identification",
      step2: "2. Select Workshop Service",
      step3: "3. Choose Available Date & Time",
      step4: "4. Confirm Contact & Details",
      platePlaceholder: "Enter License Plate (e.g. AB-123-CD or GE 452 891)...",
      makeModelPlaceholder: "Or enter Make & Model (e.g. Peugeot 3008)...",
      slotHoldNotice: "Selected slot is temporarily reserved for you for 10:00 minutes.",
      consentGdpr: "I agree to the processing of my data and receiving appointment updates via SMS/Email.",
      confirmBooking: "Confirm Booking Reservation",
      successTitle: "Appointment Confirmed!",
      successRef: "Your Booking Reference Code:",
      smsNotice: "A confirmation SMS and Email have been dispatched."
    },

    approvalPortal: {
      title: "Quote Approval Portal",
      subtitle: "Review the recommended repairs for your vehicle and approve online.",
      authorizedBy: "Digital Authorization Signature:",
      signaturePlaceholder: "Type your full name signature...",
      approveBtn: "Approve Quotation & Authorize Repairs",
      rejectBtn: "Decline Quotation",
      rejectionReasonPlaceholder: "Please let us know why you are declining...",
      approvedSuccess: "Quotation Approved! Workshop staff notified to commence repairs.",
      rejectedSuccess: "Quotation Declined. Our team has been notified."
    },

    trackingPortal: {
      title: "Live Vehicle Repair Status",
      subtitle: "Track the real-time progress of your vehicle in our workshop.",
      currentStage: "Current Workshop Status:",
      mechanicAssigned: "Technician In Charge:",
      estimatedReady: "Estimated Ready Time:"
    },

    superAdmin: {
      title: "SaaS Super Administration",
      subtitle: "Multi-tenant garage onboarding, subscription licensing, and system health.",
      totalGarages: "Active Garages",
      totalRevenue: "Monthly Recurring Revenue",
      activeWorkOrders: "Active Platform Work Orders",
      eInvoicesProcessed: "E-Invoices Processed",
      garagesList: "Subscribed Workshop Tenants",
      onboardGarage: "+ Onboard New Garage",
      plan: "Plan",
      country: "Country",
      status: "Status",
      actions: "Manage"
    },

    aiAssistant: {
      title: "AutoAI Workshop Assistant",
      subtitle: "Intelligent intake & scheduling powered by bounded LLM function calling.",
      chatPlaceholder: "Describe customer symptom (e.g. Squeaking noise when braking at low speed)...",
      send: "Send",
      simulatedFunctions: "Transparent API Calls Made to Central Engine:",
      availableSlotsFound: "Central Engine Slots Recommended:",
      bookThisSlot: "Reserve This Slot in Agenda"
    }
  },

  fr: {
    brandName: "AtelierOS",
    tagline: "Le Système d'Exploitation pour Ateliers Automobiles.",
    underDevBadge: "En cours de développement par l'Association MARS",

    nav: {
      landing: "Présentation",
      calendar: "Planning Atelier",
      workOrders: "Ordres de Réparation",
      mechanicBay: "Tablette Mécanicien",
      customers: "Clients",
      vehicles: "Véhicules",
      quotes: "Devis",
      invoices: "Factures",
      bookingPortal: "Réservation Web Client",
      communications: "Communications",
      superAdmin: "Admin SaaS",
      aiAssistant: "Assistant AutoAI",
      resetDemo: "Réinitialiser Démo",
      tenantSwitch: "Garage Actif :"
    },

    common: {
      search: "Rechercher...",
      filter: "Filtrer",
      all: "Tous",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      confirm: "Confirmer",
      back: "Retour",
      status: "Statut",
      actions: "Actions",
      date: "Date",
      time: "Heure",
      phone: "Téléphone",
      email: "Email",
      address: "Adresse",
      country: "Pays",
      currency: "Devise",
      total: "Total TTC",
      subtotal: "Total HT",
      taxVat: "TVA",
      notes: "Notes",
      viewDetails: "Consulter",
      print: "Imprimer / PDF",
      sendEmail: "Envoyer Email",
      sendSms: "Envoyer SMS",
      sendWhatsApp: "Envoyer WhatsApp",
      close: "Fermer",
      loading: "Chargement...",
      success: "Opération réussie",
      error: "Une erreur est survenue",
      required: "Requis",
      optional: "Optionnel"
    },

    landing: {
      heroTitle: "La Gestion d'Atelier Automobile Haute Précision.",
      heroSubtitle: "Conçu pour la France et la Suisse dès le premier jour. Moteur de réservation central unique, postes mécaniciens sur tablette, facturation transfrontalière et connecteur Chorus Pro.",
      ctaLaunchApp: "Ouvrir l'Atelier",
      ctaCustomerBooking: "Tester la Réservation Web",
      ctaAiReception: "Consulter l'IA Réceptionniste",
      badgeMultiTenant: "Architecture Multi-Garage",
      badgeUnifiedEngine: "Moteur de Réservation Unique",
      badgeTaxReady: "Conforme Fiscalité France & Suisse",
      badgeEinvoice: "Prêt Chorus Pro / Factur-X",

      stat1Number: "1 Moteur",
      stat1Label: "Partagé Garage, Web Client et IA",
      stat2Number: "100%",
      stat2Label: "Sans Conflit de Ponts ou Mécaniciens",
      stat3Number: "< 3 Min",
      stat3Label: "Du Diagnostic au Devis Validé",
      stat4Number: "EUR & CHF",
      stat4Label: "Multi-Devises et TVA Transfrontalière",

      featuresTitle: "Pensé pour la vitesse, la clarté et zéro friction administrative.",
      feat1Title: "Moteur de Planning Central",
      feat1Desc: "Une seule disponibilité partagée entre le planning garage, la prise de rendez-vous en ligne et les assistants IA.",
      feat2Title: "Mode Tablette Poste de Travail",
      feat2Desc: "Boutons tactiles 48px adaptés à l'atelier. Saisie rapide des codes défaut OBD-II, contrôle qualité et photos.",
      feat3Title: "Facturation France & Suisse",
      feat3Desc: "Calcul automatique TVA 20% (France) et 8.1% (Suisse). Factures QR suisses et conformité SIRET / Chorus Pro.",
      feat4Title: "Devis par Lien Magique Sécurisé",
      feat4Desc: "Envoyez le devis par SMS ou Email. Le client valide les pièces et la main d'œuvre en un clic avec signature numérique.",
      feat5Title: "Facturation Électronique Chorus Pro",
      feat5Desc: "Générateur Factur-X / UBL conforme au Portail Public de Facturation (PPF / PDP) avec validation et suivi.",
      feat6Title: "Intake Intelligent par IA",
      feat6Desc: "Compréhension des symptômes client avec appels d'API strictement encadrés.",

      roiTitle: "Estimez Votre Gain de Productivité",
      roiSubtitle: "Découvrez le temps et les revenus administratifs récupérés chaque mois par AtelierOS.",
      roiMechanicsLabel: "Nombre de Mécaniciens :",
      roiMonthlyWorkOrders: "Ordres de Réparation / Mois :",
      roiHoursSaved: "Heures Économisées / Mois :",
      roiRevenueGain: "Gain Financier Estimé :",

      pricingTitle: "Tarification claire et adaptée aux garages modernes.",
      pricingSubtitle: "Basculez entre Euros (€) et Francs Suisses (CHF) à tout moment.",
      tierStarterName: "Starter",
      tierStarterPriceEur: "89 €",
      tierStarterPriceChf: "99 CHF",
      tierStarterPeriod: "/ mois par garage",
      tierStarterDesc: "Pour les petits ateliers indépendants souhaitant digitaliser planning et factures.",
      tierStarterFeat1: "Jusqu'à 3 Mécaniciens & 2 Ponts",
      tierStarterFeat2: "Planning Central & Réservation Web",
      tierStarterFeat3: "Devis, Factures & Export PDF",
      tierStarterFeat4: "Notifications SMS & Email",

      tierProName: "Pro Workshop",
      tierProBadge: "Le Plus Choisi",
      tierProPriceEur: "189 €",
      tierProPriceChf: "199 CHF",
      tierProPeriod: "/ mois par garage",
      tierProDesc: "Pour les garages en pleine expansion nécessitant mode tablette et e-invoicing.",
      tierProFeat1: "Mécaniciens & Ponts Illimités",
      tierProFeat2: "Tablette Atelier & Diagnostic OBD-II",
      tierProFeat3: "Devis validés par lien magique client",
      tierProFeat4: "Connecteur Factur-X & Chorus Pro",
      tierProFeat5: "Facturation QR Suisse (CHF)",

      tierAiName: "AI Enterprise",
      tierAiPriceEur: "299 €",
      tierAiPriceChf: "329 CHF",
      tierAiPeriod: "/ mois par garage",
      tierAiDesc: "Pour les grands centres automobiles et groupes multi-sites avec accueil IA.",
      tierAiFeat1: "Tout le forfait Pro inclus",
      tierAiFeat2: "Réceptionniste IA vocal & textuel",
      tierAiFeat3: "Assistant Diagnostic & Codes OBD",
      tierAiFeat4: "Super Admin Multi-Garages",
      tierAiFeat5: "Support prioritaire & API dédiée"
    },

    calendar: {
      title: "Planning Central de l'Atelier",
      subtitle: "Vue en temps réel des mécaniciens, ponts et rendez-vous sans aucun double créneau.",
      dayView: "Vue Jour",
      weekView: "Vue Semaine",
      bayView: "Vue Ponts & Postes",
      filterMechanic: "Tous les mécaniciens",
      filterBay: "Tous les ponts",
      newAppointment: "+ Nouveau Rendez-vous",
      noAppointments: "Aucun rendez-vous sur ce créneau.",
      conflictWarning: "Conflit détecté ! Mécanicien ou pont déjà occupé.",
      suggestAlternatives: "Créneaux alternatifs disponibles :"
    },

    workOrders: {
      title: "Ordres de Réparation (OR)",
      subtitle: "Cycle complet en 10 étapes de la demande client à la facture électronique.",
      newWorkOrder: "+ Nouvel OR",
      stages: {
        REQUEST: "1. Demande",
        APPOINTMENT: "2. Rendez-vous",
        DIAGNOSIS: "3. Diagnostic",
        QUOTE: "4. Devis",
        AWAITING_APPROVAL: "5. En Attente Accord",
        APPROVED: "6. Accord Client",
        IN_PROGRESS: "7. En Cours Atelier",
        QUALITY_CHECK: "8. Contrôle Qualité",
        READY: "9. Véhicule Prêt",
        DELIVERED: "10. Restitué",
        INVOICED: "Facturé & Réglé"
      }
    },

    mechanicTablet: {
      title: "Poste Tablette Mécanicien",
      subtitle: "Interface tactile grand format pour contrôle atelier, codes OBD-II et pièces.",
      activeVehicle: "Véhicule sur le Pont",
      checklistTitle: "Points de Contrôle Sécurité",
      obdScannerTitle: "Scanner Défauts Diagnostic OBD-II",
      obdCodePlaceholder: "Code OBD (ex: P0300, P0420)...",
      addCode: "Analyser Code",
      suggestedInspection: "Action de diagnostic recommandée :",
      recordLaborTime: "Temps Main d'Œuvre Passé (Minutes) :",
      partsTrackerTitle: "Pièces et Consommables Utilisés",
      addPart: "+ Ajouter Pièce",
      signOffQuality: "Valider Contrôle Qualité & Véhicule Prêt"
    },

    quotes: {
      title: "Devis & Chiffrages",
      subtitle: "Main d'œuvre et pièces avec validation client par lien magique.",
      createQuote: "+ Créer Devis",
      quoteNumber: "N° Devis",
      customer: "Client",
      vehicle: "Véhicule",
      amount: "Montant TTC",
      status: "Statut",
      validUntil: "Validité",
      sendApprovalLink: "Envoyer Lien Accord Client",
      copyLink: "Copier Lien",
      linkCopied: "Lien magique copié dans le presse-papier !"
    },

    invoices: {
      title: "Factures & Facturation Transfrontalière",
      subtitle: "France (TVA 20%) & Suisse (TVA 8.1%) avec transmission Chorus Pro / Factur-X.",
      createInvoice: "+ Créer Facture",
      invoiceNumber: "N° Facture",
      eInvoiceStatus: "Statut Facturation Électronique",
      submitChorusPro: "Transmettre Chorus Pro / PPF",
      previewFacturX: "Consulter Payload XML / Factur-X",
      swissQrBill: "Générer Facture QR Suisse",
      markPaid: "Encaisser / Marquer Payée"
    },

    bookingPortal: {
      title: "Prise de Rendez-vous en Ligne",
      subtitle: "Réservez votre intervention en 60 secondes selon les disponibilités réelles.",
      step1: "1. Identification du Véhicule",
      step2: "2. Choix de la Prestation",
      step3: "3. Choix de la Date & Heure",
      step4: "4. Coordonnées & Confirmation",
      platePlaceholder: "Numéro d'immatriculation (ex: AB-123-CD ou GE 452 891)...",
      makeModelPlaceholder: "Ou Marque & Modèle (ex: Peugeot 3008)...",
      slotHoldNotice: "Ce créneau vous est réservé pendant 10:00 minutes.",
      consentGdpr: "J'accepte le traitement de mes données et la réception de notifications SMS/Email.",
      confirmBooking: "Confirmer la Réservation",
      successTitle: "Rendez-vous Confirmé !",
      successRef: "Référence de votre dossier :",
      smsNotice: "Un SMS et un Email de confirmation vous ont été envoyés."
    },

    approvalPortal: {
      title: "Portail Accord Devis Client",
      subtitle: "Consultez le détail des réparations recommandées et donnez votre accord en ligne.",
      authorizedBy: "Signature d'autorisation numérique :",
      signaturePlaceholder: "Saisissez votre prénom et nom...",
      approveBtn: "Valider le Devis & Autoriser les Travaux",
      rejectBtn: "Refuser le Devis",
      rejectionReasonPlaceholder: "Précisez le motif de votre refus...",
      approvedSuccess: "Devis Validé ! L'équipe de l'atelier a été informée pour débuter les travaux.",
      rejectedSuccess: "Devis Refusé. Nos équipes en ont pris note."
    },

    trackingPortal: {
      title: "Suivi Réparation en Temps Réel",
      subtitle: "Suivez l'avancement de votre véhicule au sein de notre atelier.",
      currentStage: "Statut Actuel de l'Intervention :",
      mechanicAssigned: "Technicien Référent :",
      estimatedReady: "Restitution Estimée :"
    },

    superAdmin: {
      title: "Super Administration SaaS",
      subtitle: "Gestion multi-garages, licences d'abonnement et santé de la plateforme.",
      totalGarages: "Garages Abonnés",
      totalRevenue: "Revenu Récurrent Mensuel (MRR)",
      activeWorkOrders: "Ordres de Réparation Actifs",
      eInvoicesProcessed: "Factures Électroniques Transmises",
      garagesList: "Garages & Concessions Enregistrés",
      onboardGarage: "+ Enregistrer Nouveau Garage",
      plan: "Forfait",
      country: "Pays",
      status: "Statut",
      actions: "Gérer"
    },

    aiAssistant: {
      title: "Assistant Atelier AutoAI",
      subtitle: "Prise en charge intelligente des pannes via appels d'API encadrés.",
      chatPlaceholder: "Décrivez le symptôme (ex: Bruit de grincement au freinage à basse vitesse)...",
      send: "Envoyer",
      simulatedFunctions: "Appels d'API Transparentes Réalisés :",
      availableSlotsFound: "Créneaux Disponibles Détectés :",
      bookThisSlot: "Réserver ce créneau au planning"
    }
  },

  'fr-CH': {
    brandName: "AtelierOS",
    tagline: "Le Système d'Exploitation pour Garages Automobiles (Suisse & Transfrontalier).",
    underDevBadge: "Développé par l'Association MARS",
    nav: {
      landing: "Aperçu",
      calendar: "Agenda Garage",
      workOrders: "Ordres de Réparation",
      mechanicBay: "Tablette Poste Atelier",
      customers: "Clients",
      vehicles: "Véhicules",
      quotes: "Devis",
      invoices: "Factures & QR-Facture",
      bookingPortal: "Prise de RDV Web",
      communications: "Communications",
      superAdmin: "Admin SaaS",
      aiAssistant: "Assistant AutoAI",
      resetDemo: "Réinitialiser Démo",
      tenantSwitch: "Garage Actif :"
    },
    common: {
      search: "Rechercher...",
      filter: "Filtrer",
      all: "Tous",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      confirm: "Confirmer",
      back: "Retour",
      status: "Statut",
      actions: "Actions",
      date: "Date",
      time: "Heure",
      phone: "Téléphone (+41)",
      email: "Email",
      address: "Adresse",
      country: "Pays (CH)",
      currency: "Devise (CHF)",
      total: "Total TTC (CHF)",
      subtotal: "Total HT",
      taxVat: "TVA CH (8.1%)",
      notes: "Remarques",
      viewDetails: "Voir Détails",
      print: "Imprimer / QR-Facture",
      sendEmail: "Envoyer Email",
      sendSms: "Envoyer SMS",
      sendWhatsApp: "Envoyer WhatsApp",
      close: "Fermer",
      loading: "Chargement...",
      success: "Opération validée",
      error: "Erreur survenue",
      required: "Requis",
      optional: "Facultatif"
    }
  },

  'de-CH': {
    brandName: "AtelierOS",
    tagline: "Das Werkstatt-Betriebssystem für die Schweiz & Europa.",
    underDevBadge: "Entwickelt von MARS Association",
    nav: {
      landing: "Übersicht",
      calendar: "Werkstatt-Kalender",
      workOrders: "Reparaturaufträge",
      mechanicBay: "Mechaniker Tablet",
      customers: "Kunden",
      vehicles: "Fahrzeuge",
      quotes: "Kostenvoranschläge",
      invoices: "Rechnungen & QR-Rechnung",
      bookingPortal: "Online-Terminbuchung",
      communications: "Mitteilungen",
      superAdmin: "SaaS Admin",
      aiAssistant: "AutoAI Assistent",
      resetDemo: "Demo zurücksetzen",
      tenantSwitch: "Aktive Werkstatt:"
    },
    common: {
      search: "Suchen...",
      filter: "Filter",
      all: "Alle",
      save: "Speichern",
      cancel: "Abbrechen",
      delete: "Löschen",
      edit: "Bearbeiten",
      confirm: "Bestätigen",
      back: "Zurück",
      status: "Status",
      actions: "Aktionen",
      date: "Datum",
      time: "Uhrzeit",
      phone: "Telefon (+41)",
      email: "E-Mail",
      address: "Adresse",
      country: "Land (CH)",
      currency: "Währung (CHF)",
      total: "Gesamtbetrag (CHF)",
      subtotal: "Nettobetrag",
      taxVat: "MWST CH (8.1%)",
      notes: "Notizen",
      viewDetails: "Details",
      print: "Drucken / QR-Rechnung",
      sendEmail: "E-Mail senden",
      sendSms: "SMS senden",
      sendWhatsApp: "WhatsApp senden",
      close: "Schließen",
      loading: "Laden...",
      success: "Erfolgreich ausgeführt",
      error: "Fehler aufgetreten",
      required: "Erforderlich",
      optional: "Optional"
    }
  }
};


// ==========================================================================
// AtelierOS - Confirmation Dialog Modal
// ==========================================================================






const ConfirmationModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="apple-modal-overlay" onClick={onCancel}>
      <div 
        className="apple-modal-content p-6 max-w-md animate-fade-in" 
        onClick={e => e.stopPropagation()}
        style={{ padding: '24px', borderRadius: '20px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: isDestructive ? 'rgba(255, 69, 58, 0.15)' : 'rgba(0, 113, 227, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isDestructive ? '#ff453a' : '#0071e3'
            }}>
              <AlertTriangle size={20} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1d1d1f' }}>{title}</h3>
          </div>
          <button 
            onClick={onCancel}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.5, marginBottom: '24px' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button 
            className="apple-btn-secondary" 
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button 
            className={isDestructive ? 'apple-btn-danger' : 'apple-btn-primary'}
            onClick={() => {
              onConfirm();
              onCancel();
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================================================
// AtelierOS - Skeleton Shimmer Loading Placeholder Component
// ==========================================================================





const Skeleton = ({
  width = '100%',
  height = '20px',
  borderRadius = '8px',
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`skeleton-shimmer ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
    />
  );
};

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px' }}>
      <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #e5e5ea', paddingBottom: '12px' }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} width={`${100 / columns}%`} height="24px" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} width={`${100 / columns}%`} height="18px" />
          ))}
        </div>
      ))}
    </div>
  );
};


// ==========================================================================
// AtelierOS - Legal Modals (Privacy Policy, GDPR, Terms of Service)
// ==========================================================================






const LegalModal = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="apple-modal-overlay" onClick={onClose}>
      <div 
        className="apple-modal-content p-6 max-w-2xl animate-fade-in" 
        onClick={e => e.stopPropagation()}
        style={{ padding: '32px', borderRadius: '24px', maxWidth: '680px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 113, 227, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0071e3'
            }}>
              {type === 'PRIVACY' ? <ShieldCheck size={24} /> : <FileText size={24} />}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1d1d1f' }}>
                {type === 'PRIVACY' && 'GDPR & Data Privacy Policy'}
                {type === 'TERMS' && 'Terms of Service & SaaS Agreement'}
                {type === 'EINVOICE_INFO' && 'French & Swiss E-Invoicing Compliance'}
              </h2>
              <span style={{ fontSize: '12px', color: '#86868b' }}>
                Developed by MARS Association • Compliant with EU / Swiss Data Laws
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}
          >
            <X size={22} />
          </button>
        </div>

        <div style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px', color: '#333336', fontSize: '14px', lineHeight: 1.6 }}>
          {type === 'PRIVACY' && (
            <div>
              <h4 style={{ fontWeight: 600, marginTop: '12px', color: '#1d1d1f' }}>1. EU Hosting & Data Sovereignty</h4>
              <p>All tenant databases, customer vehicle service histories, quotes, and billing snapshots are hosted exclusively within certified European Union datacenters (Paris / Frankfurt) and Swiss sovereign data boundaries, complying fully with EU Regulation 2016/679 (GDPR) and the Swiss Federal Act on Data Protection (FADP/nLPD).</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>2. Right to Access, Export & Erasure</h4>
              <p>Automotive workshop customers have the full legal right to request a complete JSON of their service records or request immediate anonymization/deletion of contact details upon written notice.</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>3. Customer Consent Management</h4>
              <p>Transactional communications (Appointment confirmations, Quote approval links, Vehicle Ready notifications) are dispatched strictly based on explicit customer opt-in consent recorded at intake.</p>
            </div>
          )}

          {type === 'TERMS' && (
            <div>
              <h4 style={{ fontWeight: 600, marginTop: '12px', color: '#1d1d1f' }}>1. Platform License & SLA</h4>
              <p>AtelierOS provides multi-tenant SaaS operating software for automotive repair facilities. Uptime commitment is 99.9% with continuous automated backups.</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>2. AI Assistant Boundaries & Disclaimers</h4>
              <p>The AutoAI intake and diagnostic assistant functions purely triaging tool via bounded API calls. Official mechanical diagnostics, parts quotes, and quality control sign-offs remain the sole responsibility of the certified workshop technician.</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>3. Multi-Tenant Data Isolation</h4>
              <p>Each garage tenant possesses strict row-level cryptographic isolation. No garage can view or access customer records, pricing, or calendar events of another facility.</p>
            </div>
          )}

          {type === 'EINVOICE_INFO' && (
            <div>
              <h4 style={{ fontWeight: 600, marginTop: '12px', color: '#1d1d1f' }}>1. France: Chorus Pro & Factur-X / PPF</h4>
              <p>AtelierOS generates standard Factur-X (CII hybrid XML/PDF) and UBL 2.1 payloads ready for direct transmission to the French Portail Public de Facturation (PPF) and registered Plateformes de Dématérialisation Partenaire (PDP).</p>

              <h4 style={{ fontWeight: 600, marginTop: '16px', color: '#1d1d1f' }}>2. Switzerland: QR-Bill Standard</h4>
              <p>Invoices issued under Swiss jurisdiction (CHF) feature standardized QR-Bill data payloads including structured reference numbers (QR-IBAN) conforming to Swiss Payment Standards 2024.</p>
            </div>
          )}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="apple-btn-primary" onClick={onClose}>
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================================================
// AtelierOS - Apple Frosted Acrylic Navigation Header & System Bar
// ==========================================================================



  Wrench, 
  Calendar, 
  ClipboardList, 
  Tablet, 
  Users, 
  Car, 
  FileCheck2, 
  Receipt, 
  Globe2, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  ChevronDown, 
  MessageSquare,
  Building2,
  ExternalLink
} from 'lucide-react';






const Header = ({
  currentView,
  onNavigate,
  activeTenant,
  onTenantChange,
  onOpenAiAssistant,
  onResetDemo,
  currentLanguage,
  onLanguageChange
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const tenants = StorageService.getTenants();
  const [tenantDropdownOpen, setTenantDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: t.nav.landing, icon: Globe2 },
    { id: 'calendar', label: t.nav.calendar, icon: CalendarIcon },
    { id: 'work-orders', label: t.nav.workOrders, icon: ClipboardList },
    { id: 'mechanic-bay', label: t.nav.mechanicBay, icon: Tablet, badge: 'iPad' },
    { id: 'customers', label: t.nav.customers, icon: Users },
    { id: 'vehicles', label: t.nav.vehicles, icon: Car },
    { id: 'quotes', label: t.nav.quotes, icon: FileCheck2 },
    { id: 'invoices', label: t.nav.invoices, icon: Receipt },
    { id: 'booking-portal', label: t.nav.bookingPortal, icon: ExternalLink, highlight: true },
    { id: 'comms-hub', label: t.nav.communications, icon: MessageSquare },
    { id: 'super-admin', label: t.nav.superAdmin, icon: ShieldCheck }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      padding: '0 16px'
    }}>
      {/* Top Bar: Brand, Tenant Switcher, Language, AI & Reset */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* Brand & Mars Association Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            onClick={() => onNavigate('landing')}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              textDecoration: 'none' 
            }}
          >
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
            }}>
              <Wrench size={18} />
            </div>
            <div>
              <span style={{ fontSize: '17px', fontWeight: 700, letterSpacing: '-0.02em', color: '#1d1d1f' }}>
                Atelier<span style={{ color: '#0071e3' }}>OS</span>
              </span>
            </div>
          </div>

          <span className="apple-badge apple-badge-neutral" style={{ fontSize: '11px', display: 'none', lg: 'inline-flex' }}>
            {t.underDevBadge}
          </span>
        </div>

        {/* Right Tools: Tenant Switcher, Currency, Language, AI Button, Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Tenant Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setTenantDropdownOpen(!tenantDropdownOpen)}
              className="apple-btn-secondary"
              style={{
                fontSize: '13px',
                padding: '6px 12px',
                minHeight: '34px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Building2 size={14} color="#0071e3" />
              <span style={{ fontWeight: 600, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {activeTenant.name}
              </span>
              <span className={`apple-badge ${activeTenant.country === 'FR' ? 'apple-badge-blue' : 'apple-badge-amber'}`} style={{ padding: '2px 6px', fontSize: '10px' }}>
                {activeTenant.country} ({activeTenant.currency})
              </span>
              <ChevronDown size={14} />
            </button>

            {tenantDropdownOpen && (
              <div 
                className="apple-card"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  width: '280px',
                  padding: '8px',
                  zIndex: 2000,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#86868b', padding: '6px 8px', textTransform: 'uppercase' }}>
                  {t.nav.tenantSwitch}
                </div>
                {tenants.map(tenant => (
                  <div
                    key={tenant.id}
                    onClick={() => {
                      onTenantChange(tenant);
                      setTenantDropdownOpen(false);
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: tenant.id === activeTenant.id ? 'rgba(0, 113, 227, 0.08)' : 'transparent',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '2px',
                      transition: 'background 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: '#1d1d1f' }}>{tenant.name}</span>
                      <span className={`apple-badge ${tenant.country === 'FR' ? 'apple-badge-blue' : 'apple-badge-amber'}`} style={{ fontSize: '10px', padding: '2px 6px' }}>
                        {tenant.country} • {tenant.currency}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#86868b' }}>
                      {tenant.address.city}, {tenant.country === 'FR' ? `SIRET: ${tenant.taxIdentity.siret?.substring(0, 9)}...` : `UID: ${tenant.taxIdentity.uid}`}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="apple-btn-secondary"
              style={{
                fontSize: '13px',
                padding: '6px 10px',
                minHeight: '34px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Globe2 size={14} />
              <span style={{ textTransform: 'uppercase', fontWeight: 600 }}>{currentLanguage}</span>
              <ChevronDown size={12} />
            </button>

            {langDropdownOpen && (
              <div 
                className="apple-card"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  width: '180px',
                  padding: '6px',
                  zIndex: 2000,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}
              >
                {[
                  { id: 'en', label: 'English (Default)' },
                  { id: 'fr', label: 'Français (France)' },
                  { id: 'fr-CH', label: 'Français (Suisse)' },
                  { id: 'de-CH', label: 'Deutsch (Schweiz)' }
                ].map(l => (
                  <div
                    key={l.id}
                    onClick={() => {
                      onLanguageChange(l.id);
                      setLangDropdownOpen(false);
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: currentLanguage === l.id ? 600 : 400,
                      color: currentLanguage === l.id ? '#0071e3' : '#1d1d1f',
                      background: currentLanguage === l.id ? 'rgba(0, 113, 227, 0.08)' : 'transparent'
                    }}
                  >
                    {l.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            className="apple-btn-primary"
            style={{
              background: 'linear-gradient(135deg, #0071e3 0%, #64d2ff 100%)',
              fontSize: '13px',
              padding: '6px 14px',
              minHeight: '34px',
              boxShadow: '0 2px 10px rgba(0, 113, 227, 0.3)'
            }}
          >
            <Sparkles size={14} />
            <span>AutoAI</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetDemo}
            className="apple-btn-secondary"
            title="Reset to clean France & Switzerland demo fixtures"
            style={{
              fontSize: '12px',
              padding: '6px 10px',
              minHeight: '34px',
              color: '#6e6e73'
            }}
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Sub Bar: Horizontal Navigation Tabs (Hidden scrollbar on mobile/tablet) */}
      <div 
        className="scrollbar-none"
        style={{
          display: 'flex',
          gap: '4px',
          overflowX: 'auto',
          maxWidth: '1600px',
          margin: '0 auto',
          paddingBottom: '6px'
        }}
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? 'rgba(0, 0, 0, 0.06)' : 'transparent',
                color: isActive ? '#0071e3' : '#6e6e73',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={15} color={isActive ? '#0071e3' : '#86868b'} />
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  backgroundColor: '#0071e3',
                  color: '#fff',
                  padding: '1px 5px',
                  borderRadius: '4px'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};


// ==========================================================================
// AtelierOS - High-End Apple-Inspired Landing Page & Product Showcase
// ==========================================================================



  Sparkles, 
  ArrowRight, 
  Calendar, 
  Tablet, 
  Receipt, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Layers, 
  Globe2, 
  Calculator, 
  Wrench,
  Car,
  FileCheck2,
  Lock,
  ChevronRight
} from 'lucide-react';





const LandingPage = ({
  onLaunchApp,
  onLaunchBooking,
  onOpenAi,
  onOpenLegal,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const tl = t.landing;

  // ROI Calculator State
  const [mechanicsCount, setMechanicsCount] = useState(4);
  const [monthlyOrders, setMonthlyOrders] = useState(120);
  const [pricingCurrency, setPricingCurrency] = useState('EUR');

  // ROI Math
  const hoursSavedPerMonth = Math.round(monthlyOrders * 0.75 + mechanicsCount * 8);
  const avgHourlyBillingRate = pricingCurrency === 'EUR' ? 88 : 145;
  const revenueGain = Math.round(hoursSavedPerMonth * avgHourlyBillingRate * 0.65);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', color: '#1d1d1f' }}>
      {/* Hero Section */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Top Badge */}
        <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
          <div className="apple-badge apple-badge-blue" style={{ padding: '6px 16px', fontSize: '13px', borderRadius: '9999px', boxShadow: '0 2px 10px rgba(0, 113, 227, 0.12)' }}>
            <Sparkles size={14} />
            <span>{tl.badgeUnifiedEngine}</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.08,
          marginBottom: '24px',
          color: '#1d1d1f'
        }}>
          {tl.heroTitle}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(17px, 2vw, 21px)',
          lineHeight: 1.5,
          color: '#6e6e73',
          maxWidth: '780px',
          margin: '0 auto 40px',
          fontWeight: 400
        }}>
          {tl.heroSubtitle}
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '14px',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '50px'
        }}>
          <button 
            onClick={onLaunchApp}
            className="apple-btn-primary" 
            style={{ fontSize: '16px', padding: '14px 28px', minHeight: '48px' }}
          >
            <span>{tl.ctaLaunchApp}</span>
            <ArrowRight size={18} />
          </button>

          <button 
            onClick={onLaunchBooking}
            className="apple-btn-secondary"
            style={{ fontSize: '16px', padding: '14px 24px', minHeight: '48px', background: '#ffffff' }}
          >
            <span>{tl.ctaCustomerBooking}</span>
          </button>

          <button 
            onClick={onOpenAi}
            className="apple-btn-secondary"
            style={{ fontSize: '16px', padding: '14px 22px', minHeight: '48px', background: 'rgba(0, 113, 227, 0.08)', color: '#0071e3', borderColor: 'rgba(0, 113, 227, 0.2)' }}
          >
            <Sparkles size={16} />
            <span>{tl.ctaAiReception}</span>
          </button>
        </div>

        {/* Metric Badges */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '30px',
          textAlign: 'left'
        }}>
          {[
            { num: tl.stat1Number, label: tl.stat1Label, icon: Layers },
            { num: tl.stat2Number, label: tl.stat2Label, icon: ShieldCheck },
            { num: tl.stat3Number, label: tl.stat3Label, icon: Zap },
            { num: tl.stat4Number, label: tl.stat4Label, icon: Globe2 }
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="apple-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#0071e3' }}>{s.num}</span>
                  <Icon size={20} color="#86868b" />
                </div>
                <span style={{ fontSize: '13px', color: '#6e6e73', fontWeight: 500 }}>{s.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Feature Architecture Grid */}
      <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            {tl.featuresTitle}
          </h2>
          <p style={{ color: '#6e6e73', fontSize: '16px' }}>
            Built on a modular, isolated multi-tenant architecture designed to scale seamlessly across garages.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
          {[
            { title: tl.feat1Title, desc: tl.feat1Desc, icon: Calendar, color: '#0071e3' },
            { title: tl.feat2Title, desc: tl.feat2Desc, icon: Tablet, color: '#30d158' },
            { title: tl.feat3Title, desc: tl.feat3Desc, icon: Globe2, color: '#ff9f0a' },
            { title: tl.feat4Title, desc: tl.feat4Desc, icon: FileCheck2, color: '#bf5af2' },
            { title: tl.feat5Title, desc: tl.feat5Desc, icon: Receipt, color: '#64d2ff' },
            { title: tl.feat6Title, desc: tl.feat6Desc, icon: Sparkles, color: '#ff453a' }
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <div key={idx} className="apple-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  backgroundColor: `${f.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: f.color
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '19px', fontWeight: 600, color: '#1d1d1f' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Workshop ROI Calculator */}
      <section style={{ padding: '60px 24px', maxWidth: '1000px', margin: '0 auto' }}>
        <div className="apple-card" style={{
          padding: '40px',
          background: 'linear-gradient(135deg, #1d1d1f 0%, #2c2c2e 100%)',
          color: '#ffffff',
          borderRadius: '28px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <Calculator size={28} color="#64d2ff" />
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 700 }}>{tl.roiTitle}</h2>
              <p style={{ fontSize: '14px', color: '#a1a1a6' }}>{tl.roiSubtitle}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '30px' }}>
            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', color: '#e5e5ea' }}>{tl.roiMechanicsLabel}</label>
                  <span style={{ fontWeight: 700, color: '#64d2ff' }}>{mechanicsCount} mechanics</span>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={20} 
                  value={mechanicsCount}
                  onChange={e => setMechanicsCount(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0071e3' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', color: '#e5e5ea' }}>{tl.roiMonthlyWorkOrders}</label>
                  <span style={{ fontWeight: 700, color: '#64d2ff' }}>{monthlyOrders} orders</span>
                </div>
                <input 
                  type="range" 
                  min={20} 
                  max={500} 
                  step={10}
                  value={monthlyOrders}
                  onChange={e => setMonthlyOrders(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0071e3' }}
                />
              </div>
            </div>

            {/* Results Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '24px',
              borderRadius: '18px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <div>
                <span style={{ fontSize: '12px', color: '#a1a1a6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {tl.roiHoursSaved}
                </span>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#30d158' }}>
                  ~{hoursSavedPerMonth} hours
                </div>
              </div>

              <div>
                <span style={{ fontSize: '12px', color: '#a1a1a6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {tl.roiRevenueGain}
                </span>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff' }}>
                  +{revenueGain.toLocaleString()} {pricingCurrency === 'EUR' ? '€' : 'CHF'}
                </div>
                <span style={{ fontSize: '11px', color: '#a1a1a6' }}>
                  Based on recovered billable bay hours & reduced administrative phone tag.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{ padding: '60px 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            {tl.pricingTitle}
          </h2>
          <p style={{ color: '#6e6e73', fontSize: '16px', marginBottom: '20px' }}>
            {tl.pricingSubtitle}
          </p>

          {/* Currency Toggle */}
          <div style={{ display: 'inline-flex', background: 'rgba(0,0,0,0.06)', padding: '4px', borderRadius: '9999px' }}>
            <button
              onClick={() => setPricingCurrency('EUR')}
              style={{
                padding: '6px 18px',
                borderRadius: '9999px',
                border: 'none',
                background: pricingCurrency === 'EUR' ? '#ffffff' : 'transparent',
                fontWeight: 600,
                fontSize: '13px',
                color: pricingCurrency === 'EUR' ? '#0071e3' : '#6e6e73',
                cursor: 'pointer',
                boxShadow: pricingCurrency === 'EUR' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              EUR (€ France)
            </button>
            <button
              onClick={() => setPricingCurrency('CHF')}
              style={{
                padding: '6px 18px',
                borderRadius: '9999px',
                border: 'none',
                background: pricingCurrency === 'CHF' ? '#ffffff' : 'transparent',
                fontWeight: 600,
                fontSize: '13px',
                color: pricingCurrency === 'CHF' ? '#0071e3' : '#6e6e73',
                cursor: 'pointer',
                boxShadow: pricingCurrency === 'CHF' ? '0 2px 6px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              CHF (Switzerland)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Starter */}
          <div className="apple-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{tl.tierStarterName}</h3>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px', minHeight: '36px' }}>{tl.tierStarterDesc}</p>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '38px', fontWeight: 800, color: '#1d1d1f' }}>
                {pricingCurrency === 'EUR' ? tl.tierStarterPriceEur : tl.tierStarterPriceChf}
              </span>
              <span style={{ fontSize: '13px', color: '#86868b' }}> {tl.tierStarterPeriod}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1 }}>
              {[tl.tierStarterFeat1, tl.tierStarterFeat2, tl.tierStarterFeat3, tl.tierStarterFeat4].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#333336' }}>
                  <CheckCircle2 size={16} color="#30d158" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <button onClick={onLaunchApp} className="apple-btn-secondary" style={{ width: '100%' }}>
              Get Started with Starter
            </button>
          </div>

          {/* Pro */}
          <div className="apple-card" style={{
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            border: '2px solid #0071e3',
            position: 'relative',
            boxShadow: '0 12px 40px rgba(0, 113, 227, 0.12)'
          }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#0071e3',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 14px',
              borderRadius: '9999px',
              letterSpacing: '0.04em'
            }}>
              {tl.tierProBadge}
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{tl.tierProName}</h3>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px', minHeight: '36px' }}>{tl.tierProDesc}</p>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '38px', fontWeight: 800, color: '#1d1d1f' }}>
                {pricingCurrency === 'EUR' ? tl.tierProPriceEur : tl.tierProPriceChf}
              </span>
              <span style={{ fontSize: '13px', color: '#86868b' }}> {tl.tierProPeriod}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1 }}>
              {[tl.tierProFeat1, tl.tierProFeat2, tl.tierProFeat3, tl.tierProFeat4, tl.tierProFeat5].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#333336' }}>
                  <CheckCircle2 size={16} color="#0071e3" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <button onClick={onLaunchApp} className="apple-btn-primary" style={{ width: '100%' }}>
              Launch Pro Workshop
            </button>
          </div>

          {/* AI Enterprise */}
          <div className="apple-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>{tl.tierAiName}</h3>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px', minHeight: '36px' }}>{tl.tierAiDesc}</p>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '38px', fontWeight: 800, color: '#1d1d1f' }}>
                {pricingCurrency === 'EUR' ? tl.tierAiPriceEur : tl.tierAiPriceChf}
              </span>
              <span style={{ fontSize: '13px', color: '#86868b' }}> {tl.tierAiPeriod}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', flex: 1 }}>
              {[tl.tierAiFeat1, tl.tierAiFeat2, tl.tierAiFeat3, tl.tierAiFeat4, tl.tierAiFeat5].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#333336' }}>
                  <CheckCircle2 size={16} color="#bf5af2" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
            <button onClick={onOpenAi} className="apple-btn-secondary" style={{ width: '100%', borderColor: '#bf5af2', color: '#bf5af2' }}>
              Test AI Receptionist
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e5ea',
        padding: '40px 24px',
        color: '#6e6e73',
        fontSize: '13px'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '15px', marginBottom: '4px' }}>
              AtelierOS • Auto Workshop SaaS
            </div>
            <span>{t.underDevBadge} • Lead Client: Luca Sigon</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onOpenLegal('PRIVACY')}
              style={{ background: 'none', border: 'none', color: '#0071e3', cursor: 'pointer', fontSize: '13px' }}
            >
              Privacy Policy (GDPR)
            </button>
            <button 
              onClick={() => onOpenLegal('TERMS')}
              style={{ background: 'none', border: 'none', color: '#0071e3', cursor: 'pointer', fontSize: '13px' }}
            >
              Terms of Service
            </button>
            <button 
              onClick={() => onOpenLegal('EINVOICE_INFO')}
              style={{ background: 'none', border: 'none', color: '#0071e3', cursor: 'pointer', fontSize: '13px' }}
            >
              Chorus Pro / Factur-X Compliance
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};


// ==========================================================================
// AtelierOS - Workshop Staff Calendar & Central Scheduling Agenda
// ==========================================================================



  Calendar, 
  Clock, 
  User, 
  Wrench, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Car, 
  Filter,
  Layers
} from 'lucide-react';







const StaffCalendar = ({
  activeTenant,
  currentLanguage,
  onSelectWorkOrder
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const tc = t.calendar;

  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState('DAY');
  const [selectedMechanicFilter, setSelectedMechanicFilter] = useState('ALL');
  const [selectedBayFilter, setSelectedBayFilter] = useState('ALL');
  
  const [appointments, setAppointments] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [bays, setBays] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  // Modal State for New Appointment
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formCustomerId, setFormCustomerId] = useState('');
  const [formVehicleId, setFormVehicleId] = useState('');
  const [formServiceId, setFormServiceId] = useState('');
  const [formMechanicId, setFormMechanicId] = useState('');
  const [formBayId, setFormBayId] = useState('');
  const [formDate, setFormDate] = useState(currentDate);
  const [formStartTime, setFormStartTime] = useState('09:00');
  const [formEndTime, setFormEndTime] = useState('10:00');
  const [formNotes, setFormNotes] = useState('');

  const [conflictError, setConflictError] = useState(null);
  const [suggestedSlots, setSuggestedSlots] = useState([]);

  const loadData = () => {
    setAppointments(StorageService.getAppointments(activeTenant.id));
    setMechanics(StorageService.getMechanics(activeTenant.id));
    setBays(StorageService.getBays(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setServices(StorageService.getServices(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  // Filter appointments for active date and filters
  const filteredAppointments = appointments.filter(app => {
    if (app.date !== currentDate) return false;
    if (selectedMechanicFilter !== 'ALL' && app.mechanicId !== selectedMechanicFilter) return false;
    if (selectedBayFilter !== 'ALL' && app.bayId !== selectedBayFilter) return false;
    return true;
  });

  // Handle service selection auto duration
  const handleServiceChange = (srvId: string) => {
    setFormServiceId(srvId);
    const s = services.find(item => item.id === srvId);
    if (s) {
      const startMins = SchedulingService.timeToMinutes(formStartTime);
      const endMins = startMins + s.estimatedDurationMin;
      setFormEndTime(SchedulingService.minutesToTime(endMins));

      // Check available alternative slots automatically
      const alt = SchedulingService.getAvailableSlots(activeTenant.id, srvId, formDate);
      setSuggestedSlots(alt.slice(0, 3));
    }
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setConflictError(null);

    // Validate conflict using Central Scheduling Engine
    const conflict = SchedulingService.checkConflict({
      tenantId: activeTenant.id,
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      mechanicId: formMechanicId,
      bayId: formBayId
    });

    if (conflict.hasConflict) {
      setConflictError(conflict.reason || tc.conflictWarning);
      const alt = SchedulingService.getAvailableSlots(activeTenant.id, formServiceId, formDate);
      setSuggestedSlots(alt.slice(0, 3));
      return;
    }

    // Confirm Appointment
    SchedulingService.confirmAppointment({
      tenantId: activeTenant.id,
      customerId: formCustomerId,
      vehicleId: formVehicleId,
      serviceId: formServiceId,
      mechanicId: formMechanicId,
      bayId: formBayId,
      date: formDate,
      startTime: formStartTime,
      endTime: formEndTime,
      source: 'STAFF',
      intakeNotes: formNotes
    });

    loadData();
    setIsModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header Controls */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{tc.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{tc.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Date Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ffffff', border: '1px solid #e5e5ea', borderRadius: '9999px', padding: '4px 10px' }}>
            <button 
              onClick={() => {
                const prev = new Date(new Date(currentDate).getTime() - 86400000).toISOString().split('T')[0];
                setCurrentDate(prev);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <ChevronLeft size={16} />
            </button>
            <input 
              type="date" 
              value={currentDate} 
              onChange={e => setCurrentDate(e.target.value)}
              style={{ border: 'none', background: 'transparent', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}
            />
            <button 
              onClick={() => {
                const next = new Date(new Date(currentDate).getTime() + 86400000).toISOString().split('T')[0];
                setCurrentDate(next);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Filters */}
          <select 
            value={selectedMechanicFilter} 
            onChange={e => setSelectedMechanicFilter(e.target.value)}
            className="apple-card"
            style={{ padding: '8px 12px', fontSize: '13px', borderRadius: '9999px', border: '1px solid #e5e5ea', cursor: 'pointer' }}
          >
            <option value="ALL">{tc.filterMechanic}</option>
            {mechanics.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>

          <select 
            value={selectedBayFilter} 
            onChange={e => setSelectedBayFilter(e.target.value)}
            className="apple-card"
            style={{ padding: '8px 12px', fontSize: '13px', borderRadius: '9999px', border: '1px solid #e5e5ea', cursor: 'pointer' }}
          >
            <option value="ALL">{tc.filterBay}</option>
            {bays.map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>

          <button 
            onClick={() => {
              setFormDate(currentDate);
              setFormCustomerId(customers[0]?.id || '');
              setFormVehicleId(vehicles[0]?.id || '');
              setFormServiceId(services[0]?.id || '');
              setFormMechanicId(mechanics[0]?.id || '');
              setFormBayId(bays[0]?.id || '');
              setConflictError(null);
              setIsModalOpen(true);
            }}
            className="apple-btn-primary"
          >
            <Plus size={16} />
            <span>{tc.newAppointment}</span>
          </button>
        </div>
      </div>

      {/* Main Agenda Grid */}
      <div className="apple-card" style={{ padding: '24px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e5e5ea', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarIcon size={18} color="#0071e3" />
            <span style={{ fontWeight: 600, fontSize: '16px' }}>
              Schedule for {new Date(currentDate).toLocaleDateString(currentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          <span className="apple-badge apple-badge-blue">
            {filteredAppointments.length} Appointments Booked
          </span>
        </div>

        {filteredAppointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#86868b' }}>
            <CalendarIcon size={48} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: '16px', fontWeight: 500 }}>{tc.noAppointments}</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="apple-btn-secondary" 
              style={{ marginTop: '16px' }}
            >
              <Plus size={14} />
              <span>Schedule First Appointment</span>
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
            {filteredAppointments.map(app => {
              const customer = customers.find(c => c.id === app.customerId);
              const vehicle = vehicles.find(v => v.id === app.vehicleId);
              const service = services.find(s => s.id === app.serviceId);
              const mechanic = mechanics.find(m => m.id === app.mechanicId);
              const bay = bays.find(b => b.id === app.bayId);

              return (
                <div 
                  key={app.id} 
                  className="apple-card"
                  style={{
                    padding: '18px',
                    border: '1px solid #e5e5ea',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    borderLeft: '4px solid #0071e3'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '15px', color: '#0071e3' }}>
                      <Clock size={15} />
                      <span>{app.startTime} - {app.endTime}</span>
                    </div>
                    <span className="apple-badge apple-badge-green" style={{ fontSize: '11px' }}>
                      {app.status}
                    </span>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f', marginBottom: '2px' }}>
                      {service?.name || 'Automotive Inspection'}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#6e6e73' }}>
                      Ref: <strong>{app.confirmationCode}</strong> • Source: {app.source}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', background: '#f5f5f7', padding: '10px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} color="#6e6e73" />
                      <span style={{ fontWeight: 500 }}>{customer?.firstName} {customer?.lastName} ({customer?.phone})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Car size={14} color="#6e6e73" />
                      <span>{vehicle?.make} {vehicle?.model} • <span style={{ fontWeight: 600 }}>{vehicle?.licensePlate}</span></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Wrench size={14} color="#6e6e73" />
                      <span>Mech: <strong>{mechanic?.name}</strong> | {bay?.name}</span>
                    </div>
                  </div>

                  {app.intakeNotes && (
                    <p style={{ fontSize: '12px', color: '#6e6e73', fontStyle: 'italic' }}>
                      "{app.intakeNotes}"
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* New Appointment Modal */}
      {isModalOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-lg" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '560px' }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
              {tc.newAppointment}
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Central Scheduling Engine ensures zero mechanic and bay double bookings.
            </p>

            {conflictError && (
              <div style={{
                background: 'rgba(255, 69, 58, 0.12)',
                border: '1px solid rgba(255, 69, 58, 0.3)',
                padding: '14px',
                borderRadius: '12px',
                marginBottom: '16px',
                display: 'flex',
                gap: '10px'
              }}>
                <AlertTriangle size={20} color="#ff453a" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#ff453a' }}>{conflictError}</div>
                  {suggestedSlots.length > 0 && (
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#1d1d1f' }}>
                      <strong>{tc.suggestAlternatives}</strong>
                      <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                        {suggestedSlots.map((slot, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setFormStartTime(slot.startTime);
                              setFormEndTime(slot.endTime);
                              setFormMechanicId(slot.mechanicId);
                              setFormBayId(slot.bayId);
                              setConflictError(null);
                            }}
                            style={{
                              background: '#ffffff',
                              border: '1px solid #0071e3',
                              color: '#0071e3',
                              padding: '4px 10px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '11px'
                            }}
                          >
                            {slot.startTime} - {slot.endTime} ({slot.mechanicName})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleCreateAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Customer */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Customer
                </label>
                <select 
                  value={formCustomerId} 
                  onChange={e => setFormCustomerId(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.phone})</option>
                  ))}
                </select>
              </div>

              {/* Vehicle */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Vehicle
                </label>
                <select 
                  value={formVehicleId} 
                  onChange={e => setFormVehicleId(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.make} {v.model} ({v.licensePlate})</option>
                  ))}
                </select>
              </div>

              {/* Service */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Service Catalog Item
                </label>
                <select 
                  value={formServiceId} 
                  onChange={e => handleServiceChange(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.estimatedDurationMin} min)</option>
                  ))}
                </select>
              </div>

              {/* Date & Times */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Date
                  </label>
                  <input 
                    type="date" 
                    value={formDate} 
                    onChange={e => setFormDate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Start Time
                  </label>
                  <input 
                    type="time" 
                    value={formStartTime} 
                    onChange={e => setFormStartTime(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    End Time
                  </label>
                  <input 
                    type="time" 
                    value={formEndTime} 
                    onChange={e => setFormEndTime(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              {/* Mechanic & Bay */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Assigned Mechanic
                  </label>
                  <select 
                    value={formMechanicId} 
                    onChange={e => setFormMechanicId(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  >
                    {mechanics.map(m => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Assigned Bay/Lift
                  </label>
                  <select 
                    value={formBayId} 
                    onChange={e => setFormBayId(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  >
                    {bays.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Intake Notes
                </label>
                <textarea 
                  value={formNotes} 
                  onChange={e => setFormNotes(e.target.value)}
                  placeholder="Customer remarks or specific diagnosis request..."
                  rows={2}
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="apple-btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="apple-btn-primary"
                >
                  Confirm & Reserve Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================================================
// AtelierOS - 10-Stage Work Order Operations Board
// ==========================================================================



  ClipboardList, 
  ArrowRight, 
  ArrowLeft, 
  User, 
  Car, 
  Wrench, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Tablet, 
  FileCheck2, 
  Receipt,
  Plus
} from 'lucide-react';






const STAGES = [
  'REQUEST',
  'APPOINTMENT',
  'DIAGNOSIS',
  'QUOTE',
  'AWAITING_APPROVAL',
  'APPROVED',
  'IN_PROGRESS',
  'QUALITY_CHECK',
  'READY',
  'DELIVERED',
  'INVOICED'
];

const WorkOrderBoard = ({
  activeTenant,
  currentLanguage,
  onOpenTabletMode,
  onOpenQuotes,
  onOpenInvoices
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const two = t.workOrders;

  const [workOrders, setWorkOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadData = () => {
    setWorkOrders(StorageService.getWorkOrders(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setMechanics(StorageService.getMechanics(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  const advanceStage = (woId: string, direction: 'NEXT' | 'PREV') => {
    const all = StorageService.getAllWorkOrders();
    const target = all.find(w => w.id === woId);
    if (!target) return;

    const currentIndex = STAGES.indexOf(target.stage);
    if (direction === 'NEXT' && currentIndex < STAGES.length - 1) {
      target.stage = STAGES[currentIndex + 1];
    } else if (direction === 'PREV' && currentIndex > 0) {
      target.stage = STAGES[currentIndex - 1];
    }
    target.updatedAt = new Date().toISOString();

    StorageService.saveWorkOrders(all);
    loadData();
    if (selectedOrder && selectedOrder.id === woId) {
      setSelectedOrder({ ...target });
    }
  };

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{two.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{two.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="apple-badge apple-badge-blue" style={{ fontSize: '13px', padding: '6px 14px' }}>
            {workOrders.length} Active Orders
          </span>
        </div>
      </div>

      {/* Kanban Board Container (Smooth horizontal scroll) */}
      <div 
        className="scrollbar-none"
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '20px'
        }}
      >
        {STAGES.map((stageKey) => {
          const stageOrders = workOrders.filter(w => w.stage === stageKey);
          const stageLabel = two.stages[stageKey] || stageKey;

          return (
            <div 
              key={stageKey} 
              style={{
                minWidth: '290px',
                maxWidth: '290px',
                background: '#f0f0f3',
                borderRadius: '16px',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                border: '1px solid #e5e5ea'
              }}
            >
              {/* Stage Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1d1d1f' }}>
                  {stageLabel}
                </span>
                <span className="apple-badge apple-badge-neutral" style={{ fontSize: '11px', padding: '2px 8px' }}>
                  {stageOrders.length}
                </span>
              </div>

              {/* Order Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minHeight: '120px' }}>
                {stageOrders.map(wo => {
                  const customer = customers.find(c => c.id === wo.customerId);
                  const vehicle = vehicles.find(v => v.id === wo.vehicleId);
                  const mechanic = mechanics.find(m => m.id === wo.mechanicId);

                  return (
                    <div 
                      key={wo.id}
                      className="apple-card"
                      style={{
                        padding: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        borderLeft: `3px solid ${
                          wo.stage === 'INVOICED' ? '#30d158' :
                          wo.stage === 'IN_PROGRESS' ? '#0071e3' :
                          wo.stage === 'AWAITING_APPROVAL' ? '#ff9f0a' : '#86868b'
                        }`
                      }}
                      onClick={() => setSelectedOrder(wo)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, fontSize: '13px', color: '#0071e3' }}>
                          {wo.orderNumber}
                        </span>
                        <span style={{ fontSize: '11px', color: '#86868b' }}>
                          {new Date(wo.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f' }}>
                        {vehicle?.make} {vehicle?.model}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6e6e73' }}>
                        <User size={13} />
                        <span>{customer?.firstName} {customer?.lastName}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6e6e73' }}>
                        <Car size={13} />
                        <span>{vehicle?.licensePlate}</span>
                      </div>

                      {wo.symptoms.length > 0 && (
                        <div style={{ fontSize: '11px', color: '#86868b', fontStyle: 'italic', background: '#f5f5f7', padding: '4px 8px', borderRadius: '6px' }}>
                          {wo.symptoms[0]}
                        </div>
                      )}

                      {/* Action buttons */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '6px', borderTop: '1px solid #f0f0f3' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            advanceStage(wo.id, 'PREV');
                          }}
                          disabled={wo.stage === 'REQUEST'}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: wo.stage === 'REQUEST' ? 'default' : 'pointer',
                            opacity: wo.stage === 'REQUEST' ? 0.3 : 0.8
                          }}
                          title="Previous Stage"
                        >
                          <ArrowLeft size={14} />
                        </button>

                        {/* Quick links depending on stage */}
                        {['DIAGNOSIS', 'IN_PROGRESS', 'QUALITY_CHECK'].includes(wo.stage) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenTabletMode(wo.id);
                            }}
                            className="apple-btn-secondary"
                            style={{ fontSize: '11px', padding: '2px 8px', minHeight: '26px' }}
                          >
                            <Tablet size={12} color="#0071e3" />
                            <span>Bay Mode</span>
                          </button>
                        )}

                        {['QUOTE', 'AWAITING_APPROVAL'].includes(wo.stage) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenQuotes(wo.id);
                            }}
                            className="apple-btn-secondary"
                            style={{ fontSize: '11px', padding: '2px 8px', minHeight: '26px' }}
                          >
                            <FileCheck2 size={12} color="#bf5af2" />
                            <span>Quote</span>
                          </button>
                        )}

                        {['READY', 'DELIVERED', 'INVOICED'].includes(wo.stage) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenInvoices(wo.id);
                            }}
                            className="apple-btn-secondary"
                            style={{ fontSize: '11px', padding: '2px 8px', minHeight: '26px' }}
                          >
                            <Receipt size={12} color="#30d158" />
                            <span>Invoice</span>
                          </button>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            advanceStage(wo.id, 'NEXT');
                          }}
                          disabled={wo.stage === 'INVOICED'}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: wo.stage === 'INVOICED' ? 'default' : 'pointer',
                            opacity: wo.stage === 'INVOICED' ? 0.3 : 0.8
                          }}
                          title="Advance to Next Stage"
                        >
                          <ArrowRight size={14} color="#0071e3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Work Order Inspector Modal */}
      {selectedOrder && (
        <div className="apple-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div 
            className="apple-modal-content p-6 max-w-2xl" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '640px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <span className="apple-badge apple-badge-blue" style={{ marginBottom: '4px' }}>
                  {selectedOrder.stage}
                </span>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1d1d1f' }}>
                  Work Order: {selectedOrder.orderNumber}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="apple-btn-secondary"
              >
                Close
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px' }}>
              <div style={{ background: '#f5f5f7', padding: '14px', borderRadius: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <strong>Customer:</strong> {customers.find(c => c.id === selectedOrder.customerId)?.firstName} {customers.find(c => c.id === selectedOrder.customerId)?.lastName}
                </div>
                <div>
                  <strong>Vehicle:</strong> {vehicles.find(v => v.id === selectedOrder.vehicleId)?.make} {vehicles.find(v => v.id === selectedOrder.vehicleId)?.model} ({vehicles.find(v => v.id === selectedOrder.vehicleId)?.licensePlate})
                </div>
                <div>
                  <strong>Technician:</strong> {mechanics.find(m => m.id === selectedOrder.mechanicId)?.name || 'Assigned'}
                </div>
                <div>
                  <strong>Labor Recorded:</strong> {selectedOrder.laborTimeRecordedMin} mins
                </div>
              </div>

              <div>
                <h4 style={{ fontWeight: 600, marginBottom: '6px' }}>Reported Symptoms:</h4>
                <ul style={{ paddingLeft: '20px', color: '#6e6e73' }}>
                  {selectedOrder.symptoms.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              {selectedOrder.diagnosisNotes && (
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '6px' }}>Technician Findings:</h4>
                  <p style={{ background: '#ffffff', border: '1px solid #e5e5ea', padding: '10px', borderRadius: '8px', color: '#333336' }}>
                    {selectedOrder.diagnosisNotes}
                  </p>
                </div>
              )}

              {selectedOrder.obdCodes.length > 0 && (
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '6px' }}>Logged OBD-II Codes:</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedOrder.obdCodes.map((c, i) => (
                      <span key={i} className="apple-badge apple-badge-red" style={{ fontSize: '12px' }}>
                        {c.code}: {c.description}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Jump Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid #e5e5ea', flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    const id = selectedOrder.id;
                    setSelectedOrder(null);
                    onOpenTabletMode(id);
                  }}
                  className="apple-btn-primary"
                >
                  <Tablet size={16} />
                  <span>Open in Mechanic Tablet Mode</span>
                </button>

                <button
                  onClick={() => {
                    const id = selectedOrder.id;
                    setSelectedOrder(null);
                    onOpenQuotes(id);
                  }}
                  className="apple-btn-secondary"
                >
                  <FileCheck2 size={16} />
                  <span>Manage Quote & Approval</span>
                </button>

                <button
                  onClick={() => {
                    const id = selectedOrder.id;
                    setSelectedOrder(null);
                    onOpenInvoices(id);
                  }}
                  className="apple-btn-secondary"
                >
                  <Receipt size={16} />
                  <span>View / Issue Invoice</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================================================
// AtelierOS - Tablet-First Mechanic Bay Station Mode (iPad Optimized)
// ==========================================================================



  Tablet, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Camera, 
  Wrench, 
  Clock, 
  Plus, 
  Trash2, 
  Car, 
  User, 
  Cpu, 
  ShieldCheck, 
  Save,
  Check
} from 'lucide-react';






const COMMON_OBD_DATABASE: Record<string, { desc: string; check: string }> = {
  P0300: { desc: 'Random/Multiple Cylinder Misfire Detected', check: 'Test ignition coils, spark plugs, and injector pulse signals.' },
  P0420: { desc: 'Catalyst System Efficiency Below Threshold (Bank 1)', check: 'Inspect downstream O2 sensor output and catalytic converter integrity.' },
  P0171: { desc: 'System Too Lean (Bank 1)', check: 'Check MAF sensor, intake vacuum leaks, and fuel pump pressure.' },
  C0035: { desc: 'Left Front Wheel Speed Sensor Circuit', check: 'Inspect ABS reluctor ring, wiring harness, and sensor resistance.' },
  P0A80: { desc: 'Replace Hybrid / EV Battery Pack', check: 'Check individual cell module voltages, cooling fan, and contactor relays.' }
};

const MechanicTabletMode = ({
  activeTenant,
  currentLanguage,
  activeWorkOrderId,
  onWorkOrderFinished
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const tm = t.mechanicTablet;

  const [workOrders, setWorkOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(activeWorkOrderId || '');
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [mechanics, setMechanics] = useState([]);

  // Current Working State
  const [currentOrder, setCurrentOrder] = useState(null);
  const [newObdCode, setNewObdCode] = useState('');
  const [newPartName, setNewPartName] = useState('');
  const [newPartQty, setNewPartQty] = useState(1);
  const [newPartPrice, setNewPartPrice] = useState(45.0);
  const [successToast, setSuccessToast] = useState(false);

  const loadData = () => {
    const orders = StorageService.getWorkOrders(activeTenant.id);
    setWorkOrders(orders);
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setMechanics(StorageService.getMechanics(activeTenant.id));

    if (orders.length > 0 && !selectedOrderId) {
      setSelectedOrderId(orders[0].id);
      setCurrentOrder(orders[0]);
    } else if (selectedOrderId) {
      const match = orders.find(o => o.id === selectedOrderId);
      if (match) setCurrentOrder(match);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  useEffect(() => {
    if (selectedOrderId) {
      const match = workOrders.find(o => o.id === selectedOrderId);
      if (match) setCurrentOrder(match);
    }
  }, [selectedOrderId, workOrders]);

  const saveCurrentOrder = (updated: WorkOrder) => {
    const all = StorageService.getAllWorkOrders();
    const index = all.findIndex(w => w.id === updated.id);
    if (index !== -1) {
      all[index] = { ...updated, updatedAt: new Date().toISOString() };
      StorageService.saveWorkOrders(all);
      setCurrentOrder(updated);
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 2000);
    }
  };

  const toggleChecklist = (checkId: string, status: 'PASS' | 'FAIL' | 'NOT_APPLICABLE') => {
    if (!currentOrder) return;
    const updatedChecklist = currentOrder.checklist.map(item => 
      item.id === checkId ? { ...item, status } : item
    );
    saveCurrentOrder({ ...currentOrder, checklist: updatedChecklist });
  };

  const handleAddObdCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder || !newObdCode.trim()) return;

    const codeUpper = newObdCode.trim().toUpperCase();
    const known = COMMON_OBD_DATABASE[codeUpper] || {
      desc: 'Vehicle Diagnostic Trouble Code',
      check: 'Perform pinpoint electrical and mechanical component testing.'
    };

    const newEntry = {
      code: codeUpper,
      description: known.desc,
      severity: 'WARNING',
      suggestedCheck: known.check,
      verifiedByTech: true
    };

    const updated = {
      ...currentOrder,
      obdCodes: [...currentOrder.obdCodes, newEntry]
    };
    saveCurrentOrder(updated);
    setNewObdCode('');
  };

  const handleAddPart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentOrder || !newPartName.trim()) return;

    const newPart = {
      partId: `p-${Date.now()}`,
      name: newPartName.trim(),
      quantity: newPartQty,
      unitPrice: newPartPrice,
      total: newPartQty * newPartPrice
    };

    const updated = {
      ...currentOrder,
      partsUsed: [...currentOrder.partsUsed, newPart]
    };
    saveCurrentOrder(updated);
    setNewPartName('');
    setNewPartQty(1);
    setNewPartPrice(45.0);
  };

  const handleAddLaborMinutes = (mins: number) => {
    if (!currentOrder) return;
    const updated = {
      ...currentOrder,
      laborTimeRecordedMin: (currentOrder.laborTimeRecordedMin || 0) + mins
    };
    saveCurrentOrder(updated);
  };

  const handleQualitySignOff = () => {
    if (!currentOrder) return;
    const updated = {
      ...currentOrder,
      stage: 'READY',
      updatedAt: new Date().toISOString()
    };
    saveCurrentOrder(updated);
    if (onWorkOrderFinished) onWorkOrderFinished();
  };

  const customer = customers.find(c => c.id === currentOrder?.customerId);
  const vehicle = vehicles.find(v => v.id === currentOrder?.vehicleId);
  const mechanic = mechanics.find(m => m.id === currentOrder?.mechanicId);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px' }}>
      {/* Tablet Top Station Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '20px',
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '20px',
        border: '1px solid #e5e5ea',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #0071e3 0%, #30d158 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff'
          }}>
            <Tablet size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f' }}>{tm.title}</h1>
            <span style={{ fontSize: '12px', color: '#6e6e73' }}>
              Station Active: <strong>{activeTenant.name}</strong> • Touch-Optimized
            </span>
          </div>
        </div>

        {/* Work Order Switcher Dropdown for Tablet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: '#6e6e73' }}>Active Vehicle:</label>
          <select
            value={selectedOrderId}
            onChange={e => setSelectedOrderId(e.target.value)}
            style={{
              padding: '10px 16px',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '12px',
              border: '2px solid #0071e3',
              background: '#ffffff',
              cursor: 'pointer'
            }}
          >
            {workOrders.map(wo => {
              const v = vehicles.find(veh => veh.id === wo.vehicleId);
              return (
                <option key={wo.id} value={wo.id}>
                  {wo.orderNumber} - {v?.make} {v?.model} ({v?.licensePlate}) [{wo.stage}]
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {successToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#30d158',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '12px',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(48, 209, 88, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 9999
        }}>
          <Check size={18} />
          <span>Work Order Updated</span>
        </div>
      )}

      {currentOrder && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {/* Left Column: Vehicle Banner, Symptoms & Diagnostics Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Vehicle Profile Card */}
            <div className="apple-card" style={{ padding: '24px', borderLeft: '6px solid #0071e3' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <div>
                  <span className="apple-badge apple-badge-blue" style={{ marginBottom: '6px' }}>
                    {currentOrder.orderNumber}
                  </span>
                  <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1d1d1f' }}>
                    {vehicle?.make} {vehicle?.model} ({vehicle?.year})
                  </h2>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#0071e3', letterSpacing: '0.05em', marginTop: '4px' }}>
                    {vehicle?.licensePlate}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="apple-badge apple-badge-green" style={{ fontSize: '13px', padding: '6px 12px' }}>
                    {currentOrder.stage}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '13px', color: '#6e6e73', background: '#f5f5f7', padding: '14px', borderRadius: '12px' }}>
                <div><strong>VIN:</strong> {vehicle?.vin}</div>
                <div><strong>Fuel:</strong> {vehicle?.fuelType}</div>
                <div><strong>Odometer:</strong> {vehicle?.mileage?.toLocaleString()} km</div>
                <div><strong>Customer:</strong> {customer?.firstName} {customer?.lastName}</div>
              </div>

              {currentOrder.symptoms.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#86868b', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Client Reported Symptoms:
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #e5e5ea', padding: '12px', borderRadius: '10px', fontSize: '14px', color: '#1d1d1f' }}>
                    {currentOrder.symptoms.join(', ')}
                  </div>
                </div>
              )}
            </div>

            {/* Diagnostic Findings & Notes */}
            <div className="apple-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Wrench size={20} color="#0071e3" />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Technician Diagnostic Notes</h3>
              </div>
              <textarea
                value={currentOrder.diagnosisNotes}
                onChange={e => setCurrentOrder({ ...currentOrder, diagnosisNotes: e.target.value })}
                onBlur={() => saveCurrentOrder(currentOrder)}
                placeholder="Type your physical inspection findings, measurements (e.g. pad thickness mm, tire tread depth, battery SOH)..."
                rows={4}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea', fontSize: '15px' }}
              />
            </div>

            {/* OBD-II Diagnostic Error Scanner */}
            <div className="apple-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Cpu size={20} color="#ff453a" />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tm.obdScannerTitle}</h3>
              </div>

              <form onSubmit={handleAddObdCode} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input 
                  type="text"
                  value={newObdCode}
                  onChange={e => setNewObdCode(e.target.value)}
                  placeholder={tm.obdCodePlaceholder}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                />
                <button type="submit" className="apple-btn-primary" style={{ padding: '10px 18px' }}>
                  {tm.addCode}
                </button>
              </form>

              {/* Logged Codes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {currentOrder.obdCodes.map((code, idx) => (
                  <div key={idx} style={{ background: 'rgba(255, 69, 58, 0.08)', border: '1px solid rgba(255, 69, 58, 0.2)', padding: '12px', borderRadius: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: '15px', color: '#ff453a' }}>{code.code}</span>
                      <span className="apple-badge apple-badge-red" style={{ fontSize: '10px' }}>VERIFIED</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: '#1d1d1f', marginTop: '2px' }}>{code.description}</div>
                    <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
                      <strong>Action:</strong> {code.suggestedCheck}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Multipoint Checklist, Labor Tracker, Parts, and Quality Sign-off */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Multipoint Safety Checklist */}
            <div className="apple-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <ShieldCheck size={20} color="#30d158" />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tm.checklistTitle}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentOrder.checklist.map(item => (
                  <div 
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#f9f9fb',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid #e5e5ea'
                    }}
                  >
                    <div style={{ flex: 1, paddingRight: '12px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{item.title}</div>
                      {item.notes && <div style={{ fontSize: '11px', color: '#86868b' }}>{item.notes}</div>}
                    </div>

                    {/* Touch Segmented Button for PASS / FAIL / N/A */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => toggleChecklist(item.id, 'PASS')}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          background: item.status === 'PASS' ? '#30d158' : 'rgba(0,0,0,0.06)',
                          color: item.status === 'PASS' ? '#ffffff' : '#6e6e73'
                        }}
                      >
                        PASS
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleChecklist(item.id, 'FAIL')}
                        style={{
                          padding: '8px 14px',
                          borderRadius: '8px',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '12px',
                          cursor: 'pointer',
                          background: item.status === 'FAIL' ? '#ff453a' : 'rgba(0,0,0,0.06)',
                          color: item.status === 'FAIL' ? '#ffffff' : '#6e6e73'
                        }}
                      >
                        FAIL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Labor Time & Parts Logger */}
            <div className="apple-card" style={{ padding: '24px' }}>
              {/* Labor Tracker */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={18} color="#0071e3" />
                    <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{tm.recordLaborTime}</h3>
                  </div>
                  <span style={{ fontSize: '20px', fontWeight: 800, color: '#0071e3' }}>
                    {currentOrder.laborTimeRecordedMin || 0} min
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {[15, 30, 45, 60].map(mins => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => handleAddLaborMinutes(mins)}
                      className="apple-btn-secondary"
                      style={{ flex: 1, padding: '10px', fontSize: '13px', fontWeight: 700 }}
                    >
                      +{mins}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Parts Tracker */}
              <div style={{ borderTop: '1px solid #e5e5ea', paddingTop: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px' }}>{tm.partsTrackerTitle}</h3>
                
                <form onSubmit={handleAddPart} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  <input 
                    type="text" 
                    value={newPartName}
                    onChange={e => setNewPartName(e.target.value)}
                    placeholder="Part description (e.g. Total Quartz 5W30, Purflux Filter)..."
                    style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="number" 
                      min={1} 
                      value={newPartQty} 
                      onChange={e => setNewPartQty(Number(e.target.value))}
                      placeholder="Qty"
                      style={{ width: '80px', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                    />
                    <input 
                      type="number" 
                      step="0.01" 
                      value={newPartPrice} 
                      onChange={e => setNewPartPrice(Number(e.target.value))}
                      placeholder="Unit Price"
                      style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                    />
                    <button type="submit" className="apple-btn-primary" style={{ padding: '8px 16px' }}>
                      {tm.addPart}
                    </button>
                  </div>
                </form>

                {/* Used Parts List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {currentOrder.partsUsed.map((p, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', background: '#f5f5f7', padding: '8px 12px', borderRadius: '8px' }}>
                      <span>{p.quantity}x {p.name}</span>
                      <span style={{ fontWeight: 700 }}>{p.total.toFixed(2)} {activeTenant.currency}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quality Pass & Ready Sign-off Button (Huge Touch Target) */}
            <button
              onClick={handleQualitySignOff}
              className="apple-btn-primary tablet-touch-btn"
              style={{
                background: 'linear-gradient(135deg, #30d158 0%, #248a3d 100%)',
                boxShadow: '0 8px 24px rgba(48, 209, 88, 0.35)',
                fontSize: '17px'
              }}
            >
              <CheckCircle2 size={22} />
              <span>{tm.signOffQuality}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================================================
// AtelierOS - Customer Directory & Registry (Full CRUD + Confirmation Dialogs)
// ==========================================================================



  Users, 
  UserPlus, 
  Search, 
  Edit3, 
  Trash2, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';







const CustomerDirectory = ({
  activeTenant,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en);

  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Confirmation Modal State
  const [confirmDeleteCustomer, setConfirmDeleteCustomer] = useState(null);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);

  // Form State
  const [formType, setFormType] = useState('INDIVIDUAL');
  const [formFirstName, setFormFirstName] = useState('');
  const [formLastName, setFormLastName] = useState('');
  const [formCompanyName, setFormCompanyName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCountry, setFormCountry] = useState(activeTenant.country);
  const [formSiret, setFormSiret] = useState('');
  const [formUid, setFormUid] = useState('');
  const [formStreet, setFormStreet] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formPostalCode, setFormPostalCode] = useState('');

  const loadCustomers = () => {
    setCustomers(StorageService.getCustomers(activeTenant.id));
  };

  useEffect(() => {
    loadCustomers();
  }, [activeTenant.id]);

  const filtered = customers.filter(c => {
    if (filterType !== 'ALL' && c.type !== filterType) return false;
    const q = searchQuery.toLowerCase();
    const nameMatch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(q);
    const companyMatch = c.companyName?.toLowerCase().includes(q) || false;
    const phoneMatch = c.phone.includes(q);
    const emailMatch = c.email.toLowerCase().includes(q);
    return nameMatch || companyMatch || phoneMatch || emailMatch;
  });

  const openNewCustomerModal = () => {
    setEditingCustomer(null);
    setFormType('INDIVIDUAL');
    setFormFirstName('');
    setFormLastName('');
    setFormCompanyName('');
    setFormEmail('');
    setFormPhone(activeTenant.country === 'FR' ? '+33 ' : '+41 ');
    setFormCountry(activeTenant.country);
    setFormSiret('');
    setFormUid('');
    setFormStreet('');
    setFormCity('');
    setFormPostalCode('');
    setIsEditModalOpen(true);
  };

  const openEditCustomerModal = (c: Customer) => {
    setEditingCustomer(c);
    setFormType(c.type);
    setFormFirstName(c.firstName);
    setFormLastName(c.lastName);
    setFormCompanyName(c.companyName || '');
    setFormEmail(c.email);
    setFormPhone(c.phone);
    setFormCountry(c.country);
    setFormSiret(c.taxIdentity?.siret || '');
    setFormUid(c.taxIdentity?.uid || '');
    setFormStreet(c.address.street);
    setFormCity(c.address.city);
    setFormPostalCode(c.address.postalCode);
    setIsEditModalOpen(true);
  };

  const handleSaveCustomer = () => {
    const all = StorageService.getAllCustomers();

    if (editingCustomer) {
      // Edit existing
      const index = all.findIndex(c => c.id === editingCustomer.id);
      if (index !== -1) {
        all[index] = {
          ...editingCustomer,
          type: formType,
          firstName: formFirstName,
          lastName: formLastName,
          companyName: formType === 'BUSINESS' ? formCompanyName : undefined,
          email: formEmail,
          phone: formPhone,
          country: formCountry,
          taxIdentity: {
            siret: formType === 'BUSINESS' && formCountry === 'FR' ? formSiret : undefined,
            uid: formType === 'BUSINESS' && formCountry === 'CH' ? formUid : undefined,
            vatNumber: formType === 'BUSINESS' ? (formCountry === 'FR' ? `FR${formSiret.substring(0, 2)}` : `${formUid} TVA`) : undefined
          },
          address: {
            street: formStreet,
            city: formCity,
            postalCode: formPostalCode,
            country: formCountry === 'FR' ? 'France' : 'Switzerland'
          }
        };
      }
    } else {
      // Create new
      const newCust = {
        id: `cust-${Date.now()}`,
        tenantId: activeTenant.id,
        type: formType,
        firstName: formFirstName,
        lastName: formLastName,
        companyName: formType === 'BUSINESS' ? formCompanyName : undefined,
        email: formEmail,
        phone: formPhone,
        country: formCountry,
        taxIdentity: {
          siret: formType === 'BUSINESS' && formCountry === 'FR' ? formSiret : undefined,
          uid: formType === 'BUSINESS' && formCountry === 'CH' ? formUid : undefined,
          vatNumber: formType === 'BUSINESS' ? (formCountry === 'FR' ? `FR${formSiret.substring(0, 2)}` : `${formUid} TVA`) : undefined
        },
        address: {
          street: formStreet,
          city: formCity,
          postalCode: formPostalCode,
          country: formCountry === 'FR' ? 'France' : 'Switzerland'
        },
        preferredLanguage: activeTenant.country === 'FR' ? 'fr' : 'fr-CH',
        gdprConsent: {
          consentedAt: new Date().toISOString(),
          marketingConsent: true,
          smsConsent: true,
          whatsappConsent: true
        },
        createdAt: new Date().toISOString()
      };
      all.push(newCust);
    }

    StorageService.saveCustomers(all);
    loadCustomers();
    setIsEditModalOpen(false);
  };

  const handleDeleteCustomer = (id: string) => {
    const all = StorageService.getAllCustomers().filter(c => c.id !== id);
    StorageService.saveCustomers(all);
    loadCustomers();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>Customer Directory</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>
            France & Switzerland customer registry with GDPR consent and tax identities.
          </p>
        </div>

        <button onClick={openNewCustomerModal} className="apple-btn-primary">
          <UserPlus size={16} />
          <span>+ Add New Customer</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="apple-card" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={16} color="#86868b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, company, phone, email..."
            style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'INDIVIDUAL', 'BUSINESS'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: 'none',
                background: filterType === type ? '#0071e3' : 'rgba(0,0,0,0.06)',
                color: filterType === type ? '#ffffff' : '#6e6e73',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Table */}
      <div className="apple-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                <th style={{ padding: '14px 20px' }}>Customer Name / Company</th>
                <th style={{ padding: '14px 20px' }}>Contact Info</th>
                <th style={{ padding: '14px 20px' }}>Country / Tax ID</th>
                <th style={{ padding: '14px 20px' }}>GDPR Consent</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f3' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 600, color: '#1d1d1f', fontSize: '15px' }}>
                      {c.firstName} {c.lastName}
                    </div>
                    {c.companyName && (
                      <div style={{ fontSize: '12px', color: '#0071e3', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Building2 size={12} />
                        <span>{c.companyName}</span>
                      </div>
                    )}
                    <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                      {c.address.street}, {c.address.postalCode} {c.address.city}
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1d1d1f' }}>
                      <Phone size={13} color="#0071e3" />
                      <span>{c.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
                      <Mail size={13} />
                      <span>{c.email}</span>
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span className={`apple-badge ${c.country === 'FR' ? 'apple-badge-blue' : 'apple-badge-amber'}`} style={{ marginBottom: '4px' }}>
                      {c.country === 'FR' ? 'France (FR)' : 'Switzerland (CH)'}
                    </span>
                    {c.taxIdentity?.siret && (
                      <div style={{ fontSize: '11px', color: '#6e6e73' }}>
                        SIRET: {c.taxIdentity.siret}
                      </div>
                    )}
                    {c.taxIdentity?.uid && (
                      <div style={{ fontSize: '11px', color: '#6e6e73' }}>
                        UID: {c.taxIdentity.uid}
                      </div>
                    )}
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#30d158', fontSize: '13px', fontWeight: 500 }}>
                      <ShieldCheck size={16} />
                      <span>Opted-in (SMS/Email)</span>
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => openEditCustomerModal(c)}
                        className="apple-btn-secondary"
                        style={{ padding: '6px 10px', minHeight: '30px' }}
                        title="Edit Customer Details"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteCustomer(c)}
                        className="apple-btn-danger"
                        style={{ padding: '6px 10px', minHeight: '30px' }}
                        title="Delete Customer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Customer Modal */}
      {isEditModalOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-lg" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '580px' }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
              {editingCustomer ? 'Edit Customer Details' : 'Register New Customer'}
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Structure identity, country format, and tax registry.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              setConfirmSaveOpen(true);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Type & Country */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Customer Classification
                  </label>
                  <select 
                    value={formType} 
                    onChange={e => setFormType(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="INDIVIDUAL">Individual (B2C)</option>
                    <option value="BUSINESS">Business / Corporate (B2B)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Country
                  </label>
                  <select 
                    value={formCountry} 
                    onChange={e => setFormCountry(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="FR">France (FR)</option>
                    <option value="CH">Switzerland (CH)</option>
                  </select>
                </div>
              </div>

              {/* Names */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    First Name
                  </label>
                  <input 
                    type="text" 
                    value={formFirstName} 
                    onChange={e => setFormFirstName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    value={formLastName} 
                    onChange={e => setFormLastName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              {formType === 'BUSINESS' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                      Company Name
                    </label>
                    <input 
                      type="text" 
                      value={formCompanyName} 
                      onChange={e => setFormCompanyName(e.target.value)}
                      required
                      style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                    />
                  </div>

                  {formCountry === 'FR' ? (
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                        French SIRET (14 digits)
                      </label>
                      <input 
                        type="text" 
                        value={formSiret} 
                        onChange={e => setFormSiret(e.target.value)}
                        placeholder="e.g. 51289034200028"
                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                      />
                    </div>
                  ) : (
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                        Swiss UID / IDE (CHE-xxx.xxx.xxx)
                      </label>
                      <input 
                        type="text" 
                        value={formUid} 
                        onChange={e => setFormUid(e.target.value)}
                        placeholder="e.g. CHE-203.491.882"
                        style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Phone & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Phone Number
                  </label>
                  <input 
                    type="text" 
                    value={formPhone} 
                    onChange={e => setFormPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={formEmail} 
                    onChange={e => setFormEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Street Address
                </label>
                <input 
                  type="text" 
                  value={formStreet} 
                  onChange={e => setFormStreet(e.target.value)}
                  placeholder="Street and house number"
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Postal Code
                  </label>
                  <input 
                    type="text" 
                    value={formPostalCode} 
                    onChange={e => setFormPostalCode(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    City
                  </label>
                  <input 
                    type="text" 
                    value={formCity} 
                    onChange={e => setFormCity(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button 
                  type="button" 
                  onClick={() => setIsEditModalOpen(false)}
                  className="apple-btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="apple-btn-primary"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!confirmDeleteCustomer}
        title="Delete Customer Profile?"
        message={`Are you sure you want to delete ${confirmDeleteCustomer?.firstName} ${confirmDeleteCustomer?.lastName}? This action will permanently remove their records from local storage.`}
        confirmLabel="Delete Customer"
        isDestructive={true}
        onConfirm={() => {
          if (confirmDeleteCustomer) {
            handleDeleteCustomer(confirmDeleteCustomer.id);
            setConfirmDeleteCustomer(null);
          }
        }}
        onCancel={() => setConfirmDeleteCustomer(null)}
      />

      {/* Save Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmSaveOpen}
        title="Confirm Customer Details"
        message={`Do you want to save the customer record for ${formFirstName} ${formLastName} in ${formCountry}?`}
        confirmLabel="Save & Persist"
        onConfirm={() => {
          setConfirmSaveOpen(false);
          handleSaveCustomer();
        }}
        onCancel={() => setConfirmSaveOpen(false)}
      />
    </div>
  );
};


// ==========================================================================
// AtelierOS - Vehicle Fleet & Registry Directory (Full CRUD + Confirmation)
// ==========================================================================



  Car, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  User, 
  Fuel, 
  Gauge, 
  Calendar,
  FileText
} from 'lucide-react';







const VehicleDirectory = ({
  activeTenant,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en);

  const [vehicles, setVehicles] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [confirmDeleteVehicle, setConfirmDeleteVehicle] = useState(null);

  // Form State
  const [formCustomerId, setFormCustomerId] = useState('');
  const [formPlate, setFormPlate] = useState('');
  const [formVin, setFormVin] = useState('');
  const [formMake, setFormMake] = useState('');
  const [formModel, setFormModel] = useState('');
  const [formYear, setFormYear] = useState(2022);
  const [formFuel, setFormFuel] = useState('PETROL');
  const [formTrans, setFormTrans] = useState('AUTOMATIC');
  const [formMileage, setFormMileage] = useState(50000);
  const [formNotes, setFormNotes] = useState('');

  const loadData = () => {
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  const filtered = vehicles.filter(v => {
    const q = searchQuery.toLowerCase();
    const plateMatch = v.licensePlate.toLowerCase().includes(q);
    const makeModelMatch = `${v.make} ${v.model}`.toLowerCase().includes(q);
    const vinMatch = v.vin.toLowerCase().includes(q);
    return plateMatch || makeModelMatch || vinMatch;
  });

  const openNewVehicleModal = () => {
    setEditingVehicle(null);
    setFormCustomerId(customers[0]?.id || '');
    setFormPlate(activeTenant.country === 'FR' ? 'AB-123-CD' : 'GE 123 456');
    setFormVin('VF3' + Math.random().toString(36).substring(2, 16).toUpperCase());
    setFormMake('');
    setFormModel('');
    setFormYear(2023);
    setFormFuel('PETROL');
    setFormTrans('AUTOMATIC');
    setFormMileage(45000);
    setFormNotes('');
    setIsEditModalOpen(true);
  };

  const openEditVehicleModal = (v: Vehicle) => {
    setEditingVehicle(v);
    setFormCustomerId(v.customerId);
    setFormPlate(v.licensePlate);
    setFormVin(v.vin);
    setFormMake(v.make);
    setFormModel(v.model);
    setFormYear(v.year);
    setFormFuel(v.fuelType);
    setFormTrans(v.transmission);
    setFormMileage(v.mileage);
    setFormNotes(v.notes || '');
    setIsEditModalOpen(true);
  };

  const handleSaveVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const all = StorageService.getAllVehicles();

    if (editingVehicle) {
      const idx = all.findIndex(v => v.id === editingVehicle.id);
      if (idx !== -1) {
        all[idx] = {
          ...editingVehicle,
          customerId: formCustomerId,
          licensePlate: formPlate.toUpperCase(),
          vin: formVin.toUpperCase(),
          make: formMake,
          model: formModel,
          year: Number(formYear),
          fuelType: formFuel,
          transmission: formTrans,
          mileage: Number(formMileage),
          notes: formNotes
        };
      }
    } else {
      const newVeh = {
        id: `veh-${Date.now()}`,
        tenantId: activeTenant.id,
        customerId: formCustomerId,
        licensePlate: formPlate.toUpperCase(),
        vin: formVin.toUpperCase(),
        make: formMake,
        model: formModel,
        year: Number(formYear),
        fuelType: formFuel,
        transmission: formTrans,
        mileage: Number(formMileage),
        notes: formNotes
      };
      all.push(newVeh);
    }

    StorageService.saveVehicles(all);
    loadData();
    setIsEditModalOpen(false);
  };

  const handleDeleteVehicle = (id: string) => {
    const all = StorageService.getAllVehicles().filter(v => v.id !== id);
    StorageService.saveVehicles(all);
    loadData();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>Vehicle Registry</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>
            Customer vehicles, technical specifications, VIN lookup, and service mileage history.
          </p>
        </div>

        <button onClick={openNewVehicleModal} className="apple-btn-primary">
          <Plus size={16} />
          <span>+ Register New Vehicle</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="apple-card" style={{ padding: '16px 20px', marginBottom: '20px' }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={16} color="#86868b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by plate, VIN, make, model..."
            style={{ width: '100%', padding: '10px 10px 10px 38px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
          />
        </div>
      </div>

      {/* Vehicles Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filtered.map(veh => {
          const owner = customers.find(c => c.id === veh.customerId);

          return (
            <div key={veh.id} className="apple-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="apple-badge apple-badge-blue" style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.04em' }}>
                    {veh.licensePlate}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f', marginTop: '6px' }}>
                    {veh.make} {veh.model}
                  </h3>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => openEditVehicleModal(veh)} className="apple-btn-secondary" style={{ padding: '6px 8px', minHeight: '30px' }}>
                    <Edit3 size={13} />
                  </button>
                  <button onClick={() => setConfirmDeleteVehicle(veh)} className="apple-btn-danger" style={{ padding: '6px 8px', minHeight: '30px' }}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px', background: '#f5f5f7', padding: '12px', borderRadius: '10px' }}>
                <div><strong>Year:</strong> {veh.year}</div>
                <div><strong>Fuel:</strong> {veh.fuelType}</div>
                <div><strong>Trans:</strong> {veh.transmission}</div>
                <div><strong>Mileage:</strong> {veh.mileage?.toLocaleString()} km</div>
                <div style={{ gridColumn: 'span 2', fontSize: '11px', color: '#6e6e73' }}>
                  <strong>VIN:</strong> {veh.vin}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1d1d1f' }}>
                <User size={14} color="#0071e3" />
                <span style={{ fontWeight: 600 }}>Owner: {owner?.firstName} {owner?.lastName}</span>
              </div>

              {veh.notes && (
                <div style={{ fontSize: '12px', color: '#6e6e73', fontStyle: 'italic' }}>
                  "{veh.notes}"
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit/Create Vehicle Modal */}
      {isEditModalOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-lg" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '540px' }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
              {editingVehicle ? 'Edit Vehicle' : 'Register Vehicle'}
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Record technical details, owner link, and license plate.
            </p>

            <form onSubmit={handleSaveVehicle} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Registered Owner
                </label>
                <select 
                  value={formCustomerId} 
                  onChange={e => setFormCustomerId(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                >
                  {customers.map(c => (
                    <option key={c.id} value={c.id}>{c.firstName} {c.lastName} ({c.phone})</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    License Plate
                  </label>
                  <input 
                    type="text" 
                    value={formPlate} 
                    onChange={e => setFormPlate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea', textTransform: 'uppercase', fontWeight: 700 }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    VIN (17 Characters)
                  </label>
                  <input 
                    type="text" 
                    value={formVin} 
                    onChange={e => setFormVin(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea', textTransform: 'uppercase' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Make (Manufacturer)
                  </label>
                  <input 
                    type="text" 
                    value={formMake} 
                    onChange={e => setFormMake(e.target.value)}
                    placeholder="e.g. Peugeot, Tesla, BMW"
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Model
                  </label>
                  <input 
                    type="text" 
                    value={formModel} 
                    onChange={e => setFormModel(e.target.value)}
                    placeholder="e.g. 3008 GT, Model Y"
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Year
                  </label>
                  <input 
                    type="number" 
                    value={formYear} 
                    onChange={e => setFormYear(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Fuel
                  </label>
                  <select 
                    value={formFuel} 
                    onChange={e => setFormFuel(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="ELECTRIC">Electric (EV)</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Mileage (km)
                  </label>
                  <input 
                    type="number" 
                    value={formMileage} 
                    onChange={e => setFormMileage(Number(e.target.value))}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="apple-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="apple-btn-primary">
                  Save Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!confirmDeleteVehicle}
        title="Delete Vehicle Record?"
        message={`Are you sure you want to delete vehicle ${confirmDeleteVehicle?.make} ${confirmDeleteVehicle?.model} (${confirmDeleteVehicle?.licensePlate})?`}
        confirmLabel="Delete Vehicle"
        isDestructive={true}
        onConfirm={() => {
          if (confirmDeleteVehicle) {
            handleDeleteVehicle(confirmDeleteVehicle.id);
            setConfirmDeleteVehicle(null);
          }
        }}
        onCancel={() => setConfirmDeleteVehicle(null)}
      />
    </div>
  );
};


// ==========================================================================
// AtelierOS - Quotation Builder & Commercial Manager
// ==========================================================================



  FileCheck2, 
  Plus, 
  Trash2, 
  Send, 
  Copy, 
  Check, 
  Eye, 
  User, 
  Car, 
  DollarSign, 
  Clock, 
  Layers,
  ArrowRight
} from 'lucide-react';










const QuoteManager = ({
  activeTenant,
  currentLanguage,
  activeWorkOrderId,
  onOpenCustomerApproval,
  onOpenInvoice
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const tq = t.quotes;

  const [quotes, setQuotes] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [targetWorkOrderId, setTargetWorkOrderId] = useState(activeWorkOrderId || '');

  // Builder Lines State
  const [builderLines, setBuilderLines] = useState([
    {
      id: 'l-1',
      type: 'LABOR',
      description: 'Atelier Labor Inspection & Diagnostics',
      quantity: 1.0,
      unitPrice: activeTenant.settings.defaultLaborRate,
      costPrice: 45.0,
      vatRate: activeTenant.settings.standardVatRate,
      totalExclVat: activeTenant.settings.defaultLaborRate,
      totalInclVat: activeTenant.settings.defaultLaborRate * (1 + activeTenant.settings.standardVatRate / 100)
    }
  ]);

  const [copiedToken, setCopiedToken] = useState(null);
  const [sentToast, setSentToast] = useState(null);

  const loadData = () => {
    setQuotes(StorageService.getQuotes(activeTenant.id));
    setWorkOrders(StorageService.getWorkOrders(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  useEffect(() => {
    if (activeWorkOrderId) {
      setTargetWorkOrderId(activeWorkOrderId);
    }
  }, [activeWorkOrderId]);

  const handleAddLine = (type: QuoteLine['type']) => {
    const newLine = {
      id: `line-${Date.now()}`,
      type,
      description: type === 'LABOR' ? 'Main d\'œuvre spécialisée' : 'Pièce détachée certifiée OEM',
      quantity: 1,
      unitPrice: type === 'LABOR' ? activeTenant.settings.defaultLaborRate : 65.0,
      costPrice: type === 'LABOR' ? 45.0 : 35.0,
      vatRate: activeTenant.settings.standardVatRate,
      totalExclVat: type === 'LABOR' ? activeTenant.settings.defaultLaborRate : 65.0,
      totalInclVat: (type === 'LABOR' ? activeTenant.settings.defaultLaborRate : 65.0) * (1 + activeTenant.settings.standardVatRate / 100)
    };
    setBuilderLines([...builderLines, newLine]);
  };

  const handleUpdateLine = (id: string, field: keyof QuoteLine, val: any) => {
    const updated = builderLines.map(line => {
      if (line.id !== id) return line;
      const copy = { ...line, [field]: val };
      copy.totalExclVat = copy.quantity * copy.unitPrice;
      copy.totalInclVat = copy.totalExclVat * (1 + copy.vatRate / 100);
      return copy;
    });
    setBuilderLines(updated);
  };

  const handleRemoveLine = (id: string) => {
    setBuilderLines(builderLines.filter(l => l.id !== id));
  };

  const handleCreateQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetWorkOrderId) return;

    const created = QuoteInvoiceService.createQuoteFromWorkOrder({
      tenantId: activeTenant.id,
      workOrderId: targetWorkOrderId,
      lines: builderLines
    });

    loadData();
    setIsBuilderOpen(false);
    setSelectedQuote(created);
  };

  const handleSendMagicLink = (quote: Quote) => {
    const customer = customers.find(c => c.id === quote.customerId);
    if (!customer) return;

    const portalUrl = `${window.location.origin}/quote/${quote.magicToken}`;
    CommunicationService.notifyQuoteReady(quote, customer, activeTenant, portalUrl);

    setSentToast(`Magic approval link dispatched via SMS to ${customer.phone} and Email to ${customer.email}`);
    setTimeout(() => setSentToast(null), 4000);
    loadData();
  };

  const handleCopyLink = (token: string) => {
    const url = `${window.location.origin}/quote/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const builderTotals = TaxService.calculateTotals(builderLines);

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{tq.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{tq.subtitle}</p>
        </div>

        <button 
          onClick={() => {
            if (workOrders.length > 0) setTargetWorkOrderId(workOrders[0].id);
            setIsBuilderOpen(true);
          }}
          className="apple-btn-primary"
        >
          <Plus size={16} />
          <span>{tq.createQuote}</span>
        </button>
      </div>

      {sentToast && (
        <div style={{
          background: '#30d158',
          color: '#ffffff',
          padding: '14px 20px',
          borderRadius: '14px',
          fontWeight: 600,
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 16px rgba(48, 209, 88, 0.3)'
        }}>
          <Check size={18} />
          <span>{sentToast}</span>
        </div>
      )}

      {/* Quotes List Table */}
      <div className="apple-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 20px' }}>Quote #</th>
                <th style={{ padding: '14px 20px' }}>Customer & Vehicle</th>
                <th style={{ padding: '14px 20px' }}>Total Amount</th>
                <th style={{ padding: '14px 20px' }}>Approval Status</th>
                <th style={{ padding: '14px 20px' }}>Magic Link Actions</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(q => {
                const customer = customers.find(c => c.id === q.customerId);
                const vehicle = vehicles.find(v => v.id === q.vehicleId);

                return (
                  <tr key={q.id} style={{ borderBottom: '1px solid #f0f0f3' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ fontWeight: 700, color: '#0071e3', fontSize: '15px' }}>
                        {q.quoteNumber}
                      </span>
                      <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                        Valid: {q.validUntil}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: '#1d1d1f' }}>
                        {customer?.firstName} {customer?.lastName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6e6e73', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Car size={12} />
                        <span>{vehicle?.make} {vehicle?.model} ({vehicle?.licensePlate})</span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#1d1d1f' }}>
                        {q.totalAmount.toFixed(2)} {q.currency}
                      </div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>
                        (HT: {q.subtotalExclVat.toFixed(2)} + TVA: {q.totalVat.toFixed(2)})
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <span className={`apple-badge ${
                        q.status === 'APPROVED' ? 'apple-badge-green' :
                        q.status === 'REJECTED' ? 'apple-badge-red' : 'apple-badge-amber'
                      }`}>
                        {q.status}
                      </span>
                      {q.approvalSignature && (
                        <div style={{ fontSize: '11px', color: '#30d158', marginTop: '4px', fontWeight: 500 }}>
                          Signed: {q.approvalSignature}
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handleSendMagicLink(q)}
                          className="apple-btn-secondary"
                          style={{ padding: '6px 12px', fontSize: '12px', minHeight: '30px' }}
                          title="Simulate dispatching SMS and Email link to customer"
                        >
                          <Send size={12} color="#0071e3" />
                          <span>Dispatch Link</span>
                        </button>
                        <button
                          onClick={() => handleCopyLink(q.magicToken)}
                          className="apple-btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '12px', minHeight: '30px' }}
                          title="Copy magic portal URL"
                        >
                          {copiedToken === q.magicToken ? <Check size={13} color="#30d158" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        {onOpenCustomerApproval && (
                          <button
                            onClick={() => onOpenCustomerApproval(q.magicToken)}
                            className="apple-btn-secondary"
                            style={{ padding: '6px 10px', minHeight: '30px', fontSize: '12px' }}
                          >
                            <Eye size={13} />
                            <span>Preview Portal</span>
                          </button>
                        )}
                        {q.status === 'APPROVED' && onOpenInvoice && (
                          <button
                            onClick={() => onOpenInvoice(q.workOrderId)}
                            className="apple-btn-primary"
                            style={{ padding: '6px 12px', minHeight: '30px', fontSize: '12px', background: '#30d158' }}
                          >
                            <span>Generate Invoice</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quote Builder Modal */}
      {isBuilderOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsBuilderOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-3xl" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '32px', maxWidth: '780px' }}
          >
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>
              Interactive Quotation Builder
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Add labor and spare parts. Tax is deterministically calculated per country & customer profile.
            </p>

            <form onSubmit={handleCreateQuoteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Linked Work Order */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Target Work Order
                </label>
                <select 
                  value={targetWorkOrderId} 
                  onChange={e => setTargetWorkOrderId(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea', fontWeight: 600 }}
                >
                  {workOrders.map(wo => {
                    const c = customers.find(cust => cust.id === wo.customerId);
                    const v = vehicles.find(veh => veh.id === wo.vehicleId);
                    return (
                      <option key={wo.id} value={wo.id}>
                        {wo.orderNumber} - {c?.firstName} {c?.lastName} ({v?.make} {v?.model})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Line Items Builder */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 700, color: '#1d1d1f' }}>
                    Itemized Labor & Parts
                  </label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button type="button" onClick={() => handleAddLine('LABOR')} className="apple-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                      + Add Labor
                    </button>
                    <button type="button" onClick={() => handleAddLine('PART')} className="apple-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                      + Add Part
                    </button>
                    <button type="button" onClick={() => handleAddLine('CONSUMABLE')} className="apple-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                      + Add Consumable
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {builderLines.map(line => (
                    <div key={line.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px 100px 70px 30px', gap: '8px', alignItems: 'center', background: '#f5f5f7', padding: '10px', borderRadius: '10px' }}>
                      <input 
                        type="text" 
                        value={line.description} 
                        onChange={e => handleUpdateLine(line.id, 'description', e.target.value)}
                        placeholder="Description..."
                        style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e5ea', fontSize: '13px' }}
                      />
                      <input 
                        type="number" 
                        min={0.25}
                        step={0.25}
                        value={line.quantity} 
                        onChange={e => handleUpdateLine(line.id, 'quantity', Number(e.target.value))}
                        placeholder="Qty"
                        style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e5ea', fontSize: '13px' }}
                      />
                      <input 
                        type="number" 
                        step="0.01"
                        value={line.unitPrice} 
                        onChange={e => handleUpdateLine(line.id, 'unitPrice', Number(e.target.value))}
                        placeholder="Unit Price"
                        style={{ padding: '6px 8px', borderRadius: '6px', border: '1px solid #e5e5ea', fontSize: '13px' }}
                      />
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73' }}>
                        {line.vatRate}% TVA
                      </span>
                      <button 
                        type="button"
                        onClick={() => handleRemoveLine(line.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff453a' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals Summary */}
              <div style={{ background: 'rgba(0, 113, 227, 0.05)', border: '1px solid rgba(0, 113, 227, 0.15)', padding: '16px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                    Subtotal HT: <strong>{builderTotals.subtotalExclVat.toFixed(2)} {activeTenant.currency}</strong>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                    Total TVA ({activeTenant.settings.standardVatRate}%): <strong>{builderTotals.totalVat.toFixed(2)} {activeTenant.currency}</strong>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '12px', color: '#0071e3', fontWeight: 700, textTransform: 'uppercase' }}>Total TTC</span>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: '#1d1d1f' }}>
                    {builderTotals.totalAmount.toFixed(2)} {activeTenant.currency}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsBuilderOpen(false)} className="apple-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="apple-btn-primary">
                  Generate & Save Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================================================
// AtelierOS - Invoice Management & Cross-Border Billing (EUR / CHF)
// ==========================================================================



  Receipt, 
  Plus, 
  Printer, 
  Send, 
  CheckCircle2, 
  Clock, 
  Car, 
  User, 
  ShieldCheck, 
  QrCode, 
  FileText,
  CreditCard,
  Building2
} from 'lucide-react';








const InvoiceManager = ({
  activeTenant,
  currentLanguage,
  activeWorkOrderId
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const ti = t.invoices;

  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [workOrders, setWorkOrders] = useState([]);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [eInvoiceModalInvoice, setEInvoiceModalInvoice] = useState(null);
  const [isPrintViewOpen, setIsPrintViewOpen] = useState(false);

  const loadData = () => {
    setInvoices(StorageService.getInvoices(activeTenant.id));
    setCustomers(StorageService.getCustomers(activeTenant.id));
    setVehicles(StorageService.getVehicles(activeTenant.id));
    setWorkOrders(StorageService.getWorkOrders(activeTenant.id));
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  useEffect(() => {
    if (activeWorkOrderId) {
      // Find if invoice already generated for this work order
      const existing = invoices.find(i => i.workOrderId === activeWorkOrderId);
      if (existing) {
        setSelectedInvoice(existing);
      } else {
        // Auto-generate invoice
        try {
          const inv = QuoteInvoiceService.generateInvoiceFromWorkOrder(activeWorkOrderId);
          loadData();
          setSelectedInvoice(inv);
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [activeWorkOrderId]);

  const togglePaidStatus = (inv: Invoice) => {
    const all = StorageService.getAllInvoices();
    const target = all.find(i => i.id === inv.id);
    if (target) {
      target.paid = !target.paid;
      target.paidAt = target.paid ? new Date().toISOString() : undefined;
      StorageService.saveInvoices(all);
      loadData();
      if (selectedInvoice && selectedInvoice.id === inv.id) {
        setSelectedInvoice({ ...target });
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{ti.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{ti.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="apple-badge apple-badge-blue" style={{ fontSize: '13px', padding: '6px 14px' }}>
            {invoices.length} Invoices Issued
          </span>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="apple-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 20px' }}>Invoice #</th>
                <th style={{ padding: '14px 20px' }}>Customer & Vehicle</th>
                <th style={{ padding: '14px 20px' }}>Total Amount</th>
                <th style={{ padding: '14px 20px' }}>Payment Status</th>
                <th style={{ padding: '14px 20px' }}>E-Invoicing (Chorus Pro)</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const customer = customers.find(c => c.id === inv.customerId);
                const vehicle = vehicles.find(v => v.id === inv.vehicleId);

                return (
                  <tr key={inv.id} style={{ borderBottom: '1px solid #f0f0f3' }}>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{ fontWeight: 700, color: '#0071e3', fontSize: '15px' }}>
                        {inv.invoiceNumber}
                      </span>
                      <div style={{ fontSize: '11px', color: '#86868b', marginTop: '2px' }}>
                        Issued: {inv.issueDate} • Due: {inv.dueDate}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontWeight: 600, color: '#1d1d1f' }}>
                        {customer?.firstName} {customer?.lastName}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6e6e73', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Car size={12} />
                        <span>{vehicle?.make} {vehicle?.model} ({vehicle?.licensePlate})</span>
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#1d1d1f' }}>
                        {inv.totalAmount.toFixed(2)} {inv.currency}
                      </div>
                      <div style={{ fontSize: '11px', color: '#86868b' }}>
                        (HT: {inv.subtotalExclVat.toFixed(2)} + TVA: {inv.totalVat.toFixed(2)})
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <button
                        onClick={() => togglePaidStatus(inv)}
                        className={`apple-badge ${inv.paid ? 'apple-badge-green' : 'apple-badge-amber'}`}
                        style={{ cursor: 'pointer', border: 'none' }}
                      >
                        {inv.paid ? 'PAID / RÉGLÉ' : 'UNPAID'}
                      </button>
                    </td>

                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className={`apple-badge ${
                          inv.eInvoiceStatus === 'ACCEPTED' ? 'apple-badge-green' :
                          inv.eInvoiceStatus === 'SUBMITTED' ? 'apple-badge-blue' : 'apple-badge-neutral'
                        }`}>
                          {inv.eInvoiceStatus}
                        </span>
                        {inv.eInvoiceSubmissionId && (
                          <span style={{ fontSize: '11px', color: '#86868b' }}>
                            {inv.eInvoiceSubmissionId.substring(0, 10)}...
                          </span>
                        )}
                      </div>
                    </td>

                    <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setIsPrintViewOpen(true);
                          }}
                          className="apple-btn-secondary"
                          style={{ padding: '6px 10px', fontSize: '12px', minHeight: '30px' }}
                          title="Print / View PDF Invoice"
                        >
                          <Printer size={13} />
                          <span>PDF</span>
                        </button>
                        <button
                          onClick={() => setEInvoiceModalInvoice(inv)}
                          className="apple-btn-primary"
                          style={{ padding: '6px 12px', fontSize: '12px', minHeight: '30px' }}
                        >
                          <Send size={13} />
                          <span>E-Invoice</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Invoice / PDF Viewer Modal */}
      {isPrintViewOpen && selectedInvoice && (
        <div className="apple-modal-overlay" onClick={() => setIsPrintViewOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-4xl" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '36px', maxWidth: '850px', background: '#ffffff' }}
          >
            {/* Action Bar (Not Printed) */}
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e5e5ea', paddingBottom: '14px' }}>
              <div style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '16px' }}>
                Invoice Preview: {selectedInvoice.invoiceNumber}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={handlePrint} className="apple-btn-primary">
                  <Printer size={16} />
                  <span>Print / Save/span>
                </button>
                <button onClick={() => setIsPrintViewOpen(false)} className="apple-btn-secondary">
                  Close
                </button>
              </div>
            </div>

            {/* Official Printable Invoice Document */}
            <div style={{ color: '#1d1d1f', fontSize: '14px', lineHeight: 1.5 }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.02em', color: '#1d1d1f' }}>
                    {activeTenant.name}
                  </h1>
                  <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
                    {activeTenant.address.street}<br />
                    {activeTenant.address.postalCode} {activeTenant.address.city}, {activeTenant.country}<br />
                    Phone: {activeTenant.phone} • Email: {activeTenant.email}
                  </div>
                  <div style={{ fontSize: '11px', color: '#86868b', marginTop: '6px' }}>
                    {activeTenant.country === 'FR' ? `SIRET: ${activeTenant.taxIdentity.siret} • N° TVA: ${activeTenant.taxIdentity.vatNumber}` : `IDE/UID: ${activeTenant.taxIdentity.uid}`}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0071e3' }}>
                    FACTURE / INVOICE
                  </h2>
                  <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '4px' }}>
                    {selectedInvoice.invoiceNumber}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
                    Date: {selectedInvoice.issueDate}<br />
                    Due Date: {selectedInvoice.dueDate}
                  </div>
                </div>
              </div>

              {/* Customer Box */}
              <div style={{ background: '#f5f5f7', padding: '16px 20px', borderRadius: '12px', marginBottom: '28px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#86868b', textTransform: 'uppercase' }}>
                    Bill To / Client :
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', marginTop: '4px' }}>
                    {customers.find(c => c.id === selectedInvoice.customerId)?.companyName || `${customers.find(c => c.id === selectedInvoice.customerId)?.firstName} ${customers.find(c => c.id === selectedInvoice.customerId)?.lastName}`}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>
                    {customers.find(c => c.id === selectedInvoice.customerId)?.address.street}<br />
                    {customers.find(c => c.id === selectedInvoice.customerId)?.address.postalCode} {customers.find(c => c.id === selectedInvoice.customerId)?.address.city}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#86868b', textTransform: 'uppercase' }}>
                    Vehicle Serviced :
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#0071e3', marginTop: '4px' }}>
                    {vehicles.find(v => v.id === selectedInvoice.vehicleId)?.licensePlate}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6e6e73' }}>
                    {vehicles.find(v => v.id === selectedInvoice.vehicleId)?.make} {vehicles.find(v => v.id === selectedInvoice.vehicleId)?.model}
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #1d1d1f', color: '#1d1d1f', fontWeight: 700, textAlign: 'left' }}>
                    <th style={{ padding: '8px 0' }}>Description</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>Qty</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right' }}>Unit Price HT</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center' }}>TVA %</th>
                    <th style={{ padding: '8px 0', textAlign: 'right' }}>Total HT</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.lines.map((l, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #e5e5ea' }}>
                      <td style={{ padding: '10px 0', fontWeight: 500 }}>{l.description}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'center' }}>{l.quantity}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'right' }}>{l.unitPrice.toFixed(2)} {selectedInvoice.currency}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'center' }}>{l.vatRate}%</td>
                      <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600 }}>{l.totalExclVat.toFixed(2)} {selectedInvoice.currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals & Tax Rationale */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '2px solid #e5e5ea', paddingTop: '16px' }}>
                <div style={{ maxWidth: '400px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#6e6e73' }}>
                    Tax Treatment & Legal Basis:
                  </div>
                  <div style={{ fontSize: '12px', color: '#1d1d1f', marginTop: '2px' }}>
                    {selectedInvoice.taxTreatment}
                  </div>
                  <div style={{ fontSize: '11px', color: '#86868b', marginTop: '8px' }}>
                    IBAN: {activeTenant.taxIdentity.iban || 'FR76 XXXX XXXX'}<br />
                    BIC/SWIFT: {activeTenant.taxIdentity.bic || 'BNPAFRPPXXX'}
                  </div>
                </div>

                <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Subtotal HT:</span>
                    <strong>{selectedInvoice.subtotalExclVat.toFixed(2)} {selectedInvoice.currency}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span>Total TVA:</span>
                    <strong>{selectedInvoice.totalVat.toFixed(2)} {selectedInvoice.currency}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#1d1d1f', borderTop: '2px solid #1d1d1f', paddingTop: '8px', marginTop: '4px' }}>
                    <span>Total TTC:</span>
                    <span>{selectedInvoice.totalAmount.toFixed(2)} {selectedInvoice.currency}</span>
                  </div>
                </div>
              </div>

              {/* Swiss QR-Bill Section (if CH) */}
              {activeTenant.country === 'CH' && selectedInvoice.qrBillReference && (
                <div style={{ marginTop: '36px', borderTop: '2px dashed #000', paddingTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '90px', height: '90px', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <QrCode size={70} />
                    </div>
                    <div style={{ fontSize: '11px' }}>
                      <strong>Swiss QR-Bill Reference (Section paiement)</strong><br />
                      Compte / Zahlbar an: {activeTenant.taxIdentity.iban}<br />
                      Référence: {selectedInvoice.qrBillReference}<br />
                      Payable par: {customers.find(c => c.id === selectedInvoice.customerId)?.firstName} {customers.find(c => c.id === selectedInvoice.customerId)?.lastName}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>Montant / Betrag</div>
                    <div style={{ fontSize: '18px', fontWeight: 800 }}>CHF {selectedInvoice.totalAmount.toFixed(2)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* E-Invoice Inspector Modal */}
      <EInvoiceModal
        invoice={eInvoiceModalInvoice}
        tenant={activeTenant}
        customer={customers.find(c => c.id === eInvoiceModalInvoice?.customerId)}
        onClose={() => setEInvoiceModalInvoice(null)}
        onSubmitted={() => {
          loadData();
        }}
      />
    </div>
  );
};


// ==========================================================================
// AtelierOS - French E-Invoicing & Factur-X Payload Modal
// ==========================================================================



  Receipt, 
  X, 
  CheckCircle2, 
  Send, 
  Copy, 
  Check, 
  Code, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';





const EInvoiceModal = ({
  invoice,
  tenant,
  customer,
  onClose,
  onSubmitted
}) => {
  if (!invoice) return null;

  const [activeTab, setActiveTab] = useState('SUMMARY');
  const [copied, setCopied] = useState(false);
  const [platform, setPlatform] = useState('CHORUS_PRO');
  const [submissionResult, setSubmissionResult] = useState(null);

  const payload = EInvoiceConnector.generatePayload(invoice);

  const handleCopyXml = () => {
    navigator.clipboard.writeText(payload.xmlPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransmit = () => {
    const result = EInvoiceConnector.submitToChorusPro(invoice.id, platform);
    setSubmissionResult(result);
    onSubmitted();
  };

  return (
    <div className="apple-modal-overlay" onClick={onClose}>
      <div 
        className="apple-modal-content p-6 max-w-3xl animate-fade-in" 
        onClick={e => e.stopPropagation()}
        style={{ padding: '32px', maxWidth: '820px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(0, 113, 227, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0071e3'
            }}>
              <Receipt size={24} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f' }}>
                  E-Invoicing Connector
                </h2>
                <span className="apple-badge apple-badge-blue" style={{ fontSize: '11px' }}>
                  {payload.specification}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#6e6e73' }}>
                Invoice: <strong>{invoice.invoiceNumber}</strong> • Compliant with French PPF / PDP Standard
              </p>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}>
            <X size={22} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e5ea', paddingBottom: '12px', marginBottom: '20px' }}>
          {[
            { id: 'SUMMARY', label: 'Structured Payload Summary' },
            { id: 'XML', label: 'Inspect Factur-X / UBL XML' },
            { id: 'SUBMISSION', label: 'Transmit & Live Status' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === tab.id ? 'rgba(0, 113, 227, 0.1)' : 'transparent',
                color: activeTab === tab.id ? '#0071e3' : '#6e6e73',
                fontWeight: activeTab === tab.id ? 700 : 500,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Summary */}
        {activeTab === 'SUMMARY' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
                <h4 style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Seller (Workshop)</h4>
                <div><strong>Company:</strong> {payload.seller.name}</div>
                <div><strong>SIRET / UID:</strong> {payload.seller.siret}</div>
                <div><strong>VAT:</strong> {payload.seller.vatNumber || 'FRxx'}</div>
                <div><strong>Address:</strong> {payload.seller.address}</div>
              </div>

              <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
                <h4 style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Buyer (Customer)</h4>
                <div><strong>Name:</strong> {payload.buyer.name}</div>
                <div><strong>Legal ID:</strong> {payload.buyer.siretOrUid || 'B2C'}</div>
                <div><strong>Country:</strong> {payload.buyer.country}</div>
                <div><strong>Address:</strong> {payload.buyer.address}</div>
              </div>
            </div>

            <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
              <h4 style={{ fontWeight: 700, color: '#1d1d1f', marginBottom: '8px' }}>Tax & Financial Breakdown</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>Total Excl. Tax: <strong>{payload.financials.subtotalExclTax.toFixed(2)} {payload.financials.currency}</strong></div>
                <div>Total VAT: <strong>{payload.financials.vatTotal.toFixed(2)} {payload.financials.currency}</strong></div>
                <div>Total Payable: <strong>{payload.financials.grandTotal.toFixed(2)} {payload.financials.currency}</strong></div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Raw XML */}
        {activeTab === 'XML' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#86868b', fontFamily: 'monospace' }}>
                Standard: Factur-X / CII EN16931 Schema
              </span>
              <button onClick={handleCopyXml} className="apple-btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }}>
                {copied ? <Check size={13} color="#30d158" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy XML'}</span>
              </button>
            </div>
            <pre style={{
              background: '#1d1d1f',
              color: '#64d2ff',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '11px',
              fontFamily: 'monospace',
              maxHeight: '340px',
              overflowY: 'auto',
              lineHeight: 1.4
            }}>
              {payload.xmlPreview}
            </pre>
          </div>
        )}

        {/* Tab 3: Transmission */}
        {activeTab === 'SUBMISSION' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6e6e73', marginBottom: '6px' }}>
                Select French E-Invoicing Platform
              </label>
              <select
                value={platform}
                onChange={e => setPlatform(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e5e5ea', fontWeight: 600 }}
              >
                <option value="CHORUS_PRO">Chorus Pro (Portail Public de Facturation - B2G & B2B)</option>
                <option value="PPF">PPF Native Direct API</option>
                <option value="PDP_GENERIC">Partner PDP Dematerialization Platform</option>
              </select>
            </div>

            {submissionResult ? (
              <div style={{ background: 'rgba(48, 209, 88, 0.12)', border: '1px solid rgba(48, 209, 88, 0.3)', padding: '20px', borderRadius: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#248a3d', fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>
                  <CheckCircle2 size={20} />
                  <span>Submission Accepted & Recorded</span>
                </div>
                <div style={{ fontSize: '13px', color: '#1d1d1f', lineHeight: 1.5 }}>
                  {submissionResult.message}
                </div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#6e6e73' }}>
                  External Transaction Reference: <strong>{submissionResult.submissionId}</strong>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <button
                  onClick={handleTransmit}
                  className="apple-btn-primary"
                  style={{ padding: '12px 28px', fontSize: '15px' }}
                >
                  <Send size={16} />
                  <span>Transmit Electronic Payload to {platform}</span>
                </button>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="apple-btn-secondary">
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};


// ==========================================================================
// AtelierOS - Public Customer Online Web Booking Portal
// Powered by ONE Central Scheduling Engine (No WhatsApp Required)
// ==========================================================================



  Car, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Wrench, 
  Phone, 
  Mail, 
  User, 
  AlertCircle,
  Timer
} from 'lucide-react';








const CustomerBookingPortal = ({
  activeTenant,
  currentLanguage,
  onBookingCompleted
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const tb = t.bookingPortal;

  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);

  // Form State
  const [plate, setPlate] = useState('');
  const [makeModel, setMakeModel] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [intakeAnswers, setIntakeAnswers] = useState>({});
  
  // Slot selection & Hold
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [activeHoldId, setActiveHoldId] = useState(null);
  const [holdCountdownSeconds, setHoldCountdownSeconds] = useState(600); // 10 minutes

  // Customer Contact
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState(activeTenant.country === 'FR' ? '+33 ' : '+41 ');
  const [email, setEmail] = useState('');
  const [gdprConsent, setGdprConsent] = useState(true);

  // Success
  const [confirmedCode, setConfirmedCode] = useState(null);

  useEffect(() => {
    const s = StorageService.getServices(activeTenant.id).filter(item => item.onlineBookable && item.active);
    setServices(s);
    if (s.length > 0) setSelectedServiceId(s[0].id);
  }, [activeTenant.id]);

  // Load available slots whenever service or date changes
  useEffect(() => {
    if (selectedServiceId && selectedDate) {
      const slots = SchedulingService.getAvailableSlots(activeTenant.id, selectedServiceId, selectedDate);
      setAvailableSlots(slots);
    }
  }, [activeTenant.id, selectedServiceId, selectedDate]);

  // Hold Timer countdown
  useEffect(() => {
    if (!activeHoldId) return;
    const interval = setInterval(() => {
      setHoldCountdownSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveHoldId(null);
          setSelectedSlot(null);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [activeHoldId]);

  const handleSelectSlot = (slot: AvailableSlot) => {
    if (activeHoldId) {
      SchedulingService.releaseSlotHold(activeHoldId);
    }

    const hold = SchedulingService.createSlotHold({
      tenantId: activeTenant.id,
      serviceId: selectedServiceId,
      mechanicId: slot.mechanicId,
      bayId: slot.bayId,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime
    });

    if (hold) {
      setActiveHoldId(hold.id);
      setSelectedSlot(slot);
      setHoldCountdownSeconds(600);
    }
  };

  const handleFinalConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || !selectedServiceId) return;

    // 1. Create or Find Customer
    let customer = StorageService.getCustomers(activeTenant.id).find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!customer) {
      customer = {
        id: `cust-web-${Date.now()}`,
        tenantId: activeTenant.id,
        type: 'INDIVIDUAL',
        firstName,
        lastName,
        email,
        phone,
        country: activeTenant.country,
        address: {
          street: 'Registered via Web Portal',
          city: activeTenant.address.city,
          postalCode: activeTenant.address.postalCode,
          country: activeTenant.country === 'FR' ? 'France' : 'Switzerland'
        },
        preferredLanguage: activeTenant.country === 'FR' ? 'fr' : 'fr-CH',
        gdprConsent: {
          consentedAt: new Date().toISOString(),
          marketingConsent: true,
          smsConsent: true,
          whatsappConsent: true
        },
        createdAt: new Date().toISOString()
      };
      const allCust = StorageService.getAllCustomers();
      allCust.push(customer);
      StorageService.saveCustomers(allCust);
    }

    // 2. Create Vehicle
    let vehicle = StorageService.getVehicles(activeTenant.id).find(v => v.licensePlate.toUpperCase() === plate.toUpperCase());
    if (!vehicle) {
      vehicle = {
        id: `veh-web-${Date.now()}`,
        tenantId: activeTenant.id,
        customerId: customer.id,
        licensePlate: plate.toUpperCase(),
        vin: 'VF3' + Math.random().toString(36).substring(2, 16).toUpperCase(),
        make: makeModel.split(' ')[0] || 'Vehicle',
        model: makeModel.split(' ').slice(1).join(' ') || 'Standard',
        year: 2022,
        fuelType: 'PETROL',
        transmission: 'AUTOMATIC',
        mileage: 50000,
        notes: 'Online customer booking'
      };
      const allVeh = StorageService.getAllVehicles();
      allVeh.push(vehicle);
      StorageService.saveVehicles(allVeh);
    }

    // 3. Confirm Appointment via Central Scheduling Engine
    const app = SchedulingService.confirmAppointment({
      tenantId: activeTenant.id,
      customerId: customer.id,
      vehicleId: vehicle.id,
      serviceId: selectedServiceId,
      mechanicId: selectedSlot.mechanicId,
      bayId: selectedSlot.bayId,
      date: selectedSlot.date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      source: 'ONLINE_WEB',
      customerAnswers: intakeAnswers,
      holdId: activeHoldId || undefined
    });

    // 4. Dispatch Notifications
    CommunicationService.notifyBookingConfirmed(app, customer, activeTenant);

    setConfirmedCode(app.confirmationCode);
    if (onBookingCompleted) onBookingCompleted(app.confirmationCode);
  };

  const selectedServiceObj = services.find(s => s.id === selectedServiceId);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Garage Header */}
      <div className="apple-card" style={{ padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
        <span className="apple-badge apple-badge-blue" style={{ marginBottom: '8px' }}>
          Official Online Booking
        </span>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1d1d1f' }}>{activeTenant.name}</h1>
        <p style={{ fontSize: '13px', color: '#6e6e73', marginTop: '4px' }}>
          {activeTenant.address.street}, {activeTenant.address.city} • Phone: {activeTenant.phone}
        </p>
      </div>

      {confirmedCode ? (
        /* Confirmation Screen */
        <div className="apple-card animate-fade-in" style={{ padding: '40px 24px', textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'rgba(48, 209, 88, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#30d158',
            margin: '0 auto 20px'
          }}>
            <CheckCircle2 size={36} />
          </div>

          <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#1d1d1f', marginBottom: '8px' }}>
            {tb.successTitle}
          </h2>
          <p style={{ fontSize: '14px', color: '#6e6e73', marginBottom: '24px' }}>
            Your appointment has been registered directly into our central workshop agenda.
          </p>

          <div style={{
            background: '#f5f5f7',
            padding: '20px',
            borderRadius: '16px',
            maxWidth: '380px',
            margin: '0 auto 24px',
            border: '1px dashed #0071e3'
          }}>
            <span style={{ fontSize: '12px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {tb.successRef}
            </span>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#0071e3', letterSpacing: '0.05em', marginTop: '4px' }}>
              {confirmedCode}
            </div>
            <div style={{ fontSize: '13px', color: '#1d1d1f', marginTop: '8px' }}>
              Date: <strong>{selectedSlot?.date}</strong> ({selectedSlot?.startTime} - {selectedSlot?.endTime})
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', color: '#30d158', fontWeight: 600 }}>
            <ShieldCheck size={18} />
            <span>{tb.smsNotice}</span>
          </div>

          <button 
            onClick={() => {
              setStep(1);
              setConfirmedCode(null);
              setSelectedSlot(null);
              setActiveHoldId(null);
            }}
            className="apple-btn-secondary"
            style={{ marginTop: '32px' }}
          >
            Book Another Appointment
          </button>
        </div>
      ) : (
        /* Stepper Form */
        <div className="apple-card" style={{ padding: '32px' }}>
          {/* Hold Countdown Badge if slot held */}
          {activeHoldId && (
            <div style={{
              background: 'rgba(0, 113, 227, 0.08)',
              border: '1px solid rgba(0, 113, 227, 0.25)',
              padding: '10px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '13px',
              color: '#0071e3',
              fontWeight: 600
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Timer size={16} />
                <span>Temporary Slot Reservation Active:</span>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 800 }}>{formatTimer(holdCountdownSeconds)}</span>
            </div>
          )}

          {/* Stepper Progress */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px', borderBottom: '1px solid #e5e5ea', paddingBottom: '16px' }}>
            {[tb.step1, tb.step2, tb.step3, tb.step4].map((label, idx) => (
              <div key={idx} style={{
                fontSize: '12px',
                fontWeight: step === idx + 1 ? 700 : 500,
                color: step === idx + 1 ? '#0071e3' : '#86868b',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: step === idx + 1 ? '#0071e3' : 'rgba(0,0,0,0.08)',
                  color: step === idx + 1 ? '#fff' : '#6e6e73',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px'
                }}>
                  {idx + 1}
                </span>
                <span style={{ display: 'none', sm: 'inline' }}>{label.split('. ')[1]}</span>
              </div>
            ))}
          </div>

          {/* Step 1: Vehicle Plate */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tb.step1}</h3>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '6px' }}>
                  License Plate / Immatriculation
                </label>
                <input 
                  type="text" 
                  value={plate} 
                  onChange={e => setPlate(e.target.value.toUpperCase())}
                  placeholder={tb.platePlaceholder}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea', fontSize: '18px', fontWeight: 800, textTransform: 'uppercase' }}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '6px' }}>
                  Vehicle Make & Model
                </label>
                <input 
                  type="text" 
                  value={makeModel} 
                  onChange={e => setMakeModel(e.target.value)}
                  placeholder={tb.makeModelPlaceholder}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <button 
                type="button" 
                onClick={() => setStep(2)}
                disabled={!plate.trim()}
                className="apple-btn-primary" 
                style={{ marginTop: '12px', padding: '12px 24px', fontSize: '15px' }}
              >
                <span>Continue to Service Selection</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {/* Step 2: Select Service */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tb.step2}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {services.map(s => (
                  <div 
                    key={s.id}
                    onClick={() => setSelectedServiceId(s.id)}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      border: selectedServiceId === s.id ? '2px solid #0071e3' : '1px solid #e5e5ea',
                      background: selectedServiceId === s.id ? 'rgba(0, 113, 227, 0.04)' : '#ffffff',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1d1d1f' }}>{s.name}</h4>
                      <p style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>{s.description}</p>
                      <div style={{ fontSize: '12px', color: '#0071e3', fontWeight: 600, marginTop: '6px' }}>
                        Estimated Duration: ~{s.estimatedDurationMin} minutes
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: '#1d1d1f' }}>
                        {s.baseLaborPrice.toFixed(2)} {activeTenant.currency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button onClick={() => setStep(1)} className="apple-btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button onClick={() => setStep(3)} className="apple-btn-primary">
                  <span>Choose Date & Time</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Slot Selection from Central Scheduling Engine */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tb.step3}</h3>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '6px' }}>
                  Select Preferred Date
                </label>
                <input 
                  type="date" 
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setSelectedDate(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea', fontWeight: 600 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '8px' }}>
                  Available Live Slots (Central Agenda):
                </label>
                {availableSlots.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px', background: '#f5f5f7', borderRadius: '12px', color: '#86868b' }}>
                    No slots available for this date. Please choose another day.
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '10px' }}>
                    {availableSlots.map((slot, idx) => {
                      const isSelected = selectedSlot?.startTime === slot.startTime && selectedSlot?.date === slot.date;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectSlot(slot)}
                          style={{
                            padding: '12px 8px',
                            borderRadius: '10px',
                            border: isSelected ? '2px solid #0071e3' : '1px solid #e5e5ea',
                            background: isSelected ? '#0071e3' : '#ffffff',
                            color: isSelected ? '#ffffff' : '#1d1d1f',
                            fontWeight: 700,
                            fontSize: '14px',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          <Clock size={13} style={{ display: 'inline', marginRight: '4px' }} />
                          {slot.startTime}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button onClick={() => setStep(2)} className="apple-btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button 
                  onClick={() => setStep(4)} 
                  disabled={!selectedSlot}
                  className="apple-btn-primary"
                >
                  <span>Confirm Contact Details</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact & GDPR Consent */}
          {step === 4 && (
            <form onSubmit={handleFinalConfirmBooking} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tb.step4}</h3>

              <div style={{ background: '#f5f5f7', padding: '14px', borderRadius: '12px', fontSize: '13px' }}>
                <div><strong>Service:</strong> {selectedServiceObj?.name}</div>
                <div><strong>Slot:</strong> {selectedSlot?.date} at {selectedSlot?.startTime} - {selectedSlot?.endTime}</div>
                <div><strong>Vehicle:</strong> {plate} ({makeModel})</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    First Name
                  </label>
                  <input 
                    type="text" 
                    value={firstName} 
                    onChange={e => setFirstName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    value={lastName} 
                    onChange={e => setLastName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Mobile Phone (For SMS Confirmation)
                  </label>
                  <input 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Email Address (For Calendar Invite)
                  </label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              {/* GDPR Consent */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginTop: '6px' }}>
                <input 
                  type="checkbox" 
                  id="gdpr"
                  checked={gdprConsent}
                  onChange={e => setGdprConsent(e.target.checked)}
                  required
                  style={{ marginTop: '4px' }}
                />
                <label htmlFor="gdpr" style={{ fontSize: '12px', color: '#6e6e73', lineHeight: 1.4 }}>
                  {tb.consentGdpr}
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <button type="button" onClick={() => setStep(3)} className="apple-btn-secondary">
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>
                <button type="submit" className="apple-btn-primary" style={{ padding: '12px 24px', fontSize: '15px' }}>
                  <span>{tb.confirmBooking}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};


// ==========================================================================
// AtelierOS - Customer Quote Approval Portal (Magic Link)
// ==========================================================================



  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  Car, 
  User, 
  ShieldCheck, 
  Building2, 
  Check, 
  PenTool, 
  AlertCircle 
} from 'lucide-react';







const CustomerApprovalPortal = ({
  magicToken,
  currentLanguage,
  onBackToApp
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const tap = t.approvalPortal;

  const [quote, setQuote] = useState(null);
  const [tenant, setTenant] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [vehicle, setVehicle] = useState(null);

  const [signatureName, setSignatureName] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [actionDoneMessage, setActionDoneMessage] = useState(null);

  useEffect(() => {
    const allQuotes = StorageService.getAllQuotes();
    const target = allQuotes.find(q => q.magicToken === magicToken) || allQuotes[0];
    if (target) {
      setQuote(target);
      const allTenants = StorageService.getTenants();
      const allCust = StorageService.getAllCustomers();
      const allVeh = StorageService.getAllVehicles();

      setTenant(allTenants.find(t => t.id === target.tenantId) || allTenants[0]);
      setCustomer(allCust.find(c => c.id === target.customerId) || null);
      setVehicle(allVeh.find(v => v.id === target.vehicleId) || null);

      if (target.approvalSignature) {
        setSignatureName(target.approvalSignature);
      }
    }
  }, [magicToken]);

  const handleApprove = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote || !signatureName.trim()) return;

    const updated = QuoteInvoiceService.approveQuote(quote.id, signatureName.trim());
    setQuote({ ...updated });
    setActionDoneMessage(tap.approvedSuccess);
  };

  const handleReject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote) return;

    const updated = QuoteInvoiceService.rejectQuote(quote.id, rejectionReason.trim());
    setQuote({ ...updated });
    setActionDoneMessage(tap.rejectedSuccess);
  };

  if (!quote || !tenant) {
    return (
      <div style={{ maxWidth: '600px', margin: '80px auto', textAlign: 'center', padding: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 700 }}>Quote Link Not Found</h2>
        <p style={{ color: '#6e6e73', marginTop: '8px' }}>This magic link may have expired or is invalid.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Garage Header */}
      <div className="apple-card" style={{ padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
        <span className="apple-badge apple-badge-blue" style={{ marginBottom: '8px' }}>
          Customer Approval Portal
        </span>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1d1d1f' }}>{tenant.name}</h1>
        <p style={{ fontSize: '13px', color: '#6e6e73', marginTop: '4px' }}>
          {tenant.address.street}, {tenant.address.city} • Phone: {tenant.phone}
        </p>
      </div>

      {actionDoneMessage && (
        <div style={{
          background: quote.status === 'APPROVED' ? 'rgba(48, 209, 88, 0.12)' : 'rgba(255, 69, 58, 0.12)',
          border: `1px solid ${quote.status === 'APPROVED' ? 'rgba(48, 209, 88, 0.3)' : 'rgba(255, 69, 58, 0.3)'}`,
          padding: '16px 20px',
          borderRadius: '16px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: quote.status === 'APPROVED' ? '#248a3d' : '#ff453a',
          fontWeight: 600
        }}>
          {quote.status === 'APPROVED' ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
          <span>{actionDoneMessage}</span>
        </div>
      )}

      {/* Quote Summary Box */}
      <div className="apple-card" style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', borderBottom: '1px solid #e5e5ea', paddingBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Quotation Reference:
            </span>
            <div style={{ fontSize: '22px', fontWeight: 800, color: '#0071e3', marginTop: '2px' }}>
              {quote.quoteNumber}
            </div>
            <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '4px' }}>
              Valid until: {quote.validUntil}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className={`apple-badge ${
              quote.status === 'APPROVED' ? 'apple-badge-green' :
              quote.status === 'REJECTED' ? 'apple-badge-red' : 'apple-badge-amber'
            }`} style={{ fontSize: '13px', padding: '6px 14px' }}>
              {quote.status}
            </span>
          </div>
        </div>

        {/* Customer & Vehicle Info */}
        <div style={{ background: '#f5f5f7', padding: '16px', borderRadius: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px', fontSize: '13px' }}>
          <div>
            <strong>Client:</strong> {customer?.firstName} {customer?.lastName}
          </div>
          <div>
            <strong>Vehicle:</strong> {vehicle?.make} {vehicle?.model} (<span style={{ color: '#0071e3', fontWeight: 700 }}>{vehicle?.licensePlate}</span>)
          </div>
        </div>

        {/* Line Items Table */}
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '12px', color: '#1d1d1f' }}>
          Recommended Services & Parts
        </h3>

        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #1d1d1f', color: '#1d1d1f', fontWeight: 700, textAlign: 'left' }}>
              <th style={{ padding: '8px 0' }}>Item Description</th>
              <th style={{ padding: '8px 10px', textAlign: 'center' }}>Qty</th>
              <th style={{ padding: '8px 10px', textAlign: 'right' }}>Unit Price</th>
              <th style={{ padding: '8px 0', textAlign: 'right' }}>Total HT</th>
            </tr>
          </thead>
          <tbody>
            {quote.lines.map((l, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #e5e5ea' }}>
                <td style={{ padding: '10px 0', fontWeight: 500 }}>{l.description}</td>
                <td style={{ padding: '10px 10px', textAlign: 'center' }}>{l.quantity}</td>
                <td style={{ padding: '10px 10px', textAlign: 'right' }}>{l.unitPrice.toFixed(2)} {quote.currency}</td>
                <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 600 }}>{l.totalExclVat.toFixed(2)} {quote.currency}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Breakdown */}
        <div style={{ background: '#f9f9fb', padding: '16px 20px', borderRadius: '14px', border: '1px solid #e5e5ea', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span>Subtotal Excl. Tax (HT):</span>
            <strong>{quote.subtotalExclVat.toFixed(2)} {quote.currency}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span>TVA / Tax Total:</span>
            <strong>{quote.totalVat.toFixed(2)} {quote.currency}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', fontWeight: 800, color: '#1d1d1f', borderTop: '2px solid #1d1d1f', paddingTop: '10px', marginTop: '4px' }}>
            <span>Grand Total (TTC):</span>
            <span style={{ color: '#0071e3' }}>{quote.totalAmount.toFixed(2)} {quote.currency}</span>
          </div>
        </div>
      </div>

      {/* Approval / Rejection Actions */}
      {quote.status === 'SENT_AWAITING_APPROVAL' && (
        <div className="apple-card" style={{ padding: '32px' }}>
          {!isRejecting ? (
            <form onSubmit={handleApprove} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <PenTool size={20} color="#0071e3" />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{tap.authorizedBy}</h3>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '6px' }}>
                  Please type your Full Name signature:
                </label>
                <input 
                  type="text" 
                  value={signatureName}
                  onChange={e => setSignatureName(e.target.value)}
                  placeholder={tap.signaturePlaceholder}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea', fontSize: '16px', fontWeight: 700 }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '12px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={!signatureName.trim()}
                  className="apple-btn-primary"
                  style={{ flex: 1, padding: '14px', fontSize: '16px', background: 'linear-gradient(135deg, #30d158 0%, #248a3d 100%)' }}
                >
                  <CheckCircle2 size={18} />
                  <span>{tap.approveBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsRejecting(true)}
                  className="apple-btn-secondary"
                  style={{ padding: '14px 20px', color: '#ff453a', borderColor: 'rgba(255, 69, 58, 0.3)' }}
                >
                  <span>Decline Quote</span>
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleReject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ff453a' }}>Decline Quotation</h3>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#6e6e73', marginBottom: '6px' }}>
                  Please provide a reason for the workshop manager:
                </label>
                <textarea 
                  value={rejectionReason}
                  onChange={e => setRejectionReason(e.target.value)}
                  placeholder={tap.rejectionReasonPlaceholder}
                  rows={3}
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setIsRejecting(false)} className="apple-btn-secondary">
                  Back
                </button>
                <button type="submit" className="apple-btn-danger">
                  Confirm Decline
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};


// ==========================================================================
// AtelierOS - Customer Live Repair Status Tracking Portal
// ==========================================================================



  Car, 
  Clock, 
  CheckCircle2, 
  Wrench, 
  ShieldCheck, 
  Search, 
  User, 
  FileText 
} from 'lucide-react';






const CustomerTrackingPortal = ({
  activeTenant,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const ttp = t.trackingPortal;

  const [plateQuery, setPlateQuery] = useState('');
  const [activeOrder, setActiveOrder] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const orders = StorageService.getWorkOrders(activeTenant.id);
    if (orders.length > 0) {
      setActiveOrder(orders[0]);
      const veh = StorageService.getVehicles(activeTenant.id).find(v => v.id === orders[0].vehicleId);
      const cust = StorageService.getCustomers(activeTenant.id).find(c => c.id === orders[0].customerId);
      setVehicle(veh || null);
      setCustomer(cust || null);
      if (veh) setPlateQuery(veh.licensePlate);
    }
  }, [activeTenant.id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setNotFound(false);
    const q = plateQuery.trim().toUpperCase();

    const veh = StorageService.getVehicles(activeTenant.id).find(v => v.licensePlate.toUpperCase() === q);
    if (!veh) {
      setNotFound(true);
      setActiveOrder(null);
      return;
    }

    const order = StorageService.getWorkOrders(activeTenant.id).find(w => w.vehicleId === veh.id);
    if (!order) {
      setNotFound(true);
      setActiveOrder(null);
      return;
    }

    const cust = StorageService.getCustomers(activeTenant.id).find(c => c.id === order.customerId);
    setVehicle(veh);
    setCustomer(cust || null);
    setActiveOrder(order);
  };

  const STAGES_PROGRESS = [
    { key: 'REQUEST', label: '1. Request Received' },
    { key: 'DIAGNOSIS', label: '2. Inspection & Diagnosis' },
    { key: 'QUOTE', label: '3. Quote & Approval' },
    { key: 'IN_PROGRESS', label: '4. Active Bay Repair' },
    { key: 'QUALITY_CHECK', label: '5. Quality Inspection' },
    { key: 'READY', label: '6. Ready for Collection' }
  ];

  const getStageIndex = (stage: string) => {
    if (stage === 'REQUEST' || stage === 'APPOINTMENT') return 0;
    if (stage === 'DIAGNOSIS') return 1;
    if (stage === 'QUOTE' || stage === 'AWAITING_APPROVAL' || stage === 'APPROVED') return 2;
    if (stage === 'IN_PROGRESS') return 3;
    if (stage === 'QUALITY_CHECK') return 4;
    return 5;
  };

  const currentProgressIndex = activeOrder ? getStageIndex(activeOrder.stage) : 0;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
      {/* Garage Header */}
      <div className="apple-card" style={{ padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
        <span className="apple-badge apple-badge-blue" style={{ marginBottom: '8px' }}>
          Live Repair Status Tracker
        </span>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#1d1d1f' }}>{activeTenant.name}</h1>
        <p style={{ fontSize: '13px', color: '#6e6e73', marginTop: '4px' }}>
          Track real-time workshop floor progress for your vehicle.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '20px auto 0' }}>
          <input 
            type="text" 
            value={plateQuery}
            onChange={e => setPlateQuery(e.target.value.toUpperCase())}
            placeholder="Enter License Plate (e.g. EK-892-TZ)..."
            style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid #e5e5ea', textTransform: 'uppercase', fontWeight: 700 }}
          />
          <button type="submit" className="apple-btn-primary">
            <Search size={16} />
            <span>Track</span>
          </button>
        </form>
      </div>

      {notFound && (
        <div style={{ background: '#fff', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#ff453a' }}>
          No active work order found for license plate <strong>{plateQuery}</strong>.
        </div>
      )}

      {activeOrder && (
        <div className="apple-card animate-fade-in" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', borderBottom: '1px solid #e5e5ea', paddingBottom: '16px' }}>
            <div>
              <span className="apple-badge apple-badge-blue" style={{ fontSize: '13px', fontWeight: 800 }}>
                {vehicle?.licensePlate}
              </span>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1d1d1f', marginTop: '6px' }}>
                {vehicle?.make} {vehicle?.model}
              </h2>
              <div style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>
                Order #{activeOrder.orderNumber} • Client: {customer?.firstName} {customer?.lastName}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="apple-badge apple-badge-green" style={{ fontSize: '13px', padding: '6px 14px' }}>
                {activeOrder.stage}
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              {STAGES_PROGRESS.map((stg, i) => (
                <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: i <= currentProgressIndex ? '#0071e3' : 'rgba(0,0,0,0.06)',
                    color: i <= currentProgressIndex ? '#ffffff' : '#86868b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 6px',
                    fontWeight: 700,
                    fontSize: '13px'
                  }}>
                    {i < currentProgressIndex ? <CheckCircle2 size={18} /> : i + 1}
                  </div>
                  <span style={{ fontSize: '11px', color: i <= currentProgressIndex ? '#1d1d1f' : '#86868b', fontWeight: i === currentProgressIndex ? 700 : 500 }}>
                    {stg.label.split('. ')[1]}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress line */}
            <div style={{ height: '6px', background: '#e5e5ea', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #0071e3 0%, #30d158 100%)',
                width: `${((currentProgressIndex + 1) / STAGES_PROGRESS.length) * 100}%`,
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>

          {/* Diagnostic Inspection Checklist Preview */}
          <div style={{ background: '#f5f5f7', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: '#1d1d1f' }}>
              Completed Workshop Health Checkpoints:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activeOrder.checklist.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', background: '#ffffff', padding: '10px 14px', borderRadius: '10px' }}>
                  <span>{item.title}</span>
                  <span className={`apple-badge ${item.status === 'PASS' ? 'apple-badge-green' : 'apple-badge-amber'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================================================
// AtelierOS - Omnichannel Communications Hub (SMS, Email, WhatsApp)
// ==========================================================================



  MessageSquare, 
  Send, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Clock, 
  User, 
  ShieldCheck, 
  Smartphone,
  Check
} from 'lucide-react';







const CommunicationsHub = ({
  activeTenant,
  currentLanguage
}) => {
  const t = (translations[currentLanguage] || translations.en);

  const [logs, setLogs] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Composer
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [channel, setChannel] = useState('SMS');
  const [templateType, setTemplateType] = useState('BOOKING_CONFIRMATION');
  const [customBody, setCustomBody] = useState('');
  const [sentNotice, setSentNotice] = useState(false);

  const loadData = () => {
    setLogs(StorageService.getCommunications(activeTenant.id));
    const custs = StorageService.getCustomers(activeTenant.id);
    setCustomers(custs);
    if (custs.length > 0 && !selectedCustomerId) {
      setSelectedCustomerId(custs[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTenant.id]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === selectedCustomerId);
    if (!cust) return;

    const recipient = channel === 'EMAIL' ? cust.email : cust.phone;
    const body = customBody.trim() || `${activeTenant.name}: Notification automatique concernant votre véhicule en atelier.`;

    CommunicationService.sendNotification({
      tenantId: activeTenant.id,
      customerId: cust.id,
      recipient,
      channel,
      templateType,
      subject: channel === 'EMAIL' ? `Notification - ${activeTenant.name}` : undefined,
      messageBody: body
    });

    setCustomBody('');
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 2500);
    loadData();
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>Omnichannel Communications Hub</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>
            Automated & direct SMS, Email, and WhatsApp dispatches with delivery tracking.
          </p>
        </div>

        <span className="apple-badge apple-badge-green" style={{ fontSize: '13px', padding: '6px 14px' }}>
          GDPR Opt-In Enforced
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* Left Column: Quick Dispatcher */}
        <div className="apple-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Smartphone size={22} color="#0071e3" />
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Dispatch Customer Notification</h2>
          </div>

          {sentNotice && (
            <div style={{ background: '#30d158', color: '#ffffff', padding: '12px 16px', borderRadius: '12px', marginBottom: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={16} />
              <span>Message dispatched successfully</span>
            </div>
          )}

          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Target Customer */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                Recipient Customer
              </label>
              <select 
                value={selectedCustomerId}
                onChange={e => setSelectedCustomerId(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea', fontWeight: 600 }}
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.firstName} {c.lastName} ({c.phone} • {c.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Channel Switcher */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                Channel
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {(['SMS', 'EMAIL', 'WHATSAPP']).map(ch => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setChannel(ch)}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: channel === ch ? '2px solid #0071e3' : '1px solid #e5e5ea',
                      background: channel === ch ? 'rgba(0, 113, 227, 0.08)' : '#ffffff',
                      color: channel === ch ? '#0071e3' : '#6e6e73',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Template */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                Message Template Type
              </label>
              <select
                value={templateType}
                onChange={e => setTemplateType(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
              >
                <option value="BOOKING_CONFIRMATION">Booking Confirmation</option>
                <option value="REMINDER_24H">24-Hour Appointment Reminder</option>
                <option value="QUOTE_APPROVAL_LINK">Quote Ready for Approval</option>
                <option value="VEHICLE_READY">Vehicle Ready for Collection</option>
                <option value="INVOICE_ISSUED">Invoice Issued & Available</option>
                <option value="REVIEW_REQUEST">Review & Feedback Request</option>
              </select>
            </div>

            {/* Custom Text */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                Custom Message Override (Optional)
              </label>
              <textarea 
                value={customBody}
                onChange={e => setCustomBody(e.target.value)}
                placeholder="Leave blank to use default localized template..."
                rows={3}
                style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea', fontSize: '14px' }}
              />
            </div>

            <button type="submit" className="apple-btn-primary" style={{ padding: '12px', fontSize: '15px', marginTop: '6px' }}>
              <Send size={16} />
              <span>Dispatch Message</span>
            </button>
          </form>
        </div>

        {/* Right Column: Communications Audit Log */}
        <div className="apple-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Transmission History</h2>
            <span className="apple-badge apple-badge-neutral">{logs.length} logged</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '520px', overflowY: 'auto' }}>
            {logs.map(log => {
              const cust = customers.find(c => c.id === log.customerId);

              return (
                <div key={log.id} style={{ background: '#f5f5f7', padding: '14px', borderRadius: '12px', border: '1px solid #e5e5ea' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`apple-badge ${
                        log.channel === 'WHATSAPP' ? 'apple-badge-green' :
                        log.channel === 'SMS' ? 'apple-badge-blue' : 'apple-badge-amber'
                      }`} style={{ fontSize: '10px' }}>
                        {log.channel}
                      </span>
                      <span style={{ fontWeight: 600, fontSize: '13px', color: '#1d1d1f' }}>
                        {cust?.firstName} {cust?.lastName}
                      </span>
                    </div>

                    <span className="apple-badge apple-badge-green" style={{ fontSize: '10px' }}>
                      {log.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: '#333336', lineHeight: 1.4, margin: '6px 0' }}>
                    {log.messageBody}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#86868b', marginTop: '6px' }}>
                    <span>To: {log.recipient}</span>
                    <span>{new Date(log.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================================================
// AtelierOS - SaaS Super Admin Platform (Multi-Tenant Management)
// ==========================================================================



  Building2, 
  ShieldCheck, 
  DollarSign, 
  Users, 
  Activity, 
  Plus, 
  Globe2, 
  CheckCircle2, 
  Zap,
  Server
} from 'lucide-react';






const SuperAdminDashboard = ({
  currentLanguage,
  onSwitchTenant
}) => {
  const t = (translations[currentLanguage] || translations.en);
  const tsa = t.superAdmin;

  const [tenants, setTenants] = useState([]);
  const [isOnboardModalOpen, setIsOnboardModalOpen] = useState(false);

  // New Tenant Form
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [country, setCountry] = useState('FR');
  const [currency, setCurrency] = useState('EUR');
  const [phone, setPhone] = useState('+33 1 ');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lyon');
  const [street, setStreet] = useState('10 Place Bellecour');
  const [postalCode, setPostalCode] = useState('69002');
  const [siret, setSiret] = useState('91234567800019');
  const [tier, setTier] = useState('pro');

  const loadData = () => {
    setTenants(StorageService.getTenants());
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalMRR = tenants.reduce((acc, tenant) => {
    if (tenant.subscriptionTier === 'starter') return acc + 89;
    if (tenant.subscriptionTier === 'pro') return acc + 189;
    if (tenant.subscriptionTier === 'ai') return acc + 299;
    return acc;
  }, 0);

  const handleCountryChange = (c: 'FR' | 'CH') => {
    setCountry(c);
    setCurrency(c === 'FR' ? 'EUR' : 'CHF');
    setPhone(c === 'FR' ? '+33 1 ' : '+41 22 ');
  };

  const handleOnboardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTenant = {
      id: `tenant-${country.toLowerCase()}-${Date.now()}`,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      tagline: 'Modern Multimarque Workshop Facility',
      country,
      currency,
      phone,
      email,
      address: {
        street,
        city,
        postalCode,
        countryCode: country
      },
      taxIdentity: {
        siret: country === 'FR' ? siret : undefined,
        uid: country === 'CH' ? siret : undefined,
        vatNumber: country === 'FR' ? `FR88${siret.substring(0, 9)}` : `${siret} TVA`
      },
      settings: {
        openingTime: '08:00',
        closingTime: '18:30',
        lunchStart: '12:00',
        lunchEnd: '13:30',
        workDays: [1, 2, 3, 4, 5, 6],
        defaultLaborRate: country === 'FR' ? 88.0 : 145.0,
        standardVatRate: country === 'FR' ? 20.0 : 8.1,
        slotDurationMin: 30,
        slotHoldTimeoutMin: 10,
        autoConfirmEligible: true
      },
      subscriptionTier: tier,
      active: true
    };

    const all = StorageService.getTenants();
    all.push(newTenant);
    localStorage.setItem('atelieros_tenants', JSON.stringify(all));
    loadData();
    setIsOnboardModalOpen(false);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1d1d1f' }}>{tsa.title}</h1>
          <p style={{ fontSize: '14px', color: '#6e6e73' }}>{tsa.subtitle}</p>
        </div>

        <button onClick={() => setIsOnboardModalOpen(true)} className="apple-btn-primary">
          <Plus size={16} />
          <span>{tsa.onboardGarage}</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <div className="apple-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86868b', fontSize: '13px', fontWeight: 600 }}>
            <span>{tsa.totalGarages}</span>
            <Building2 size={18} color="#0071e3" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#1d1d1f', marginTop: '8px' }}>
            {tenants.length}
          </div>
          <span style={{ fontSize: '12px', color: '#30d158', fontWeight: 600 }}>France & Switzerland Active</span>
        </div>

        <div className="apple-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86868b', fontSize: '13px', fontWeight: 600 }}>
            <span>{tsa.totalRevenue}</span>
            <DollarSign size={18} color="#30d158" />
          </div>
          <div style={{ fontSize: '32px', fontWeight: 800, color: '#1d1d1f', marginTop: '8px' }}>
            €{totalMRR.toLocaleString()}/mo
          </div>
          <span style={{ fontSize: '12px', color: '#6e6e73' }}>Recurring SaaS Subscription Volume</span>
        </div>

        <div className="apple-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86868b', fontSize: '13px', fontWeight: 600 }}>
            <span>System Infrastructure</span>
            <Server size={18} color="#bf5af2" />
          </div>
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#30d158', marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={20} />
            <span>100% Operational</span>
          </div>
          <span style={{ fontSize: '12px', color: '#6e6e73' }}>EU Datacenter • LocalStorage Engine</span>
        </div>
      </div>

      {/* Subscribed Tenants Table */}
      <div className="apple-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e5e5ea', fontWeight: 700, fontSize: '16px' }}>
          {tsa.garagesList}
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f5f5f7', borderBottom: '1px solid #e5e5ea', color: '#6e6e73', fontSize: '12px', textTransform: 'uppercase' }}>
                <th style={{ padding: '14px 20px' }}>Garage / Facility</th>
                <th style={{ padding: '14px 20px' }}>Country / Currency</th>
                <th style={{ padding: '14px 20px' }}>Subscription Plan</th>
                <th style={{ padding: '14px 20px' }}>Tax Identifier</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map(tenant => (
                <tr key={tenant.id} style={{ borderBottom: '1px solid #f0f0f3' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '15px' }}>
                      {tenant.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6e6e73', marginTop: '2px' }}>
                      {tenant.address.city}, {tenant.address.countryCode} • {tenant.email}
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span className={`apple-badge ${tenant.country === 'FR' ? 'apple-badge-blue' : 'apple-badge-amber'}`}>
                      {tenant.country} ({tenant.currency})
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <span className={`apple-badge ${
                      tenant.subscriptionTier === 'ai' ? 'apple-badge-blue' : 'apple-badge-neutral'
                    }`} style={{ textTransform: 'uppercase', fontWeight: 700 }}>
                      {tenant.subscriptionTier}
                    </span>
                  </td>

                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: '12px', color: '#1d1d1f' }}>
                      {tenant.taxIdentity.siret || tenant.taxIdentity.uid}
                    </div>
                  </td>

                  <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => onSwitchTenant(tenant)}
                      className="apple-btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                    >
                      <span>Switch to Garage</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard New Garage Modal */}
      {isOnboardModalOpen && (
        <div className="apple-modal-overlay" onClick={() => setIsOnboardModalOpen(false)}>
          <div 
            className="apple-modal-content p-6 max-w-lg" 
            onClick={e => e.stopPropagation()}
            style={{ padding: '28px', maxWidth: '580px' }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '6px' }}>
              {tsa.onboardGarage}
            </h2>
            <p style={{ fontSize: '13px', color: '#6e6e73', marginBottom: '20px' }}>
              Provision an isolated tenant environment for a new workshop.
            </p>

            <form onSubmit={handleOnboardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                  Garage / Workshop Name
                </label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Garage Central de Lyon"
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e5e5ea' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Country & Jurisdictional Tax
                  </label>
                  <select 
                    value={country} 
                    onChange={e => handleCountryChange(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="FR">France (EUR / 20% TVA)</option>
                    <option value="CH">Switzerland (CHF / 8.1% TVA)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Subscription Plan
                  </label>
                  <select 
                    value={tier} 
                    onChange={e => setTier(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  >
                    <option value="starter">Starter (€89 / CHF 99)</option>
                    <option value="pro">Pro Workshop (€189 / CHF 199)</option>
                    <option value="ai">AI Enterprise (€299 / CHF 329)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Phone
                  </label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    Email
                  </label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contact@garage.fr"
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    City
                  </label>
                  <input 
                    type="text" 
                    value={city} 
                    onChange={e => setCity(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#6e6e73', marginBottom: '4px' }}>
                    {country === 'FR' ? 'SIRET (14 digits)' : 'Swiss UID (CHE-xxx)'}
                  </label>
                  <input 
                    type="text" 
                    value={siret} 
                    onChange={e => setSiret(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e5e5ea' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setIsOnboardModalOpen(false)} className="apple-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="apple-btn-primary">
                  Provision Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


// ==========================================================================
// AtelierOS - AutoAI Workshop Assistant (Function-Calling Architecture)
// ==========================================================================



  Sparkles, 
  X, 
  Send, 
  Code, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Wrench, 
  ShieldCheck,
  Bot
} from 'lucide-react';








const AIAssistantDrawer = ({
  isOpen,
  onClose,
  activeTenant,
  currentLanguage,
  onAppointmentBooked
}) => {
  if (!isOpen) return null;

  const t = (translations[currentLanguage] || translations.en);
  const tai = t.aiAssistant;

  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState>([
    {
      sender: 'AI',
      text: `Hello! I am your **AutoAI Workshop Assistant** for ${activeTenant.name}. I can analyze customer symptoms, query our Central Scheduling Engine for real-time slots, and organize diagnostic checkpoints. How can I help you today?`
    }
  ]);

  const [bookedSlot, setBookedSlot] = useState(null);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    setConversation(prev => [...prev, { sender: 'USER', text: userText }]);
    setLoading(true);

    try {
      const response = await AIService.processCustomerIntake(activeTenant.id, userText);
      setConversation(prev => [
        ...prev,
        {
          sender: 'AI',
          text: response.message,
          aiData: response
        }
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBookSlotFromAI = (slot: AvailableSlot, serviceId: string) => {
    const customers = StorageService.getCustomers(activeTenant.id);
    const vehicles = StorageService.getVehicles(activeTenant.id);

    const app = SchedulingService.confirmAppointment({
      tenantId: activeTenant.id,
      customerId: customers[0]?.id || 'cust-01',
      vehicleId: vehicles[0]?.id || 'veh-01',
      serviceId: serviceId || 'srv-01',
      mechanicId: slot.mechanicId,
      bayId: slot.bayId,
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      source: 'AI_ASSISTANT',
      intakeNotes: 'Booked via AutoAI Reception Assistant'
    });

    setBookedSlot(`${slot.date} at ${slot.startTime}`);
    if (onAppointmentBooked) onAppointmentBooked(slot);
  };

  return (
    <div className="apple-modal-overlay" onClick={onClose}>
      <div 
        className="apple-modal-content p-6 animate-fade-in" 
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '650px',
          height: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          borderRadius: '24px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #e5e5ea', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0071e3 0%, #bf5af2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#1d1d1f' }}>{tai.title}</h2>
              <span style={{ fontSize: '11px', color: '#86868b' }}>
                Strict Function Calling Architecture • Zero DB Direct Writes
              </span>
            </div>
          </div>

          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#86868b' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Stream */}
        <div className="scrollbar-none" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', paddingRight: '4px' }}>
          {conversation.map((msg, idx) => (
            <div key={idx} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'USER' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: '16px',
                background: msg.sender === 'USER' ? '#0071e3' : '#f5f5f7',
                color: msg.sender === 'USER' ? '#ffffff' : '#1d1d1f',
                fontSize: '14px',
                lineHeight: 1.5,
                borderBottomRightRadius: msg.sender === 'USER' ? '4px' : '16px',
                borderBottomLeftRadius: msg.sender === 'AI' ? '4px' : '16px'
              }}>
                <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </div>

              {/* Function Calls Transparency Inspector */}
              {msg.aiData && msg.aiData.functionCalls.length > 0 && (
                <div style={{ marginTop: '8px', maxWidth: '90%', background: '#1d1d1f', color: '#64d2ff', padding: '12px', borderRadius: '12px', fontSize: '11px', fontFamily: 'monospace' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#30d158', fontWeight: 700, marginBottom: '6px' }}>
                    <Code size={12} />
                    <span>{tai.simulatedFunctions}</span>
                  </div>
                  {msg.aiData.functionCalls.map((fc, i) => (
                    <div key={i} style={{ marginBottom: '4px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
                      <span style={{ color: '#ff9f0a' }}>{fc.functionName}</span>(
                      <span style={{ color: '#e5e5ea' }}>{JSON.stringify(fc.arguments)}</span>
                      ) ➔ <span style={{ color: '#30d158' }}>{JSON.stringify(fc.result)}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested Slots from Central Engine */}
              {msg.aiData && msg.aiData.suggestedSlots.length > 0 && (
                <div style={{ marginTop: '10px', width: '100%', background: '#ffffff', border: '1px solid #e5e5ea', padding: '14px', borderRadius: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1d1d1f', display: 'block', marginBottom: '8px' }}>
                    {tai.availableSlotsFound}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {msg.aiData.suggestedSlots.map((slot, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleBookSlotFromAI(slot, msg.aiData?.classifiedService?.id || 'srv-01')}
                        style={{
                          padding: '10px',
                          borderRadius: '10px',
                          border: '1px solid #0071e3',
                          background: 'rgba(0, 113, 227, 0.05)',
                          color: '#0071e3',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                        {slot.date} • {slot.startTime}-{slot.endTime}
                        <div style={{ fontSize: '10px', color: '#6e6e73', marginTop: '2px' }}>
                          Mech: {slot.mechanicName} ({slot.bayName})
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ padding: '12px 16px', background: '#f5f5f7', borderRadius: '16px', maxWidth: '140px', fontSize: '13px', color: '#86868b' }}>
              Analyzing symptoms...
            </div>
          )}

          {bookedSlot && (
            <div style={{ background: '#30d158', color: '#ffffff', padding: '12px', borderRadius: '12px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} />
              <span>Appointment successfully booked for {bookedSlot}!</span>
            </div>
          )}
        </div>

        {/* Quick Symptom Prompts */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '8px 0', borderTop: '1px solid #e5e5ea', marginTop: '12px' }}>
          {[
            'Brake pedal squeaks & vibrates',
            'Due for 60,000 km oil service',
            'Tesla Model Y battery check',
            'Check engine light code P0420'
          ].map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setInputMessage(prompt)}
              style={{
                padding: '4px 10px',
                borderRadius: '9999px',
                border: '1px solid #e5e5ea',
                background: '#f5f5f7',
                fontSize: '11px',
                color: '#6e6e73',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
          <input 
            type="text" 
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder={tai.chatPlaceholder}
            style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: '1px solid #e5e5ea', fontSize: '14px' }}
          />
          <button type="submit" className="apple-btn-primary" style={{ padding: '12px 18px' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};


// ==========================================================================
// AtelierOS - Main Application Master Component
// ==========================================================================






















const App = () => {
  // Initialize storage
  useEffect(() => {
    StorageService.init();
  }, []);

  const [activeTenant, setActiveTenant] = useState(() => StorageService.getActiveTenant());
  const [currentLanguage, setCurrentLanguage] = useState(() => StorageService.getLanguage() || 'en');
  const [currentView, setCurrentView] = useState('landing');

  // Cross-view parameters
  const [targetWorkOrderId, setTargetWorkOrderId] = useState(undefined);
  const [magicQuoteToken, setMagicQuoteToken] = useState(undefined);

  // Modals
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState(null);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  // Event listeners for storage changes
  useEffect(() => {
    const handleTenantChange = () => {
      setActiveTenant(StorageService.getActiveTenant());
    };
    const handleLanguageChange = () => {
      setCurrentLanguage(StorageService.getLanguage());
    };

    window.addEventListener('tenantChanged', handleTenantChange);
    window.addEventListener('languageChanged', handleLanguageChange);
    return () => {
      window.removeEventListener('tenantChanged', handleTenantChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleSelectTenant = (tenant: Tenant) => {
    StorageService.setActiveTenantId(tenant.id);
    setActiveTenant(tenant);
  };

  const handleSelectLanguage = (lang: SupportedLanguage) => {
    StorageService.setLanguage(lang);
    setCurrentLanguage(lang);
  };

  const handleResetDemoData = () => {
    StorageService.resetDemoData();
    setActiveTenant(StorageService.getActiveTenant());
    window.location.reload();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f7', color: '#1d1d1f' }}>
      {/* Universal Header (Hidden only in standalone magic link mode if desired) */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setTargetWorkOrderId(undefined);
          setMagicQuoteToken(undefined);
          setCurrentView(view);
        }}
        activeTenant={activeTenant}
        onTenantChange={handleSelectTenant}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        onResetDemo={() => setConfirmResetOpen(true)}
        currentLanguage={currentLanguage}
        onLanguageChange={handleSelectLanguage}
      />

      {/* Main View Router */}
      <main>
        {currentView === 'landing' && (
          <LandingPage
            onLaunchApp={() => setCurrentView('calendar')}
            onLaunchBooking={() => setCurrentView('booking-portal')}
            onOpenAi={() => setIsAiOpen(true)}
            onOpenLegal={(type) => setLegalModalType(type)}
            currentLanguage={currentLanguage}
          />
        )}

        {currentView === 'calendar' && (
          <StaffCalendar
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            onSelectWorkOrder={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('work-orders');
            }}
          />
        )}

        {currentView === 'work-orders' && (
          <WorkOrderBoard
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            onOpenTabletMode={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('mechanic-bay');
            }}
            onOpenQuotes={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('quotes');
            }}
            onOpenInvoices={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('invoices');
            }}
          />
        )}

        {currentView === 'mechanic-bay' && (
          <MechanicTabletMode
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            activeWorkOrderId={targetWorkOrderId}
            onWorkOrderFinished={() => setCurrentView('work-orders')}
          />
        )}

        {currentView === 'customers' && (
          <CustomerDirectory
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
          />
        )}

        {currentView === 'vehicles' && (
          <VehicleDirectory
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
          />
        )}

        {currentView === 'quotes' && (
          <QuoteManager
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            activeWorkOrderId={targetWorkOrderId}
            onOpenCustomerApproval={(token) => {
              setMagicQuoteToken(token);
              setCurrentView('quote-approval-portal');
            }}
            onOpenInvoice={(woId) => {
              setTargetWorkOrderId(woId);
              setCurrentView('invoices');
            }}
          />
        )}

        {currentView === 'invoices' && (
          <InvoiceManager
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            activeWorkOrderId={targetWorkOrderId}
          />
        )}

        {currentView === 'booking-portal' && (
          <CustomerBookingPortal
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
            onBookingCompleted={() => {
              // Stay on confirmation or allow tracking
            }}
          />
        )}

        {currentView === 'quote-approval-portal' && (
          <CustomerApprovalPortal
            magicToken={magicQuoteToken}
            currentLanguage={currentLanguage}
            onBackToApp={() => setCurrentView('quotes')}
          />
        )}

        {currentView === 'tracking-portal' && (
          <CustomerTrackingPortal
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
          />
        )}

        {currentView === 'comms-hub' && (
          <CommunicationsHub
            activeTenant={activeTenant}
            currentLanguage={currentLanguage}
          />
        )}

        {currentView === 'super-admin' && (
          <SuperAdminDashboard
            currentLanguage={currentLanguage}
            onSwitchTenant={(tenant) => {
              handleSelectTenant(tenant);
              setCurrentView('calendar');
            }}
          />
        )}
      </main>

      {/* Floating AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        activeTenant={activeTenant}
        currentLanguage={currentLanguage}
        onAppointmentBooked={() => {
          // Trigger refresh if needed
        }}
      />

      {/* Legal Modals (GDPR Privacy, Terms, E-Invoicing Specs) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Reset Demo Data Confirmation Dialog */}
      <ConfirmationModal
        isOpen={confirmResetOpen}
        title="Reset Demo Data to Default Fixtures?"
        message="This will restore all default workshops (Paris & Geneva), demo vehicles, mechanics, appointments, quotes, and Chorus Pro invoices. Any custom additions will be cleared."
        confirmLabel="Reset Everything"
        isDestructive={true}
        onConfirm={handleResetDemoData}
        onCancel={() => setConfirmResetOpen(false)}
      />
    </div>
  );
};



// Mount Application
const _root = document.getElementById('root');
if (_root) {
  ReactDOM.createRoot(_root).render(React.createElement(App));
}
