// server/routes/translationRoutes.js
const express = require('express');
const router = express.Router();
const { translateText } = require('../services/bhashiniService');

// POST endpoint: http://localhost:5001/api/translate
router.post('/', async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ 
      error: 'Missing fields. Both \"text\" and \"targetLanguage\" are strictly required.' 
    });
  }

  try {
    const translatedResult = await translateText(text, targetLanguage);
    return res.json({ translatedText: translatedResult });
  } catch (error) {
    console.error(`Route Error: ${error.message}`);
    return res.status(500).json({ error: 'Internal server error during translation translation.' });
  }
});

module.exports = router;