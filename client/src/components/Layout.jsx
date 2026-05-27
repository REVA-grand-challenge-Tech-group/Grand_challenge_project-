import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BottomNav from './BottomNav';
import NavigationMenu from './NavigationMenu';
import EmergencySOS from './EmergencyButton';

const Layout = ({ children }) => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState('');

  React.useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-200"
      >
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Side Menu */}
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Welcome Section */}
      <div className="pt-16 px-4 pb-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <h1 className="text-2xl font-bold">
          {greeting}, {user?.fullName?.split(' ')[0] || user?.name || 'Farmer'}! 👋
        </h1>
        <p className="text-green-100 mt-1">Welcome to KrishiSetu</p>
      </div>

      {/* Main Content */}
      <main className="pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Emergency SOS Button */}
      <EmergencySOS />
    </div>
  );
};

export default Layout;