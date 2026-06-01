import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mic, User, Phone } from 'lucide-react';
import farmBackground from '../assets/farm-bg.jpg'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    state: 'Karnataka', 
    district: 'Hassan' 
  });
  const [error, setError] = useState('');

  const southStates = ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala'];
  const districtsByState = {
    'Karnataka': ['Hassan', 'Belgaum', 'Mysore', 'Shimoga', 'Mandya', 'Hubli', 'Dharwad'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
    'Andhra Pradesh': ['Guntur', 'Vijayawada', 'Kurnool', 'Anantapur', 'Nellore'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissor']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.phone.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }
    
    if (!formData.name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    
    setError('');
    
    // Get role from localStorage
    const savedRole = localStorage.getItem('userRole');
    console.log('=== LOGIN PAGE ===');
    console.log('Role from localStorage:', savedRole);
    
    // Create user data
    const userData = {
      id: Date.now().toString(),
      fullName: formData.name,
      phoneNumber: formData.phone,
      state: formData.state,
      district: formData.district,
      role: savedRole || 'farmer',
      preferredLanguage: localStorage.getItem('selectedLanguage') || 'en'
    };
    
    console.log('User data being saved:', userData);
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', 'demo-token-' + Date.now());
    
    // Update auth context
    login(userData, 'demo-token-' + Date.now());
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative font-sans">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: `url(${farmBackground})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">Farmer Registration</h1>
          <p className="text-emerald-700 text-sm mt-1">Join KrishiSetu today</p>
        </div>

        {error && <p className="text-red-600 text-sm bg-red-100 p-2 rounded-lg mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-4 text-emerald-700" size={20} />
            <input 
              className="w-full pl-12 pr-12 p-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-4 top-4 text-emerald-700" size={20} />
            <input 
              className="w-full pl-12 pr-12 p-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="10-digit Mobile Number"
              maxLength="10"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select 
              className="p-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none" 
              value={formData.state} 
              onChange={(e) => setFormData({...formData, state: e.target.value, district: districtsByState[e.target.value][0]})}
            >
              {southStates.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select 
              className="p-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none" 
              value={formData.district} 
              onChange={(e) => setFormData({...formData, district: e.target.value})}
            >
              {districtsByState[formData.state].map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <button type="submit" className="w-full bg-emerald-700 text-white font-bold py-4 rounded-2xl hover:bg-emerald-800 transition">
            Continue to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;