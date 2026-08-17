const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allFiles = getFiles(srcDir);
const lucideImports = new Set();

allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const matches = content.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g);
  for (const m of matches) {
    m[1].split(',').forEach(item => {
      const name = item.trim();
      if (name) lucideImports.add(name);
    });
  }
});

console.log('All Lucide icons imported across codebase:');
console.log(Array.from(lucideImports).sort());
