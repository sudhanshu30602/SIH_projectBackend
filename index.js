// app.js
const express = require('express');
const app = express();
const User = require('./models/userModel.js');

//loading db
require('dotenv').config();
const connectDB = require('./Database/db');

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

connectDB();

// check mongo schema
// const newUser = new User({
//   "username": 'sih',
//   "email": 'sih@example.com',
//   "password": '12345',
//   "dob": new Date('1990-01-01'),
// });
app.post('./api/users', async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password, dob } = req.body;

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password,
      dob,
    });
    console.log('Before saving user to the database');
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(`Error creating user: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Save the user to the database
// newUser.save()
//   .then(() => {
//     console.log('User saved to the database');
//   })
//   .catch((error) => {
//     console.error(`Error saving user to the database: ${error.message}`);
//   });

// Serve static files from the 'public' directory
// app.use(express.static('public'));

// Set up a simple route
app.get('/', (req, res) => {
  res.send('SIH Project ! SIH');
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
