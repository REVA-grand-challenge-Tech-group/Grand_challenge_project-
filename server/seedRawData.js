const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MarketPrice = require('./models/MarketData');

dotenv.config();

// RAW CROP DATA - This is what Gemini will analyze
const rawCropData = [
  // Bangalore District
  {
    commodity: 'Rice',
    state: 'Karnataka',
    district: 'Bangalore',
    market: 'Bangalore APMC',
    minPrice: 2350,
    maxPrice: 2550,
    modalPrice: 2450,
    previousPrice: 2400,
    trend: 'up',
    changePercent: 2.1,
    demand: 'High',
    investmentPerAcre: 25000,
    profitPerAcre: 55000,
    season: 'Kharif',
    lossLocations: [{ city: 'Chennai', lossPercent: 35, reason: 'Heavy floods' }]
  },
  {
    commodity: 'Tomato',
    state: 'Karnataka',
    district: 'Bangalore',
    market: 'Bangalore APMC',
    minPrice: 30,
    maxPrice: 38,
    modalPrice: 34,
    previousPrice: 32,
    trend: 'up',
    changePercent: 6.25,
    demand: 'Very High',
    investmentPerAcre: 35000,
    profitPerAcre: 85000,
    season: 'Throughout',
    lossLocations: [{ city: 'Pune', lossPercent: 40, reason: 'Excessive heat' }]
  },
  {
    commodity: 'Onion',
    state: 'Karnataka',
    district: 'Bangalore',
    market: 'Bangalore APMC',
    minPrice: 42,
    maxPrice: 52,
    modalPrice: 47,
    previousPrice: 45,
    trend: 'up',
    changePercent: 4.4,
    demand: 'Critical',
    investmentPerAcre: 45000,
    profitPerAcre: 120000,
    season: 'Rabi',
    lossLocations: [{ city: 'Nasik', lossPercent: 45, reason: 'Heavy rainfall' }]
  },
  {
    commodity: 'Potato',
    state: 'Karnataka',
    district: 'Bangalore',
    market: 'Bangalore APMC',
    minPrice: 20,
    maxPrice: 26,
    modalPrice: 23,
    previousPrice: 24,
    trend: 'down',
    changePercent: -4.2,
    demand: 'Medium',
    investmentPerAcre: 25000,
    profitPerAcre: 40000,
    season: 'Rabi',
    lossLocations: []
  },
  {
    commodity: 'Ginger',
    state: 'Karnataka',
    district: 'Bangalore',
    market: 'Bangalore APMC',
    minPrice: 75,
    maxPrice: 90,
    modalPrice: 82,
    previousPrice: 78,
    trend: 'up',
    changePercent: 5.1,
    demand: 'High',
    investmentPerAcre: 80000,
    profitPerAcre: 180000,
    season: 'Throughout',
    lossLocations: []
  },
  // Hassan District
  {
    commodity: 'Rice',
    state: 'Karnataka',
    district: 'Hassan',
    market: 'Hassan APMC',
    minPrice: 2400,
    maxPrice: 2600,
    modalPrice: 2500,
    previousPrice: 2450,
    trend: 'up',
    changePercent: 2.0,
    demand: 'High',
    investmentPerAcre: 25000,
    profitPerAcre: 55000,
    season: 'Kharif',
    lossLocations: [{ city: 'Chennai', lossPercent: 35, reason: 'Heavy floods' }]
  },
  {
    commodity: 'Ginger',
    state: 'Karnataka',
    district: 'Hassan',
    market: 'Hassan APMC',
    minPrice: 80,
    maxPrice: 95,
    modalPrice: 87,
    previousPrice: 82,
    trend: 'up',
    changePercent: 6.1,
    demand: 'High',
    investmentPerAcre: 80000,
    profitPerAcre: 190000,
    season: 'Throughout',
    lossLocations: []
  },
  {
    commodity: 'Coffee',
    state: 'Karnataka',
    district: 'Hassan',
    market: 'Hassan APMC',
    minPrice: 12000,
    maxPrice: 15000,
    modalPrice: 13500,
    previousPrice: 13000,
    trend: 'up',
    changePercent: 3.8,
    demand: 'High',
    investmentPerAcre: 150000,
    profitPerAcre: 250000,
    season: 'Throughout',
    lossLocations: []
  }
];

async function seedRawData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    await MarketPrice.deleteMany();
    console.log('✅ Cleared existing market data');
    
    await MarketPrice.insertMany(rawCropData);
    console.log(`✅ Added ${rawCropData.length} raw crop records to database`);
    
    console.log('\n📊 Raw data includes:');
    console.log('- Crop prices, trends, demand');
    console.log('- Loss locations (Chennai, Pune, Nasik)');
    console.log('- Investment and profit per acre');
    console.log('- Seasonal information');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding raw data:', error);
    process.exit(1);
  }
}

seedRawData();