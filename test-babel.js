const fs = require('fs');
const path = require('path');
const vm = require('vm');

const babelCode = fs.readFileSync(path.join(__dirname, 'dist', 'babel.cache.js'), 'utf-8');
const sandbox = { window: {}, console: console, global: {}, setTimeout };
vm.createContext(sandbox);
vm.runInContext(babelCode, sandbox);
const Babel = sandbox.Babel;

function stripImportsAndExports(code) {
  // Strip import statements: multiline or single line
  // Handles:
  // import ... from '...';
  // import '...';
  // import type ... from '...';
  code = code.replace(/import\s+(?:type\s+)?[\s\S]*?from\s*['"][^'"]+['"]\s*;?/g, '');
  code = code.replace(/import\s*['"][^'"]+['"]\s*;?/g, '');
  
  // Strip export statements
  code = code.replace(/export\s+default\s+/g, '');
  code = code.replace(/export\s+(?:type|interface|enum|const|let|var|function|class|async)\s+/g, (match) => {
    return match.replace('export ', '');
  });
  code = code.replace(/export\s*\{[\s\S]*?\}\s*;?/g, '');

  return code;
}

const files = [
  'types/index.ts',
  'data/seedData.ts',
  'services/StorageService.ts',
  'services/TaxService.ts',
  'services/SchedulingService.ts',
  'services/QuoteInvoiceService.ts',
  'services/EInvoiceConnector.ts',
  'services/CommunicationService.ts',
  'services/AIService.ts',
  'i18n/translations.ts',
  'components/ConfirmationModal.tsx',
  'components/SkeletonLoader.tsx',
  'components/LegalModals.tsx',
  'components/Header.tsx',
  'components/LandingPage.tsx',
  'components/StaffCalendar.tsx',
  'components/WorkOrderBoard.tsx',
  'components/MechanicTabletMode.tsx',
  'components/CustomerDirectory.tsx',
  'components/VehicleDirectory.tsx',
  'components/QuoteManager.tsx',
  'components/InvoiceManager.tsx',
  'components/EInvoiceModal.tsx',
  'components/CustomerBookingPortal.tsx',
  'components/CustomerApprovalPortal.tsx',
  'components/CustomerTrackingPortal.tsx',
  'components/CommunicationsHub.tsx',
  'components/SuperAdminDashboard.tsx',
  'components/AIAssistantDrawer.tsx',
  'App.tsx'
];

let combined = `
var React = window.React;
var ReactDOM = window.ReactDOM;
var useState = React.useState;
var useEffect = React.useEffect;
var useRef = React.useRef;
var useMemo = React.useMemo;
var useCallback = React.useCallback;
`;

for (const f of files) {
  const filePath = path.join(__dirname, 'src', f);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const stripped = stripImportsAndExports(raw);
  combined += `\n\n// --- FILE: ${f} ---\n` + stripped;
}

console.log('Testing Babel transform on combined length:', combined.length);
try {
  const res = Babel.transform(combined, {
    presets: ['typescript', 'react'],
    filename: 'bundle.tsx'
  });
  console.log('SUCCESS! Compiled JS length:', res.code.length);
  fs.writeFileSync(path.join(__dirname, 'dist', 'test-compiled.js'), res.code, 'utf-8');
} catch (e) {
  console.error('Babel compilation error:', e.message);
}
