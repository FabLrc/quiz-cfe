const next = require('next');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

console.log(`Environnement: ${dev ? 'development' : 'production'}`);
console.log(`Port: ${port}`);

// Initialisation de Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (err) {
      console.error('Erreur lors du traitement de la requête:', err);
      res.statusCode = 500;
      res.end('Erreur interne du serveur');
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Next.js démarré sur http://${hostname}:${port}`);
  });
}).catch((err) => {
  console.error('Erreur lors du démarrage de Next.js:', err);
  process.exit(1);
});
