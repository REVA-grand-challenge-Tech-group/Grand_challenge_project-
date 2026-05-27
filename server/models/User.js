const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'Phone number must be exactly 10 digits'
    }
  },
  state: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['farmer', 'labourer', 'both'],
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  farmSize: {
    type: String,
    default: ''
  },
  preferredLanguage: {
    type: String,
    enum: ['english', 'hindi', 'kannada'],
    default: 'english'
  },
  rating: {
    type: Number,
    default: 0
  },
  skills: [{
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);