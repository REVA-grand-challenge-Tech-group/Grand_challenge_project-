import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// All Bhashini supported languages
export const supportedLanguages = [
  { code: 'en', name: 'English', native: 'English', region: 'International' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'North India' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'Karnataka' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'Tamil Nadu' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'Andhra Pradesh' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', region: 'Kerala' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', region: 'West Bengal' },
  { code: 'mr', name: 'Marathi', native: 'मराठी', region: 'Maharashtra' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', region: 'Gujarat' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', region: 'Punjab' },
  { code: 'ur', name: 'Urdu', native: 'اردو', region: 'Uttar Pradesh' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', region: 'Odisha' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া', region: 'Assam' },
  { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', region: 'Ancient' }
];

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
  const [translationCache, setTranslationCache] = useState({});

  // All static UI text that needs translation
  const uiTexts = {
    // Navigation
    dashboard: 'Dashboard',
    marketPrediction: 'Market Prediction',
    labourSupport: 'Labour Support',
    communityChat: 'Community Chat',
    postJob: 'Post a Job',
    findJobs: 'Find Jobs',
    myJobs: 'My Jobs',
    myApplications: 'My Applications',
    weather: 'Weather',
    profile: 'Profile',
    logout: 'Logout',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    aiInsight: 'AI Insight',
    liveMarketPrices: 'Live Market Prices',
    farmingTips: 'Farming Tips',
    activeFarmers: 'Active Farmers',
    availableLabourers: 'Available Labourers',
    avgMarketPrice: 'Avg Market Price',
    totalJobsPosted: 'Total Jobs Posted',
    quickActions: 'Quick Actions',
    
    // Market Prediction
    marketPredictions: 'Market Predictions',
    currentPrice: 'Current Price',
    predictedPrice: 'Predicted Price',
    demandLevel: 'Demand Level',
    confidenceScore: 'Confidence Score',
    recommendations: 'Recommendations',
    calculateProfit: 'Calculate Profit',
    registerCrop: 'Register Crop',
    
    // Post Job
    postJobTitle: 'Post a Job',
    cropName: 'Crop Name',
    workType: 'Work Type',
    labourersNeeded: 'Labourers Needed',
    wagePerDay: 'Wage per Day',
    startDate: 'Start Date',
    endDate: 'End Date',
    location: 'Location',
    additionalNotes: 'Additional Notes',
    postJobButton: 'Post Job',
    jobSummary: 'Job Summary',
    totalPayment: 'Total Payment',
    
    // Find Jobs
    findJobsTitle: 'Find Jobs',
    searchJobs: 'Search by crop, work type, or location...',
    availableJobs: 'Available Jobs',
    applyNow: 'Apply Now',
    applied: 'Applied',
    postedBy: 'Posted by',
    days: 'days',
    workersNeeded: 'workers needed',
    
    // Chat
    communityChatTitle: 'Community Chat',
    farmersActive: 'farmers active',
    searchDiscussions: 'Search discussions, farmers, or topics...',
    allDiscussions: 'All',
    crops: 'Crops',
    market: 'Market',
    labour: 'Labour',
    weather: 'Weather',
    typeMessage: 'Share farming tips, ask questions...',
    send: 'Send',
    
    // Profile
    personalInfo: 'Personal Information',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    state: 'State',
    district: 'District',
    bio: 'Bio',
    farmSize: 'Farm Size (acres)',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    
    // Common
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    loading: 'Loading...',
    selectLanguage: 'Select your language',
    selectRole: 'Select Your Role',
    continue: 'Continue',
    submit: 'Submit',
    optional: 'Optional'
  };

  // Translate text using Bhashini API
  const translateText = async (text, targetLang) => {
    if (targetLang === 'en') return text;
    
    // Check cache first
    const cacheKey = `${text}_${targetLang}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }
    
    try {
      const response = await axios.post('http://localhost:5001/api/translate/text', {
        text: text,
        sourceLanguage: 'en',
        targetLanguage: targetLang
      });
      
      const translated = response.data.translatedText || text;
      
      // Update cache
      setTranslationCache(prev => ({ ...prev, [cacheKey]: translated }));
      
      return translated;
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  // Translate all UI text when language changes
  useEffect(() => {
    const translateAllUI = async () => {
      if (currentLanguage === 'en') {
        setTranslations(uiTexts);
        return;
      }
      
      setLoading(true);
      const translated = {};
      
      // Translate in batches to avoid overwhelming API
      const entries = Object.entries(uiTexts);
      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];
        translated[key] = await translateText(value, currentLanguage);
        
        // Update progressively
        if (i % 10 === 0) {
          setTranslations(prev => ({ ...prev, ...translated }));
        }
      }
      
      setTranslations(translated);
      setLoading(false);
    };
    
    translateAllUI();
  }, [currentLanguage]);

  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    localStorage.setItem('preferredLanguage', langCode);
  };

  const t = (key) => {
    return translations[key] || uiTexts[key] || key;
  };

  // Translate dynamic content (posts, messages, etc.)
  const translateDynamic = async (text, targetLang) => {
    if (targetLang === 'en' || !text) return text;
    return await translateText(text, targetLang);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      setCurrentLanguage: changeLanguage,
      t,
      loading,
      translateDynamic,
      supportedLanguages
    }}>
      {children}
    </LanguageContext.Provider>
  );
};