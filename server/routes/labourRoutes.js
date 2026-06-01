const express = require('express');
const router = express.Router();

// In-memory storage for demo
const labourers = [];
const jobApplications = [];

// Register labour
router.post('/register', (req, res) => {
  const { name, phone, skills, district, experience } = req.body;
  
  const labourer = {
    id: Date.now(),
    name,
    phone,
    skills,
    district,
    experience,
    rating: 4.5,
    completedJobs: 0,
    registeredAt: new Date()
  };
  
  labourers.push(labourer);
  res.json({ success: true, labourer });
});

// Get all labourers
router.get('/all', (req, res) => {
  res.json({ success: true, labourers });
});

// Apply for job
router.post('/apply', (req, res) => {
  const { jobId, labourerId, labourerName, labourerPhone, labourerDistrict, message } = req.body;
  
  const application = {
    id: Date.now(),
    jobId,
    labourerId,
    labourerName,
    labourerPhone,
    labourerDistrict,
    message,
    status: 'Pending',
    appliedAt: new Date()
  };
  
  jobApplications.push(application);
  
  // Update job applicants list
  const jobs = global.jobs || [];
  const jobIndex = jobs.findIndex(j => j.id === jobId);
  if (jobIndex !== -1) {
    if (!jobs[jobIndex].applicants) jobs[jobIndex].applicants = [];
    jobs[jobIndex].applicants.push(application);
    global.jobs = jobs;
  }
  
  res.json({ success: true, application });
});

// Get applications for a job
router.get('/job/:jobId/applications', (req, res) => {
  const { jobId } = req.params;
  const applications = jobApplications.filter(app => app.jobId == jobId);
  res.json({ success: true, applications });
});

// Get applications for a labourer
router.get('/labourer/:labourerId/applications', (req, res) => {
  const { labourerId } = req.params;
  const applications = jobApplications.filter(app => app.labourerId == labourerId);
  res.json({ success: true, applications });
});

// Update application status (Accept/Reject)
router.put('/application/:applicationId/status', (req, res) => {
  const { applicationId } = req.params;
  const { status } = req.body;
  
  const applicationIndex = jobApplications.findIndex(app => app.id == applicationId);
  if (applicationIndex !== -1) {
    jobApplications[applicationIndex].status = status;
    jobApplications[applicationIndex].updatedAt = new Date();
    
    // Update in jobs array as well
    const jobs = global.jobs || [];
    jobs.forEach(job => {
      if (job.applicants) {
        const appIndex = job.applicants.findIndex(a => a.id == applicationId);
        if (appIndex !== -1) {
          job.applicants[appIndex].status = status;
        }
      }
    });
    global.jobs = jobs;
    
    res.json({ success: true, application: jobApplications[applicationIndex] });
  } else {
    res.status(404).json({ success: false, message: 'Application not found' });
  }
});

module.exports = router;