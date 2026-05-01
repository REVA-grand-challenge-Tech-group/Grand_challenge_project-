const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MarketPrice = require('./models/MarketPrice');

dotenv.config();

const marketData = [
  {
    commodity: 'Rice',
    state: 'Karnataka',
    district: 'Hassan',
    market: 'Hassan APMC',
    minPrice: 2350,
    maxPrice: 2550,
    modalPrice: 2450,
    previousPrice: 2350,
    trend: 'up',
    changePercent: 4.2,
    lossLocations: [
      { city: 'Chennai', lossPercent: 35, reason: 'Heavy floods' },
      { city: 'Vijayawada', lossPercent: 28, reason: 'Cyclone' }
    ]
  },
  {
    commodity: 'Tomato',
    state: 'Karnataka',
    district: 'Hassan',
    market: 'Hassan APMC',
    minPrice: 28,
    maxPrice: 36,
    modalPrice: 32,
    previousPrice: 28,
    trend: 'up',
    changePercent: 14.2,
    lossLocations: [
      { city: 'Pune', lossPercent: 40, reason: 'Excessive heat' },
      { city: 'Bengaluru', lossPercent: 30, reason: 'Disease outbreak' }
    ]
  },
  {
    commodity: 'Onion',
    state: 'Karnataka',
    district: 'Hassan',
    market: 'Hassan APMC',
    minPrice: 40,
    maxPrice: 50,
    modalPrice: 45,
    previousPrice: 44,
    trend: 'stable',
    changePercent: 2.2,
    lossLocations: [
      { city: 'Nasik', lossPercent: 45, reason: 'Heavy rainfall' }
    ]
  },
  {
    commodity: 'Potato',
    state: 'Karnataka',
    district: 'Hassan',
    market: 'Hassan APMC',
    minPrice: 20,
    maxPrice: 24,
    modalPrice: 22,
    previousPrice: 24,
    trend: 'down',
    changePercent: -8.3,
    lossLocations: []
  },
  {
    commodity: 'Wheat',
    state: 'Karnataka',
    district: 'Hassan',
    market: 'Hassan APMC',
    minPrice: 2300,
    maxPrice: 2400,
    modalPrice: 2350,
    previousPrice: 2350,
    trend: 'stable',
    changePercent: 0,
    lossLocations: []
  }
];

async function seedMarketData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    await MarketPrice.deleteMany();
    console.log('✅ Cleared existing market data');
    
    await MarketPrice.insertMany(marketData);
    console.log(`✅ Added ${marketData.length} market records`);
    
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedMarketData();