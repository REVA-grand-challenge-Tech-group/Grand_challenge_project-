import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { UserPlus, Phone, MapPin, ArrowRight, Mic, Info } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext) || {};

  // Form Fields State Arrays
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedState, setSelectedState] = useState('Karnataka');
  const [district, setDistrict] = useState('Mysuru');
  const [validationError, setValidationError] = useState('');

  // Microphone Recognition State Management
  const [activeSpeechField, setActiveSpeechField] = useState(null); // 'name' | 'phone' | null
  const [recognition, setRecognition] = useState(null);

  const selectedLang = localStorage.getItem('language') || 'en';

  // State-to-District Mapping Dataset Array
  const locationData = {
    Karnataka: ['Mysuru', 'Mandya', 'Bengaluru', 'Belagavi', 'Tumakuru', 'Raichur', 'Kalaburagi', 'Chassan', 'Shivamogga'],
    'Andhra Pradesh': ['Anantapur', 'Chittoor', 'Guntur', 'Kurnool', 'Nellore', 'Prakasam', 'Visakhapatnam', 'Krishna'],
    'Tamil Nadu': ['Coimbatore', 'Erode', 'Madurai', 'Salem', 'Thanjavur', 'Tiruchirappalli', 'Vellore', 'Dharmapuri'],
    'Telangana': ['Hyderabad', 'Nalgonda', 'Khammam', 'Warangal', 'Karimnagar', 'Mahabubnagar', 'Nizamabad'],
    'Kerala': ['Palakkad', 'Alappuzha', 'Idukki', 'Wayanad', 'Thrissur', 'Kottayam', 'Kozhikode']
  };

  // Automatically reset default selected district when the state changes
  useEffect(() => {
    if (locationData[selectedState]) {
      setDistrict(locationData[selectedState][0]);
    }
  }, [selectedState]);

  const strings = {
    en: { header: "Complete Profile", desc: "Establish your identity parameters inside KrishiSetu.", labelName: "Full Name / ಪೂರ್ಣ ಹೆಸರು", labelPhone: "Mobile Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", labelState: "State / ರಾಜ್ಯ", labelDistrict: "District / ಜಿಲ್ಲೆ", cta: "Register & Access Core System", error10Digits: "Mobile number must be exactly 10 digits!" },
    kn: { header: "ಪ್ರೊಫೈಲ್ ಪೂರ್ಣಗೊಳಿಸಿ", desc: "ನಿಮ್ಮ ಕೃಷಿಸೇತು ನೆಟ್‌ವರ್ಕ್ ಖಾತೆಯನ್ನು ಸಿಸ್ಟಮ್‌ನೊಂದಿಗೆ ಸಿಂಕ್ ಮಾಡಿ.", labelName: "ಪೂರ್ಣ ಹೆಸರು", labelPhone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", labelState: "ರಾಜ್ಯ", labelDistrict: "ಜಿಲ್ಲೆ", cta: "ನೋಂದಾಯಿಸಿ ಮತ್ತು ಮುಂದುವರಿಯಿರಿ", error10Digits: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯು ಕರಾರುವಕ್ಕಾಗಿ 10 ಅಂಕಿಗಳಿರಬೇಕು!" }
  }[selectedLang] || { header: "Complete Profile", desc: "Establish your identity parameters.", labelName: "Full Name / ಪೂರ್ಣ ಹೆಸರು", labelPhone: "Mobile Number / ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", labelState: "State / ರಾಜ್ಯ", labelDistrict: "District / ಜಿಲ್ಲೆ", cta: "Register & Access Core System", error10Digits: "Mobile number must be exactly 10 digits!" };

  // Initialize Native Hardware Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = selectedLang === 'kn' ? 'kn-IN' : 'en-IN';
      setRecognition(recognitionInstance);
    }
  }, [selectedLang]);

  // 🛑 FILTER INPUT: Strict keyboard input interceptor (Strips letters, cuts off at 10)
  const handlePhoneChange = (e) => {
    const cleanedDigits = e.target.value.replace(/\D/g, ''); // Erase anything that isn't a number
    if (cleanedDigits.length <= 10) {
      setPhone(cleanedDigits);
      if (cleanedDigits.length === 10) {
        setValidationError(''); // Auto-clear error the moment they type exactly 10 numbers
      }
    }
  };

  // Handle Hardware Audio Stream Capture
  const triggerFieldVoiceCapture = (targetField) => {
    if (!recognition) {
      alert("Voice engine is not initialized on this browser engine container.");
      return;
    }

    if (activeSpeechField === targetField) {
      recognition.stop();
      setActiveSpeechField(null);
      return;
    }

    setActiveSpeechField(targetField);

    recognition.onresult = (event) => {
      const voiceTranscriptResult = event.results[0][0].transcript;
      console.log(`📡 Stream result parsed [${targetField}]: "${voiceTranscriptResult}"`);

      if (targetField === 'name') {
        setName(voiceTranscriptResult);
      } else if (targetField === 'phone') {
        // 🔥 AUDIO FILTER: Strip out extra spaces, drop text letters, and slice down to the first 10 digits
        const cleanedPhoneNumber = voiceTranscriptResult.replace(/\s+/g, '').replace(/\D/g, '').slice(0, 10);
        setPhone(cleanedPhoneNumber);
        
        if (cleanedPhoneNumber.length !== 10) {
          setValidationError(strings.error10Digits);
        } else {
          setValidationError('');
        }
      }
    };

    recognition.onend = () => {
      setActiveSpeechField(null);
    };

    recognition.onerror = (err) => {
      console.error("🔴 Speech Processing Error:", err);
      setActiveSpeechField(null);
    };

    try {
      recognition.start();
    } catch (e) {
      recognition.stop();
      setActiveSpeechField(null);
    }
  };

  // 🔐 VALIDATION SUBMIT BLOCKER
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Catch if the phone state isn't exactly 10 numbers before sending to API
    if (phone.length !== 10) {
      setValidationError(strings.error10Digits);
      return;
    }

    setValidationError('');

    const savedSession = JSON.parse(localStorage.getItem('user')) || {};
    const selectedRole = savedSession.role || 'BOTH';

    const payload = {
      name,
      phone,
      state: selectedState,
      district,
      role: selectedRole,
      language: selectedLang
    };

    try {
      const response = await api.post('/auth/register', payload);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (setUser) setUser(response.data.user);
        navigate('/dashboard');
      }
    } catch (err) {
      alert("Registration submission execution failed. Verify endpoint clusters.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 flex items-center justify-center p-4 font-sans relative">
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-10 mix-blend-luminosity"
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200")' }} />

      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-slate-100 z-10 animate-slide-up">
        
        {/* Title Module */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-emerald-700 shadow-sm">
            <UserPlus className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-tight">{strings.header}</h2>
          <p className="text-xs font-semibold text-slate-400 mt-0.5 max-w-xs mx-auto leading-relaxed">{strings.desc}</p>
        </div>

        {/* Form Element */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Input 1: Name Input with Mic Control */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{strings.labelName}</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400"><UserPlus className="w-4 h-4"/></span>
              <input 
                type="text" required placeholder={activeSpeechField === 'name' ? 'Listening closely... Speak now!' : 'Type or click mic...'} value={name} 
                onChange={(e) => setName(e.target.value)} 
                className={`w-full text-xs pl-10 pr-12 py-3 rounded-xl border font-semibold text-slate-800 transition-colors bg-white focus:outline-none ${activeSpeechField === 'name' ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10' : 'border-slate-200 focus:border-emerald-600'}`}
              />
              <button
                type="button"
                onClick={() => triggerFieldVoiceCapture('name')}
                className={`absolute right-2 p-2 rounded-lg transition-all ${activeSpeechField === 'name' ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Input 2: Mobile Number with Mic Control & Custom Error Interceptor */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{strings.labelPhone}</label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-slate-400"><Phone className="w-4 h-4"/></span>
              <input 
                type="tel" 
                required 
                maxLength={10}
                placeholder={activeSpeechField === 'phone' ? 'Listening for numbers...' : 'e.g., 9876543210'} 
                value={phone} 
                onChange={handlePhoneChange} 
                className={`w-full text-xs pl-10 pr-12 py-3 rounded-xl border font-semibold text-slate-800 transition-colors bg-white focus:outline-none ${activeSpeechField === 'phone' ? 'border-red-500 ring-2 ring-red-100 bg-red-50/10' : validationError ? 'border-rose-400 ring-2 ring-rose-50' : 'border-slate-200 focus:border-emerald-600'}`}
              />
              <button
                type="button"
                onClick={() => triggerFieldVoiceCapture('phone')}
                className={`absolute right-2 p-2 rounded-lg transition-all ${activeSpeechField === 'phone' ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Live Error Notification Wrapper */}
            {validationError && (
              <p className="text-[11px] font-bold text-rose-500 mt-1.5 px-1 animate-pulse">
                ⚠️ {validationError}
              </p>
            )}
          </div>

          {/* Input 3: Dynamic State Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{strings.labelState}</label>
            <div className="relative">
              <select 
                value={selectedState} onChange={(e) => setSelectedState(e.target.value)}
                className="w-full text-xs px-3.5 py-3 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:outline-none focus:border-emerald-600 shadow-sm appearance-none cursor-pointer"
              >
                {Object.keys(locationData).map((stateName) => (
                  <option key={stateName} value={stateName}>{stateName}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Input 4: Dynamic Cascading District Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">{strings.labelDistrict}</label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-400"><MapPin className="w-4 h-4" /></span>
              <select 
                value={district} onChange={(e) => setDistrict(e.target.value)} 
                className="w-full text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-emerald-600 font-bold text-slate-800 appearance-none cursor-pointer shadow-sm"
              >
                {locationData[selectedState]?.map((dist) => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Information Block */}
          <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              <strong>Cascading Region Mapping Active:</strong> District selections are contextually populated depending on state selections automatically.
            </p>
          </div>

          {/* Submit Action */}
          <button 
            type="submit" 
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md mt-6 transition-all active:scale-95"
          >
            <span>{strings.cta}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;