const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const binDir = path.join(__dirname, '.git-bin');
const zipPath = path.join(__dirname, 'mingit.zip');

if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });

const gitExe = path.join(binDir, 'cmd', 'git.exe');
if (fs.existsSync(gitExe)) {
  console.log('✓ Portable Git already present at:', gitExe);
  process.exit(0);
}

const url = 'https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/MinGit-2.44.0-64-bit.zip';
console.log('Downloading MinGit portable from:', url);

function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  https.get(url, (response) => {
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      console.log('Redirecting to:', response.headers.location);
      return download(response.headers.location, dest, cb);
    }
    response.pipe(file);
    file.on('finish', () => {
      file.close(cb);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error('Download error:', err);
  });
}

download(url, zipPath, () => {
  console.log('Download complete. Extracting MinGit...');
  try {
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${binDir}' -Force"`, { stdio: 'inherit' });
    console.log('Extraction complete. Portable git at:', gitExe);
    fs.unlinkSync(zipPath);
  } catch (e) {
    console.error('Extraction error:', e);
  }
});
