const express = require('express');
const qr = require('qr-image');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Generate QR
app.get('/generate-qr', (req, res) => {
  const url = req.query.url; // get URL from user input

  if (!url) {
    return res.status(400).send('URL is required');
  }

  const qr_image = qr.image(url, { type: 'png' });
  res.type('png');
  qr_image.pipe(res);
});

app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
