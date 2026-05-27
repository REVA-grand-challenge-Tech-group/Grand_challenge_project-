import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
  const location = useLocation();
  const { user } = useAuth();

  const getNavItems = () => {
    const commonItems = [
      { path: '/dashboard', icon: '🏠', label: 'Home' },
      { path: '/community-chat', icon: '💬', label: 'Chat' },
      { path: '/profile', icon: '👤', label: 'Profile' }
    ];

    if (user?.role === 'farmer') {
      return [
        { path: '/dashboard', icon: '🏠', label: 'Home' },
        { path: '/market-prediction', icon: '📊', label: 'Market' },
        { path: '/post-job', icon: '📝', label: 'Post' },
        { path: '/community-chat', icon: '💬', label: 'Chat' },
        { path: '/profile', icon: '👤', label: 'Profile' }
      ];
    } else if (user?.role === 'labourer') {
      return [
        { path: '/dashboard', icon: '🏠', label: 'Home' },
        { path: '/find-jobs', icon: '🔍', label: 'Find' },
        { path: '/community-chat', icon: '💬', label: 'Chat' },
        { path: '/profile', icon: '👤', label: 'Profile' }
      ];
    } else {
      return [
        { path: '/dashboard', icon: '🏠', label: 'Home' },
        { path: '/market-prediction', icon: '📊', label: 'Market' },
        { path: '/find-jobs', icon: '🔍', label: 'Jobs' },
        { path: '/community-chat', icon: '💬', label: 'Chat' },
        { path: '/profile', icon: '👤', label: 'Profile' }
      ];
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-40">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {getNavItems().map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 ${
              location.pathname === item.path
                ? 'text-green-600 bg-green-50'
                : 'text-gray-600 hover:text-green-500'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;