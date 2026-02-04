const { spawn } = require('child_process');

const npm = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true
});

npm.on('error', (err) => {
  console.error('Erreur:', err);
  process.exit(1);
});

npm.on('exit', (code) => {
  process.exit(code);
});
