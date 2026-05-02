import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const VoiceInput = ({ onResult }) => {
  const { language } = useApp();  // Get selected language
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [supported, setSupported] = useState(true);

  // Map app language to speech recognition language
  const getSpeechLanguage = () => {
    switch(language) {
      case 'hi': return 'hi-IN';      // Hindi
      case 'kn': return 'kn-IN';      // Kannada
      default: return 'en-IN';        // English (Indian accent)
    }
  };

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSupported(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = false;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = getSpeechLanguage();  // Use selected language

    recognitionInstance.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      setIsListening(false);
    };

    recognitionInstance.onerror = () => setIsListening(false);
    recognitionInstance.onend = () => setIsListening(false);

    setRecognition(recognitionInstance);
  }, [language, onResult]); // Recreate when language changes

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

export default VoiceInput;