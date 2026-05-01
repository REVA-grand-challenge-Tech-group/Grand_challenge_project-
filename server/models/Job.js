const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  farmerName: { type: String, required: true },
  farmerPhone: { type: String, required: true },
  farmerDistrict: { type: String, required: true },
  
  crop: { type: String, required: true },
  workType: { type: String, required: true },
  labourersNeeded: { type: Number, required: true },
  wagePerDay: { type: Number, required: true },
  hoursPerDay: { type: Number, default: 8 },
  
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  totalDays: { type: Number, required: true },
  
  mealProvided: { type: Boolean, default: false },
  toolsProvided: { type: Boolean, default: false },
  
  location: { type: String, required: true },
  
  status: { 
    type: String, 
    enum: ['open', 'in_progress', 'filled', 'completed', 'cancelled'],
    default: 'open'
  },
  
  totalCost: { type: Number },
  
  createdAt: { type: Date, default: Date.now }
});

// Calculate total cost before saving
JobSchema.pre('save', function(next) {
  this.totalCost = this.labourersNeeded * this.wagePerDay * this.totalDays;
  next();
});

module.exports = mongoose.model('Job', JobSchema);