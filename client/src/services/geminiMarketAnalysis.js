const { GoogleGenerativeAI } = require('@google/generative-ai');
const MarketPrice = require('../models/MarketPrice');

// Get seasonal context based on month
const getSeasonalContext = () => {
  const month = new Date().getMonth();
  const seasons = {
    kharif: { months: [5, 6, 7, 8, 9], crops: ['Rice', 'Cotton', 'Sugarcane', 'Maize', 'Soybean'], message: 'Kharif season - ideal for Rice and Cotton' },
    rabi: { months: [10, 11, 0, 1, 2, 3], crops: ['Wheat', 'Mustard', 'Gram', 'Barley'], message: 'Rabi season - ideal for Wheat and Mustard' },
    summer: { months: [3, 4, 5], crops: ['Tomato', 'Onion', 'Potato', 'Chilli'], message: 'Summer season - ideal for vegetables' }
  };
  
  if (seasons.kharif.months.includes(month)) return seasons.kharif;
  if (seasons.rabi.months.includes(month)) return seasons.rabi;
  return seasons.summer;
};

// Calculate stable trend (7-day average)
const calculateStableTrend = (currentPrice, previousPrices) => {
  if (!previousPrices || previousPrices.length < 3) {
    return { trend: 'stable', changePercent: 0 };
  }
  const avgPrevious = previousPrices.reduce((a, b) => a + b, 0) / previousPrices.length;
  const percentChange = ((currentPrice - avgPrevious) / avgPrevious) * 100;
  if (percentChange > 3) return { trend: 'up', changePercent: percentChange.toFixed(1) };
  if (percentChange < -3) return { trend: 'down', changePercent: percentChange.toFixed(1) };
  return { trend: 'stable', changePercent: 0 };
};

// Main analysis function
const analyzeMarketWithGemini = async (district) => {
  try {
    // Fetch raw market data from database
    const crops = await MarketPrice.find({ district: { $regex: new RegExp(district, 'i') } });
    
    if (!crops.length) {
      return { success: false, message: 'No market data found for this district' };
    }
    
    const seasonal = getSeasonalContext();
    
    // Prepare data for Gemini
    const cropDataForAI = crops.map(crop => ({
      name: crop.commodity,
      currentPrice: crop.modalPrice,
      demand: crop.demand,
      trend: crop.trend,
      profitPerAcre: crop.profitPerAcre,
      season: crop.season || 'Throughout',
      lossOpportunities: crop.lossLocations
    }));
    
    const prompt = `You are an agricultural market expert in ${district}, India.
    
    Current seasonal context: ${seasonal.message}
    Seasonal crops: ${seasonal.crops.join(', ')}
    
    Analyze this crop market data: ${JSON.stringify(cropDataForAI)}
    
    Provide STABLE, REALISTIC recommendations based on:
    1. Seasonal patterns (don't recommend out-of-season crops)
    2. Historical market trends
    3. Current demand and supply
    
    Return ONLY valid JSON:
    {
      "insight": "One sentence market insight for this district",
      "recommendations": [
        {
          "crop": "Crop Name",
          "confidence": 85,
          "risk": "Low",
          "reason": "Brief reason",
          "recommendedAcres": 2,
          "profitPerAcre": 180000
        }
      ]
    }
    
    Keep recommendations CONSISTENT - don't change drastically day to day.`;
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const analysis = JSON.parse(text);
    
    return { success: true, ...analysis, seasonal: seasonal.message };
    
  } catch (error) {
    console.error('Gemini Analysis Error:', error);
    return { success: false, message: error.message };
  }
};

module.exports = { analyzeMarketWithGemini, getSeasonalContext, calculateStableTrend };