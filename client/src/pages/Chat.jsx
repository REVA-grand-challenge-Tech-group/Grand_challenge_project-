import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Mic, Send, Users, Search, Phone, Video, Smile, MoreVertical, Volume2, VolumeX, User, MapPin, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';

const Chat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [onlineCount, setOnlineCount] = useState(128);
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Farmer profile images (using emoji avatars for demo - replace with actual images)
  const farmerProfiles = {
    'Ramesh Kumar': { avatar: '👨‍🌾', district: 'Mandya', color: 'bg-emerald-100' },
    'Suresh Hegde': { avatar: '👨‍🌾', district: 'Hassan', color: 'bg-blue-100' },
    'Lakshmi Bai': { avatar: '👩‍🌾', district: 'Mysore', color: 'bg-purple-100' },
    'Krishna Reddy': { avatar: '👨‍🌾', district: 'Belgaum', color: 'bg-amber-100' },
    'Gowthami': { avatar: '👩‍🌾', district: 'Hubli', color: 'bg-pink-100' }
  };

  // Demo community discussions
  const demoDiscussions = [
    {
      id: 1,
      farmerName: 'Ramesh Kumar',
      avatar: '👨‍🌾',
      district: 'Mandya',
      time: '10:30 AM',
      message: '🌾 Rice leaf disease increasing near Mandya. Any suggestions for organic pesticide?',
      likes: 12,
      comments: 5,
      category: 'crop',
      type: 'text'
    },
    {
      id: 2,
      farmerName: 'Suresh Hegde',
      avatar: '👨‍🌾',
      district: 'Hassan',
      time: '9:15 AM',
      message: '🍅 Tomato prices improved this week in Hassan market. Getting ₹1,850 per quintal!',
      likes: 28,
      comments: 8,
      category: 'market',
      type: 'text'
    },
    {
      id: 3,
      farmerName: 'Lakshmi Bai',
      avatar: '👩‍🌾',
      district: 'Mysore',
      time: 'Yesterday',
      message: '💧 Need 5 labourers for paddy harvesting in Mysore. Starting Monday. Contact me.',
      likes: 8,
      comments: 3,
      category: 'labour',
      type: 'text'
    },
    {
      id: 4,
      farmerName: 'Krishna Reddy',
      avatar: '👨‍🌾',
      district: 'Belgaum',
      time: 'Yesterday',
      message: '🌧️ Heavy rain expected next week in Belgaum. Prepare drainage systems.',
      likes: 45,
      comments: 12,
      category: 'weather',
      type: 'text'
    },
    {
      id: 5,
      farmerName: 'Gowthami',
      avatar: '👩‍🌾',
      district: 'Hubli',
      time: '2 days ago',
      message: '🥔 Best time to harvest potatoes in Hubli region? Need advice from experienced farmers.',
      likes: 6,
      comments: 4,
      category: 'crop',
      type: 'text'
    },
    {
      id: 6,
      farmerName: 'Ramesh Kumar',
      avatar: '👨‍🌾',
      district: 'Mandya',
      time: '2 days ago',
      message: '🎙️ Voice message: "Tomato crop looking good this season. Expecting good yield."',
      likes: 15,
      comments: 2,
      type: 'voice',
      voiceUrl: null
    }
  ];

  useEffect(() => {
    loadMessages();
    // Simulate online count changing
    const interval = setInterval(() => {
      setOnlineCount(Math.floor(Math.random() * 50) + 100);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterMessages();
  }, [searchTerm, activeFilter, messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = () => {
    const savedMessages = localStorage.getItem('communityMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
      setFilteredMessages(JSON.parse(savedMessages));
    } else {
      setMessages(demoDiscussions);
      setFilteredMessages(demoDiscussions);
      localStorage.setItem('communityMessages', JSON.stringify(demoDiscussions));
    }
  };

  const filterMessages = () => {
    let filtered = [...messages];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      filtered = filtered.filter(msg => msg.category === activeFilter);
    }
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(msg =>
        msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.district.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredMessages(filtered);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Voice search input
  const startVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    
    setVoiceActive(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setVoiceActive(false);
    };
    
    recognition.onerror = () => {
      setVoiceActive(false);
    };
    
    recognition.start();
  };

  // Voice message recording
  const startVoiceRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];
        
        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setVoiceMessage(audioUrl);
        };
        
        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch(err => console.error('Microphone error:', err));
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const sendVoiceMessage = () => {
    if (voiceMessage) {
      const newMsg = {
        id: Date.now(),
        farmerName: user?.fullName || 'You',
        avatar: '👤',
        district: user?.district || 'Unknown',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        message: '🎙️ Voice message',
        type: 'voice',
        voiceUrl: voiceMessage,
        likes: 0,
        comments: 0,
        category: 'general'
      };
      
      const updatedMessages = [newMsg, ...messages];
      setMessages(updatedMessages);
      localStorage.setItem('communityMessages', JSON.stringify(updatedMessages));
      setVoiceMessage(null);
    }
  };

  const sendTextMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      farmerName: user?.fullName || 'You',
      avatar: '👤',
      district: user?.district || 'Unknown',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      message: newMessage,
      type: 'text',
      likes: 0,
      comments: 0,
      category: 'general'
    };
    
    const updatedMessages = [newMsg, ...messages];
    setMessages(updatedMessages);
    localStorage.setItem('communityMessages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const handleLike = (id) => {
    const updatedMessages = messages.map(msg =>
      msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('communityMessages', JSON.stringify(updatedMessages));
  };

  const filters = [
    { id: 'all', label: 'All', icon: '🌐' },
    { id: 'crop', label: 'Crops', icon: '🌾' },
    { id: 'market', label: 'Market', icon: '📈' },
    { id: 'labour', label: 'Labour', icon: '👥' },
    { id: 'weather', label: 'Weather', icon: '🌤️' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <button onClick={() => navigate('/dashboard')} className="hover:opacity-80">
            <ArrowLeft size={20} />
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold">Community Chat</h1>
            <p className="text-xs text-emerald-100">
              <Users size={12} className="inline mr-1" />
              {onlineCount} farmers active
            </p>
          </div>
          <button className="hover:opacity-80">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar with Voice */}
      <div className="sticky top-28 z-10 bg-stone-50 px-5 pt-4 pb-2">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search discussions, farmers, or topics..."
            className="w-full pl-10 pr-12 p-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={startVoiceSearch}
            className={`absolute right-3 top-2 p-2 rounded-full transition ${voiceActive ? 'bg-red-500 text-white animate-pulse' : 'text-emerald-600'}`}
          >
            <Mic size={18} />
          </button>
        </div>
        {voiceActive && (
          <p className="text-xs text-emerald-600 mt-2 text-center animate-pulse">
            🎤 Listening... Speak crop name, farmer name, or district
          </p>
        )}
      </div>

      {/* Filter Chips */}
      <div className="px-5 py-3 overflow-x-auto">
        <div className="flex space-x-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                activeFilter === filter.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-stone-600 border border-stone-200'
              }`}
            >
              <span className="mr-1">{filter.icon}</span>
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions Feed */}
      <div className="flex-1 overflow-y-auto px-5 pb-24 space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-stone-500">No discussions found</p>
            <p className="text-xs text-stone-400 mt-1">Be the first to start a discussion!</p>
          </div>
        ) : (
          filteredMessages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-xl shadow-sm border border-stone-100 p-4">
              <div className="flex space-x-3">
                {/* Farmer Avatar */}
                <div className={`w-12 h-12 rounded-full ${farmerProfiles[msg.farmerName]?.color || 'bg-emerald-100'} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {farmerProfiles[msg.farmerName]?.avatar || msg.avatar || '👨‍🌾'}
                </div>
                
                <div className="flex-1">
                  {/* Farmer Info */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-stone-800">{msg.farmerName}</h3>
                      <div className="flex items-center text-xs text-stone-400 mt-0.5">
                        <MapPin size={12} className="mr-1" />
                        <span>{msg.district}</span>
                        <span className="mx-2">•</span>
                        <span>{msg.time}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Message Content */}
                  <div className="mt-2">
                    {msg.type === 'voice' ? (
                      <div className="flex items-center space-x-3 bg-stone-50 p-2 rounded-lg">
                        <button className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                          <Volume2 size={16} className="text-white" />
                        </button>
                        <span className="text-sm text-stone-600">Voice message (0:24)</span>
                        <span className="text-xs text-stone-400">🎙️</span>
                      </div>
                    ) : (
                      <p className="text-stone-700 text-sm leading-relaxed">{msg.message}</p>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-4 mt-3 pt-2">
                    <button 
                      onClick={() => handleLike(msg.id)}
                      className="flex items-center space-x-1 text-stone-400 hover:text-emerald-600 transition"
                    >
                      <ThumbsUp size={14} />
                      <span className="text-xs">{msg.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-stone-400 hover:text-emerald-600 transition">
                      <MessageCircle size={14} />
                      <span className="text-xs">{msg.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-stone-400 hover:text-emerald-600 transition">
                      <Share2 size={14} />
                      <span className="text-xs">Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Voice Message Preview */}
      {voiceMessage && (
        <div className="fixed bottom-20 left-4 right-4 bg-white rounded-xl shadow-lg p-3 flex items-center justify-between border border-emerald-200 z-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
              <Volume2 size={16} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-stone-700">Voice message ready</p>
              <p className="text-xs text-stone-400">Tap send to share with community</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setVoiceMessage(null)}
              className="px-3 py-1.5 text-stone-500 text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={sendVoiceMessage}
              className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Message Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-3 shadow-lg">
        <div className="flex items-center space-x-2 max-w-2xl mx-auto">
          <button
            onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
            className={`p-3 rounded-full transition ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-emerald-100 text-emerald-600'
            }`}
          >
            <Mic size={20} />
          </button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendTextMessage()}
            placeholder={isRecording ? "Recording voice message..." : "Share farming tips, ask questions..."}
            disabled={isRecording}
            className="flex-1 p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
          />
          
          <button
            onClick={sendTextMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-emerald-600 rounded-xl text-white hover:bg-emerald-700 transition disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
        {isRecording && (
          <p className="text-xs text-red-500 text-center mt-2 animate-pulse">
            🔴 Recording voice message... Click mic again to stop
          </p>
        )}
      </div>
    </div>
  );
};

export default Chat;