import React, { useState } from 'react';
import { Tractor, Briefcase, UserCheck, Mic, Volume2, ArrowRight } from 'lucide-react';

const RoleSelector = ({ onNext }) => {
  const [role, setRole] = useState('BOTH');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Active translation dictionary fallback for dynamic display based on selected language
  const selectedLang = localStorage.getItem('language') || 'en';
  const labels = {
    en: { title: "Choose Your Profile", subtitle: "Select your operational configuration inside KrishiSetu", cta: "Confirm Selection" },
    kn: { title: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ", subtitle: "ಕೃಷಿಸೇತು ಒಳಗೆ ನಿಮ್ಮ ಕಾರ್ಯಾಚರಣೆಯ ಸಂರಚನೆಯನ್ನು ಆರಿಸಿ", cta: "ಆಯ್ಕೆಯನ್ನು ದೃಢೀಕರಿಸಿ" },
    hi: { title: "अपनी प्रोफ़ाइल चुनें", subtitle: "कृषिसेतु के भीतर अपने परिचालन विन्यास का चयन करें", cta: "चयन की पुष्टि करें" }
  }[selectedLang] || { title: "Choose Your Profile", subtitle: "Select your operational configuration inside KrishiSetu", cta: "Confirm Selection" };

  const handleConfirm = () => {
    const session = JSON.parse(localStorage.getItem('user')) || {};
    localStorage.setItem('user', JSON.stringify({ ...session, role }));
    onNext();
  };

  // Voice Command Trigger for Role Picker Simulation
  const triggerVoiceSTT = () => {
    setIsListening(true);
    console.log("🎤 Bhashini Speech-to-Text active on Role Selection node...");
    setTimeout(() => {
      setIsListening(false);
      // Simulating a voice recognition result: "Farmer" or "Both"
      console.log("🎙️ Voice command parser complete.");
    }, 2500);
  };

  const profiles = [
    { 
      code: 'FARMER', 
      label: selectedLang === 'kn' ? 'Farmer / ರೈತ' : 'Farmer / ರೈತ', 
      desc: 'Hire certified workforce pools, lease physical equipment bundles, and list bulk raw crops.', 
      icon: <Tractor className="w-6 h-6" />, 
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:border-emerald-300' 
    },
    { 
      code: 'LABOURER', 
      label: selectedLang === 'kn' ? 'Labourer / ಕಾರ್ಮಿಕ' : 'Labourer / ಕಾರ್ಮಿಕ', 
      desc: 'Discover proximity agricultural contract openings and secure immediate daily wage guarantees.', 
      icon: <Briefcase className="w-6 h-6" />, 
      bg: 'bg-green-50 text-green-700 border-green-100 hover:border-green-300' 
    },
    { 
      code: 'BOTH', 
      label: selectedLang === 'kn' ? 'Both Views / ಎರಡೂ' : 'Both Views / ಎರಡೂ', 
      desc: 'Acquire cross-functional administrative authorization to switch operator views dynamically.', 
      icon: <div className="flex gap-0.5"><Tractor className="w-4 h-4"/><Briefcase className="w-4 h-4"/></div>, 
      bg: 'bg-amber-50 text-amber-700 border-amber-100 hover:border-amber-300' 
    }
  ];

  return (
    <div className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 mx-auto font-sans animate-slide-up">
      
      {/* Header Module with Integrated Voice Controls */}
      <div className="flex justify-between items-start border-b border-slate-100 pb-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">{labels.title}</h1>
            <p className="text-xs font-medium text-slate-400 mt-0.5 leading-relaxed">{labels.subtitle}</p>
          </div>
        </div>

        {/* Dynamic Voice Panel Row */}
        <div className="flex gap-1.5 shrink-0">
          <button 
            type="button"
            onClick={() => { setIsSpeaking(true); setTimeout(() => setIsSpeaking(false), 2000); }}
            className={`p-2 rounded-lg border transition-all ${isSpeaking ? 'bg-amber-100 text-amber-800 border-amber-300 animate-pulse' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 shadow-sm'}`}
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <button 
            type="button"
            onClick={triggerVoiceSTT}
            className={`p-2 rounded-lg border transition-all ${isListening ? 'bg-red-100 text-red-700 border-red-300 animate-pulse' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 shadow-sm'}`}
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Selectable Blocks Container */}
      <div className="space-y-3.5">
        {profiles.map((item) => {
          const isSelected = role === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setRole(item.code)}
              className={`w-full flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group ${
                isSelected 
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-500/10' 
                  : 'border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm'
              }`}
            >
              <div className={`p-3 rounded-xl shrink-0 transition-colors ${item.bg}`}>
                {item.icon}
              </div>
              <div className="space-y-0.5">
                <h3 className={`font-extrabold text-sm tracking-tight ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                  {item.label}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium pr-4">
                  {item.desc}
                </p>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* Submit Action Button */}
      <button
        type="button"
        onClick={handleConfirm}
        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all mt-6 active:scale-98"
      >
        <span>{labels.cta}</span>
        <ArrowRight className="w-4 h-4" />
      </button>

    </div>
  );
};

export default RoleSelector;