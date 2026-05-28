import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const imageMap = {
  kn: '/images/hampi.jpg',
  en: '/images/nature.jpg',
  hi: '/images/wheat.jpg',
  ta: '/images/temple.jpg',
  te: '/images/chili.jpg',
  ml: '/images/kerela.jpg',
};

const languages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
];

const LanguagePage = () => {
  const { setLanguage } = useApp();
  const navigate = useNavigate();

  const handleSelect = (langCode) => {
    console.log("Selected language:", langCode);
    
    // Save language to localStorage and context
    if (typeof setLanguage === 'function') {
      setLanguage(langCode);
    } else {
      // Fallback if setLanguage doesn't exist
      localStorage.setItem('language', langCode);
    }
    
    // Navigate to role page
    navigate('/role');
  };

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-900">KrishiSetu</h1>
        <p className="text-stone-600">Select your language / अपनी भाषा चुनें</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            style={{ 
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${imageMap[lang.code] || imageMap.en})` 
            }}
            className="h-32 bg-cover bg-center rounded-3xl shadow-md border-2 border-white flex flex-col items-center justify-center transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-xl font-bold text-white">{lang.native}</span>
            <span className="text-xs font-medium text-emerald-100">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguagePage;