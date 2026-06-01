import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, Activity, Calculator, CheckCircle, X, Plus, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MarketPrediction = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [showProfitModal, setShowProfitModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [registeredCrops, setRegisteredCrops] = useState([]);
  const [profitData, setProfitData] = useState({
    landArea: '',
    expectedYield: '',
    totalCost: ''
  });
  const [registrationData, setRegistrationData] = useState({
    area: '',
    expectedHarvest: '',
    plantingDate: ''
  });

  // Load registered crops from localStorage
  useEffect(() => {
    loadRegisteredCrops();
  }, []);

  const loadRegisteredCrops = () => {
    const saved = localStorage.getItem('registeredCrops');
    if (saved) {
      setRegisteredCrops(JSON.parse(saved));
    }
  };

  const marketData = [
    { 
      id: 1,
      name: '🌾 Rice', 
      image: '🌾',
      currentPrice: 2450, 
      predictedPrice: 2600, 
      trend: '+8%', 
      demand: 'High', 
      risk: 'Low',
      confidence: 85,
      season: 'Kharif',
      recommendation: 'Good time to sell in next 2-3 weeks',
      tip: 'High demand expected due to festival season'
    },
    { 
      id: 2,
      name: '🍅 Tomato', 
      image: '🍅',
      currentPrice: 1850, 
      predictedPrice: 2100, 
      trend: '+12%', 
      demand: 'Very High', 
      risk: 'Medium',
      confidence: 90,
      season: 'Rabi',
      recommendation: 'Best time to harvest and sell',
      tip: 'Prices expected to peak next week'
    },
    { 
      id: 3,
      name: '🧅 Onion', 
      image: '🧅',
      currentPrice: 1650, 
      predictedPrice: 1600, 
      trend: '-2%', 
      demand: 'Medium', 
      risk: 'High',
      confidence: 75,
      season: 'Rabi',
      recommendation: 'Wait for prices to stabilize',
      tip: 'Store for 2-3 weeks for better price'
    },
    { 
      id: 4,
      name: '🌾 Wheat', 
      image: '🌾',
      currentPrice: 2250, 
      predictedPrice: 2350, 
      trend: '+5%', 
      demand: 'High', 
      risk: 'Low',
      confidence: 82,
      season: 'Rabi',
      recommendation: 'Hold for 1 week',
      tip: 'Government procurement starting soon'
    },
    { 
      id: 5,
      name: '🥔 Potato', 
      image: '🥔',
      currentPrice: 1450, 
      predictedPrice: 1500, 
      trend: '+3%', 
      demand: 'Medium', 
      risk: 'Low',
      confidence: 78,
      season: 'Kharif',
      recommendation: 'Sell in local market',
      tip: 'Cold storage rates are good this month'
    }
  ];

  const calculateProfit = (crop) => {
    const area = parseFloat(profitData.landArea);
    const yieldPerAcre = parseFloat(profitData.expectedYield);
    const cost = parseFloat(profitData.totalCost);
    
    if (!area || !yieldPerAcre) return null;
    
    const totalYield = area * yieldPerAcre;
    const revenue = totalYield * crop.currentPrice;
    const netProfit = revenue - (cost || 0);
    const profitPerAcre = netProfit / area;
    
    return {
      totalYield,
      revenue,
      netProfit,
      profitPerAcre
    };
  };

  const handleRegisterCrop = (crop) => {
    // Get farmer details
    const farmerId = user?.id || user?._id || 'farmer_' + Date.now();
    const farmerName = user?.fullName || user?.name || 'Farmer';
    
    const newRegistration = {
      id: Date.now(),
      cropName: crop.name,
      cropId: crop.id,
      farmerId: farmerId,
      farmerName: farmerName,
      district: user?.district || 'Mandya',
      state: user?.state || 'Karnataka',
      currentPrice: crop.currentPrice,
      predictedPrice: crop.predictedPrice,
      demand: crop.demand,
      area: parseFloat(registrationData.area) || 1,
      expectedYield: parseFloat(registrationData.expectedHarvest) || 50,
      plantingDate: registrationData.plantingDate || new Date().toISOString(),
      registrationDate: new Date().toISOString(),
      status: 'Registered',
      expectedProfit: (parseFloat(registrationData.area) || 1) * (parseFloat(registrationData.expectedHarvest) || 50) * crop.currentPrice
    };
    
    console.log('Registering crop:', newRegistration);
    
    // Get existing crops
    const existingCrops = JSON.parse(localStorage.getItem('registeredCrops') || '[]');
    existingCrops.push(newRegistration);
    localStorage.setItem('registeredCrops', JSON.stringify(existingCrops));
    
    console.log('Total registered crops:', existingCrops.length);
    
    // Update state
    setRegisteredCrops(existingCrops);
    
    // Trigger storage event
    window.dispatchEvent(new Event('storage'));
    
    setShowRegistrationModal(false);
    setRegistrationData({ area: '', expectedHarvest: '', plantingDate: '' });
    alert(`✅ ${crop.name} registered successfully!`);
  };

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'Low': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'High': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDemandColor = (demand) => {
    switch(demand) {
      case 'Very High': return 'bg-purple-100 text-purple-700';
      case 'High': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const profit = selectedCrop ? calculateProfit(selectedCrop) : null;

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6 sticky top-0 z-10">
        <button 
          onClick={() => navigate('/dashboard')} 
          className="flex items-center space-x-2 mb-4 hover:opacity-80 transition"
        >
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold">Market Prediction</h1>
        <p className="text-emerald-100 text-sm mt-1">Crop prices, trends & profit calculator</p>
      </div>

      {/* Registered Crops Summary */}
      {registeredCrops.length > 0 && (
        <div className="bg-emerald-50 mx-5 mt-4 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-emerald-800 flex items-center">
              <FileText size={18} className="mr-2" />
              Your Registered Crops ({registeredCrops.length})
            </h3>
            <button 
              onClick={() => navigate('/my-crops')}
              className="text-xs text-emerald-600 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {registeredCrops.slice(0, 3).map(crop => (
              <span key={crop.id} className="bg-white px-3 py-1 rounded-full text-xs text-emerald-700">
                {crop.cropName} • {crop.area} acres
              </span>
            ))}
            {registeredCrops.length > 3 && (
              <span className="bg-white px-3 py-1 rounded-full text-xs text-emerald-700">
                +{registeredCrops.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Market Cards */}
      <div className="p-5 space-y-4">
        {marketData.map((crop) => (
          <div key={crop.id} className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
            {/* Crop Header */}
            <div className="p-4 border-b border-stone-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{crop.image}</span>
                  <div>
                    <h3 className="font-bold text-lg text-stone-800">{crop.name}</h3>
                    <p className="text-xs text-stone-500">{crop.season} Season</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(crop.risk)}`}>
                    Risk: {crop.risk}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className="p-4 bg-stone-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-stone-500">Current Price</p>
                  <p className="text-2xl font-bold text-emerald-700">₹{crop.currentPrice}</p>
                  <p className="text-xs text-stone-500">per quintal</p>
                </div>
                <div>
                  <p className="text-xs text-stone-500">Predicted Price</p>
                  <p className="text-2xl font-bold text-blue-700">₹{crop.predictedPrice}</p>
                  <p className="text-xs text-green-600">{crop.trend} expected rise</p>
                </div>
              </div>
            </div>

            {/* Demand & Recommendation */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${getDemandColor(crop.demand)}`}>
                  Demand: {crop.demand}
                </span>
                <span className="text-xs text-stone-500">Confidence: {crop.confidence}%</span>
              </div>
              <div className="bg-emerald-50 rounded-lg p-3 mb-4">
                <p className="text-xs text-emerald-600 font-semibold">🤖 AI Recommendation</p>
                <p className="text-sm text-stone-700">{crop.recommendation}</p>
                <p className="text-xs text-emerald-600 mt-1">💡 {crop.tip}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedCrop(crop);
                    setShowProfitModal(true);
                  }}
                  className="flex-1 bg-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition flex items-center justify-center"
                >
                  <Calculator size={16} className="mr-2" />
                  Calculate Profit
                </button>
                <button
                  onClick={() => {
                    setSelectedCrop(crop);
                    setShowRegistrationModal(true);
                  }}
                  className="flex-1 border-2 border-emerald-600 text-emerald-700 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-50 transition flex items-center justify-center"
                >
                  <Plus size={16} className="mr-2" />
                  Register Crop
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Profit Calculator Modal */}
      {showProfitModal && selectedCrop && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-stone-800">Profit Calculator</h2>
              <button onClick={() => setShowProfitModal(false)} className="p-1 hover:bg-stone-100 rounded">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <div className="mb-4 text-center">
                <span className="text-4xl">{selectedCrop.image}</span>
                <h3 className="font-bold text-lg mt-1">{selectedCrop.name}</h3>
                <p className="text-emerald-700 font-bold">₹{selectedCrop.currentPrice}/quintal</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Land Area (acres)</label>
                  <input
                    type="number"
                    value={profitData.landArea}
                    onChange={(e) => setProfitData({...profitData, landArea: e.target.value})}
                    placeholder="e.g., 5"
                    className="w-full p-3 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Expected Yield (quintals/acre)</label>
                  <input
                    type="number"
                    value={profitData.expectedYield}
                    onChange={(e) => setProfitData({...profitData, expectedYield: e.target.value})}
                    placeholder="e.g., 20"
                    className="w-full p-3 border border-stone-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Total Cost (₹) - Optional</label>
                  <input
                    type="number"
                    value={profitData.totalCost}
                    onChange={(e) => setProfitData({...profitData, totalCost: e.target.value})}
                    placeholder="e.g., 50000"
                    className="w-full p-3 border border-stone-200 rounded-xl"
                  />
                </div>

                {profit && (
                  <div className="bg-emerald-50 rounded-xl p-4 mt-4">
                    <h4 className="font-semibold text-emerald-800 mb-2">Profit Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-stone-600">Total Expected Yield</span>
                        <span className="font-semibold">{profit.totalYield} quintals</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-stone-600">Expected Revenue</span>
                        <span className="font-semibold text-emerald-700">₹{profit.revenue.toLocaleString()}</span>
                      </div>
                      {profitData.totalCost && (
                        <div className="flex justify-between">
                          <span className="text-sm text-stone-600">Total Cost</span>
                          <span className="font-semibold">₹{parseFloat(profitData.totalCost).toLocaleString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-sm font-semibold">Net Profit</span>
                        <span className="font-bold text-emerald-700 text-lg">₹{profit.netProfit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-stone-600">Profit per Acre</span>
                        <span className="font-semibold">₹{profit.profitPerAcre.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowProfitModal(false)}
                className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Register Crop Modal */}
      {showRegistrationModal && selectedCrop && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold text-stone-800">Register {selectedCrop.name}</h2>
              <button onClick={() => setShowRegistrationModal(false)} className="p-1 hover:bg-stone-100 rounded">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-5">
              <div className="mb-4 bg-emerald-50 p-3 rounded-xl">
                <p className="text-sm text-stone-600">Current Market Price</p>
                <p className="text-2xl font-bold text-emerald-700">₹{selectedCrop.currentPrice}/quintal</p>
                <p className="text-xs text-green-600">Predicted: ₹{selectedCrop.predictedPrice} (+{selectedCrop.trend})</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Area (acres) *</label>
                  <input
                    type="number"
                    value={registrationData.area}
                    onChange={(e) => setRegistrationData({...registrationData, area: e.target.value})}
                    placeholder="e.g., 5"
                    className="w-full p-3 border border-stone-200 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Expected Yield (quintals) *</label>
                  <input
                    type="number"
                    value={registrationData.expectedHarvest}
                    onChange={(e) => setRegistrationData({...registrationData, expectedHarvest: e.target.value})}
                    placeholder="Total expected production"
                    className="w-full p-3 border border-stone-200 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Planting Date</label>
                  <input
                    type="date"
                    value={registrationData.plantingDate}
                    onChange={(e) => setRegistrationData({...registrationData, plantingDate: e.target.value})}
                    className="w-full p-3 border border-stone-200 rounded-xl"
                  />
                </div>
              </div>

              <button
                onClick={() => handleRegisterCrop(selectedCrop)}
                className="w-full mt-6 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
              >
                Register Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPrediction;