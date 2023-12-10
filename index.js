// app.js
const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
// app.use(express.static('public'));

// Set up a simple route
app.get('/', (req, res) => {
  res.send('SIH Project ! SIH');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
