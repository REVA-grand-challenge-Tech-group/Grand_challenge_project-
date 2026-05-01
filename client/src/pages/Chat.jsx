import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Voice Input Component for Chat
const VoiceMessageInput = ({ onTranscript }) => {
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
      onTranscript(text);
      setIsListening(false);
    };
    recognitionInstance.onerror = () => setIsListening(false);
    recognitionInstance.onend = () => setIsListening(false);
    setRecognition(recognitionInstance);
  }, [onTranscript]);

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
      title="Speak your message"
    >
      {isListening ? '🎤 Listening...' : '🎤'}
    </button>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Ramesh (Farmer)', text: 'Need 5 workers for rice harvest', time: '10:30 AM', isMe: false, avatar: '👨‍🌾' },
    { id: 2, user: 'Suresh (Labour)', text: 'I am available for work', time: '10:32 AM', isMe: false, avatar: '👨‍🌾' },
    { id: 3, user: 'You', text: 'When can you start?', time: '10:33 AM', isMe: true, avatar: '👤' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { 
        id: Date.now(),
        user: 'You', 
        text: newMessage, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
        isMe: true,
        avatar: '👤'
      }]);
      setNewMessage('');
      setIsTyping(false);
      // Simulate reply after 2 seconds
      setTimeout(() => {
        const replies = [
          'Thanks for your message!',
          'I will get back to you soon.',
          'Can you share more details?',
          'I am interested in this work.'
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          user: 'Support (KrishiSetu)',
          text: randomReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: false,
          avatar: '🌾'
        }]);
      }, 2000);
    }
  };

  const handleVoiceMessage = (text) => {
    setNewMessage(text);
  };

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <div>
              <h1 className="text-xl font-bold">Community Chat</h1>
              <p className="text-xs text-green-200">Chat with farmers & labourers • 🎤 Voice supported</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-32">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start max-w-[75%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${msg.isMe ? 'bg-green-500 ml-2' : 'bg-gray-300 mr-2'}`}>
                  {msg.avatar}
                </div>
                <div className={`rounded-2xl p-3 ${msg.isMe ? 'bg-green-500 text-white rounded-br-none' : 'bg-white shadow rounded-bl-none'}`}>
                  <p className="text-xs opacity-75">{msg.user} • {msg.time}</p>
                  <p className="text-sm mt-1 break-words">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
          {typingUser && (
            <div className="flex justify-start">
              <div className="bg-gray-200 rounded-2xl px-4 py-2 text-sm text-gray-500 italic">
                {typingUser} is typing...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="max-w-2xl mx-auto p-3">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyUp={handleTyping}
              placeholder="Type a message or tap mic to speak..."
              className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
            />
            <VoiceMessageInput onTranscript={handleVoiceMessage} />
            <button type="submit" disabled={!newMessage.trim()} className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Send
            </button>
          </form>
          <p className="text-xs text-gray-400 text-center mt-2">💬 Real-time chat | 🎤 Tap mic to speak your message</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;