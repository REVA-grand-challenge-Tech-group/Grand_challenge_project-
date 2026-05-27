import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const LanguageSelection = () => {
  const { setCurrentLanguage, currentLanguage } = useLanguage();
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState(currentLanguage);
  const [searchTerm, setSearchTerm] = useState('');
  const [recentLanguages, setRecentLanguages] = useState([]);

  // All Bhashini supported languages
  const allLanguages = [
    { code: 'assamese', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', region: 'Assam', script: 'Bengali' },
    { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', region: 'West Bengal', script: 'Bengali' },
    { code: 'bodo', name: 'Bodo', nativeName: 'बर', flag: '🇮🇳', region: 'Assam', script: 'Devanagari' },
    { code: 'dogri', name: 'Dogri', nativeName: 'डोगरी', flag: '🇮🇳', region: 'Jammu & Kashmir', script: 'Devanagari' },
    { code: 'english', name: 'English', nativeName: 'English', flag: '🇬🇧', region: 'International', script: 'Latin' },
    { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'Gujarat', script: 'Gujarati' },
    { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', region: 'North India', script: 'Devanagari' },
    { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'Karnataka', script: 'Kannada' },
    { code: 'kashmiri', name: 'Kashmiri', nativeName: 'कॉशुर', flag: '🇮🇳', region: 'Jammu & Kashmir', script: 'Perso-Arabic' },
    { code: 'konkani', name: 'Konkani', nativeName: 'कोंकणी', flag: '🇮🇳', region: 'Goa', script: 'Devanagari' },
    { code: 'maithili', name: 'Maithili', nativeName: 'मैथिली', flag: '🇮🇳', region: 'Bihar', script: 'Devanagari' },
    { code: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', region: 'Kerala', script: 'Malayalam' },
    { code: 'manipuri', name: 'Manipuri', nativeName: 'মৈতৈলোন্', flag: '🇮🇳', region: 'Manipur', script: 'Bengali' },
    { code: 'marathi', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'Maharashtra', script: 'Devanagari' },
    { code: 'nepali', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', region: 'Sikkim', script: 'Devanagari' },
    { code: 'odia', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', region: 'Odisha', script: 'Odia' },
    { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', region: 'Punjab', script: 'Gurmukhi' },
    { code: 'rajasthani', name: 'Rajasthani', nativeName: 'राजस्थानी', flag: '🇮🇳', region: 'Rajasthan', script: 'Devanagari' },
    { code: 'sanskrit', name: 'Sanskrit', nativeName: 'संस्कृतम्', flag: '🇮🇳', region: 'Ancient', script: 'Devanagari' },
    { code: 'santali', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳', region: 'Jharkhand', script: 'Ol Chiki' },
    { code: 'sindhi', name: 'Sindhi', nativeName: 'سنڌي', flag: '🇮🇳', region: 'Sindh', script: 'Perso-Arabic' },
    { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Tamil Nadu', script: 'Tamil' },
    { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Telangana & AP', script: 'Telugu' },
    { code: 'urdu', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳', region: 'Uttar Pradesh', script: 'Perso-Arabic' }
  ];

  // Popular languages (shown at top)
  const popularLanguages = [
    { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', region: 'North India' },
    { code: 'english', name: 'English', nativeName: 'English', flag: '🇬🇧', region: 'International' },
    { code: 'kannada', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', region: 'Karnataka' },
    { code: 'tamil', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', region: 'Tamil Nadu' },
    { code: 'telugu', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', region: 'Telangana' },
    { code: 'marathi', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', region: 'Maharashtra' },
    { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', region: 'Gujarat' },
    { code: 'bengali', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', region: 'West Bengal' },
    { code: 'malayalam', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', region: 'Kerala' },
    { code: 'punjabi', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', region: 'Punjab' }
  ];

  // Load recent languages from localStorage
  useEffect(() => {
    const savedRecent = localStorage.getItem('recentLanguages');
    if (savedRecent) {
      setRecentLanguages(JSON.parse(savedRecent));
    }
  }, []);

  // Save selected language to recent
  const saveToRecent = (langCode) => {
    const updatedRecent = [langCode, ...recentLanguages.filter(l => l !== langCode)].slice(0, 5);
    setRecentLanguages(updatedRecent);
    localStorage.setItem('recentLanguages', JSON.stringify(updatedRecent));
  };

  const handleLanguageSelect = (langCode) => {
    setSelectedLang(langCode);
    saveToRecent(langCode);
    
    // Store language in localStorage
    localStorage.setItem('selectedLanguage', langCode);
    localStorage.setItem('preferredLanguage', langCode);
    
    // Update context
    setCurrentLanguage(langCode);
    
    // Show success message and proceed after delay
    showSuccessMessage(langCode);
  };

  const showSuccessMessage = (langCode) => {
    const language = allLanguages.find(l => l.code === langCode);
    const message = document.createElement('div');
    message.className = 'fixed bottom-20 left-4 right-4 bg-green-500 text-white p-4 rounded-xl shadow-lg text-center z-50 animate-bounce';
    message.innerHTML = `
      <div class="flex items-center justify-center space-x-2">
        <span class="text-2xl">✅</span>
        <div>
          <p class="font-bold">${language?.name} selected!</p>
          <p class="text-sm">Taking you to next step...</p>
        </div>
      </div>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
      navigate('/role-selection');
    }, 1500);
  };

  const getLanguageByCode = (code) => {
    return allLanguages.find(l => l.code === code);
  };

  // Filter languages based on search
  const filteredLanguages = allLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group languages by first letter
  const groupedLanguages = filteredLanguages.reduce((acc, lang) => {
    const firstLetter = lang.name[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(lang);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-8 px-6 text-center sticky top-0 z-10 shadow-lg">
        <div className="mb-4">
          <span className="text-6xl">🌾</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">KrishiSetu</h1>
        <p className="text-green-100">Choose your preferred language</p>
        <p className="text-green-200 text-sm mt-2">अपनी पसंदीदा भाषा चुनें • ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ</p>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Search language / भाषा खोजें / ಭಾಷೆ ಹುಡುಕಿ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-white"
            />
            <span className="absolute left-4 top-3 text-gray-400 text-xl">🔍</span>
          </div>
        </div>

        {/* Recent Languages */}
        {recentLanguages.length > 0 && !searchTerm && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
              <span className="mr-2">🕒</span> Recent / हाल ही में / ಇತ್ತೀಚಿನ
            </h2>
            <div className="flex flex-wrap gap-2">
              {recentLanguages.map(langCode => {
                const lang = getLanguageByCode(langCode);
                return lang && (
                  <button
                    key={langCode}
                    onClick={() => handleLanguageSelect(langCode)}
                    className="px-4 py-2 bg-white border border-green-300 rounded-full text-sm hover:bg-green-50 hover:border-green-500 transition-all"
                  >
                    {lang.flag} {lang.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Popular Languages Section */}
        {!searchTerm && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
              <span className="mr-2">⭐</span> Popular / लोकप्रिय / ಜನಪ್ರಿಯ
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {popularLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                    selectedLang === lang.code
                      ? 'border-green-500 bg-green-50 shadow-md scale-105'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-3xl mb-2">{lang.flag}</div>
                  <div className="font-semibold text-gray-800 text-sm">{lang.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{lang.nativeName}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* All Languages */}
        <div>
          <h2 className="text-sm font-semibold text-gray-600 mb-3 flex items-center">
            <span className="mr-2">🌐</span> All Languages / सभी भाषाएँ / ಎಲ್ಲಾ ಭಾಷೆಗಳು
          </h2>
          
          {searchTerm && (
            <div className="mb-3 text-sm text-gray-500">
              Found {filteredLanguages.length} languages
            </div>
          )}

          {/* Alphabetical grouping */}
          {Object.keys(groupedLanguages).sort().map(letter => (
            <div key={letter} className="mb-4">
              <div className="sticky top-24 bg-gray-100 rounded-lg px-3 py-1 mb-2 text-sm font-bold text-gray-600">
                {letter}
              </div>
              <div className="space-y-2">
                {groupedLanguages[letter].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                      selectedLang === lang.code
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl">{lang.flag}</div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">{lang.name}</h3>
                          <p className="text-sm text-gray-500">{lang.nativeName}</p>
                        </div>
                        {selectedLang === lang.code && (
                          <span className="text-green-500 text-2xl">✓</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{lang.region}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Language Preview */}
        {selectedLang && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Selected Language</p>
                <p className="font-bold text-green-700">
                  {getLanguageByCode(selectedLang)?.name} ({getLanguageByCode(selectedLang)?.nativeName})
                </p>
              </div>
              <button
                onClick={() => {
                  const lang = getLanguageByCode(selectedLang);
                  const confirmMsg = `Continue with ${lang?.name}?`;
                  if (window.confirm(confirmMsg)) {
                    localStorage.setItem('selectedLanguage', selectedLang);
                    localStorage.setItem('preferredLanguage', selectedLang);
                    setCurrentLanguage(selectedLang);
                    navigate('/role-selection');
                  }
                }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
              >
                Continue →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelection;