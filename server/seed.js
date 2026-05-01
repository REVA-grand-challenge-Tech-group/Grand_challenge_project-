const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Crop = require('./models/Crop');

dotenv.config();

const crops = [
  {
    name: 'Rice',
    price: 2450,
    demand: 'High',
    profitPerAcre: 18500,
    investmentPerAcre: 12000,
    season: 'Kharif',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=150&h=150&fit=crop'
  },
  {
    name: 'Wheat',
    price: 2350,
    demand: 'High',
    profitPerAcre: 16500,
    investmentPerAcre: 11000,
    season: 'Rabi',
    imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&h=150&fit=crop'
  },
  {
    name: 'Tomato',
    price: 32,
    demand: 'Very High',
    profitPerAcre: 85000,
    investmentPerAcre: 35000,
    season: 'Throughout',
    imageUrl: 'https://images.unsplash.com/photo-1546094096-0df4bcaaa2e8?w=150&h=150&fit=crop'
  },
  {
    name: 'Onion',
    price: 45,
    demand: 'Critical',
    profitPerAcre: 120000,
    investmentPerAcre: 45000,
    season: 'Rabi',
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=150&h=150&fit=crop'
  },
  {
    name: 'Potato',
    price: 22,
    demand: 'Medium',
    profitPerAcre: 40000,
    investmentPerAcre: 25000,
    season: 'Rabi',
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&fit=crop'
  },
  {
    name: 'Chilli',
    price: 60,
    demand: 'High',
    profitPerAcre: 95000,
    investmentPerAcre: 40000,
    season: 'Throughout',
    imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03f4924?w=150&h=150&fit=crop'
  }
];

async function addCrops() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing crops
    await Crop.deleteMany();
    console.log('✅ Cleared existing crops');
    
    // Add new crops
    await Crop.insertMany(crops);
    console.log(`✅ Added ${crops.length} crops to database!`);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

addCrops();