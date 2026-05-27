const express = require('express');
const router = express.Router();

// Simple weather data for districts
router.get('/:district', (req, res) => {
  const weatherData = {
    'Bengaluru': { temp: 28, condition: 'Sunny', humidity: 65, icon: '☀️' },
    'Mysore': { temp: 27, condition: 'Clear', humidity: 70, icon: '☀️' },
    'Hubli': { temp: 30, condition: 'Hot', humidity: 55, icon: '🔥' },
    'default': { temp: 26, condition: 'Partly Cloudy', humidity: 68, icon: '⛅' }
  };
  
  const weather = weatherData[req.params.district] || weatherData.default;
  res.json(weather);
});

module.exports = router;