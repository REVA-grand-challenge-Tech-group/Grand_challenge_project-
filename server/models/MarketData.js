const mongoose = require('mongoose');

const MarketDataSchema = new mongoose.Schema({
  state: { type: String, required: true },
  district: { type: String, required: true },
  cropName: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  historicalPrices: [Number],
  predictedPriceNextMonth: { type: Number, required: true },
  demandLevel: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'], default: 'MEDIUM' },
  riskFactor: { type: String, enum: ['LOW', 'MODERATE', 'HIGH'], default: 'LOW' },
  seasonalInsight: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

MarketDataSchema.index({ state: 1, district: 1, cropName: 1 });

// Use module.exports for Node.js/Backend files
module.exports = mongoose.model('MarketData', MarketDataSchema);