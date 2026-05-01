const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  farmerId: { 
    type: String, 
    required: true 
  },
  farmerName: { type: String, required: true },
  farmerPhone: { type: String, required: true },
  farmerDistrict: { type: String, required: true },
  
  crop: { type: String, required: true },
  acres: { type: Number, required: true },
  expectedHarvest: { type: String, required: true },
  
  confirmedPrice: { type: Number, required: true },
  totalExpectedValue: { type: Number, required: true },
  
  lossCityMatched: { type: String },
  lossPercent: { type: Number },
  
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'growing', 'harvested', 'completed'],
    default: 'pending'
  },
  
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);