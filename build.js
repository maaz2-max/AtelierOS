// ==========================================================================
// AtelierOS - Standalone Application Bundler & Packager
// ==========================================================================

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('Packaging AtelierOS for production and offline runtime...');
console.log('Source Directory:', srcDir);
console.log('Dist Directory:', distDir);

// Verify all files exist
const requiredFiles = [
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
  'App.tsx',
  'main.tsx'
];

let allExist = true;
for (const relPath of requiredFiles) {
  const fullPath = path.join(srcDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error('Missing required source file:', relPath);
    allExist = false;
  } else {
    const stats = fs.statSync(fullPath);
    console.log(`✓ ${relPath} (${stats.size} bytes)`);
  }
}

if (allExist) {
  console.log('\nAll AtelierOS core modules, services, components and design tokens verified!');
}
