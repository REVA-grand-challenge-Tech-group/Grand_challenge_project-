import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const MarketPrediction = () => {
  const { t } = useApp();
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [acres, setAcres] = useState('');
  const [profit, setProfit] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('Hassan');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationData, setRegistrationData] = useState({ name: '', phone: '', address: '', expectedHarvest: '' });
  const [registeredCrops, setRegisteredCrops] = useState([]);

  const districts = ['Hassan', 'Belgaum', 'Mysore', 'Shimoga', 'Mandya'];

  const cropsData = {
    'Hassan': [
      { name: 'Rice', price: '₹2,450', demand: 'High', trend: '📈 +5%', profitPerAcre: 18500, investment: 12000, icon: '🌾', opportunity: 'Chennai has 35% crop loss', confirmedPrice: '₹2,500/quintal' },
      { name: 'Tomato', price: '₹32/kg', demand: 'Very High', trend: '📈 +12%', profitPerAcre: 85000, investment: 35000, icon: '🍅', opportunity: 'Pune crop loss 40%', confirmedPrice: '₹38/kg' },
      { name: 'Onion', price: '₹45/kg', demand: 'Critical', trend: '📈 +8%', profitPerAcre: 120000, investment: 45000, icon: '🧅', opportunity: 'Nasik crop loss 45%', confirmedPrice: '₹52/kg' },
      { name: 'Potato', price: '₹22/kg', demand: 'Medium', trend: '📉 -3%', profitPerAcre: 40000, investment: 25000, icon: '🥔', opportunity: 'Stable market', confirmedPrice: '₹24/kg' },
      { name: 'Ginger', price: '₹80/kg', demand: 'High', trend: '📈 +10%', profitPerAcre: 180000, investment: 80000, icon: '🫚', opportunity: 'High export demand', confirmedPrice: '₹90/kg' },
    ],
    'Belgaum': [
      { name: 'Sugarcane', price: '₹3,500', demand: 'High', trend: '📈 +4%', profitPerAcre: 110000, investment: 50000, icon: '🌾', opportunity: 'Sugar demand high', confirmedPrice: '₹3,800/quintal' },
      { name: 'Maize', price: '₹2,250', demand: 'Medium', trend: '➡️ Stable', profitPerAcre: 75000, investment: 35000, icon: '🌽', opportunity: 'Steady demand', confirmedPrice: '₹2,400/quintal' },
    ],
    'Mysore': [
      { name: 'Ragi', price: '₹3,000', demand: 'High', trend: '📈 +6%', profitPerAcre: 65000, investment: 30000, icon: '🌾', opportunity: 'Healthy food demand', confirmedPrice: '₹3,300/quintal' },
      { name: 'Groundnut', price: '₹5,800', demand: 'High', trend: '📈 +7%', profitPerAcre: 110000, investment: 45000, icon: '🥜', opportunity: 'Oil demand high', confirmedPrice: '₹6,200/quintal' },
    ],
    'Shimoga': [
      { name: 'Arecanut', price: '₹28,500', demand: 'High', trend: '📈 +8%', profitPerAcre: 280000, investment: 100000, icon: '🥥', opportunity: 'Export demand', confirmedPrice: '₹32,000/quintal' },
      { name: 'Coconut', price: '₹3,100', demand: 'High', trend: '📈 +5%', profitPerAcre: 95000, investment: 40000, icon: '🥥', opportunity: 'Oil demand', confirmedPrice: '₹3,500/quintal' },
    ],
    'Mandya': [
      { name: 'Rice', price: '₹2,500', demand: 'High', trend: '📈 +6%', profitPerAcre: 19000, investment: 12500, icon: '🌾', opportunity: 'Good irrigation', confirmedPrice: '₹2,600/quintal' },
      { name: 'Sugarcane', price: '₹3,400', demand: 'Medium', trend: '➡️ Stable', profitPerAcre: 105000, investment: 48000, icon: '🌾', opportunity: 'Sugar factory nearby', confirmedPrice: '₹3,600/quintal' },
    ],
  };

  const currentCrops = cropsData[selectedDistrict] || cropsData['Hassan'];

  const calculateProfit = () => {
    if (selectedCrop && acres) {
      const totalProfit = selectedCrop.profitPerAcre * parseInt(acres);
      const totalInvestment = selectedCrop.investment * parseInt(acres);
      const roi = ((totalProfit / totalInvestment) * 100).toFixed(0);
      setProfit({ profit: totalProfit, investment: totalInvestment, acres: acres, roi: roi });
    }
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    if (!registrationData.name || !registrationData.phone || !registrationData.address || !registrationData.expectedHarvest) {
      toast.error('Please fill all fields');
      return;
    }
    const newRegistration = {
      id: Date.now(),
      crop: selectedCrop.name,
      acres: acres,
      confirmedPrice: selectedCrop.confirmedPrice,
      farmerName: registrationData.name,
      farmerPhone: registrationData.phone,
      address: registrationData.address,
      expectedHarvest: registrationData.expectedHarvest,
      district: selectedDistrict,
      status: 'Confirmed',
      registeredAt: new Date().toLocaleDateString()
    };
    setRegisteredCrops([...registeredCrops, newRegistration]);
    toast.success(`✅ Successfully registered ${acres} acres of ${selectedCrop.name}! KrishiSetu confirms price at ${selectedCrop.confirmedPrice}`);
    setShowRegistrationForm(false);
    setRegistrationData({ name: '', phone: '', address: '', expectedHarvest: '' });
    setSelectedCrop(null);
    setProfit(null);
    setAcres('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
              <div>
                <h1 className="text-xl font-bold">{t('market_prediction')}</h1>
                <p className="text-xs text-green-200">District-wise crop prices & opportunities</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* District Selector */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">📍 Select Your District</label>
          <select 
            value={selectedDistrict} 
            onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedCrop(null); setProfit(null); setAcres(''); }}
            className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
          >
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Opportunity Alert */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
          <p className="text-blue-800 text-sm font-medium">💡 Market Opportunity: Due to crop loss in Chennai & Pune, Rice and Tomato prices expected to rise 15-20%!</p>
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentCrops.map((crop, idx) => (
            <div 
              key={idx}
              onClick={() => { setSelectedCrop(crop); setProfit(null); setAcres(''); setShowRegistrationForm(false); }}
              className={`bg-white rounded-2xl p-4 shadow-md cursor-pointer hover:shadow-xl transition-all border hover:border-green-300 ${selectedCrop?.name === crop.name ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-100'}`}
            >
              <div className="text-center">
                <div className="text-5xl mb-2">{crop.icon}</div>
                <h3 className="font-bold text-lg text-gray-800">{crop.name}</h3>
                <p className="text-green-600 font-bold text-lg">{crop.price}</p>
                <div className="flex justify-center mt-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${crop.trend.includes('📈') ? 'bg-green-100 text-green-800' : crop.trend.includes('📉') ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {crop.trend}
                  </span>
                </div>
                <p className="text-xs text-orange-600 mt-2">{crop.opportunity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Profit Calculator & Registration Modal */}
        {selectedCrop && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              {!showRegistrationForm ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <span className="text-4xl mr-3">{selectedCrop.icon}</span>
                      <h3 className="font-bold text-xl text-green-700">{selectedCrop.name} - Profit Calculator</h3>
                    </div>
                    <button onClick={() => { setSelectedCrop(null); setProfit(null); setAcres(''); }} className="text-gray-400 text-2xl">✕</button>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-600">Investment per acre: <strong className="text-orange-600">₹{selectedCrop.investment.toLocaleString()}</strong></p>
                    <p className="text-sm text-gray-600">Expected profit per acre: <strong className="text-green-600">₹{selectedCrop.profitPerAcre.toLocaleString()}</strong></p>
                    <p className="text-xs text-blue-600 mt-1">📈 {selectedCrop.opportunity}</p>
                    <p className="text-xs text-purple-600 mt-1">💰 KrishiSetu Confirmed Price: {selectedCrop.confirmedPrice}</p>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">How many acres?</label>
                    <input type="number" value={acres} onChange={(e) => setAcres(e.target.value)} placeholder="Enter acres" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" />
                  </div>
                  
                  {acres && parseInt(acres) > 0 && (
                    <button onClick={calculateProfit} className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold mb-4">Calculate Profit</button>
                  )}
                  
                  {profit && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl mb-4">
                      <p className="text-center text-sm">For <strong>{profit.acres} acres</strong> of <strong className="text-green-700">{selectedCrop.name}</strong></p>
                      <div className="grid grid-cols-2 gap-3 mt-3 text-center">
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-500">Total Investment</p>
                          <p className="font-bold text-orange-600">₹{profit.investment.toLocaleString()}</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs text-gray-500">Expected Profit</p>
                          <p className="font-bold text-green-600 text-xl">₹{profit.profit.toLocaleString()}</p>
                        </div>
                      </div>
                      <p className="text-center text-xs text-gray-500 mt-2">ROI: {profit.roi}% return on investment</p>
                    </div>
                  )}
                  
                  <button onClick={() => setShowRegistrationForm(true)} className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold mb-2">📝 Register to Grow {selectedCrop.name}</button>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm">📄 Download Report</button>
                  <button className="w-full mt-2 bg-green-600 text-white py-2 rounded-lg text-sm">📱 Share on WhatsApp</button>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl text-green-700">Register to Grow {selectedCrop.name}</h3>
                    <button onClick={() => setShowRegistrationForm(false)} className="text-gray-400 text-2xl">✕</button>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-semibold">KrishiSetu Confirmed Price: {selectedCrop.confirmedPrice}</p>
                    <p className="text-xs text-gray-600 mt-1">We guarantee this price for your harvest</p>
                  </div>
                  
                  <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Full Name *</label>
                      <input type="text" value={registrationData.name} onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})} className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Phone Number *</label>
                      <input type="tel" value={registrationData.phone} onChange={(e) => setRegistrationData({...registrationData, phone: e.target.value})} className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Farm Address *</label>
                      <input type="text" value={registrationData.address} onChange={(e) => setRegistrationData({...registrationData, address: e.target.value})} placeholder="Village, Taluk, District" className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Expected Harvest Month *</label>
                      <select value={registrationData.expectedHarvest} onChange={(e) => setRegistrationData({...registrationData, expectedHarvest: e.target.value})} className="w-full p-3 border-2 rounded-xl focus:border-green-500 outline-none" required>
                        <option value="">Select month</option>
                        <option value="September 2025">September 2025</option>
                        <option value="October 2025">October 2025</option>
                        <option value="November 2025">November 2025</option>
                        <option value="December 2025">December 2025</option>
                        <option value="January 2026">January 2026</option>
                      </select>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-xs text-yellow-800">⚠️ By registering, you agree to supply your {selectedCrop.name} to KrishiSetu at the confirmed price. We will connect you with buyers.</p>
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">Confirm Registration</button>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

        {/* Price Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b"><h3 className="font-semibold text-gray-700">📊 Detailed Market Rates - {selectedDistrict}</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr><th className="px-4 py-3 text-left">Crop</th><th className="px-4 py-3 text-left">Price</th><th className="px-4 py-3 text-left">Demand</th><th className="px-4 py-3 text-left">Trend</th><th className="px-4 py-3 text-left">Opportunity</th></tr>
              </thead>
              <tbody className="divide-y">
                {currentCrops.map((crop, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedCrop(crop); setProfit(null); setAcres(''); setShowRegistrationForm(false); }}>
                    <td className="px-4 py-3 font-medium">{crop.icon} {crop.name}</td>
                    <td className="px-4 py-3 font-bold text-green-700">{crop.price}</td>
                    <td className="px-4 py-3">{crop.demand}</td>
                    <td className="px-4 py-3">{crop.trend}</td>
                    <td className="px-4 py-3 text-xs text-orange-600">{crop.opportunity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registered Crops Section */}
        {registeredCrops.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center"><span className="text-xl mr-2">✅</span> My Registered Crops</h3>
            {registeredCrops.map((reg) => (
              <div key={reg.id} className="border-b last:border-b-0 py-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-green-700">{reg.crop}</p>
                    <p className="text-xs text-gray-500">{reg.acres} acres | Harvest: {reg.expectedHarvest}</p>
                    <p className="text-xs text-gray-500">Confirmed Price: {reg.confirmedPrice}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">{reg.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recommendation */}
        <div className="mt-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white">
          <p className="text-sm font-semibold">🌾 Recommended: Plant Rice and Tomato this season. Expected profit increase: 25-40% due to supply shortage.</p>
        </div>
      </div>
    </div>
  );
};

export default MarketPrediction;