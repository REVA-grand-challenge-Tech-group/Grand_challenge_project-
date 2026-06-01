import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Import all pages
import IntroPage from './pages/IntroPage';
import LanguagePage from './pages/LanguagePage';
import RolePage from './pages/RolePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MarketPrediction from './pages/MarketPrediction';
import MyRegistrations from './pages/MyRegistrations';
import PostJob from './pages/PostJob';
import FindJobs from './pages/FindJobs';
import MyApplications from './pages/MyApplications';
import Chat from './pages/Chat';
import MyCrops from './pages/MyCrops';
import MyJobs from './pages/MyJobs';
import LabourSupport from './pages/LabourSupport';
import Weather from './pages/Weather';
import Profile from './pages/profile';

// Protected Route Component with Role Check
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, getRole } = useAuth();
  const userRole = getRole();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user's role is allowed
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <Routes>
            {/* Intro Page - First screen */}
            <Route path="/" element={<IntroPage />} />
            <Route path="/intro" element={<IntroPage />} />
            
            {/* Onboarding Routes */}
            <Route path="/" element={<LanguagePage />} />
            <Route path="/language" element={<LanguagePage />} />
            <Route path="/role" element={<RolePage />} />
            <Route path="/login" element={<LoginPage />} />
            
            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Farmer Only Routes */}
            <Route path="/market-prediction" element={
              <ProtectedRoute allowedRoles={['farmer', 'both']}>
                <MarketPrediction />
              </ProtectedRoute>
            } />
            <Route path="/my-crops" element={
              <ProtectedRoute allowedRoles={['farmer', 'both']}>
                <MyCrops />
              </ProtectedRoute>
            } />
            <Route path="/post-job" element={
              <ProtectedRoute allowedRoles={['farmer', 'both']}>
                <PostJob />
              </ProtectedRoute>
            } />
            <Route path="/my-jobs" element={
              <ProtectedRoute allowedRoles={['farmer', 'both']}>
                <MyJobs />
              </ProtectedRoute>
            } />
            <Route path="/labour-support" element={
              <ProtectedRoute allowedRoles={['farmer', 'both']}>
                <LabourSupport />
              </ProtectedRoute>
            } />
            <Route path="/my-registrations" element={
              <ProtectedRoute allowedRoles={['farmer', 'both']}>
                <MyRegistrations />
              </ProtectedRoute>
            } />
            
            {/* Labour Only Routes */}
            <Route path="/find-jobs" element={
              <ProtectedRoute allowedRoles={['labour', 'both']}>
                <FindJobs />
              </ProtectedRoute>
            } />
            <Route path="/my-applications" element={
              <ProtectedRoute allowedRoles={['labour', 'both']}>
                <MyApplications />
              </ProtectedRoute>
            } />
            
            {/* Common Routes (All Roles) */}
            <Route path="/community-chat" element={
              <ProtectedRoute allowedRoles={['farmer', 'labour', 'both']}>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/weather" element={
              <ProtectedRoute allowedRoles={['farmer', 'labour', 'both']}>
                <Weather />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['farmer', 'labour', 'both']}>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}