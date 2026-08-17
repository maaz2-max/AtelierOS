// ==========================================================================
// AtelierOS - Pre-Compiler using Babel Standalone
// Compiles JSX and TypeScript into 100% pure vanilla JavaScript
// ==========================================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

const distDir = path.join(__dirname, 'dist');
const bundlePath = path.join(distDir, 'app.bundle.jsx');
const compiledPath = path.join(distDir, 'app.compiled.js');

console.log('Downloading Babel Standalone for server-side compilation...');

const downloadBabel = () => {
  return new Promise((resolve, reject) => {
    https.get('https://unpkg.com/@babel/standalone@7.24.0/babel.min.js', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
};

async function run() {
  try {
    const babelCode = await downloadBabel();
    fs.writeFileSync(path.join(__dirname, 'babel.standalone.js'), babelCode, 'utf-8');
    
    // Evaluate Babel
    const vm = require('vm');
    const sandbox = { window: {}, console: console };
    vm.createContext(sandbox);
    vm.runInContext(babelCode, sandbox);
    
    const Babel = sandbox.Babel;
    console.log('Babel loaded version:', Babel.version);

    const inputCode = fs.readFileSync(bundlePath, 'utf-8');
    console.log('Compiling input bundle of length:', inputCode.length);

    const result = Babel.transform(inputCode, {
      presets: ['react', 'typescript'],
      filename: 'app.tsx'
    });

    fs.writeFileSync(compiledPath, result.code, 'utf-8');
    console.log('SUCCESS! Compiled pure JavaScript bundle to:', compiledPath);
    console.log('Compiled bundle size:', result.code.length, 'bytes');

    // Update index.html to load the pre-compiled pure JS bundle
    const indexPath = path.join(__dirname, 'index.html');
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="AtelierOS">
  <meta name="theme-color" content="#f5f5f7">
  
  <title>AtelierOS — The Workshop Operating System (France & Switzerland)</title>
  <meta name="description" content="Tablet-first, multi-tenant automotive workshop SaaS with central scheduling, OBD-II diagnostics, cross-border EUR/CHF invoicing, and Chorus Pro e-invoicing. Under development by MARS Association.">

  <!-- SVG Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230071e3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'/></svg>">

  <!-- Apple Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Apple-inspired Design System -->
  <link rel="stylesheet" href="/src/styles/apple-theme.css">

  <!-- React 18 & ReactDOM 18 (Zero Babel runtime overhead in browser) -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
</head>
<body class="scrollbar-none">
  <div id="root">
    <!-- Shimmer loading placeholder -->
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

  <!-- Pure Compiled JavaScript Application -->
  <script src="/dist/icons.bundle.js"></script>
  <script src="/dist/app.compiled.js"></script>
</body>
</html>`;

    fs.writeFileSync(indexPath, indexHtml, 'utf-8');
    console.log('Successfully updated index.html to load pre-compiled app.compiled.js!');
  } catch (err) {
    console.error('Compilation error:', err);
  }
}

run();
