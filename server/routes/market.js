const express = require('express');
const router = express.Router();
const MarketData = require('../models/MarketData');
const CropRegistration = require('../models/CropRegistration');
// Assuming you have an authentication middleware setup
const { authMiddleware, farmerOnly } = require('../middleware/auth'); 

// 📈 GET STABLE PREDICTIONS BASED AUTOMATICALLY ON USER LOCATION
router.get('/predictions', authMiddleware, farmerOnly, async (req, res) => {
  try {
    const { state, district } = req.user; // Pulled directly from verified session payload

    // 1. Check if we have existing cached market profiles for this district
    let marketProfiles = await MarketData.find({ state, district });

    // 2. If data is missing or stale (older than 3 days to keep values highly stable), 
    // we fetch stable calculations using Gemini API simulation parameters
    const checkStale = marketProfiles.length === 0 || 
                     (new Date() - new Date(marketProfiles[0].updatedAt)) > (3 * 24 * 60 * 60 * 1000);

    if (checkStale) {
      // In a production build, you'd trigger Gemini API via googleGenAI library here.
      // We pass historical trends, seasonal metrics, and demand algorithms to generate a stable matrix.
      
      const mockedGeminiStableOutput = [
        {
          cropName: 'Ragi (Finger Millet)',
          currentPrice: 3400,
          historicalPrices: [3100, 3200, 3350, 3400],
          predictedPriceNextMonth: 3650,
          demandLevel: 'HIGH',
          riskFactor: 'LOW',
          seasonalInsight: 'Pre-monsoon crop cycles indicate robust trading margins with high regional market pull.'
        },
        {
          cropName: 'Paddy (Rice)',
          currentPrice: 2180,
          historicalPrices: [2100, 2150, 2160, 2180],
          predictedPriceNextMonth: 2240,
          demandLevel: 'MEDIUM',
          riskFactor: 'MODERATE',
          seasonalInsight: 'Supply volume arriving from neighboring channel segments will flatten price acceleration spikes.'
        },
        {
          cropName: 'Maize',
          currentPrice: 2250,
          historicalPrices: [2400, 2350, 2300, 2250],
          predictedPriceNextMonth: 2100,
          demandLevel: 'LOW',
          riskFactor: 'HIGH',
          seasonalInsight: 'Elevated supply yields across local districts creates temporary price reduction flags.'
        }
      ];

      // Upsert into MongoDB to prevent volatile daily changes
      for (const item of mockedGeminiStableOutput) {
        await MarketData.findOneAndUpdate(
          { state, district, cropName: item.cropName },
          { ...item, state, district },
          { upsert: true, new: true }
        );
      }
      marketProfiles = await MarketData.find({ state, district });
    }

    res.json({ success: true, state, district, data: marketProfiles });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Market engine processing error.' });
  }
});

// 🌾 REGISTER A NEW CROP FORECAST ENTRY
router.post('/register-crop', authMiddleware, farmerOnly, async (req, res) => {
  try {
    const { cropName, acreage, expectedHarvestDate, estimatedYield } = req.body;
    const { _id: farmerId, name: farmerName, state, district } = req.user;

    const newCrop = new CropRegistration({
      farmerId,
      farmerName,
      state,
      district,
      cropName,
      acreage,
      expectedHarvestDate,
      estimatedYield
    });

    await newCrop.save();
    res.json({ success: true, data: newCrop });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Crop registration failed.' });
  }
});

// 📋 VIEW MY REGISTRATIONS LIST
router.get('/my-crops', authMiddleware, farmerOnly, async (req, res) => {
  try {
    const registrations = await CropRegistration.find({ farmerId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not access database records.' });
  }
});

module.exports = router;