// server/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const { createJob, getJobs } = require('../controllers/jobController');
const { verifyToken } = require('../middleware/auth');

router.post('/', verifyToken, createJob);
module.exports = router;