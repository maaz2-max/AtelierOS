const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const binDir = path.join(__dirname, '.git-bin');
const zipPath = path.join(__dirname, 'mingit.zip');

if (!fs.existsSync(binDir)) fs.mkdirSync(binDir, { recursive: true });

const gitExe = path.join(binDir, 'cmd', 'git.exe');

function runGit() {
  console.log('\n--- Executing Git Operations with MinGit ---');
  const env = { ...process.env, PATH: `${path.join(binDir, 'cmd')};${path.join(binDir, 'bin')};${process.env.PATH}` };

  const exec = (cmd) => {
    console.log(`> ${cmd}`);
    try {
      const out = execSync(`"${gitExe}" ${cmd}`, { cwd: __dirname, env, stdio: 'pipe' }).toString();
      if (out) console.log(out.trim());
    } catch (e) {
      console.log(`(Info/Notice: ${e.stderr ? e.stderr.toString().trim() : e.message})`);
    }
  };

  exec('init');
  exec('config user.name "AtelierOS"');
  exec('config user.email "contact@atelieros.app"');
  exec('add .');
  exec('commit -m "Initial commit: AtelierOS v3.4 Production Prototype"');
  exec('branch -M main');
  exec('remote remove origin');
  exec('remote add origin https://github.com/maaz2-max/AtelierOS.git');
  console.log('\nPushing to origin main...');
  try {
    const pushOut = execSync(`"${gitExe}" push -u origin main`, { cwd: __dirname, env, stdio: 'inherit' });
    console.log('✓ Successfully pushed to GitHub!');
  } catch (e) {
    console.error('Push result:', e.message);
  }
}

if (fs.existsSync(gitExe)) {
  console.log('✓ Found existing MinGit');
  runGit();
} else {
  const url = 'https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/MinGit-2.44.0-64-bit.zip';
  console.log('Downloading MinGit portable from:', url);

  function download(url, dest, cb) {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest, cb);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          setTimeout(cb, 500);
        });
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error('Download error:', err);
    });
  }

  download(url, zipPath, () => {
    console.log('Download complete. Extracting with tar.exe...');
    try {
      execSync(`tar -xf "${zipPath}" -C "${binDir}"`, { stdio: 'inherit' });
      console.log('Extraction complete.');
      try { fs.unlinkSync(zipPath); } catch (_) {}
      runGit();
    } catch (e) {
      console.error('Extraction error:', e);
    }
  });
}
