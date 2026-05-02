// FILE LOCATION: server/services/marketAnalysis.js

const Crop = require('../models/Crop');

// This function runs automatically to analyze market data
const analyzeMarketData = async () => {
  console.log('🔄 Running market analysis at:', new Date().toLocaleTimeString());
  
  try {
    // Get all crops from database
    const crops = await Crop.find();
    
    for (const crop of crops) {
      // Calculate new trend (up/down/stable)
      const priceChange = ((crop.price - crop.previousPrice) / crop.previousPrice) * 100;
      
      let newTrend = 'stable';
      if (priceChange > 2) newTrend = 'up';
      if (priceChange < -2) newTrend = 'down';
      
      // Update demand based on price trend
      let newDemand = crop.demand;
      if (newTrend === 'up' && priceChange > 5) newDemand = 'Very High';
      if (newTrend === 'down' && priceChange < -5) newDemand = 'Low';
      
      // Save updates
      crop.trend = newTrend;
      crop.demand = newDemand;
      crop.previousPrice = crop.price;
      
      await crop.save();
    }
    
    console.log(`✅ Market analysis complete! Updated ${crops.length} crops`);
    
  } catch (error) {
    console.error('❌ Market analysis error:', error.message);
  }
};

// Run every hour (60 minutes = 60 * 60 * 1000 milliseconds)
setInterval(analyzeMarketData, 60 * 60 * 1000);

// Run once when server starts
analyzeMarketData();

module.exports = analyzeMarketData;