import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';

// Import all pages
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


export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LanguagePage />} />
            <Route path="/language" element={<LanguagePage />} />
            <Route path="/role" element={<RolePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/market-prediction" element={<MarketPrediction />} />
            <Route path="/my-registrations" element={<MyRegistrations />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/find-jobs" element={<FindJobs />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/community-chat" element={<Chat />} />
          </Routes>
        </AuthProvider>
      </AppProvider>
    </BrowserRouter>
  );
}