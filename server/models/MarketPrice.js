const mongoose = require('mongoose');

const MarketPriceSchema = new mongoose.Schema({
  commodity: { type: String, required: true },
  state: { type: String, required: true },
  district: String,
  market: String,
  minPrice: Number,
  maxPrice: Number,
  modalPrice: Number,
  previousPrice: Number,
  trend: { type: String, enum: ['up', 'down', 'stable'], default: 'stable' },
  changePercent: Number,
  lossLocations: [{
    city: String,
    lossPercent: Number,
    reason: String
  }],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);