const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simple in-memory storage
const users = [];

// REGISTER/LOGIN - Just phone number and name
router.post('/login', async (req, res) => {
  try {
    const { phoneNumber, fullName } = req.body;
    
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      return res.status(400).json({ error: 'Valid 10-digit phone number required' });
    }
    
    // Find or create user
    let user = users.find(u => u.phoneNumber === phoneNumber);
    
    if (!user && fullName) {
      // New user - create account
      user = {
        id: Date.now().toString(),
        fullName: fullName,
        phoneNumber: phoneNumber,
        role: 'farmer',
        createdAt: new Date()
      };
      users.push(user);
    }
    
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please register with name.' });
    }
    
    const token = jwt.sign({ userId: user.id }, 'secret123', { expiresIn: '7d' });
    
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update profile
router.put('/profile', (req, res) => {
  const { userId, fullName, bio, farmSize, state, district } = req.body;
  const user = users.find(u => u.id === userId);
  
  if (user) {
    if (fullName) user.fullName = fullName;
    if (bio) user.bio = bio;
    if (farmSize) user.farmSize = farmSize;
    if (state) user.state = state;
    if (district) user.district = district;
    
    res.json({ success: true, user });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

module.exports = router;