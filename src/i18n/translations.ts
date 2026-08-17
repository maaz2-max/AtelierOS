// ==========================================================================
// AtelierOS - Comprehensive Internationalization Dictionaries
// English (Default), Français (France), Français Suisse (CH), Deutsch Schweiz (CH)
// ==========================================================================

const enDict = {
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
    feat1Desc: "One availability pipeline across staff agenda, public customer web booking, and AI assistants. Instant conflict detection for mechanics, lifts, and buffers.",
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
    markPaid: "Mark as Paid"
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
    signaturePlaceholder: "Type your full name as digital signature...",
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
};

const frDict = {
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
};

// Swiss French dictionary (Inherits from French with Swiss specificities: QR-Bill, CHF, TVA 8.1%)
const frChDict = {
  ...frDict,
  brandName: "AtelierOS",
  tagline: "Le Système d'Exploitation pour Garages Automobiles (Suisse & Transfrontalier).",
  underDevBadge: "Développé par l'Association MARS",
  nav: {
    ...frDict.nav,
    calendar: "Agenda Garage",
    invoices: "Factures & QR-Facture",
    bookingPortal: "Prise de RDV Web"
  },
  common: {
    ...frDict.common,
    phone: "Téléphone (+41)",
    currency: "Devise (CHF)",
    total: "Total TTC (CHF)",
    taxVat: "TVA CH (8.1%)",
    print: "Imprimer / QR-Facture"
  },
  landing: {
    ...frDict.landing,
    heroSubtitle: "Conçu pour la Suisse romande et la France. Moteur de réservation central unique, postes mécaniciens sur tablette, factures QR suisses (CHF) et TVA 8.1% native.",
    pricingSubtitle: "Basculez entre Francs Suisses (CHF) et Euros (€) à tout moment."
  },
  invoices: {
    ...frDict.invoices,
    subtitle: "Suisse (CHF 8.1%) & France (EUR 20%) avec génération de QR-Facture suisse conforme.",
    swissQrBill: "Générer QR-Facture Suisse (BVR/QR)"
  }
};

// Swiss German dictionary
const deChDict = {
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
  },
  landing: {
    heroTitle: "Präzises Werkstatt-Management für führende Garagen.",
    heroSubtitle: "Von Grund auf für die Schweiz und Frankreich entwickelt. Ein zentrales Buchungssystem, Tablet-Stationen für Mechaniker, QR-Rechnungen und 8.1% MWST.",
    ctaLaunchApp: "Werkstatt-App öffnen",
    ctaCustomerBooking: "Online-Buchung testen",
    ctaAiReception: "KI-Empfang fragen",
    badgeMultiTenant: "Multi-Mandanten Architektur",
    badgeUnifiedEngine: "Zentrales Buchungssystem",
    badgeTaxReady: "Schweiz (8.1%) & Frankreich (20%) MWST",
    badgeEinvoice: "QR-Rechnung & Chorus Pro",
    
    stat1Number: "1 System",
    stat1Label: "Gemeinsam genutzt von Team, Kunde & KI",
    stat2Number: "100%",
    stat2Label: "Konfliktfreie Zuteilung von Lift & Mechaniker",
    stat3Number: "< 3 Min",
    stat3Label: "Von Diagnose bis zum freigegebenen Angebot",
    stat4Number: "CHF & EUR",
    stat4Label: "Grenzüberschreitende MWST-Compliance",

    featuresTitle: "Entwickelt für Geschwindigkeit, Übersicht und null Büro-Reibung.",
    feat1Title: "Zentrales Termin-System",
    feat1Desc: "Eine gemeinsame Verfügbarkeits-Pipeline für Werkstatt, Kunden-Webportal und KI-Assistenten.",
    feat2Title: "Mechaniker Tablet-Modus",
    feat2Desc: "48px grosse Touch-Flächen für die Werkstatt. Schnelle Erfassung von OBD-II Fehlercodes und Checklisten.",
    feat3Title: "Schweizer QR-Rechnung & MWST",
    feat3Desc: "Automatische MWST-Berechnung für die Schweiz (8.1%) und Frankreich (20%). Vollständige Schweizer QR-Rechnungen.",
    feat4Title: "Kunden-Freigabe per Magic Link",
    feat4Desc: "Senden Sie Kostenvoranschläge per SMS oder E-Mail. Kunden prüfen und signieren digital in Sekunden.",
    feat5Title: "E-Invoicing & Export",
    feat5Desc: "Integrierter Generator für Factur-X / Chorus Pro und Schweizer Buchhaltungs-Standards.",
    feat6Title: "Smarte KI-Annahme",
    feat6Desc: "Natürliche Spracheingabe von Fahrzeugproblemen mit strikt kontrollierten Funktionsaufrufen.",

    roiTitle: "Berechnen Sie Ihren Werkstatt-ROI",
    roiSubtitle: "Sehen Sie, wie viel Zeit und Administrationskosten AtelierOS jeden Monat für Ihre Werkstatt spart.",
    roiMechanicsLabel: "Anzahl Mechaniker:",
    roiMonthlyWorkOrders: "Aufträge pro Monat:",
    roiHoursSaved: "Gesparte Stunden / Monat:",
    roiRevenueGain: "Geschätzter Mehrumsatz:",

    pricingTitle: "Transparente, faire Preise für moderne Werkstätten.",
    pricingSubtitle: "Jederzeit zwischen CHF (CHF) und EUR (€) wechseln.",
    tierStarterName: "Starter",
    tierStarterPriceEur: "€89",
    tierStarterPriceChf: "CHF 99",
    tierStarterPeriod: "/ Monat pro Garage",
    tierStarterDesc: "Für unabhängige Einzel-Werkstätten zur Digitalisierung von Terminen und Rechnungen.",
    tierStarterFeat1: "Bis zu 3 Mechaniker & 2 Lifte",
    tierStarterFeat2: "Zentraler Kalender & Online-Buchung",
    tierStarterFeat3: "Angebote, Rechnungen & PDF-Export",
    tierStarterFeat4: "SMS- & E-Mail-Benachrichtigungen",

    tierProName: "Pro Workshop",
    tierProBadge: "Beliebteste Wahl",
    tierProPriceEur: "€189",
    tierProPriceChf: "CHF 199",
    tierProPeriod: "/ Monat pro Garage",
    tierProDesc: "Für wachsende Garagen mit Tablet-Modus, digitaler Kundenfreigabe und QR-Rechnung.",
    tierProFeat1: "Unbegrenzte Mechaniker & Lifte",
    tierProFeat2: "Tablet-Modus & OBD-II Diagnose",
    tierProFeat3: "Magic-Link Kundenfreigabe",
    tierProFeat4: "Factur-X & Chorus Pro Connector",
    tierProFeat5: "Schweizer QR-Rechnung (CHF)",

    tierAiName: "AI Enterprise",
    tierAiPriceEur: "€299",
    tierAiPriceChf: "CHF 329",
    tierAiPeriod: "/ Monat pro Garage",
    tierAiDesc: "Für grosse Autohäuser und Mehrmarken-Gruppen mit KI-Empfang.",
    tierAiFeat1: "Alles aus Pro enthalten",
    tierAiFeat2: "KI-Empfang für Sprache & Text",
    tierAiFeat3: "KI-Diagnoseassistent & OBD-Tipps",
    tierAiFeat4: "Multi-Garagen Super-Admin",
    tierAiFeat5: "Prioritärer Support & API-Zugang"
  },
  calendar: {
    title: "Werkstatt-Kalender & Disposition",
    subtitle: "Echtzeit-Übersicht aller Mechaniker, Lifte und Kundentermine ohne Doppelbuchungen.",
    dayView: "Tagesansicht",
    weekView: "Wochenansicht",
    bayView: "Lift- / Arbeitsplatzansicht",
    filterMechanic: "Alle Mechaniker",
    filterBay: "Alle Lifte",
    newAppointment: "+ Neuer Termin",
    noAppointments: "Keine Termine für diesen Zeitraum geplant.",
    conflictWarning: "Buchungskonflikt erkannt! Mechaniker oder Lift ist bereits belegt.",
    suggestAlternatives: "Verfügbare Alternativ-Termine:"
  },
  workOrders: {
    title: "Reparaturaufträge (OR)",
    subtitle: "10-stufiger Ablauf von der Kundenanfrage bis zur QR-Rechnung.",
    newWorkOrder: "+ Neuer Auftrag",
    stages: {
      REQUEST: "1. Anfrage",
      APPOINTMENT: "2. Termin",
      DIAGNOSIS: "3. Diagnose",
      QUOTE: "4. Kostenvoranschlag",
      AWAITING_APPROVAL: "5. Freigabe ausstehend",
      APPROVED: "6. Freigegeben",
      IN_PROGRESS: "7. In Arbeit",
      QUALITY_CHECK: "8. Qualitätskontrolle",
      READY: "9. Abholbereit",
      DELIVERED: "10. Übergeben",
      INVOICED: "Verrechnet & Bezahlt"
    }
  },
  mechanicTablet: {
    title: "Mechaniker Tablet-Station",
    subtitle: "Touch-optimierte Oberfläche für Werkstatt-Checklisten, OBD-Codes und Teile.",
    activeVehicle: "Fahrzeug auf dem Lift",
    checklistTitle: "Sicherheits-Checkliste",
    obdScannerTitle: "OBD-II Diagnose-Scanner",
    obdCodePlaceholder: "OBD-Code eingeben (z.B. P0300)...",
    addCode: "Code analysieren",
    suggestedInspection: "Empfohlene Prüfschritte:",
    recordLaborTime: "Arbeitszeit erfassen (Minuten):",
    partsTrackerTitle: "Verwendete Ersatzteile & Betriebsstoffe",
    addPart: "+ Ersatzteil hinzufügen",
    signOffQuality: "Qualitätskontrolle abschliessen & Fertig melden"
  },
  quotes: {
    title: "Kostenvoranschläge",
    subtitle: "Transparente Arbeitszeit & Teilepreise mit digitaler Kundenfreigabe.",
    createQuote: "+ Neuer Kostenvoranschlag",
    quoteNumber: "Offerte-Nr.",
    customer: "Kunde",
    vehicle: "Fahrzeug",
    amount: "Betrag inkl. MWST",
    status: "Status",
    validUntil: "Gültig bis",
    sendApprovalLink: "Magic-Freigabe-Link senden",
    copyLink: "Link kopieren",
    linkCopied: "Freigabe-Link in die Zwischenablage kopiert!"
  },
  invoices: {
    title: "Rechnungen & QR-Rechnung",
    subtitle: "Schweiz (CHF 8.1%) & Frankreich (EUR 20%) mit Schweizer QR-Rechnung.",
    createInvoice: "+ Rechnung erstellen",
    invoiceNumber: "Rechnungs-Nr.",
    eInvoiceStatus: "E-Rechnung Status",
    submitChorusPro: "An Chorus Pro / PPF übermitteln",
    previewFacturX: "Factur-X / XML ansehen",
    swissQrBill: "Schweizer QR-Rechnung erstellen",
    markPaid: "Als bezahlt markieren"
  },
  bookingPortal: {
    title: "Online-Terminbuchung",
    subtitle: "Buchen Sie Ihren Werkstatt-Termin in 60 Sekunden.",
    step1: "1. Fahrzeug identifizieren",
    step2: "2. Service auswählen",
    step3: "3. Datum & Uhrzeit wählen",
    step4: "4. Kontakt & Bestätigung",
    platePlaceholder: "Kontrollschild eingeben (z.B. GE 452 891 oder ZH 12345)...",
    makeModelPlaceholder: "Oder Marke & Modell eingeben (z.B. Audi A4)...",
    slotHoldNotice: "Dieser Termin ist für 10:00 Minuten für Sie reserviert.",
    consentGdpr: "Ich stimme der Datenverarbeitung und Benachrichtigungen per SMS/E-Mail zu.",
    confirmBooking: "Termin verbindlich reservieren",
    successTitle: "Termin bestätigt!",
    successRef: "Ihre Buchungs-Referenz:",
    smsNotice: "Bestätigungs-SMS und E-Mail wurden versendet."
  },
  approvalPortal: {
    title: "Kostenvoranschlag-Freigabe",
    subtitle: "Empfohlene Reparaturen prüfen und online freigeben.",
    authorizedBy: "Digitale Unterschrift:",
    signaturePlaceholder: "Vor- und Nachname eingeben...",
    approveBtn: "Kostenvoranschlag genehmigen & Reparatur starten",
    rejectBtn: "Kostenvoranschlag ablehnen",
    rejectionReasonPlaceholder: "Grund für Ablehnung...",
    approvedSuccess: "Freigabe erteilt! Das Werkstatt-Team wurde benachrichtigt.",
    rejectedSuccess: "Offerte abgelehnt. Unser Team wurde informiert."
  },
  trackingPortal: {
    title: "Live Reparatur-Status",
    subtitle: "Verfolgen Sie den aktuellen Fortschritt Ihres Fahrzeugs in unserer Werkstatt.",
    currentStage: "Aktueller Werkstatt-Status:",
    mechanicAssigned: "Zuständiger Techniker:",
    estimatedReady: "Voraussichtlich fertig um:"
  },
  superAdmin: {
    title: "SaaS Super-Administration",
    subtitle: "Multi-Garagen Verwaltung, Lizenzen und Plattform-Zustand.",
    totalGarages: "Aktive Werkstätten",
    totalRevenue: "Monatlicher Wiederkehrender Umsatz (MRR)",
    activeWorkOrders: "Laufende Werkstattaufträge",
    eInvoicesProcessed: "Verarbeitete E-Rechnungen",
    garagesList: "Registrierte Garagen & Betriebe",
    onboardGarage: "+ Neue Werkstatt anlegen",
    plan: "Abo-Plan",
    country: "Land",
    status: "Status",
    actions: "Verwalten"
  },
  aiAssistant: {
    title: "AutoAI Werkstatt-Assistent",
    subtitle: "Intelligente Schadensaufnahme & Terminfindung.",
    chatPlaceholder: "Symptom beschreiben (z.B. Quietschen beim Bremsen bei niedriger Geschwindigkeit)...",
    send: "Senden",
    simulatedFunctions: "Ausgeführte API-Aufrufe an das Buchungssystem:",
    availableSlotsFound: "Gefundene freie Termine:",
    bookThisSlot: "Diesen Termin im Kalender buchen"
  }
};

export const rawTranslations = {
  en: enDict,
  fr: frDict,
  'fr-FR': frDict,
  'fr-CH': frChDict,
  'de-CH': deChDict
};

// Deep merge helper to guarantee no undefined keys ever throw
function deepMerge(target, source) {
  const output = { ...target };
  if (source && typeof source === 'object') {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!(key in target)) {
          output[key] = source[key];
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

export const translations = {
  en: enDict,
  fr: deepMerge(enDict, frDict),
  'fr-FR': deepMerge(enDict, frDict),
  'fr-CH': deepMerge(deepMerge(enDict, frDict), frChDict),
  'de-CH': deepMerge(enDict, deChDict)
};

export function getTranslation(lang) {
  return translations[lang] || translations.en;
}
