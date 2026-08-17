const fs = require('fs');
const path = require('path');

// Ultra-premium 3D Ribbon "Ai" Logo with dynamic volumetric lighting and smooth gradient curves
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" fill="none">
  <defs>
    <!-- Ribbon Main Gradient -->
    <linearGradient id="ribbonGrad1" x1="30" y1="160" x2="170" y2="40" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00D2FF" />
      <stop offset="35%" stop-color="#0066FF" />
      <stop offset="70%" stop-color="#0047E0" />
      <stop offset="100%" stop-color="#00D2FF" />
    </linearGradient>

    <!-- Top Arch & Left Leg of "A" -->
    <linearGradient id="archGrad" x1="40" y1="140" x2="110" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0080FF" />
      <stop offset="50%" stop-color="#00D2FF" />
      <stop offset="100%" stop-color="#0055FF" />
    </linearGradient>

    <!-- Loop Under & Connection to "i" -->
    <linearGradient id="loopGrad" x1="80" y1="60" x2="160" y2="160" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#004CD8" />
      <stop offset="50%" stop-color="#0077FF" />
      <stop offset="100%" stop-color="#00D4FF" />
    </linearGradient>

    <!-- Dot of the "i" -->
    <linearGradient id="dotGrad" x1="145" y1="35" x2="175" y2="65" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#00E5FF" />
      <stop offset="60%" stop-color="#0066FF" />
      <stop offset="100%" stop-color="#003ACC" />
    </linearGradient>

    <!-- Inner Shadow & Ambient Depth Filter -->
    <filter id="ribbonShadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#004CD8" flood-opacity="0.35" />
    </filter>
  </defs>

  <g filter="url(#ribbonShadow)">
    <!-- Right Leg of "A" transitioning down and sweeping under to form "i" stem -->
    <path 
      d="M96 54 
         C 106 72, 118 108, 126 132 
         C 134 156, 148 162, 160 148 
         C 170 136, 172 108, 172 84
         C 172 74, 154 74, 154 84
         C 154 104, 152 124, 146 134
         C 142 140, 136 138, 130 120
         C 122 96, 112 64, 98 42
         Z" 
      fill="url(#loopGrad)" 
    />

    <!-- Main 3D Ribbon Arch forming the "A" & Crossbar Fold -->
    <path 
      d="M36 148 
         C 32 120, 52 48, 86 36 
         C 108 28, 122 42, 120 66 
         C 118 86, 102 128, 96 142 
         C 92 152, 78 152, 78 140 
         C 78 126, 86 98, 92 78 
         C 96 66, 92 56, 82 58 
         C 64 62, 52 106, 54 136 
         C 56 150, 40 158, 36 148 
         Z" 
      fill="url(#archGrad)" 
    />

    <!-- Dynamic 3D Cross-Fold connecting A left to right -->
    <path 
      d="M62 136 
         C 70 126, 82 124, 104 140 
         C 108 144, 102 152, 94 148 
         C 78 140, 70 142, 62 148 
         C 56 152, 54 144, 62 136 
         Z" 
      fill="url(#ribbonGrad1)" 
      opacity="0.9"
    />

    <!-- Floating Dot of "i" with 3D Sphere Highlight -->
    <circle cx="158" cy="46" r="14" fill="url(#dotGrad)" />
    <ellipse cx="153" cy="41" rx="5" ry="3" fill="#FFFFFF" opacity="0.65" transform="rotate(-30 153 41)" />
  </g>
</svg>`;

const assetsDir = path.join(__dirname, '..', 'assets');
const publicAssetsDir = path.join(__dirname, '..', 'public', 'assets');

fs.writeFileSync(path.join(assetsDir, 'ai_logo.svg'), svgContent, 'utf-8');
fs.writeFileSync(path.join(publicAssetsDir, 'ai_logo.svg'), svgContent, 'utf-8');

console.log('✓ 3D Ribbon "Ai" Logo successfully created!');
