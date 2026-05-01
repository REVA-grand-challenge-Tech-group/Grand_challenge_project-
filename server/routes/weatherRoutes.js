const express = require('express');
const router = express.Router();
const { getWeather } = require('../services/weatherService');

// GET weather by city
router.get('/:city?', async (req, res) => {
  const city = req.params.city || 'Hassan';
  const weather = await getWeather(city);
  res.json(weather);
});

module.exports = router;