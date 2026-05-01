const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register/Login user
router.post('/register', async (req, res) => {
  try {
    const { name, phone, role } = req.body;
    
    let user = await User.findOne({ phone });
    
    if (!user) {
      user = new User({ name, phone, role });
      await user.save();
    }
    
    res.json({ 
      success: true, 
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user by phone
router.get('/user/:phone', async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;