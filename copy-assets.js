const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

// Copy the generated images
const src1 = 'C:\\Users\\91725\\.gemini\\antigravity\\brain\\75ee8ebd-6054-44ef-8a2d-9d149049317e\\workshop_3d_hero_1786994853871.jpg';
const src2 = 'C:\\Users\\91725\\.gemini\\antigravity\\brain\\75ee8ebd-6054-44ef-8a2d-9d149049317e\\tablet_bay_3d_1786994871566.jpg';

if (fs.existsSync(src1)) {
  fs.copyFileSync(src1, path.join(assetsDir, 'workshop_3d_hero.jpg'));
  console.log('✓ Copied workshop_3d_hero.jpg to assets');
}
if (fs.existsSync(src2)) {
  fs.copyFileSync(src2, path.join(assetsDir, 'tablet_bay_3d.jpg'));
  console.log('✓ Copied tablet_bay_3d.jpg to assets');
}
