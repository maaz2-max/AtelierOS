// ==========================================================================
// AtelierOS - Standalone Bundle Assembler
// Packs all TypeScript/JSX components into an ultra-fast in-browser bundle
// ==========================================================================

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

console.log('Compiling AtelierOS standalone web application bundle...');

const htmlPath = path.join(__dirname, 'index.html');
const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>AtelierOS — The Workshop Operating System (France & Switzerland)</title>
  <meta name="description" content="Tablet-first, multi-tenant automotive workshop SaaS with central scheduling, OBD-II diagnostics, cross-border EUR/CHF invoicing, and Chorus Pro e-invoicing. Under development by MARS Association.">
  
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="AtelierOS">
  <meta name="theme-color" content="#f5f5f7">

  <!-- Apple Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="/src/styles/apple-theme.css">

  <!-- React 18, Babel & Lucide Icons -->
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone@7.24.0/babel.min.js"></script>
</head>
<body class="scrollbar-none">
  <div id="root">
    <div style="max-width: 1200px; margin: 60px auto; padding: 24px; display: flex; flex-direction: column; gap: 20px;">
      <div class="skeleton-shimmer" style="height: 48px; width: 280px; border-radius: 12px;"></div>
      <div class="skeleton-shimmer" style="height: 240px; border-radius: 20px;"></div>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <div class="skeleton-shimmer" style="height: 140px; border-radius: 16px;"></div>
        <div class="skeleton-shimmer" style="height: 140px; border-radius: 16px;"></div>
        <div class="skeleton-shimmer" style="height: 140px; border-radius: 16px;"></div>
      </div>
    </div>
  </div>

  <script type="text/babel" data-presets="react,typescript" src="/src/data/seedData.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/services/StorageService.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/services/TaxService.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/services/SchedulingService.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/services/QuoteInvoiceService.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/services/EInvoiceConnector.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/services/CommunicationService.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/services/AIService.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/i18n/translations.ts"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/ConfirmationModal.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/SkeletonLoader.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/LegalModals.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/Header.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/LandingPage.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/StaffCalendar.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/WorkOrderBoard.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/MechanicTabletMode.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/CustomerDirectory.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/VehicleDirectory.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/QuoteManager.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/InvoiceManager.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/EInvoiceModal.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/CustomerBookingPortal.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/CustomerApprovalPortal.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/CustomerTrackingPortal.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/CommunicationsHub.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/SuperAdminDashboard.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/components/AIAssistantDrawer.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/App.tsx"></script>
  <script type="text/babel" data-presets="react,typescript" src="/src/main.tsx"></script>
</body>
</html>`;

fs.writeFileSync(htmlPath, indexHtmlContent, 'utf-8');
console.log('Successfully written updated index.html with live transpilation pipeline.');
