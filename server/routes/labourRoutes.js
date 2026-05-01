const express = require('express');
const router = express.Router();
const Labour = require('../models/Labour');

// Get all available labourers
router.get('/', async (req, res) => {
  try {
    const labourers = await Labour.find({ isAvailable: true });
    res.json({ success: true, labourers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register new labourer
router.post('/register', async (req, res) => {
  try {
    const labour = new Labour(req.body);
    await labour.save();
    res.json({ success: true, labour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;