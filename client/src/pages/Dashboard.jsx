import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { t, role } = useApp();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    t('tip1'), t('tip2'), t('tip3'), t('tip4')
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t('good_morning') || 'Good Morning 🌅');
    else if (hour < 17) setGreeting(t('good_afternoon') || 'Good Afternoon ☀️');
    else setGreeting(t('good_evening') || 'Good Evening 🌙');
    
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const showJobFeatures = role === 'farmer' || role === 'both';
  const showWorkFeatures = role === 'labour' || role === 'both';

  const mainFeatures = [
    { id: 1, title: t('market_prediction'), icon: '📈', color: 'from-blue-500 to-blue-600', path: '/market-prediction', desc: 'Real-time crop prices & trends' },
    { id: 2, title: t('labour_support'), icon: '👥', color: 'from-orange-500 to-orange-600', path: '/labour-support', desc: 'Find workers or jobs near you' },
    { id: 3, title: t('community_chat'), icon: '💬', color: 'from-purple-500 to-pink-500', path: '/chat', desc: 'Chat with farmers & labourers' },
  ];

  const jobFeatures = [];
  if (showJobFeatures) {
    jobFeatures.push({ id: 4, title: t('post_job'), icon: '📝', color: 'from-teal-500 to-teal-600', path: '/post-job', desc: 'Hire workers for your farm' });
    jobFeatures.push({ id: 5, title: t('my_jobs'), icon: '📋', color: 'from-indigo-500 to-indigo-600', path: '/my-jobs', desc: 'View your posted jobs' });
  }
  if (showWorkFeatures) {
    jobFeatures.push({ id: 6, title: t('find_work'), icon: '🔍', color: 'from-cyan-500 to-cyan-600', path: '/find-jobs', desc: 'Available jobs near you' });
    jobFeatures.push({ id: 7, title: t('my_applications'), icon: '📝', color: 'from-rose-500 to-rose-600', path: '/my-applications', desc: 'Track your job applications' });
  }

  const allFeatures = [...mainFeatures, ...jobFeatures];

  const stats = [
    { label: t('active_farmers'), value: '1,284', change: '+12%', icon: '🌾', color: 'text-green-600' },
    { label: t('available_labour'), value: '568', change: '+8%', icon: '👨‍🌾', color: 'text-blue-600' },
    { label: t('avg_price'), value: '₹2,450', change: '+5%', icon: '💰', color: 'text-yellow-600' },
    { label: 'Jobs Posted', value: '47', change: '+15%', icon: '📋', color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                <span className="text-xl">🌾</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">{t('app_name')}</h1>
                <p className="text-xs text-green-100">{greeting}, {user?.name || 'Farmer'}!</p>
              </div>
            </div>
            <button onClick={handleLogout} className="px-3 py-1.5 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition-all">
              {t('logout')}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white shadow-xl transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-green-100 text-sm">{t('good_to_see')}</p>
              <h2 className="text-2xl font-bold mt-1">{user?.name || 'Farmer'}</h2>
              <p className="text-green-100 text-sm mt-2">{t('ready_to_grow')}</p>
            </div>
            <div className="text-7xl opacity-20">🌾</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">📊 {t('market_active')}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">🤝 {t('labour_available')}</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs">💬 Live Chat</span>
          </div>
        </div>

        {/* Rotating Tips */}
        <div className="bg-amber-50 rounded-xl p-3 mb-6 border border-amber-200 animate-pulse">
          <div className="flex items-center space-x-2">
            <span className="text-xl">💡</span>
            <p className="text-amber-800 text-sm font-medium flex-1">{tips[currentTip]}</p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="space-y-4 mb-8">
          {allFeatures.map((feature) => (
            <Link key={feature.id} to={feature.path}>
              <div className="group bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:scale-[1.02]">
                <div className="flex items-center">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1 ml-4">
                    <h3 className="font-bold text-gray-800 text-lg">{feature.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{feature.desc}</p>
                  </div>
                  <div className="text-gray-400 group-hover:translate-x-1 transition-transform">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <h3 className="text-sm font-semibold text-gray-600 mb-3">{t('live_dashboard')}</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-xs font-semibold text-green-600">{stat.change}</span>
              </div>
              <div className="mt-2">
                <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
            <span className="text-green-600 text-lg mr-2">✓</span>
            <span className="text-sm text-gray-600">{t('trusted_by')}</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg max-w-2xl mx-auto">
        <div className="flex justify-around py-2">
          <button className="flex flex-col items-center py-2 px-6 text-green-600 relative">
            <div className="absolute -top-2 w-12 h-1 bg-green-500 rounded-full"></div>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-xs mt-1">{t('home')}</span>
          </button>
          <button className="flex flex-col items-center py-2 px-6 text-gray-400 hover:text-green-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs mt-1">{t('profile')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;