// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { 
  Menu, User, Bell, Sun, Cloud, Droplets, Wind,
  TrendingUp, Briefcase, Users, MessageCircle, 
  Sprout, Calendar, MapPin, LogOut, Leaf 
} from 'lucide-react';

// Import background images (you'll add these to assets folder)
import farmBanner from '../assets/images/farm-banner.jpg';
import weatherBg from '../assets/images/weather-bg.jpg';
import marketBg from '../assets/images/market-bg.jpg';
import labourBg from '../assets/images/labour-bg.jpg';
import communityBg from '../assets/images/community-bg.jpg';
import cropsBg from '../assets/images/crops-bg.jpg';
import aiBg from '../assets/images/ai-bg.jpg';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { language } = useApp();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [weather, setWeather] = useState(null);
  const [aiInsight, setAiInsight] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    setWeather({
      temp: 28,
      condition: 'Sunny',
      humidity: 65,
      wind: 12,
      icon: '☀️',
      forecast: { morning: 24, afternoon: 28, evening: 26 }
    });

    setAiInsight({
      message: 'Rice prices expected to rise by 8-10% in your district this week',
      crop: 'Rice',
      action: 'Consider selling in the next 3-5 days'
    });
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/language');
  };

  const features = [
    { id: 1, name: 'Market Prediction', icon: TrendingUp, path: '/market-prediction', color: 'from-emerald-600/90 to-emerald-800/90', bgImage: marketBg, desc: 'Crop prices & trends' },
    { id: 2, name: 'Post a Job', icon: Briefcase, path: '/post-job', color: 'from-blue-600/90 to-blue-800/90', bgImage: labourBg, desc: 'Hire labour nearby' },
    { id: 3, name: 'Find Work', icon: Users, path: '/find-jobs', color: 'from-amber-600/90 to-amber-800/90', bgImage: labourBg, desc: 'Available jobs near you' },
    { id: 4, name: 'Community', icon: MessageCircle, path: '/community-chat', color: 'from-purple-600/90 to-purple-800/90', bgImage: communityBg, desc: 'Chat with farmers' },
    { id: 5, name: 'My Crops', icon: Sprout, path: '/market-prediction', color: 'from-green-600/90 to-green-800/90', bgImage: cropsBg, desc: 'Track registered crops' },
    { id: 6, name: 'Labour Support', icon: Users, path: '/labour-support', color: 'from-orange-600/90 to-orange-800/90', bgImage: labourBg, desc: 'Find workers' },
    { id: 7, name: 'Weather', icon: Cloud, path: '/weather', color: 'from-cyan-600/90 to-cyan-800/90', bgImage: weatherBg, desc: 'Farming forecast' },
    { id: 8, name: 'Profile', icon: User, path: '/profile', color: 'from-gray-600/90 to-gray-800/90', bgImage: null, desc: 'Your account' }
  ];

  const marketSummary = [
    { crop: '🌾 Rice', price: '₹2,450', trend: '+8%', demand: 'High' },
    { crop: '🍅 Tomato', price: '₹1,850', trend: '+12%', demand: 'Very High' },
    { crop: '🧅 Onion', price: '₹1,650', trend: '-2%', demand: 'Medium' }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hamburger Menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-72 bg-white z-50 shadow-2xl overflow-y-auto">
            <div className="relative h-32 bg-gradient-to-r from-emerald-700 to-emerald-600">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user?.fullName || 'Farmer'}</p>
                    <p className="text-xs text-emerald-100">{user?.district || 'Mandya'}, {user?.state || 'Karnataka'}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-4">
              {features.map(feature => (
                <Link
                  key={feature.id}
                  to={feature.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-6 py-3 text-stone-700 hover:bg-emerald-50 transition"
                >
                  <feature.icon size={20} className="mr-3 text-emerald-600" />
                  <span>{feature.name}</span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-6 py-3 text-red-600 hover:bg-red-50 transition mt-4 border-t"
              >
                <LogOut size={20} className="mr-3" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Header with Farm Banner */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${farmBanner})` }}
      >
        <div className="px-5 pt-12 pb-8 relative z-10">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            <button onClick={() => setMenuOpen(true)} className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition">
              <Menu size={24} className="text-white" />
            </button>
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition">
                <Bell size={20} className="text-white" />
              </button>
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-white">{user?.fullName?.charAt(0) || 'R'}</span>
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div>
            <p className="text-emerald-100 text-sm">{greeting}</p>
            <h1 className="text-3xl font-bold text-white mt-1">{user?.fullName?.split(' ')[0] || 'Farmer'}</h1>
            <div className="flex items-center mt-2 text-emerald-100 text-sm">
              <MapPin size={14} className="mr-1" />
              <span>{user?.district || 'Mandya'}, {user?.state || 'Karnataka'}</span>
            </div>
          </div>

          {/* Weather Card with Background */}
          {weather && (
            <div 
              className="mt-6 rounded-2xl overflow-hidden relative"
              style={{ backgroundImage: `url(${weatherBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="bg-black/30 backdrop-blur-sm p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <span className="text-5xl">{weather.icon}</span>
                    <div>
                      <p className="text-3xl font-bold text-white">{weather.temp}°C</p>
                      <p className="text-sm text-white/90">{weather.condition}</p>
                    </div>
                  </div>
                  <div className="text-right text-white">
                    <div className="flex items-center text-sm">
                      <Droplets size={14} className="mr-1" />
                      <span>{weather.humidity}%</span>
                    </div>
                    <div className="flex items-center text-sm mt-1">
                      <Wind size={14} className="mr-1" />
                      <span>{weather.wind} km/h</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-3 pt-3 border-t border-white/20 text-white/90 text-sm">
                  <span>🌅 Morning {weather.forecast.morning}°</span>
                  <span>☀️ Afternoon {weather.forecast.afternoon}°</span>
                  <span>🌙 Evening {weather.forecast.evening}°</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 py-6 pb-24">
        {/* AI Insight Card with Background */}
        <div 
          className="relative rounded-2xl overflow-hidden mb-6"
          style={{ backgroundImage: `url(${aiBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="bg-gradient-to-r from-emerald-900/80 to-green-800/80 backdrop-blur-sm p-4">
            <div className="flex items-start space-x-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                <Leaf size={20} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-emerald-200 font-semibold">🌾 AI AGRICULTURE INSIGHT</p>
                <p className="text-white font-medium mt-1">{aiInsight?.message}</p>
                <p className="text-xs text-emerald-200 mt-2">💡 {aiInsight?.action}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Feature Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-stone-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-3">
            {features.slice(0, 4).map((feature) => (
              <Link key={feature.id} to={feature.path}>
                <div className={`bg-gradient-to-br ${feature.color} rounded-2xl p-3 text-center hover:scale-105 transition shadow-lg relative overflow-hidden`}>
                  {feature.bgImage && (
                    <div 
                      className="absolute inset-0 opacity-20 bg-cover bg-center"
                      style={{ backgroundImage: `url(${feature.bgImage})` }}
                    ></div>
                  )}
                  <div className="relative z-10">
                    <div className="text-white flex justify-center mb-2">
                      <feature.icon size={28} />
                    </div>
                    <p className="text-xs font-semibold text-white">{feature.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Market Summary Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-stone-800">Market Summary</h2>
            <Link to="/market-prediction" className="text-emerald-600 text-sm font-medium">View All →</Link>
          </div>
          <div className="space-y-3">
            {marketSummary.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border border-stone-100">
                <div>
                  <p className="font-semibold text-stone-800">{item.crop}</p>
                  <p className="text-xs text-stone-500">Demand: {item.demand}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-700">{item.price}</p>
                  <p className={`text-xs ${item.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {item.trend}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More Features Grid */}
        <div className="grid grid-cols-2 gap-3">
          {features.slice(4, 8).map((feature) => (
            <Link key={feature.id} to={feature.path}>
              <div className={`bg-gradient-to-br ${feature.color} rounded-xl p-4 shadow-lg hover:shadow-xl transition relative overflow-hidden`}>
                {feature.bgImage && (
                  <div 
                    className="absolute inset-0 opacity-20 bg-cover bg-center"
                    style={{ backgroundImage: `url(${feature.bgImage})` }}
                  ></div>
                )}
                <div className="relative z-10">
                  <div className="text-white mb-2">
                    <feature.icon size={24} />
                  </div>
                  <p className="font-semibold text-white text-sm">{feature.name}</p>
                  <p className="text-xs text-white/80 mt-1">{feature.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-stone-200 shadow-lg">
        <div className="flex justify-around py-2 max-w-md mx-auto">
          <Link to="/dashboard" className="flex flex-col items-center py-2 px-6 text-emerald-600">
            <Sprout size={22} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/market-prediction" className="flex flex-col items-center py-2 px-6 text-stone-400">
            <TrendingUp size={22} />
            <span className="text-xs mt-1">Market</span>
          </Link>
          <Link to="/community-chat" className="flex flex-col items-center py-2 px-6 text-stone-400">
            <MessageCircle size={22} />
            <span className="text-xs mt-1">Chat</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center py-2 px-6 text-stone-400">
            <User size={22} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;