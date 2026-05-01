const mongoose = require('mongoose');

const LabourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  skills: [{
    type: String
  }],
  location: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0
  },
  experience: {
    type: String,
    default: '1 year'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Labour', LabourSchema);