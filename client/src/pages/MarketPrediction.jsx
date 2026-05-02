import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const MarketPrediction = () => {
  const { t } = useApp();
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
        priority: 1, recommendedAcres: 2, reasonKey: 'ginger_reason',
        confidence: 92, risk: 'Low'
      },
      { 
        name: '🍅 Tomato', price: '₹32/kg', demand: 'Very High', trend: '📈 +12%', 
        profitPerAcre: 85000, investment: 35000, confirmedPrice: '₹38/kg',
        priority: 2, recommendedAcres: 3, reasonKey: 'tomato_reason',
        confidence: 88, risk: 'Medium'
      },
      { 
        name: '🌾 Rice', price: '₹2,450', demand: 'High', trend: '📈 +5%', 
        profitPerAcre: 55000, investment: 25000, confirmedPrice: '₹2,600/quintal',
        priority: 3, recommendedAcres: 5, reasonKey: 'rice_reason',
        confidence: 85, risk: 'Low'
      },
      { 
        name: '🧅 Onion', price: '₹45/kg', demand: 'Critical', trend: '📈 +8%', 
        profitPerAcre: 120000, investment: 45000, confirmedPrice: '₹52/kg',
        priority: 4, recommendedAcres: 2, reasonKey: 'onion_reason',
        confidence: 90, risk: 'Medium'
      },
      { 
        name: '🥔 Potato', price: '₹22/kg', demand: 'Medium', trend: '📉 -3%', 
        profitPerAcre: 40000, investment: 25000, confirmedPrice: '₹24/kg',
        priority: 5, recommendedAcres: 2, reasonKey: 'potato_reason',
        confidence: 70, risk: 'Low'
      },
    ],
    'Belgaum': [
      { name: '🌾 Sugarcane', price: '₹3,500', demand: 'High', trend: '📈 +4%', profitPerAcre: 110000, investment: 50000, confirmedPrice: '₹3,800/quintal', priority: 1, recommendedAcres: 3, reasonKey: 'sugarcane_reason', confidence: 88, risk: 'Low' },
      { name: '🌽 Maize', price: '₹2,250', demand: 'Medium', trend: '➡️ Stable', profitPerAcre: 75000, investment: 35000, confirmedPrice: '₹2,400/quintal', priority: 2, recommendedAcres: 4, reasonKey: 'maize_reason', confidence: 75, risk: 'Low' },
    ],
    'Mysore': [
      { name: '🌾 Ragi', price: '₹3,000', demand: 'High', trend: '📈 +6%', profitPerAcre: 65000, investment: 30000, confirmedPrice: '₹3,300/quintal', priority: 1, recommendedAcres: 4, reasonKey: 'ragi_reason', confidence: 85, risk: 'Low' },
      { name: '🥜 Groundnut', price: '₹5,800', demand: 'High', trend: '📈 +7%', profitPerAcre: 110000, investment: 45000, confirmedPrice: '₹6,200/quintal', priority: 2, recommendedAcres: 3, reasonKey: 'groundnut_reason', confidence: 82, risk: 'Medium' },
    ],
    'Shimoga': [
      { name: '🥥 Arecanut', price: '₹28,500', demand: 'High', trend: '📈 +8%', profitPerAcre: 280000, investment: 100000, confirmedPrice: '₹32,000/quintal', priority: 1, recommendedAcres: 1, reasonKey: 'arecanut_reason', confidence: 90, risk: 'Medium' },
      { name: '🥥 Coconut', price: '₹3,100', demand: 'High', trend: '📈 +5%', profitPerAcre: 95000, investment: 40000, confirmedPrice: '₹3,500/quintal', priority: 2, recommendedAcres: 3, reasonKey: 'coconut_reason', confidence: 85, risk: 'Low' },
    ],
    'Chennai': [
      { name: '🌾 Rice', price: '₹2,550', demand: 'High', trend: '📈 +4%', profitPerAcre: 55000, investment: 25000, confirmedPrice: '₹2,700/quintal', priority: 1, recommendedAcres: 5, reasonKey: 'chennai_rice_reason', confidence: 88, risk: 'Low' },
    ],
    'Coimbatore': [
      { name: '🌿 Cotton', price: '₹7,000', demand: 'High', trend: '📈 +5%', profitPerAcre: 150000, investment: 70000, confirmedPrice: '₹7,500/quintal', priority: 1, recommendedAcres: 3, reasonKey: 'cotton_reason', confidence: 90, risk: 'Medium' },
    ],
    'Guntur': [
      { name: '🌶️ Chilli', price: '₹9,500', demand: 'High', trend: '📈 +4%', profitPerAcre: 125000, investment: 55000, confirmedPrice: '₹10,000/quintal', priority: 1, recommendedAcres: 3, reasonKey: 'chilli_reason', confidence: 88, risk: 'Medium' },
    ],
  };

  // Reason texts for translation
  const reasonTexts = {
    ginger_reason: "High export demand, perfect climate",
    tomato_reason: "Supply shortage from Pune",
    rice_reason: "Chennai crop loss creates opportunity",
    onion_reason: "Nasik crop loss 45%",
    potato_reason: "Stable market, low risk",
    sugarcane_reason: "Sugar factory nearby",
    maize_reason: "Poultry feed demand",
    ragi_reason: "Healthy food demand rising",
    groundnut_reason: "Oil demand high",
    arecanut_reason: "Export demand",
    coconut_reason: "Oil demand",
    chennai_rice_reason: "High demand in city",
    cotton_reason: "Textile hub nearby",
    chilli_reason: "Export quality"
  };

  const getDistrictCrops = () => {
    const crops = cropDataByDistrict[selectedDistrict] || cropDataByDistrict['Hassan'];
    return [...crops].sort((a, b) => a.priority - b.priority);
  };

  const getReasonText = (reasonKey) => {
    return reasonTexts[reasonKey] || reasonKey;
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
      toast.error(t('enter_acres_placeholder') || 'Please enter valid acres');
    }
  };

  const handleRegister = (crop) => {
    if (!profit) {
      toast.error(t('calculate_first') || 'Please calculate profit first');
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

  const getRiskText = (risk) => {
    if (risk === 'Low') return t('risk_low') || 'Low Risk';
    if (risk === 'Medium') return t('risk_medium') || 'Medium Risk';
    return t('risk_high') || 'High Risk';
  };

  const getDemandText = (demand) => {
    if (demand === 'High') return t('demand_high') || 'High';
    if (demand === 'Very High') return t('demand_very_high') || 'Very High';
    if (demand === 'Critical') return t('demand_critical') || 'Critical';
    if (demand === 'Medium') return t('demand_medium') || 'Medium';
    return demand;
  };

  const getTrendText = (trend) => {
    if (trend.includes('📈')) return t('trend_up') || '📈 Rising';
    if (trend.includes('📉')) return t('trend_down') || '📉 Falling';
    return t('trend_stable') || '➡️ Stable';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
            <div>
              <h1 className="text-xl font-bold">{t('market_intelligence') || 'Market Intelligence'}</h1>
              <p className="text-xs text-green-200">{t('market_subtitle') || 'South India crop prices & registration'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        
        {/* State + District Selection */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h3 className="font-bold text-gray-800 mb-3">{t('select_location') || '📍 Select Your Location'}</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t('state') || 'State'}</label>
              <select 
                value={selectedState} 
                onChange={(e) => { 
                  setSelectedState(e.target.value);
                  setSelectedDistrict(districtsByState[e.target.value][0]);
                  setSelectedCrop(null);
                  setProfit(null);
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
              >
                {southStates.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">{t('district') || 'District'}</label>
              <select 
                value={selectedDistrict} 
                onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedCrop(null); setProfit(null); }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
              >
                {districtsByState[selectedState]?.map(district => <option key={district} value={district}>{district}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Opportunity Alert */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
          <p className="text-blue-800 text-sm font-medium">{t('market_opportunity') || '💡 Market Opportunity: Due to crop loss in Chennai & Pune, Rice and Tomato prices expected to rise 15-20%!'}</p>
        </div>

        {/* Recommended Crops List */}
        <div className="space-y-4 mb-6">
          <h3 className="font-bold text-gray-800 text-lg">
            {t('recommended_crops')?.replace('{district}', selectedDistrict) || `📈 Recommended Crops for ${selectedDistrict}`}
          </h3>
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
                        {getRiskText(crop.risk)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">💰 {crop.price} | {getTrendText(crop.trend)}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCrop(selectedCrop?.name === crop.name ? null : crop);
                      setProfit(null);
                      setAcres('');
                    }}
                    className="text-green-600 font-semibold"
                  >
                    {selectedCrop?.name === crop.name ? (t('hide_calculator') || '− Hide Calculator') : (t('calculate_profit') || '+ Calculate Profit')}
                  </button>
                </div>
              </div>

              {/* Recommendation Details (always visible) */}
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center">
                    <span className="text-orange-500 mr-1">🎯</span>
                    <span>{t('priority')?.replace('{priority}', crop.priority) || `Priority #${crop.priority}`}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-1">📈</span>
                    <span>{t('recommended_acres')?.replace('{acres}', crop.recommendedAcres) || `Recommended: +${crop.recommendedAcres} acres`}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-1">💡</span>
                    <span>{t('confidence')?.replace('{confidence}', crop.confidence) || `Confidence: ${crop.confidence}%`}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-500 mr-1">💰</span>
                    <span>{t('profit_per_acre')?.replace('{profit}', crop.profitPerAcre.toLocaleString()) || `Profit/acre: ₹${crop.profitPerAcre.toLocaleString()}`}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  📋 {t('reason_label')?.replace('{reason}', getReasonText(crop.reasonKey)) || getReasonText(crop.reasonKey)}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ✅ {t('confirmed_price_label')?.replace('{price}', crop.confirmedPrice) || `KrishiSetu confirmed price: ${crop.confirmedPrice}`}
                </p>
              </div>

              {/* Profit Calculator (expands when clicked) */}
              {selectedCrop?.name === crop.name && (
                <div className="p-4 bg-green-50 animate-fade-in">
                  <h4 className="font-semibold text-gray-800 mb-3">{t('profit_calculator') || '💰 Profit Calculator'}</h4>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input 
                      type="number" 
                      placeholder={t('enter_acres_placeholder') || 'Enter acres you want to plant'} 
                      value={acres} 
                      onChange={(e) => setAcres(e.target.value)}
                      className="flex-1 p-3 border-2 border-green-200 rounded-xl focus:border-green-500 outline-none"
                    />
                    <button 
                      onClick={() => handleCalculate(crop)}
                      className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700"
                    >
                      {t('calculate') || 'Calculate'}
                    </button>
                  </div>

                  {profit && (
                    <div className="bg-white rounded-xl p-4">
                      <p className="text-center text-sm text-gray-600 mb-3">
                        {t('for_acres')?.replace('{acres}', acres).replace('{crop}', crop.name).replace('{district}', selectedDistrict) || 
                          `For ${acres} acres of ${crop.name} in ${selectedDistrict}`}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <p className="text-xs text-gray-500">{t('total_investment') || '💰 Total Investment'}</p>
                          <p className="font-bold text-orange-600 text-lg">₹{profit.totalInvestment.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">{t('per_acre')?.replace('{price}', crop.investment.toLocaleString()) || `₹${crop.investment.toLocaleString()}/acre`}</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-500">{t('expected_profit') || '💵 Expected Profit'}</p>
                          <p className="font-bold text-green-600 text-xl">₹{profit.totalProfit.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">{t('per_acre')?.replace('{price}', crop.profitPerAcre.toLocaleString()) || `₹${crop.profitPerAcre.toLocaleString()}/acre`}</p>
                        </div>
                      </div>
                      {parseInt(acres) > 1 && (
                        <div className="mt-3 p-2 bg-blue-50 rounded-lg text-center">
                          <p className="text-sm font-semibold text-blue-700">
                            {t('additional_profit')?.replace('{acres}', acres).replace('{profit}', profit.additionalProfit.toLocaleString()) || 
                              `📈 Additional profit by increasing from 1 acre to ${acres} acres: +₹${profit.additionalProfit.toLocaleString()}`}
                          </p>
                        </div>
                      )}
                      <div className="mt-3 flex justify-between items-center">
                        <p className="text-xs text-gray-500">{t('roi')?.replace('{roi}', profit.roi) || `ROI: ${profit.roi}% return`}</p>
                        <button 
                          onClick={() => handleRegister(crop)}
                          className="bg-purple-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700"
                        >
                          {t('register') || '📝 Register'}
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 text-center mt-3">
                    {t('recommended_acres_suggestion')?.replace('{acres}', crop.recommendedAcres) || 
                      `💡 Recommended: Increase by ${crop.recommendedAcres} acres for optimal profit`}
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
              <span className="text-xl mr-2">✅</span> {t('my_registered_crops') || 'My Registered Crops'}
            </h3>
            {myRegistrations.map((reg) => (
              <div key={reg.id} className="border-b last:border-b-0 py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-green-700">{reg.crop}</p>
                    <p className="text-xs text-gray-500">
                      {t('acres_label')?.replace('{acres}', reg.acres) || `${reg.acres} acres`} | 
                      {t('expected_profit_short') || 'Expected Profit'}: ₹{reg.expectedProfit.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t('location_label')?.replace('{district}', reg.district).replace('{state}', reg.state) || `Location: ${reg.district}, ${reg.state}`}
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {t('status_confirmed') || 'Confirmed'}
                  </span>
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