const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');

// Get all crops
router.get('/', async (req, res) => {
  try {
    const crops = await Crop.find();
    res.json({ success: true, crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single crop by ID
router.get('/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) {
      return res.json({ success: false, message: 'Crop not found' });
    }
    res.json({ success: true, crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add new crop
router.post('/add', async (req, res) => {
  try {
    const crop = new Crop(req.body);
    await crop.save();
    res.json({ success: true, crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;