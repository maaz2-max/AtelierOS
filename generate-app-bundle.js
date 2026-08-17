// ==========================================================================
// AtelierOS - Robust Standalone Application Bundle Generator
// ==========================================================================

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Read all source files and transform imports/exports into unified scope
const readClean = (relPath) => {
  const full = path.join(__dirname, 'src', relPath);
  let content = fs.readFileSync(full, 'utf-8');
  
  // Remove multi-line import statements
  content = content.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '');
  content = content.replace(/import\s+['"].*?['"];?/g, '');
  
  // Remove export keywords while preserving types for TypeScript compiler
  content = content.replace(/export\s+(default\s+)?/g, '');
  
  return content;
};

console.log('Assembling unified application bundle with global React hooks...');

const iconHeader = fs.readFileSync(path.join(distDir, 'icons.bundle.js'), 'utf-8');

const combined = `
${iconHeader}

// --- GLOBAL REACT HOOKS INITIALIZATION ---
var React = window.React;
var ReactDOM = window.ReactDOM;
var useState = React.useState;
var useEffect = React.useEffect;
var useRef = React.useRef;
var useMemo = React.useMemo;
var useCallback = React.useCallback;

// --- MASTER TYPES ---
${readClean('types/index.ts')}

// --- DOMAIN SEED DATA & CONSTANTS ---
${readClean('data/seedData.ts')}

// --- STORAGE REPOSITORY ---
${readClean('services/StorageService.ts')}

// --- DETERMINISTIC TAX ENGINE ---
${readClean('services/TaxService.ts')}

// --- CENTRAL SCHEDULING ENGINE ---
${readClean('services/SchedulingService.ts')}

// --- QUOTE & INVOICE SERVICE ---
${readClean('services/QuoteInvoiceService.ts')}

// --- E-INVOICING CONNECTOR ---
${readClean('services/EInvoiceConnector.ts')}

// --- COMMUNICATIONS SERVICE ---
${readClean('services/CommunicationService.ts')}

// --- AI ORCHESTRATION SERVICE ---
${readClean('services/AIService.ts')}

// --- INTERNATIONALIZATION DICTIONARIES ---
${readClean('i18n/translations.ts')}

// --- UI COMPONENTS ---
${readClean('components/ConfirmationModal.tsx')}
${readClean('components/SkeletonLoader.tsx')}
${readClean('components/LegalModals.tsx')}
${readClean('components/Header.tsx')}
${readClean('components/LandingPage.tsx')}
${readClean('components/StaffCalendar.tsx')}
${readClean('components/WorkOrderBoard.tsx')}
${readClean('components/MechanicTabletMode.tsx')}
${readClean('components/CustomerDirectory.tsx')}
${readClean('components/VehicleDirectory.tsx')}
${readClean('components/QuoteManager.tsx')}
${readClean('components/InvoiceManager.tsx')}
${readClean('components/EInvoiceModal.tsx')}
${readClean('components/CustomerBookingPortal.tsx')}
${readClean('components/CustomerApprovalPortal.tsx')}
${readClean('components/CustomerTrackingPortal.tsx')}
${readClean('components/CommunicationsHub.tsx')}
${readClean('components/SuperAdminDashboard.tsx')}
${readClean('components/AIAssistantDrawer.tsx')}

// --- MASTER APPLICATION ---
${readClean('App.tsx')}

// --- BOOTSTRAP MOUNT ---
(function() {
  const rootElement = document.getElementById('root');
  if (rootElement && window.ReactDOM) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(App));
  }
})();
`;

// Replace icon references to window.AtelierIcons
let finalBundle = combined;
const iconNames = [
  'Wrench', 'Calendar', 'ClipboardList', 'Tablet', 'Users', 'Car', 'FileCheck2', 'Receipt', 
  'Globe2', 'Sparkles', 'ShieldCheck', 'RotateCcw', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 
  'MessageSquare', 'Building2', 'ExternalLink', 'Plus', 'Trash2', 'Edit3', 'Search', 'Send', 
  'Copy', 'Check', 'CheckCircle2', 'XCircle', 'AlertTriangle', 'Clock', 'ArrowRight', 'ArrowLeft', 
  'Timer', 'PenTool', 'Cpu', 'DollarSign', 'Server', 'QrCode', 'Smartphone', 'Mail', 'Phone', 
  'User', 'UserPlus', 'Calculator', 'Zap', 'Layers', 'X', 'FileText', 'Printer', 'Code'
];

for (const name of iconNames) {
  finalBundle = finalBundle.replace(new RegExp(`<${name}(\\s|>)`, 'g'), `<window.AtelierIcons.${name}$1`);
  finalBundle = finalBundle.replace(new RegExp(`<\\/${name}>`, 'g'), `</window.AtelierIcons.${name}>`);
  finalBundle = finalBundle.replace(new RegExp(`icon:\\s*${name}`, 'g'), `icon: window.AtelierIcons.${name}`);
}

fs.writeFileSync(path.join(distDir, 'app.bundle.jsx'), finalBundle, 'utf-8');
console.log('Successfully written dist/app.bundle.jsx with global React hooks!');
