import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Demo login
    const demoUser = {
      id: '1',
      fullName: 'Ramesh Kumar',
      phoneNumber: phoneNumber || '9901212960',
      role: localStorage.getItem('userRole') || 'farmer',
      state: 'Karnataka',
      district: 'Bengaluru Rural',
      preferredLanguage: localStorage.getItem('selectedLanguage') || 'english'
    };
    
    login(demoUser, 'demo-token');
    navigate('/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🌾</span>
          </div>
          <h1 className="text-2xl font-bold">KrishiSetu</h1>
          <p className="text-green-100 mt-1">Farmer's Digital Assistant</p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Enter your phone number to continue</p>

          <form onSubmit={handleSubmit}>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter 10-digit number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
              maxLength="10"
              required
            />
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              {loading ? 'Please wait...' : 'Continue to Dashboard'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Demo: Enter any 10-digit number
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;