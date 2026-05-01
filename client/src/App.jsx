import React from 'react';
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

// Protected Route - checks if user is logged in
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

// Onboarding Route - checks if language and role are selected
const OnboardingRoute = ({ children }) => {
  const language = localStorage.getItem('language');
  const role = localStorage.getItem('role');
  const user = localStorage.getItem('user');
  
  // If already logged in, go to dashboard
  if (user) return <Navigate to="/dashboard" replace />;
  // If language not selected, go to language page
  if (!language) return <Navigate to="/" replace />;
  // If role not selected, go to role page
  if (!role) return <Navigate to="/role" replace />;
  
  return children;
};

function App() {
  return (
    <Router>
      <AppProvider>
        <AuthProvider>
          <Toaster position="top-center" />
          <Routes>
            {/* Public Routes - Onboarding */}
            <Route path="/" element={<LanguageSelector />} />
            <Route path="/role" element={<RoleSelector />} />
            <Route path="/login" element={<OnboardingRoute><LoginForm /></OnboardingRoute>} />
            
            {/* Protected Routes - Require Login */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/market-prediction" element={<ProtectedRoute><MarketPrediction /></ProtectedRoute>} />
            <Route path="/labour-support" element={<ProtectedRoute><LabourSupport /></ProtectedRoute>} />
            <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />
            <Route path="/find-jobs" element={<ProtectedRoute><FindJobs /></ProtectedRoute>} />
            <Route path="/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
            <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />
            
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <EmergencyButton />
        </AuthProvider>
      </AppProvider>
    </Router>
  );
}

export default App;