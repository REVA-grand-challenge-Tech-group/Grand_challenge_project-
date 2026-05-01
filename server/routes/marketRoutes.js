const express = require('express');
const router = express.Router();
const MarketPrice = require('../models/MarketPrice');

// Get all market prices with state and district
router.get('/prices', async (req, res) => {
  try {
    const { state, district } = req.query;
    let query = {};
    
    if (state) query.state = { $regex: new RegExp(state, 'i') };
    if (district) query.district = { $regex: new RegExp(district, 'i') };
    
    const prices = await MarketPrice.find(query);
    
    const pricesWithIndicators = prices.map(price => ({
      ...price._doc,
      trendIcon: price.trend === 'up' ? '📈' : price.trend === 'down' ? '📉' : '➡️',
      trustMessage: price.trend === 'stable' ? '✅ Stable market' : 
                    price.trend === 'up' ? '📈 Price rising' : '📉 Price dropping'
    }));
    
    res.json({ success: true, prices: pricesWithIndicators });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get opportunities
router.get('/opportunities', async (req, res) => {
  try {
    const cropsWithLoss = await MarketPrice.find({
      'lossLocations.0': { $exists: true }
    });
    
    const opportunities = cropsWithLoss.map(crop => ({
      commodity: crop.commodity,
      currentPrice: crop.modalPrice,
      trend: crop.trend,
      lossLocations: crop.lossLocations,
      opportunityMessage: `💰 ${crop.commodity} prices expected to rise due to crop loss in ${crop.lossLocations.map(l => l.city).join(', ')}`
    }));
    
    res.json({ success: true, opportunities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get recommendations by state and district
router.get('/recommendations', async (req, res) => {
  try {
    const { state, district } = req.query;
    
    let query = {};
    if (state) query.state = { $regex: new RegExp(state, 'i') };
    if (district) query.district = { $regex: new RegExp(district, 'i') };
    
    const crops = await MarketPrice.find(query);
    
    if (crops.length === 0) {
      return res.json({ success: true, recommendations: [] });
    }
    
    const recommendations = crops.map(crop => {
      let confidence = 60;
      let reasons = [`Current price: ₹${crop.modalPrice}`];
      
      if (crop.trend === 'up') {
        confidence += 20;
        reasons.push(`📈 Price trend: UP by ${crop.changePercent}%`);
      } else if (crop.trend === 'stable') {
        confidence += 15;
        reasons.push(`✅ Stable market`);
      }
      
      if (crop.lossLocations && crop.lossLocations.length > 0) {
        confidence += 15;
        reasons.push(`⚠️ Supply shortage in ${crop.lossLocations.map(l => l.city).join(', ')}`);
      }
      
      return {
        crop: crop.commodity,
        currentPrice: crop.modalPrice,
        trend: crop.trend,
        trendIcon: crop.trend === 'up' ? '📈' : crop.trend === 'down' ? '📉' : '➡️',
        confidence: Math.min(confidence, 95),
        risk: confidence > 75 ? 'Low' : confidence > 55 ? 'Medium' : 'High',
        reasons: reasons,
        profitRange: {
          min: crop.minPrice * 8,
          max: crop.maxPrice * 12,
          average: crop.modalPrice * 10
        }
      };
    });
    
    recommendations.sort((a, b) => b.confidence - a.confidence);
    res.json({ success: true, recommendations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;