// client/src/pages/RegistrationPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { indiaData } from '../utils/indiaData';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { currentLanguage, t } = useContext(LanguageContext);

  // Safely pull chosen role from onboarding storage
  const storedRole = localStorage.getItem('krishiSetu_role') || 'Farmer';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    district: ''
  });

  const [districts, setDistricts] = useState([]);
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState({ name: false, phone: false });

  // Dynamically update the district dropdown array when state selection shifts
  useEffect(() => {
    if (formData.state) {
      setDistricts(indiaData[formData.state] || []);
      setFormData(prev => ({ ...prev, district: '' })); // Clear previous district pick
    } else {
      setDistricts([]);
    }
  }, [formData.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Numbers-only restriction for the input phone field
    if (name === 'phone' && value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Local Web Speech Fallback Engine for Voice Triggers
  const handleVoiceInput = (field) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice speech recognition is not supported in this browser version.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = currentLanguage === 'kn' ? 'kn-IN' : currentLanguage === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(prev => ({ ...prev, [field]: true }));
    };

    recognition.onresult = (event) => {
      let speechToText = event.results[0][0].transcript;
      
      if (field === 'phone') {
        speechToText = speechToText.replace(/\s+/g, ''); // Strip space gaps out
        if (!/^\d+$/.test(speechToText)) return;
      }

      setFormData(prev => ({ ...prev, [field]: speechToText }));
    };

    recognition.onerror = () => {
      setIsListening(prev => ({ ...prev, [field]: false }));
    };

    recognition.onend = () => {
      setIsListening(prev => ({ ...prev, [field]: false }));
    };

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Strict validation rules
    if (!formData.name.trim()) {
      setError('Full Name field cannot be submitted blank.');
      return;
    }
    if (formData.phone.length !== 10) {
      setError('Phone number must contain exactly 10 structural digits.');
      return;
    }
    if (!formData.state || !formData.district) {
      setError('Please select both your State and District location choices.');
      return;
    }

    const payload = {
      language: currentLanguage,
      role: storedRole,
      name: formData.name,
      phone: formData.phone,
      state: formData.state,
      district: formData.district
    };

    try {
      const response = await fetch('http://localhost:5001/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('krishiSetu_registered', 'true');
        localStorage.setItem('user_session', JSON.stringify(data.user));
        
        // Push directly to main hub layout dashboard
        navigate('/dashboard', { replace: true });
      } else {
        setError(data.error || 'Server registration transaction failed.');
      }
    } catch (err) {
      setError('Cannot link with the server. Ensure your backend node process is running.');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-emerald-100 p-6 md:p-8">
        <h2 className="text-2xl font-black text-emerald-950 tracking-tight">Create Profile</h2>
        <p className="text-sm font-medium text-emerald-800 mt-1 mb-6">Complete your registration to access the KrishiSetu market tools.</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input with Microphone Icon */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
            <div className="relative flex items-center">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 pr-12"
              />
              <button
                type="button"
                onClick={() => handleVoiceInput('name')}
                className={`absolute right-2 p-2 rounded-lg transition-colors ${isListening.name ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                🎙️
              </button>
            </div>
          </div>

          {/* Phone Input with固定 length check */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
            <div className="relative flex items-center">
              <input
                type="text"
                name="phone"
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 pr-12"
              />
              <button
                type="button"
                onClick={() => handleVoiceInput('phone')}
                className={`absolute right-2 p-2 rounded-lg transition-colors ${isListening.phone ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                🎙️
              </button>
            </div>
          </div>

          {/* State Dropdown Component */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 appearance-none"
            >
              <option value="">-- Choose State --</option>
              {Object.keys(indiaData).map(stateName => (
                <option key={stateName} value={stateName}>{stateName}</option>
              ))}
            </select>
          </div>

          {/* District Cascade Dropdown Component */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">District</label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              disabled={!formData.state}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 appearance-none disabled:opacity-50"
            >
              <option value="">-- Choose District --</option>
              {districts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Navigation Action Buttons footer block */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/role-selection')}
              className="w-1/3 py-3 border border-slate-200 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              {t('backBtn') || 'Back'}
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-emerald-700 text-white rounded-xl font-bold text-sm hover:bg-emerald-800 shadow-lg shadow-emerald-700/10 transition-colors"
            >
              {t('continueBtn') || 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;