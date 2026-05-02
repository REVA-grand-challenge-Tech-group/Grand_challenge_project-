import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

import LanguageSelector from './components/LanguageSelector';
import RoleSelector from './components/RoleSelector';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import MarketPrediction from './pages/MarketPrediction';
import LabourSupport from './pages/LabourSupport';
import Chat from './pages/Chat';
import PostJob from './pages/PostJob';
import FindJobs from './pages/FindJobs';
import MyJobs from './pages/MyJobs';
import MyApplications from './pages/MyApplications';
import EmergencyButton from './components/EmergencyButton';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  const language = localStorage.getItem('language');
  const role = localStorage.getItem('role');
  
  if (!language) return <Navigate to="/" replace />;
  if (!role) return <Navigate to="/role" replace />;
  if (!user) return <Navigate to="/login" replace />;
  
  return children;
};

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update online status when network changes
    const handleOnline = () => {
      console.log('🟢 Back online');
      setIsOnline(true);
    };
    
    const handleOffline = () => {
      console.log('🔴 Offline');
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check on mount
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Router>
      <AppProvider>
        <AuthProvider>
          <Toaster position="top-center" />
          
          {/* Offline Banner */}
          {!isOnline && (
            <div className="fixed top-0 left-0 right-0 bg-yellow-500 text-white text-center py-2 text-sm z-50 shadow-md">
              📴 You are offline. Some features may be limited. Connect to internet for live data.
            </div>
          )}
          
          <Routes>
            <Route path="/" element={<LanguageSelector />} />
            <Route path="/role" element={<RoleSelector />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/market-prediction" element={<ProtectedRoute><MarketPrediction /></ProtectedRoute>} />
            <Route path="/labour-support" element={<ProtectedRoute><LabourSupport /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
            <Route path="/find-jobs" element={<ProtectedRoute><FindJobs /></ProtectedRoute>} />
            <Route path="/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
            <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <EmergencyButton />
        </AuthProvider>
      </AppProvider>
    </Router>
  );
}

export default App;