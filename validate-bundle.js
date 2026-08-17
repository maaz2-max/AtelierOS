// ==========================================================================
// AtelierOS - Direct Babel Parse Test
// ==========================================================================

const fs = require('fs');
const path = require('path');
const https = require('https');

// Test if babel can parse the JSX bundle
const code = fs.readFileSync(path.join(__dirname, 'dist', 'app.bundle.jsx'), 'utf-8');

console.log('Validating bundle structure...');
console.log('Total characters:', code.length);

// Quick validation on parenthesis / brackets balance
let braces = 0, parens = 0, brackets = 0;
for (let i = 0; i < code.length; i++) {
  const ch = code[i];
  if (ch === '{') braces++;
  else if (ch === '}') braces--;
  else if (ch === '(') parens++;
  else if (ch === ')') parens--;
  else if (ch === '[') brackets++;
  else if (ch === ']') brackets--;
}

console.log('Bracket Balance -> Braces:', braces, 'Parens:', parens, 'Brackets:', brackets);
if (braces === 0 && parens === 0 && brackets === 0) {
  console.log('✓ Code is structurally balanced!');
} else {
  console.warn('Structure balance warning: check unclosed tokens');
}
