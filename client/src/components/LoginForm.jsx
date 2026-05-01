import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

// Voice Input Component
const VoiceInput = ({ onResult }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [supported, setSupported] = useState(true);

  React.useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'hi-IN';
    recognitionInstance.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      setIsListening(false);
    };
    recognitionInstance.onerror = () => setIsListening(false);
    recognitionInstance.onend = () => setIsListening(false);
    setRecognition(recognitionInstance);
  }, [onResult]);

  const toggleListening = () => {
    if (!supported) {
      alert('Voice input not supported. Please use Chrome.');
      return;
    }
    if (recognition) {
      if (isListening) recognition.stop();
      else recognition.start();
      setIsListening(!isListening);
    }
  };

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`p-3 rounded-xl transition-all duration-200 ${
        isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
      }`}
      title="Tap to speak"
    >
      {isListening ? '🎤 Listening...' : '🎤'}
    </button>
  );
};

const LoginForm = () => {
  const { t, role } = useApp();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Validate phone - exactly 10 digits
  const validatePhone = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) {
      setPhoneError('');
      return cleaned;
    }
    if (cleaned.length < 10) {
      setPhoneError(`Need ${10 - cleaned.length} more digit(s)`);
    } else if (cleaned.length === 10) {
      setPhoneError('');
    } else if (cleaned.length > 10) {
      setPhoneError('Only 10 digits allowed');
      return cleaned.slice(0, 10);
    }
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value;
    const validated = validatePhone(rawValue);
    setPhone(validated);
  };

  const handleVoiceName = (text) => setName(text);
  
  const handleVoicePhone = (text) => {
    const numbers = text.replace(/\D/g, '');
    const cleaned = numbers.slice(0, 10);
    setPhone(cleaned);
    validatePhone(cleaned);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!phone || phone.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    login({ name: name.trim(), phone: `+91${phone}`, role });
    navigate('/dashboard');
  };

  const getRoleIcon = () => {
    if (role === 'farmer') return '🌾';
    if (role === 'labour') return '👨‍🌾';
    return '🤝';
  };

  const getRoleName = () => {
    if (role === 'farmer') return 'Farmer';
    if (role === 'labour') return 'Labourer';
    return 'Both';
  };

  const isFormValid = name.trim() !== '' && phone.length === 10;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg">
              <span className="text-4xl">{getRoleIcon()}</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">{t('welcome_back')}</h1>
          <p className="text-gray-500">
            {t('login_as')} <span className="font-semibold text-green-600">{getRoleName()}</span>
          </p>
          <p className="text-xs text-green-600 mt-1 flex items-center justify-center">
            <span className="mr-1">🎤</span> Tap mic button to speak
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('full_name')}
                <span className="text-xs text-gray-400 ml-2">(Tap mic to speak)</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                    placeholder={t('enter_name')}
                    required
                  />
                </div>
                <VoiceInput onResult={handleVoiceName} />
              </div>
            </div>
            
            {/* Phone Field with Voice */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('phone_number')}
                <span className="text-xs text-gray-400 ml-2">(10 digits, tap mic to speak numbers)</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-sm font-semibold text-gray-500">+91</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength="10"
                    className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                      phoneError && phone.length > 0
                        ? 'border-red-500 focus:ring-red-200'
                        : phone.length === 10
                        ? 'border-green-500 focus:ring-green-200'
                        : 'border-gray-200 focus:border-green-500 focus:ring-green-200'
                    }`}
                    placeholder="9876543210"
                    required
                  />
                </div>
                <VoiceInput onResult={handleVoicePhone} />
              </div>
              
              {/* Validation Messages */}
              {phone.length > 0 && (
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center">
                    {phone.length === 10 ? (
                      <>
                        <svg className="w-4 h-4 text-green-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-xs text-green-600">✓ Valid mobile number</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-orange-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-xs text-orange-600">{phoneError || `${phone.length}/10 digits`}</span>
                      </>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">Indian numbers only</span>
                </div>
              )}
            </div>
            
            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-600">{t('remember_me')}</span>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
                isFormValid
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 cursor-pointer transform hover:scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isFormValid ? t('continue') : `Enter ${10 - phone.length} more digits`}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-center text-xs text-gray-400">
              {t('demo_text')}
            </p>
            <p className="text-center text-xs text-gray-400 mt-1">
              📞 Example: 9876543210 (10 digits only)
            </p>
            <p className="text-center text-xs text-green-600 mt-2">
              🎤 Voice supported! Tap the mic button and speak in Hindi or English
            </p>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate('/role')}
          className="w-full mt-4 py-3 text-gray-500 text-sm hover:text-gray-700 transition-colors flex items-center justify-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('back_to_role')}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;