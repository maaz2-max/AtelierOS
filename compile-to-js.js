// ==========================================================================
// AtelierOS - Robust TypeScript to Pure JavaScript Bundler
// ==========================================================================

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

function cleanTypeScript(code) {
  let res = code;

  // Remove multi-line interface declarations
  res = res.replace(/interface\s+[A-Za-z0-9_]+(\s*<[^>]+>)?(\s+extends\s+[^{]+)?\s*\{[\s\S]*?\n\}/g, '');
  
  // Remove type alias declarations
  res = res.replace(/type\s+[A-Za-z0-9_]+(\s*<[^>]+>)?\s*=[\s\S]*?;/g, '');
  
  // Remove public/private/protected access modifiers in classes
  res = res.replace(/(public|private|protected)\s+static\s+/g, 'static ');
  res = res.replace(/(public|private|protected)\s+/g, '');

  // Remove type casting 'as any', 'as SupportedLanguage', etc.
  res = res.replace(/\s+as\s+[A-Za-z0-9_<>\[\]|&]+/g, '');

  // Remove simple function return types: ): string => or ): void {
  res = res.replace(/\):\s*[A-Za-z0-9_<>\[\]|&?]+\s*(=>|\{)/g, ')$1');

  // Remove variable type annotations: const x: string = or let y: number =
  res = res.replace(/(const|let|var)\s+([A-Za-z0-9_]+)\s*:\s*[A-Za-z0-9_<>\[\]|&?]+(\s*=)/g, '$1 $2$3');

  // Remove React.FC<...> annotations
  res = res.replace(/:\s*React\.FC(\s*<[^>]+>)?/g, '');

  // Remove Generic parameters on useState: useState<Type>(...)
  res = res.replace(/useState\s*<[^>]+>\s*\(/g, 'useState(');
  res = res.replace(/useRef\s*<[^>]+>\s*\(/g, 'useRef(');

  return res;
}

const rawBundle = fs.readFileSync(path.join(distDir, 'app.bundle.jsx'), 'utf-8');
const cleaned = cleanTypeScript(rawBundle);

fs.writeFileSync(path.join(distDir, 'app.bundle.jsx'), cleaned, 'utf-8');
console.log('Successfully cleaned TypeScript types into pure React JSX!');
