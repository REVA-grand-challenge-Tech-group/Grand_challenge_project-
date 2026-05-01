const mongoose = require('mongoose');

const ContractSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  labourerId: { type: String, required: true },
  labourerName: { type: String, required: true },
  labourerPhone: { type: String, required: true },
  
  crop: { type: String, required: true },
  workType: { type: String, required: true },
  wagePerDay: { type: Number, required: true },
  totalDays: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contract', ContractSchema);