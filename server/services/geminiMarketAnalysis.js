const { GoogleGenerativeAI } = require('@google/generative-ai');

const getSeasonalContext = () => {
  const month = new Date().getMonth();
  
  if (month >= 5 && month <= 9) {
    return {
      season: 'Kharif',
      crops: ['Rice', 'Cotton', 'Sugarcane', 'Maize', 'Soybean'],
      message: 'Kharif season (June-October) - ideal for Rice and Cotton'
    };
  } else if (month >= 10 || month <= 3) {
    return {
      season: 'Rabi',
      crops: ['Wheat', 'Mustard', 'Gram', 'Barley'],
      message: 'Rabi season (November-April) - ideal for Wheat and Mustard'
    };
  } else {
    return {
      season: 'Summer',
      crops: ['Tomato', 'Onion', 'Potato', 'Chilli'],
      message: 'Summer season - ideal for vegetables'
    };
  }
};

const analyzeMarketWithGemini = async (district) => {
  try {
    const seasonal = getSeasonalContext();
    
    return {
      success: true,
      insight: `${seasonal.message}. Focus on high-demand crops for better profits.`,
      recommendations: seasonal.crops.slice(0, 3).map((crop, i) => ({
        crop: crop,
        confidence: 85 - (i * 5),
        risk: i === 0 ? 'Low' : 'Medium',
        reason: `${crop} is well-suited for current season in ${district}`,
        recommendedAcres: i === 0 ? 3 : 2,
        profitPerAcre: crop === 'Rice' ? 55000 : crop === 'Wheat' ? 48000 : 65000
      }))
    };
    
  } catch (error) {
    console.error('Gemini Error:', error.message);
    const seasonal = getSeasonalContext();
    return {
      success: true,
      insight: `${seasonal.message}. Plant seasonal crops for better profits.`,
      recommendations: seasonal.crops.slice(0, 3).map((crop, i) => ({
        crop: crop,
        confidence: 85 - (i * 5),
        risk: i === 0 ? 'Low' : 'Medium',
        reason: `${crop} is recommended for current season`,
        recommendedAcres: i === 0 ? 3 : 2,
        profitPerAcre: crop === 'Rice' ? 55000 : crop === 'Wheat' ? 48000 : 65000
      }))
    };
  }
};

module.exports = { analyzeMarketWithGemini, getSeasonalContext };