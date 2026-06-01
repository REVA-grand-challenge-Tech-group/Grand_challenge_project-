const express = require('express');
const router = express.Router();
const axios = require('axios');

// Language mapping for Bhashini API
const languageMap = {
  'en': 'en',
  'hi': 'hi',
  'kn': 'kn',
  'ta': 'ta',
  'te': 'te',
  'ml': 'ml',
  'bn': 'bn',
  'mr': 'mr',
  'gu': 'gu',
  'pa': 'pa',
  'ur': 'ur',
  'or': 'or',
  'as': 'as',
  'sa': 'sa'
};

// Translation endpoint
router.post('/text', async (req, res) => {
  try {
    const { text, sourceLanguage, targetLanguage } = req.body;
    
    console.log(`🌐 Translating: "${text}" from ${sourceLanguage} to ${targetLanguage}`);
    
    // If source and target are same or target is English
    if (sourceLanguage === targetLanguage || targetLanguage === 'en') {
      return res.json({ translatedText: text });
    }
    
    // Try Bhashini API
    if (process.env.BHASHINI_API_KEY) {
      try {
        const options = {
          method: 'POST',
          url: 'https://meity-bhashini-ulca.p.rapidapi.com/translate',
          headers: {
            'x-rapidapi-key': process.env.BHASHINI_API_KEY,
            'x-rapidapi-host': 'meity-bhashini-ulca.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
          data: {
            sourceLanguage: languageMap[sourceLanguage] || 'en',
            targetLanguage: languageMap[targetLanguage] || 'hi',
            text: text
          }
        };
        
        const response = await axios.request(options);
        const translatedText = response.data?.translatedText || text;
        
        console.log(`✅ Translated: "${translatedText}"`);
        
        return res.json({ 
          success: true, 
          translatedText: translatedText,
          source: 'bhashini-api'
        });
      } catch (apiError) {
        console.log('Bhashini API error, using fallback:', apiError.message);
      }
    }
    
    // Fallback translations for common phrases
    const fallbackTranslations = {
      'hi': {
        'Dashboard': 'डैशबोर्ड',
        'Market Prediction': 'बाजार भविष्यवाणी',
        'Labour Support': 'श्रम सहायता',
        'Community Chat': 'सामुदायिक चैट',
        'Post a Job': 'नौकरी पोस्ट करें',
        'Find Jobs': 'नौकरी खोजें',
        'Weather': 'मौसम',
        'Profile': 'प्रोफाइल',
        'Logout': 'लॉगआउट'
      },
      'kn': {
        'Dashboard': 'ಡ್ಯಾಶ್ಬೋರ್ಡ್',
        'Market Prediction': 'ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆ',
        'Labour Support': 'ಕಾರ್ಮಿಕ ಬೆಂಬಲ',
        'Community Chat': 'ಸಮುದಾಯ ಚಾಟ್',
        'Post a Job': 'ಉದ್ಯೋಗ ಪೋಸ್ಟ್ ಮಾಡಿ',
        'Find Jobs': 'ಉದ್ಯೋಗ ಹುಡುಕಿ',
        'Weather': 'ಹವಾಮಾನ',
        'Profile': 'ಪ್ರೊಫೈಲ್',
        'Logout': 'ಲಾಗ್ಔಟ್'
      }
    };
    
    const translated = fallbackTranslations[targetLanguage]?.[text] || text;
    
    res.json({ 
      success: true, 
      translatedText: translated,
      source: 'fallback'
    });
    
  } catch (error) {
    console.error('Translation error:', error);
    res.json({ translatedText: text });
  }
});

// Speech to Text endpoint
router.post('/speech-to-text', async (req, res) => {
  try {
    const { audio, language } = req.body;
    
    // For demo, return mock response
    // In production, integrate with Bhashini STT API
    res.json({ 
      success: true, 
      text: "Sample voice input" 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Text to Speech endpoint
router.post('/text-to-speech', async (req, res) => {
  try {
    const { text, language } = req.body;
    
    // For demo, return mock response
    res.json({ 
      success: true, 
      audio: null 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;