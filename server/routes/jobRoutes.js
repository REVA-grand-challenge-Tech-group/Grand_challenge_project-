const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');
const { createJob } = require('../controllers/jobController');

// Only Farmers or 'BOTH' users can post jobs
router.post('/create', auth, roleCheck(['FARMER']), createJob);

module.exports = router;