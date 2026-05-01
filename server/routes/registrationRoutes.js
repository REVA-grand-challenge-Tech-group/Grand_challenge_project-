const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const MarketPrice = require('../models/MarketPrice');

// Register farmer's intent to grow
router.post('/register', async (req, res) => {
  try {
    const { farmerId, farmerName, farmerPhone, farmerDistrict, crop, acres, expectedHarvest, confirmedPrice } = req.body;
    
    // Check if farmer already registered this crop
    const existing = await Registration.findOne({ 
      farmerId, 
      crop, 
      status: { $in: ['pending', 'confirmed', 'growing'] } 
    });
    
    if (existing) {
      return res.json({ 
        success: false, 
        message: `You already registered ${crop}. Complete that first.` 
      });
    }
    
    const totalExpectedValue = confirmedPrice * acres * 10;
    
    // Find if there's a crop loss opportunity for this crop
    const marketData = await MarketPrice.findOne({ commodity: crop });
    const lossCityMatched = marketData?.lossLocations?.[0]?.city;
    const lossPercent = marketData?.lossLocations?.[0]?.lossPercent;
    
    const registration = new Registration({
      farmerId,
      farmerName,
      farmerPhone,
      farmerDistrict,
      crop,
      acres,
      expectedHarvest,
      confirmedPrice,
      totalExpectedValue,
      lossCityMatched,
      lossPercent,
      status: 'pending'
    });
    
    await registration.save();
    
    res.json({ 
      success: true, 
      message: `✅ Registration submitted! KrishiSetu confirms ${crop} at ₹${confirmedPrice}/quintal.`,
      registration 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get farmer's registrations
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const registrations = await Registration.find({ farmerId: req.params.farmerId });
    res.json({ success: true, registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update registration status
router.put('/:id/confirm', async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);
    if (!registration) {
      return res.json({ success: false, message: 'Registration not found' });
    }
    
    registration.status = 'confirmed';
    await registration.save();
    
    res.json({ 
      success: true, 
      message: `🎉 Agreement confirmed! KrishiSetu will buy your ${registration.crop} at ₹${registration.confirmedPrice}/quintal.`,
      registration 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all pending registrations
router.get('/pending', async (req, res) => {
  try {
    const pending = await Registration.find({ status: 'pending' });
    res.json({ success: true, pending });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;