// server/routes/market.js
const express = require('express');
const router = express.Router();
const MarketData = require('../models/MarketData');
const auth = require('../middleware/auth');

router.get('/predictions', auth, async (req, res) => {
    try {
        // Find stored analysis for the user's district
        const { state, district } = req.user; 
        const data = await MarketData.findOne({ state, district });
        
        if (!data) return res.status(404).json({ message: "No data for this region" });
        
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;