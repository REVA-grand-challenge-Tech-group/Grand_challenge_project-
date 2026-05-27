import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationMenu = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Role-based menu items
  const getMenuItems = () => {
    const commonItems = [
      { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
      { path: '/community-chat', label: 'Community Chat', icon: '💬' },
      { path: '/weather', label: 'Weather', icon: '🌤️' },
      { path: '/profile', label: 'Profile', icon: '👤' }
    ];

    const farmerItems = [
      { path: '/market-prediction', label: 'Market Prediction', icon: '📊' },
      { path: '/labour-support', label: 'Labour Support', icon: '👥' },
      { path: '/post-job', label: 'Post a Job', icon: '📝' }
    ];

    const labourerItems = [
      { path: '/find-jobs', label: 'Find Jobs', icon: '🔍' }
    ];

    let items = [...commonItems];

    if (user?.role === 'farmer') {
      items = [...items, ...farmerItems];
    } else if (user?.role === 'labourer') {
      items = [...items, ...labourerItems];
    } else if (user?.role === 'both') {
      items = [...items, ...farmerItems, ...labourerItems];
    }

    return items;
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Side Menu */}
      <div className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">KrishiSetu</h2>
            <button onClick={onClose} className="text-white hover:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl font-bold">
                {user?.fullName?.charAt(0) || user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div>
              <p className="font-semibold">{user?.fullName || user?.name || 'User'}</p>
              <p className="text-sm text-green-100 capitalize">{user?.role || 'Farmer'}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-4">
          {getMenuItems().map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={onClose}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-200 my-2"></div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <span className="text-xl mr-3">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;