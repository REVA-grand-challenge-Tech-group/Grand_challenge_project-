const mongoose = require('mongoose');

const CropRegistrationSchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmerName: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  cropName: { type: String, required: true },
  acreage: { type: Number, required: true },
  expectedHarvestDate: { type: Date, required: true },
  estimatedYield: { type: Number, required: true } // in quintals
}, { timestamps: true });

module.exports = mongoose.model('CropRegistration', CropRegistrationSchema);