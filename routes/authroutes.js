const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const config = require('');
const mongoose = require('mongoose');

const User = require('../Model/User');

//const User = mongoose.model("User");
require('dotenv').config();




// @route   POST api/users/signup
// @desc    Register new user
// @access  Public
router.post('/signup', (req, res) => {
  const { name, email, DOB, password } = req.body;

  // Check if user already exists
  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const newUser = new User({ name, email, DOB, password });

      // Hash password before saving to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    });
});

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    User.findOne({ email })
      .then(user => {
        // Check if user exists
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Check password
        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              // User matched, create JWT Payload
              const payload = { id: user.id, name: user.name };
  
              // Sign token using JWT secret from environment variable
              jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 3600 }, // Token expires in 1 hour
                (err, token) => {
                  if (err) {
                    return res.status(500).json({ error: 'Error generating token' });
                  }
                  res.json({
                    success: true,
                    token: 'Bearer ' + token,
                  });
                }
              );
            } else {
              return res.status(400).json({ error: 'Password incorrect' });
            }
          });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
      });
  });
   
  router.post('/check-credentials', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        // If the password matches, return user details excluding hashed password
        const { _id, name, email, DOB} = user;
        return res.json({ _id, name, email, DOB});
      } else {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  
     
  
  

module.exports = router;
