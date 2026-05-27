const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const { userId, fullName, bio, farmSize, state, district, preferredLanguage } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        fullName, 
        bio, 
        farmSize, 
        state, 
        district, 
        preferredLanguage,
        updatedAt: Date.now() 
      },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ 
      success: true, 
      user: {
        id: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: user.role,
        state: user.state,
        district: user.district,
        preferredLanguage: user.preferredLanguage,
        bio: user.bio,
        farmSize: user.farmSize
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

// Get all farmers
router.get('/farmers', async (req, res) => {
  try {
    const farmers = await User.find({ role: { $in: ['farmer', 'both'] } }).select('fullName phoneNumber state district rating');
    res.json({ success: true, farmers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch farmers' });
  }
});

// Get all labourers
router.get('/labourers', async (req, res) => {
  try {
    const labourers = await User.find({ role: { $in: ['labourer', 'both'] } }).select('fullName phoneNumber state district rating skills');
    res.json({ success: true, labourers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch labourers' });
  }
});

module.exports = router;