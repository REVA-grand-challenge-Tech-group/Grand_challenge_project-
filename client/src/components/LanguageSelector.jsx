import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LanguageSelector = () => {
  const { setLanguage, t } = useApp();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' }
  ];

  const handleSelect = (code) => {
    setLanguage(code);
    navigate('/role');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-2xl">
              <span className="text-5xl animate-bounce">🌾</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mt-4 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
            {t('app_name')}
          </h1>
          <p className="text-gray-500 mt-2">{t('tagline')}</p>
        </div>

        <div className="space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              onMouseEnter={() => setHovered(lang.code)}
              onMouseLeave={() => setHovered(null)}
              className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                hovered === lang.code ? 'scale-105 shadow-2xl' : 'scale-100 shadow-lg'
              }`}
            >
              <div className="relative bg-white p-5 rounded-2xl border-2 border-green-100 group-hover:border-green-400 transition-all">
                <div className="flex items-center">
                  <span className="text-4xl mr-4">{lang.flag}</span>
                  <div className="flex-1 text-left">
                    <div className="font-bold text-xl text-gray-800">{lang.name}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 group-hover:bg-green-500 flex items-center justify-center transition-all group-hover:translate-x-1">
                    <svg className="w-5 h-5 text-green-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;