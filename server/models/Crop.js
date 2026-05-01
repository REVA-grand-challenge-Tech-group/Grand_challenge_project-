const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  demand: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Very High', 'Critical'],
    default: 'Medium'
  },
  profitPerAcre: {
    type: Number,
    required: true
  },
  investmentPerAcre: {
    type: Number,
    required: true
  },
  season: {
    type: String,
    default: 'Throughout'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Crop', CropSchema);