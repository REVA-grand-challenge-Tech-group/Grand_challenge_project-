import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import LanguageSelector from './components/LanguageSelector';
import RoleSelector from './components/RoleSelector';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import MarketPrediction from './pages/MarketPrediction';
import LabourSupport from './pages/LabourSupport';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      <AppProvider>
        <AuthProvider>
          {!isOnline && (
            <div className="bg-yellow-500 text-white text-center py-2 text-sm sticky top-0 z-50">
              📴 You are offline. Some features may be limited.
            </div>
          )}
          <Routes>
            <Route path="/" element={<LanguageSelector />} />
            <Route path="/role" element={<RoleSelector />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/market-prediction" element={<ProtectedRoute><MarketPrediction /></ProtectedRoute>} />
            <Route path="/labour-support" element={<ProtectedRoute><LabourSupport /></ProtectedRoute>} />
          </Routes>
        </AuthProvider>
      </AppProvider>
    </Router>
  );
}

export default App;