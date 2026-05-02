import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const MarketPrediction = () => {
  const { t } = useApp();
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('Karnataka');
  const [selectedDistrict, setSelectedDistrict] = useState('Hassan');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [acres, setAcres] = useState('');
  const [profit, setProfit] = useState(null);
  const [myRegistrations, setMyRegistrations] = useState([]);

  // South Indian states only
  const southStates = ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Kerala'];

  // Districts by state
  const districtsByState = {
    'Karnataka': ['Hassan', 'Belgaum', 'Mysore', 'Shimoga', 'Mandya', 'Hubli', 'Dharwad'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
    'Andhra Pradesh': ['Guntur', 'Vijayawada', 'Kurnool', 'Anantapur', 'Nellore'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur']
  };

  // Complete crop data with recommendations
  const cropDataByDistrict = {
    'Hassan': [
      { 
        name: '🫚 Ginger', price: '₹80/kg', demand: 'High', trend: '📈 +10%', 
        profitPerAcre: 180000, investment: 80000, confirmedPrice: '₹90/kg',
        priority: 1, recommendedAcres: 2, reason: 'High export demand, perfect climate',
        confidence: 92, risk: 'Low'
      },
      { 
        name: '🍅 Tomato', price: '₹32/kg', demand: 'Very High', trend: '📈 +12%', 
        profitPerAcre: 85000, investment: 35000, confirmedPrice: '₹38/kg',
        priority: 2, recommendedAcres: 3, reason: 'Supply shortage from Pune',
        confidence: 88, risk: 'Medium'
      },
      { 
        name: '🌾 Rice', price: '₹2,450', demand: 'High', trend: '📈 +5%', 
        profitPerAcre: 55000, investment: 25000, confirmedPrice: '₹2,600/quintal',
        priority: 3, recommendedAcres: 5, reason: 'Chennai crop loss creates opportunity',
        confidence: 85, risk: 'Low'
      },
      { 
        name: '🧅 Onion', price: '₹45/kg', demand: 'Critical', trend: '📈 +8%', 
        profitPerAcre: 120000, investment: 45000, confirmedPrice: '₹52/kg',
        priority: 4, recommendedAcres: 2, reason: 'Nasik crop loss 45%',
        confidence: 90, risk: 'Medium'
      },
      { 
        name: '🥔 Potato', price: '₹22/kg', demand: 'Medium', trend: '📉 -3%', 
        profitPerAcre: 40000, investment: 25000, confirmedPrice: '₹24/kg',
        priority: 5, recommendedAcres: 2, reason: 'Stable market, low risk',
        confidence: 70, risk: 'Low'
      },
    ],
    'Belgaum': [
      { name: '🌾 Sugarcane', price: '₹3,500', demand: 'High', trend: '📈 +4%', profitPerAcre: 110000, investment: 50000, confirmedPrice: '₹3,800/quintal', priority: 1, recommendedAcres: 3, reason: 'Sugar factory nearby', confidence: 88, risk: 'Low' },
      { name: '🌽 Maize', price: '₹2,250', demand: 'Medium', trend: '➡️ Stable', profitPerAcre: 75000, investment: 35000, confirmedPrice: '₹2,400/quintal', priority: 2, recommendedAcres: 4, reason: 'Poultry feed demand', confidence: 75, risk: 'Low' },
    ],
    'Mysore': [
      { name: '🌾 Ragi', price: '₹3,000', demand: 'High', trend: '📈 +6%', profitPerAcre: 65000, investment: 30000, confirmedPrice: '₹3,300/quintal', priority: 1, recommendedAcres: 4, reason: 'Healthy food demand rising', confidence: 85, risk: 'Low' },
      { name: '🥜 Groundnut', price: '₹5,800', demand: 'High', trend: '📈 +7%', profitPerAcre: 110000, investment: 45000, confirmedPrice: '₹6,200/quintal', priority: 2, recommendedAcres: 3, reason: 'Oil demand high', confidence: 82, risk: 'Medium' },
    ],
    'Shimoga': [
      { name: '🥥 Arecanut', price: '₹28,500', demand: 'High', trend: '📈 +8%', profitPerAcre: 280000, investment: 100000, confirmedPrice: '₹32,000/quintal', priority: 1, recommendedAcres: 1, reason: 'Export demand', confidence: 90, risk: 'Medium' },
      { name: '🥥 Coconut', price: '₹3,100', demand: 'High', trend: '📈 +5%', profitPerAcre: 95000, investment: 40000, confirmedPrice: '₹3,500/quintal', priority: 2, recommendedAcres: 3, reason: 'Oil demand', confidence: 85, risk: 'Low' },
    ],
    'Chennai': [
      { name: '🌾 Rice', price: '₹2,550', demand: 'High', trend: '📈 +4%', profitPerAcre: 55000, investment: 25000, confirmedPrice: '₹2,700/quintal', priority: 1, recommendedAcres: 5, reason: 'High demand in city', confidence: 88, risk: 'Low' },
    ],
    'Coimbatore': [
      { name: '🌿 Cotton', price: '₹7,000', demand: 'High', trend: '📈 +5%', profitPerAcre: 150000, investment: 70000, confirmedPrice: '₹7,500/quintal', priority: 1, recommendedAcres: 3, reason: 'Textile hub nearby', confidence: 90, risk: 'Medium' },
    ],
    'Guntur': [
      { name: '🌶️ Chilli', price: '₹9,500', demand: 'High', trend: '📈 +4%', profitPerAcre: 125000, investment: 55000, confirmedPrice: '₹10,000/quintal', priority: 1, recommendedAcres: 3, reason: 'Export quality', confidence: 88, risk: 'Medium' },
    ],
  };

  const getDistrictCrops = () => {
    const crops = cropDataByDistrict[selectedDistrict] || cropDataByDistrict['Hassan'];
    // Sort by priority
    return [...crops].sort((a, b) => a.priority - b.priority);
  };

  const calculateProfit = (crop, userAcres) => {
    const totalProfit = crop.profitPerAcre * userAcres;
    const totalInvestment = crop.investment * userAcres;
    const roi = ((totalProfit / totalInvestment) * 100).toFixed(0);
    const additionalProfit = userAcres > 1 ? (userAcres - 1) * crop.profitPerAcre : 0;
    return { totalProfit, totalInvestment, roi, additionalProfit };
  };

  const handleCalculate = (crop) => {
    if (acres && parseInt(acres) > 0) {
      const result = calculateProfit(crop, parseInt(acres));
      setProfit(result);
    } else {
      toast.error('Please enter valid acres');
    }
  };

  const handleRegister = (crop) => {
    if (!profit) {
      toast.error('Please calculate profit first');
      return;
    }

    const newRegistration = {
      id: Date.now(),
      crop: crop.name,
      acres: acres,
      confirmedPrice: crop.confirmedPrice,
      expectedProfit: profit.totalProfit,
      district: selectedDistrict,
      state: selectedState,
      status: 'Confirmed',
      registeredAt: new Date().toLocaleDateString()
    };

    setMyRegistrations([...myRegistrations, newRegistration]);
    toast.success(`✅ Successfully registered ${acres} acres of ${crop.name}!`);
    setSelectedCrop(null);
    setAcres('');
    setProfit(null);
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'bg-green-100 text-green-800';
    if (risk === 'Medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <div>
              <h1 className="text-xl font-bold">Market Intelligence</h1>
              <p className="text-xs text-green-200">Priority-wise crop recommendations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        
        {/* State + District Selection */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">📍 Select Your Location</h3>
          <div className="grid grid-cols-2 gap-3">
            <select 
              value={selectedState} 
              onChange={(e) => { 
                setSelectedState(e.target.value);
                setSelectedDistrict(districtsByState[e.target.value][0]);
                setSelectedCrop(null);
                setProfit(null);
              }}
              className="p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
            >
              {southStates.map(state => <option key={state} value={state}>{state}</option>)}
            </select>
            <select 
              value={selectedDistrict} 
              onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedCrop(null); setProfit(null); }}
              className="p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
            >
              {districtsByState[selectedState]?.map(district => <option key={district} value={district}>{district}</option>)}
            </select>
          </div>
        </div>

        {/* Opportunity Alert */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
          <p className="text-blue-800 text-sm font-medium">💡 Market Opportunity: Due to crop loss in Chennai & Pune, Rice and Tomato prices expected to rise 15-20%!</p>
        </div>

        {/* Recommended Crops List */}
        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-gray-800 text-lg">📈 Recommended Crops for {selectedDistrict}</h3>
          {getDistrictCrops().map((crop, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md border overflow-hidden">
              {/* Crop Header */}
              <div className={`p-4 ${selectedCrop?.name === crop.name ? 'bg-green-50' : 'bg-white'} border-b`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{crop.name.split(' ')[0]}</span>
                      <h3 className="font-bold text-lg text-gray-800">{crop.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(crop.risk)}`}>
                        {crop.risk} Risk
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">💰 {crop.price} | {crop.trend}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCrop(selectedCrop?.name === crop.name ? null : crop);
                      setProfit(null);
                      setAcres('');
                    }}
                    className="text-green-600 font-semibold"
                  >
                    {selectedCrop?.name === crop.name ? '− Hide Calculator' : '+ Calculate Profit'}
                  </button>
                </div>
              </div>

              {/* Recommendation Details (always visible) */}
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-orange-500 mr-1">🎯</span>
                    <span>Priority #{crop.priority}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">📈</span>
                    <span>Recommended: +{crop.recommendedAcres} acres</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-1">💡</span>
                    <span>Confidence: {crop.confidence}%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-500 mr-1">💰</span>
                    <span>Profit/acre: ₹{crop.profitPerAcre.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">📋 {crop.reason}</p>
                <p className="text-xs text-green-600 mt-1">✅ KrishiSetu confirmed price: {crop.confirmedPrice}</p>
              </div>

              {/* Profit Calculator (expands when clicked) */}
              {selectedCrop?.name === crop.name && (
                <div className="p-4 bg-green-50 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3">💰 Profit Calculator</h4>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input 
                      type="number" 
                      placeholder="Enter acres you want to plant" 
                      value={acres} 
                      onChange={(e) => setAcres(e.target.value)}
                      className="flex-1 p-3 border-2 border-green-200 rounded-xl focus:border-green-500 outline-none"
                    />
                    <button 
                      onClick={() => handleCalculate(crop)}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
                    >
                      Calculate
                    </button>
                  </div>

                  {profit && (
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-center text-sm text-gray-600 mb-3">
                        For <strong className="text-green-700">{acres} acres</strong> of <strong className="text-green-700">{crop.name}</strong> in <strong>{selectedDistrict}</strong>
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <p className="text-xs text-gray-500">💰 Total Investment</p>
                          <p className="font-bold text-orange-600 text-lg">₹{profit.totalInvestment.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">₹{crop.investment.toLocaleString()}/acre</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-500">💵 Expected Profit</p>
                          <p className="font-bold text-green-600 text-xl">₹{profit.totalProfit.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">₹{crop.profitPerAcre.toLocaleString()}/acre</p>
                        </div>
                      </div>
                      {parseInt(acres) > 1 && (
                        <div className="mt-3 p-2 bg-blue-50 rounded-lg text-center">
                          <p className="text-sm font-semibold text-blue-700">
                            📈 Additional profit by increasing from 1 acre to {acres} acres: +₹{profit.additionalProfit.toLocaleString()}
                          </p>
                        </div>
                      )}
                      <div className="mt-3 flex justify-between items-center">
                        <p className="text-xs text-gray-500">ROI: {profit.roi}% return</p>
                        <button 
                          onClick={() => handleRegister(crop)}
                          className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700"
                        >
                          📝 Register to Grow
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 text-center mt-3">
                    💡 Recommended: Increase by {crop.recommendedAcres} acres for optimal profit
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* My Registrations Section */}
        {myRegistrations.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md p-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <span className="text-xl mr-2">✅</span> My Registered Crops
            </h3>
            {myRegistrations.map((reg) => (
              <div key={reg.id} className="border-b last:border-b-0 py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-green-700">{reg.crop}</p>
                    <p className="text-xs text-gray-500">{reg.acres} acres | Expected Profit: ₹{reg.expectedProfit.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Location: {reg.district}, {reg.state}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{reg.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPrediction;