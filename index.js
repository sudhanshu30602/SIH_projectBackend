// app.js
const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var authRoutes = require('./routes/authroutes')
const model = require('./Model/User')

require('./db');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve static files from the 'public' directory
// app.use(express.static('public'));
app.use(authRoutes);

// Set up a simple route
app.get('/Home', (req, res) => {
  res.send('SIH Project ! SIH');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
