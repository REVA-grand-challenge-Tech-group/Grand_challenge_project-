const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  labourerId: { type: String, required: true },
  labourerName: { type: String, required: true },
  labourerPhone: { type: String, required: true },
  labourerType: { 
    type: String, 
    enum: ['smartphone', 'callcenter', 'keypad', 'agent'],
    default: 'smartphone'
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'cancelled'],
    default: 'pending'
  },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);