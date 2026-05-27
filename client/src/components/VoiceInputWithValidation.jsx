import React, { useState } from 'react';

const VoiceInputWithValidation = ({ onTranscript, fieldType, language }) => {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    setIsListening(true);
    setError('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'hindi' ? 'hi-IN' : language === 'kannada' ? 'kn-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      
      // Validate based on field type
      let isValid = false;
      let processedText = transcript;
      
      if (fieldType === 'phone') {
        // Extract numbers only
        const numbers = transcript.replace(/\D/g, '');
        if (numbers.length === 10) {
          isValid = true;
          processedText = numbers;
        } else {
          setError('Please speak a valid 10-digit phone number');
        }
      } else if (fieldType === 'name') {
        // Name should contain at least 2 letters
        const letters = transcript.replace(/[^a-zA-Z\s]/g, '');
        if (letters.length >= 2) {
          isValid = true;
          processedText = letters.trim();
        } else {
          setError('Please speak a valid name');
        }
      } else {
        isValid = true;
      }
      
      if (isValid && onTranscript) {
        onTranscript(processedText);
      }
      
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError('Could not recognize voice. Please try again.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={startListening}
        disabled={isListening}
        className={`p-3 rounded-lg transition-all duration-200 ${
          isListening 
            ? 'bg-red-500 animate-pulse' 
            : 'bg-green-500 hover:bg-green-600'
        } text-white`}
        title="Voice input"
      >
        {isListening ? '⏺️' : '🎤'}
      </button>
      {error && (
        <div className="absolute top-full mt-1 right-0 bg-red-100 text-red-700 text-xs p-1 rounded whitespace-nowrap">
          {error}
        </div>
      )}
    </div>
  );
};

export default VoiceInputWithValidation;