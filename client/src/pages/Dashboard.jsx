import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import WeatherWidget from '../components/WeatherWidget';
import EmergencyButton from '../components/EmergencyButton';

const Dashboard = () => {
  const { t, role } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    "🌱 Plant high-demand crops like Rice and Tomato this season",
    "💧 Use drip irrigation to save 70% water",
    "📊 Check market prices before selling your crops",
    "👥 Book labourers 2 days in advance for harvest season"
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning 🌅');
    else if (hour < 17) setGreeting('Good Afternoon ☀️');
    else setGreeting('Good Evening 🌙');
    
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const features = [
    { id: 1, title: t('market_prediction'), icon: '📈', desc: t('market_desc'), path: '/market-prediction', gradient: 'from-blue-500 to-blue-600', stat: '+28%' },
    { id: 2, title: t('labour_support'), icon: '👥', desc: t('labour_desc_farmer'), path: '/labour-support', gradient: 'from-orange-500 to-orange-600', stat: '15 workers' }
  ];

  const stats = [
    { label: t('active_farmers'), value: '1,284', icon: '🌾' },
    { label: t('available_labour'), value: '568', icon: '👨‍🌾' },
    { label: t('avg_price'), value: '₹2,450', icon: '💰' },
    { label: t('success_rate'), value: '94%', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><span className="text-xl">🌾</span></div>
              <div><h1 className="text-xl font-bold">{t('app_name')}</h1><p className="text-xs text-green-100">{greeting}, {user?.name}</p></div>
            </div>
            <button onClick={handleLogout} className="px-3 py-1.5 bg-white/20 rounded-lg text-sm hover:bg-white/30">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-4"><WeatherWidget /></div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white shadow-xl">
          <div className="flex justify-between items-center">
            <div><p className="text-green-100 text-sm">{t('good_to_see')}</p><h2 className="text-2xl font-bold mt-1">{user?.name}</h2><p className="text-green-100 text-sm mt-2">{t('ready_to_grow')}</p></div>
            <div className="text-7xl opacity-20">🌾</div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-3 mb-6 border border-amber-200">
          <div className="flex items-center space-x-2"><span className="text-xl">💡</span><p className="text-amber-800 text-sm font-medium">{tips[currentTip]}</p></div>
        </div>

        <div className="space-y-4 mb-8">
          {features.map((feature) => (
            <Link key={feature.id} to={feature.path}>
              <div className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-green-200">
                <div className="flex items-center">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>{feature.icon}</div>
                  <div className="flex-1 ml-4"><div className="flex justify-between items-center"><h3 className="font-bold text-gray-800 text-lg">{feature.title}</h3><span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{feature.stat}</span></div><p className="text-sm text-gray-500 mt-1">{feature.desc}</p></div>
                  <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-gray-600 mb-3">{t('live_dashboard')}</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start"><span className="text-2xl">{stat.icon}</span><span className="text-xs font-semibold text-green-600">+12%</span></div>
              <div className="mt-2"><div className="text-xl font-bold text-gray-800">{stat.value}</div><div className="text-xs text-gray-500 mt-1">{stat.label}</div></div>
            </div>
          ))}
        </div>
      </div>
      
      <EmergencyButton />
    </div>
  );
};

export default Dashboard;