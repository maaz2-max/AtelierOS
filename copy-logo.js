const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\91725\\.gemini\\antigravity\\brain\\75ee8ebd-6054-44ef-8a2d-9d149049317e\\.user_uploaded\\media_1786995942895.png';
const assetsDir = path.join(__dirname, 'assets');

if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

fs.copyFileSync(src, path.join(assetsDir, 'atelieros_logo.png'));
fs.copyFileSync(src, path.join(assetsDir, 'logo.png'));

console.log('✓ Successfully copied official AtelierOS logo to assets/atelieros_logo.png and assets/logo.png');
