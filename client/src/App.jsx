import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 

import LanguagePage from './pages/LanguagePage'; 
import RolePage from './pages/RolePage'; 
import LoginPage from './pages/LoginPage'; 
import DashboardPage from './pages/DashboardPage'; 
import MarketPrediction from './pages/MarketPrediction.jsx';

function App() {
  return (
    <Router>
      {/* Persistent Navigation Layer */}
      <Navbar /> 
      
      <main className="min-h-screen bg-slate-950 text-slate-100">
        <Routes>
          {/* STEP 1: Core Localization Channel */}
          <Route path="/" element={<LanguagePage />} />

          {/* STEP 2: Persona Matching */}
          <Route path="/role" element={<RolePage />} />
          <Route path="/select-role" element={<RolePage />} />

          {/* STEP 3: Auth Channel */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />

          {/* STEP 4: Central Operational Dashboard Matrix */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* STEP 5: Market Prediction Module */}
          <Route path="/market-prediction" element={<MarketPrediction />} />

          {/* Fallback Redirection Sequence Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;