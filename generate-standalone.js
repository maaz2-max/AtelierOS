// ==========================================================================
// AtelierOS - Production Standalone Packager & Compiler
// Compiles all domain models, services, components, and CSS into
// a single standalone, lightning-fast web application.
// ==========================================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

function downloadBabel() {
  return new Promise((resolve, reject) => {
    const cached = path.join(distDir, 'babel.cache.js');
    if (fs.existsSync(cached)) {
      console.log('Using cached Babel standalone...');
      return resolve(fs.readFileSync(cached, 'utf-8'));
    }
    console.log('Downloading Babel standalone...');
    https.get('https://unpkg.com/@babel/standalone@7.24.0/babel.min.js', (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        fs.writeFileSync(cached, d, 'utf-8');
        resolve(d);
      });
      res.on('error', reject);
    });
  });
}

function stripImportsAndExports(code) {
  // Strip import statements (multiline, single line, type imports)
  code = code.replace(/import\s+(?:type\s+)?[\s\S]*?from\s*['"][^'"]+['"]\s*;?/g, '');
  code = code.replace(/import\s*['"][^'"]+['"]\s*;?/g, '');
  
  // Strip export statements so declarations become local / top-level
  code = code.replace(/export\s+default\s+/g, '');
  code = code.replace(/export\s+(?:type|interface|enum|const|let|var|function|class|async)\s+/g, (match) => {
    return match.replace('export ', '');
  });
  code = code.replace(/export\s*\{[\s\S]*?\}\s*;?/g, '');

  return code;
}

const iconSvgMap = {
  Wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  Calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
  CalendarIcon: '<rect width="18" height="18" x="3" y="4" rx="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
  ClipboardList: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/>',
  Tablet: '<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>',
  Users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  Car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  FileCheck2: '<path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="m3 15 2 2 4-4"/>',
  Receipt: '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 17V7"/>',
  Globe2: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  Sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  ShieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  RotateCcw: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  ChevronDown: '<path d="m6 9 6 6 6-6"/>',
  ChevronLeft: '<path d="m15 18-6-6 6-6"/>',
  ChevronRight: '<path d="m9 18 6-6-6-6"/>',
  MessageSquare: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  Building2: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  ExternalLink: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  Plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  Trash2: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',
  Edit3: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  Send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  Copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  Check: '<path d="M20 6 9 17l-5-5"/>',
  CheckCircle2: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  XCircle: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  AlertTriangle: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
  Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  ArrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  ArrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  Timer: '<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>',
  PenTool: '<path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><circle cx="11" cy="11" r="2"/>',
  Cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  DollarSign: '<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  Server: '<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
  QrCode: '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
  Smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><line x1="12" x2="12.01" y1="18" y2="18"/>',
  Mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  Phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  User: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  UserPlus: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  Calculator: '<rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/>',
  Zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  Layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  FileText: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>',
  Printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/>',
  Code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  Activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  AlertCircle: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
  Info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  Bot: '<rect width="18" height="12" x="3" y="6" rx="2"/><line x1="9" x2="9" y1="10" y2="12"/><line x1="15" x2="15" y1="10" y2="12"/><line x1="12" x2="12" y1="2" y2="6"/>',
  Camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  CreditCard: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  Eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  Filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  Fuel: '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  Gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  Lock: '<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  LogOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  MapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  Save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>',
  HelpCircle: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/>',
  Sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
  Moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  Sliders: '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="1" x2="7" y1="14" y2="14"/><line x1="9" x2="15" y1="8" y2="8"/><line x1="17" x2="23" y1="16" y2="16"/>',
  LayoutDashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  Inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  Bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  Command: '<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z"/>'
};

async function build() {
  try {
    const babelCode = await downloadBabel();
    const sandbox = { window: {}, console: console, global: {}, setTimeout };
    vm.createContext(sandbox);
    vm.runInContext(babelCode, sandbox);
    const Babel = sandbox.Babel;
    console.log('Babel', Babel.version, 'initialized.');

    const iconMapJSON = JSON.stringify(iconSvgMap);

    const iconsSetup = `
const _iconSvgMap = ${iconMapJSON};

function _createIcon(svgInner) {
  return function IconComponent({ size = 18, color = 'currentColor', style = {}, className = '', ...rest }) {
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style: { display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style },
      className: className,
      dangerouslySetInnerHTML: { __html: svgInner || '<circle cx="12" cy="12" r="10"/>' },
      ...rest
    });
  };
}

const _Icons = new Proxy(_iconSvgMap, {
  get(target, prop) {
    if (typeof prop === 'string') {
      const svg = target[prop] || '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>';
      return _createIcon(svg);
    }
    return undefined;
  }
});

const { Activity, AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, Bell, Bot, Building2, Calculator, Calendar, CalendarIcon, Camera, Car, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, ClipboardList, Clock, Code, Command, Copy, Cpu, CreditCard, DollarSign, Edit3, ExternalLink, Eye, FileCheck2, FileText, Filter, Fuel, Gauge, Globe2, HelpCircle, Inbox, Info, Layers, LayoutDashboard, Lock, LogOut, Mail, MapPin, MessageSquare, Moon, PenTool, Phone, Plus, Printer, QrCode, Receipt, RotateCcw, Save, Search, Send, Server, ShieldCheck, Sliders, Smartphone, Sparkles, Sun, Tablet, Timer, Trash2, User, UserPlus, Users, Wrench, X, XCircle, Zap } = _Icons;
`;

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
      'components/LoginModal.tsx',
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
      'components/CustomerPortalView.tsx',
      'components/CustomerBookingPortal.tsx',
      'components/CustomerApprovalPortal.tsx',
      'components/CustomerTrackingPortal.tsx',
      'components/CommunicationsHub.tsx',
      'components/SuperAdminDashboard.tsx',
      'components/AIAssistantDrawer.tsx',
      'components/CommandPaletteModal.tsx',
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

${iconsSetup}
`;

    for (const f of files) {
      const filePath = path.join(__dirname, 'src', f);
      const raw = fs.readFileSync(filePath, 'utf-8');
      const stripped = stripImportsAndExports(raw);
      combined += `\n\n// --- FILE: ${f} ---\n` + stripped;
    }

    combined += `
// Auto-mount React App
(function() {
  const rootEl = document.getElementById('root');
  if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(React.createElement(App));
  }
})();
`;

    console.log('Compiling full TypeScript + JSX bundle (' + combined.length + ' chars)...');
    const res = Babel.transform(combined, {
      presets: ['typescript', 'react'],
      filename: 'atelier-app.tsx'
    });

    const compiledJS = res.code;
    fs.writeFileSync(path.join(distDir, 'app.compiled.js'), compiledJS, 'utf-8');
    console.log('Compiled JS size:', compiledJS.length, 'bytes');

    // Read CSS
    const css = fs.readFileSync(path.join(__dirname, 'src', 'styles', 'apple-theme.css'), 'utf-8');

    // Generate production index.html
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="AtelierOS">
  <meta name="theme-color" content="#0F172A">
  <title>AtelierOS — Smarter Workshops. Better Cars.</title>
  <meta name="description" content="The operating system for the modern automobile workshop. Multi-tenant SaaS for France & Switzerland.">
  <link rel="icon" type="image/png" href="/assets/logo.png">
  <link rel="apple-touch-icon" href="/assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
${css}
  </style>
</head>
<body>
  <div id="root">
    <div style="max-width:1200px;margin:60px auto;padding:24px;display:flex;flex-direction:column;gap:20px;">
      <div style="height:48px;width:280px;background:#e2e8f0;border-radius:8px;"></div>
      <div style="height:240px;background:#e2e8f0;border-radius:10px;"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
        <div style="height:140px;background:#e2e8f0;border-radius:10px;"></div>
        <div style="height:140px;background:#e2e8f0;border-radius:10px;"></div>
        <div style="height:140px;background:#e2e8f0;border-radius:10px;"></div>
      </div>
    </div>
  </div>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <script src="/dist/app.compiled.js?v=3.5.1" onerror="this.onerror=null;this.src='dist/app.compiled.js?v=3.5.1';"></script>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, 'index.html'), html, 'utf-8');

    // Also populate public/ directory for zero-config Vercel/Netlify hosting
    const publicDir = path.join(__dirname, 'public');
    const publicDistDir = path.join(publicDir, 'dist');
    const publicAssetsDir = path.join(publicDir, 'assets');

    if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
    if (!fs.existsSync(publicDistDir)) fs.mkdirSync(publicDistDir, { recursive: true });
    if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });

    fs.writeFileSync(path.join(publicDir, 'index.html'), html, 'utf-8');
    fs.writeFileSync(path.join(publicDistDir, 'app.compiled.js'), compiledJS, 'utf-8');

    // Copy assets to public/assets/
    const srcAssetsDir = path.join(__dirname, 'assets');
    if (fs.existsSync(srcAssetsDir)) {
      const assetFiles = fs.readdirSync(srcAssetsDir);
      for (const af of assetFiles) {
        fs.copyFileSync(path.join(srcAssetsDir, af), path.join(publicAssetsDir, af));
      }
    }

    // Copy 404.html to public/
    const src404 = path.join(__dirname, '404.html');
    if (fs.existsSync(src404)) {
      fs.copyFileSync(src404, path.join(publicDir, '404.html'));
    }

    console.log('\n✓ AtelierOS Production Build successfully created!');
    console.log('  Single compiled file: dist/app.compiled.js (' + Math.round(compiledJS.length / 1024) + ' KB)');
    console.log('  Clean index.html & public/ directory created for Vercel.');
  } catch (err) {
    console.error('Build error:', err.message || err);
    process.exit(1);
  }
}

build();
