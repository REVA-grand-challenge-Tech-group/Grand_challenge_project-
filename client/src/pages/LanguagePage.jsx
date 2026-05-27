import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { Globe, ArrowRight, Mic, Volume2, ShieldCheck, HelpCircle } from 'lucide-react';

const LanguagePage = () => {
  const navigate = useNavigate();
  const { setLanguage } = useContext(LanguageContext) || {};
  const [selectedLang, setSelectedLang] = useState('en');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const languagesList = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', native: 'অসমೀয়া' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ಿଆ' },
    { code: 'ur', name: 'Urdu', native: 'اُردُو' },
    { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्' },
    { code: 'kok', name: 'Konkani', native: 'ಕೊಂಕಣಿ' },
    { code: 'mni', name: 'Manipuri', native: 'ಮಣಿಪುರಿ' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली' },
    { code: 'brx', name: 'Bodo', native: 'ಬೋಡೋ' },
    { code: 'doi', name: 'Dogri', native: 'ಡೋಗ್ರಿ' },
    { code: 'ks', name: 'Kashmiri', native: 'کٲशुर' },
    { code: 'mai', name: 'Maithili', native: 'मैथिली' },
    { code: 'sat', name: 'Santali', native: 'ಸಂತಾಲಿ' },
    { code: 'sd', name: 'Sindhi', native: 'ಸಿಂಧಿ' }
  ];

  const translations = {
    en: { title: "Select Language", subtitle: "Choose your preferred language for KrishiSetu ecosystem", dynamicNotice: "System records remain stored securely in English core database.", cta: "Continue Setup" },
    hi: { title: "भाषा चुनें", subtitle: "कृषिसेतु इकोसिस्टम के लिए अपनी पसंदीदा भाषा चुनें", dynamicNotice: "सिस्टम रिकॉर्ड अंग्रेजी कोर डेटाबेस में सुरक्षित रूप से संग्रहीत रहेंगे।", cta: "आगे बढ़ें" },
    kn: { title: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ", subtitle: "ಕೃಷಿಸೇತು ಪರಿಸರ ವ್ಯವಸ್ಥೆಗಾಗಿ ನಿಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯನ್ನು ಆರಿಸಿ", dynamicNotice: "ಸಿಸ್ಟಮ್ ದಾಖಲೆಗಳನ್ನು ಇಂಗ್ಲಿಷ್ ಕೋರ್ ಡೇಟಾಬೇಸ್‌ನಲ್ಲಿ ಸುರಕ್ಷಿತವಾಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.", cta: "ಮುಂದುವರಿಯಿರಿ" },
    te: { title: "ಭಾಷೆಯನ್ನು ಆಯ್ಕೆ ಮಾಡಿ", subtitle: "కృషిసేతు పర్యావరణ వ్యవస్థ కోసం మీ ప్రాధాన్యత భాషను ఎంచుకోండి", dynamicNotice: "సిస్టమ్ రికార్డులు ఇంగ్లీష్ కోర్ డేటాబేస్లో సురక్షితంగా ఉంటాయి.", cta: "కొనసాగించండి" }
  };

  const currentText = translations[selectedLang] || {
    title: "Select Language",
    subtitle: "Choose your preferred language for KrishiSetu ecosystem",
    dynamicNotice: "System data layers process natively in English parameters.",
    cta: "Continue Setup"
  };

  const handleLanguageConfirm = () => {
    localStorage.setItem('language', selectedLang);
    if (setLanguage) setLanguage(selectedLang);
    navigate('/select-role');
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center relative overflow-hidden font-sans p-4 md:p-8"
         style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background Graphic Fallback Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center"
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&q=80&w=1200")', position: 'absolute', inset: 0 }} />

      {/* Main Structural Card Container */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-200"
           style={{ backgroundColor: '#ffffff', borderRadius: '24px', display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '1000px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden' }}>
        
        {/* Left Side Aesthetic Info Bar */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-emerald-800 to-green-900 p-8 text-white flex flex-col justify-between"
             style={{ background: 'linear-gradient(135deg, #065f46 0%, #14532d 100%)', color: '#ffffff', padding: '32px', width: '35%' }}>
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> State Network Verified
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-2" style={{ fontSize: '28px', fontWeight: '900' }}>KrishiSetu</h2>
            <p className="text-emerald-100 text-xs leading-relaxed" style={{ fontSize: '13px', color: '#d1fae5', opacity: 0.9 }}>
              Bhashini Core localized dynamic gateway. Instantly map platform operations into native linguistic environments while retaining immutable dataset arrays in the central host parameters.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6 mt-8">
            <p className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">Infrastructure Architecture</p>
            <p className="text-[11px] text-emerald-100/70">Secure Handshake API • Dynamic Intercept Translation • Voice Engine Ready</p>
          </div>
        </div>

        {/* Right Side Options Matrix Grid */}
        <div className="flex-1 p-6 md:p-8 bg-slate-50 flex flex-col justify-between" style={{ padding: '32px', flex: 1, backgroundColor: '#f8fafc' }}>
          
          {/* Dashboard Header Component */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-6">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight" style={{ color: '#1e293b', fontSize: '24px', fontWeight: '900' }}>{currentText.title}</h1>
              <p className="text-xs font-medium text-slate-500 mt-0.5" style={{ color: '#64748b', fontSize: '12px' }}>{currentText.subtitle}</p>
            </div>
            
            {/* Audio Voice Control Utilities Panel */}
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => { setIsSpeaking(true); setTimeout(() => setIsSpeaking(false), 2000); }}
                className={`p-2.5 rounded-xl border transition-all ${isSpeaking ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                style={{ padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button 
                type="button"
                onClick={() => { setIsListening(true); setTimeout(() => setIsListening(false), 2000); }}
                className={`p-2.5 rounded-xl border transition-all ${isListening ? 'bg-red-100 text-red-700 border-red-300' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                style={{ padding: '10px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Interactive Selection Framework Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto pr-1 max-h-[340px]" 
               style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', maxHeight: '340px', overflowY: 'auto' }}>
            {languagesList.map((lang) => {
              const isSelected = selectedLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setSelectedLang(lang.code)}
                  className={`flex flex-col items-start p-3.5 rounded-xl border transition-all text-left group ${
                    isSelected ? 'border-emerald-600 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '14px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #047857' : '1px solid #e2e8f0',
                    backgroundColor: isSelected ? '#ecfdf5' : '#ffffff',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 group-hover:text-slate-500" style={{ fontSize: '10px', fontWeight: '700', color: isSelected ? '#047857' : '#94a3b8' }}>
                    {lang.name}
                  </span>
                  <span className="text-sm font-black text-slate-800 mt-1" style={{ fontSize: '14px', fontWeight: '900', color: '#1e293b', marginTop: '4px' }}>
                    {lang.native}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Form Action Dispatch Layout Area */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4"
               style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'between', alignItems: 'center' }}>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium max-w-sm" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle className="w-4 h-4 text-slate-300" style={{ color: '#cbd5e1' }} />
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>{currentText.dynamicNotice}</span>
            </div>
            
            <button
              type="button"
              onClick={handleLanguageConfirm}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              style={{
                backgroundColor: '#047857',
                color: '#ffffff',
                fontWeight: '700',
                padding: '12px 24px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <span>{currentText.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LanguagePage;