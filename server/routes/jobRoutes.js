const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');
const Contract = require('../models/Contract');

// Post a new job
router.post('/post', async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all open jobs
router.get('/open', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'open' }).sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get jobs posted by farmer
router.get('/farmer/:farmerId', async (req, res) => {
  try {
    const jobs = await Job.find({ farmerId: req.params.farmerId });
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Apply for a job
router.post('/apply', async (req, res) => {
  try {
    const { jobId, labourerId, labourerName, labourerPhone, labourerType } = req.body;
    
    // Check if already applied
    const existing = await Application.findOne({ jobId, labourerId });
    if (existing) {
      return res.json({ success: false, message: 'You have already applied for this job' });
    }
    
    const application = new Application({
      jobId, labourerId, labourerName, labourerPhone, labourerType
    });
    await application.save();
    
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get applications for a job
router.get('/applications/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId });
    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Accept application and create contract
router.post('/accept', async (req, res) => {
  try {
    const { applicationId, jobId } = req.body;
    
    const application = await Application.findById(applicationId);
    const job = await Job.findById(jobId);
    
    if (!application || !job) {
      return res.json({ success: false, message: 'Application or Job not found' });
    }
    
    // Update application status
    application.status = 'accepted';
    await application.save();
    
    // Create contract
    const contract = new Contract({
      jobId: job._id,
      farmerId: job.farmerId,
      farmerName: job.farmerName,
      labourerId: application.labourerId,
      labourerName: application.labourerName,
      labourerPhone: application.labourerPhone,
      crop: job.crop,
      workType: job.workType,
      wagePerDay: job.wagePerDay,
      totalDays: job.totalDays,
      totalAmount: job.wagePerDay * job.totalDays,
      startDate: job.startDate,
      endDate: job.endDate
    });
    await contract.save();
    
    // Update job labourer count (simplified)
    job.labourersNeeded -= 1;
    if (job.labourersNeeded <= 0) {
      job.status = 'filled';
    }
    await job.save();
    
    res.json({ 
      success: true, 
      contract,
      message: `Labourer ${application.labourerName} has been hired!`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get contracts for labourer
router.get('/contracts/labourer/:labourerId', async (req, res) => {
  try {
    const contracts = await Contract.find({ labourerId: req.params.labourerId });
    res.json({ success: true, contracts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get contracts for farmer
router.get('/contracts/farmer/:farmerId', async (req, res) => {
  try {
    const contracts = await Contract.find({ farmerId: req.params.farmerId });
    res.json({ success: true, contracts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;