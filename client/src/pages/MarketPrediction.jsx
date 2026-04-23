import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EmergencyButton from '../components/EmergencyButton';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MarketPrediction = () => {
  const { t } = useApp();
  const [selectedState, setSelectedState] = useState('Karnataka');
  const [selectedDistrict, setSelectedDistrict] = useState('Hassan');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [acres, setAcres] = useState('');
  const [profitResult, setProfitResult] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  // States and Districts data
  const states = ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Maharashtra', 'Punjab'];
  
  const districtsData = {
    'Karnataka': ['Hassan', 'Belgaum', 'Mysore', 'Shimoga', 'Mandya', 'Hubli', 'Dharwad'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
    'Andhra Pradesh': ['Guntur', 'Vijayawada', 'Kurnool', 'Anantapur', 'Nellore'],
    'Maharashtra': ['Pune', 'Nagpur', 'Nashik', 'Solapur', 'Kolhapur'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda']
  };

  // Location-based crop recommendations (Sample data - replace with real data later)
  const locationData = {
    'Karnataka': {
      'Hassan': {
        climate: 'Moderate rainfall, 20-28°C',
        soil: 'Red loamy soil',
        goodCrops: ['Ginger', 'Rice', 'Coffee', 'Potato'],
        badCrops: ['Tobacco', 'Cotton'],
        opportunities: [
          { crop: 'Ginger', currentProfit: 120000, potentialProfit: 180000, suggestedAcres: 2, reason: 'High demand in North India, supply shortage expected' },
          { crop: 'Rice', currentProfit: 45000, potentialProfit: 68000, suggestedAcres: 3, reason: 'Chennai crop failure - prices rising 20%' }
        ]
      },
      'Belgaum': {
        climate: 'High rainfall, 22-30°C',
        soil: 'Black soil',
        goodCrops: ['Sugarcane', 'Maize', 'Soybean'],
        badCrops: ['Groundnut'],
        opportunities: [
          { crop: 'Sugarcane', currentProfit: 80000, potentialProfit: 110000, suggestedAcres: 2, reason: 'Sugar demand high in export market' },
          { crop: 'Maize', currentProfit: 55000, potentialProfit: 75000, suggestedAcres: 3, reason: 'Poultry feed demand increasing' }
        ]
      },
      'Mysore': {
        climate: 'Low rainfall, 18-32°C',
        soil: 'Red sandy soil',
        goodCrops: ['Ragi', 'Jowar', 'Pulses'],
        badCrops: ['Sunflower'],
        opportunities: [
          { crop: 'Ragi', currentProfit: 35000, potentialProfit: 52000, suggestedAcres: 4, reason: 'Perfect climate for millets' }
        ]
      },
      'Shimoga': {
        climate: 'Heavy rainfall, 22-28°C',
        soil: 'Laterite soil',
        goodCrops: ['Arecanut', 'Rice', 'Coconut'],
        badCrops: ['Cotton'],
        opportunities: [
          { crop: 'Arecanut', currentProfit: 200000, potentialProfit: 280000, suggestedAcres: 1, reason: 'Export demand high' }
        ]
      },
      'Mandya': {
        climate: 'Moderate, 23-30°C',
        soil: 'Alluvial soil',
        goodCrops: ['Rice', 'Sugarcane', 'Ragi'],
        badCrops: ['Maize'],
        opportunities: [
          { crop: 'Rice', currentProfit: 50000, potentialProfit: 72000, suggestedAcres: 3, reason: 'Good irrigation facilities' }
        ]
      },
      'Hubli': {
        climate: 'Dry, 20-35°C',
        soil: 'Black soil',
        goodCrops: ['Cotton', 'Chilli', 'Groundnut'],
        badCrops: ['Rice'],
        opportunities: [
          { crop: 'Cotton', currentProfit: 70000, potentialProfit: 95000, suggestedAcres: 3, reason: 'Textile demand high' }
        ]
      },
      'Dharwad': {
        climate: 'Moderate, 22-32°C',
        soil: 'Red soil',
        goodCrops: ['Maize', 'Sunflower', 'Soybean'],
        badCrops: ['Sugarcane'],
        opportunities: [
          { crop: 'Maize', currentProfit: 55000, potentialProfit: 80000, suggestedAcres: 3, reason: 'Good for animal feed' }
        ]
      }
    },
    'Tamil Nadu': {
      'Chennai': {
        climate: 'High humidity, 25-35°C',
        soil: 'Alluvial soil',
        goodCrops: ['Banana', 'Groundnut', 'Rice'],
        badCrops: ['Rice (35% loss this season due to floods)'],
        opportunities: [
          { crop: 'Rice (neighboring districts)', currentProfit: 45000, potentialProfit: 85000, suggestedAcres: 5, reason: 'Supply shortage - prices expected to rise 25%' }
        ]
      },
      'Coimbatore': {
        climate: 'Dry climate, 22-34°C',
        soil: 'Black cotton soil',
        goodCrops: ['Cotton', 'Turmeric', 'Coconut'],
        badCrops: ['Maize'],
        opportunities: [
          { crop: 'Cotton', currentProfit: 70000, potentialProfit: 98000, suggestedAcres: 3, reason: 'Export demand high' }
        ]
      },
      'Madurai': {
        climate: 'Hot and dry, 26-36°C',
        soil: 'Red soil',
        goodCrops: ['Chilli', 'Cotton', 'Groundnut'],
        badCrops: ['Tomato'],
        opportunities: [
          { crop: 'Chilli', currentProfit: 85000, potentialProfit: 115000, suggestedAcres: 2, reason: 'Good market price' }
        ]
      },
      'Salem': {
        climate: 'Moderate, 23-34°C',
        soil: 'Red soil',
        goodCrops: ['Mango', 'Turmeric', 'Banana'],
        badCrops: ['Wheat'],
        opportunities: [
          { crop: 'Turmeric', currentProfit: 90000, potentialProfit: 130000, suggestedAcres: 2, reason: 'Medicinal use demand' }
        ]
      }
    },
    'Andhra Pradesh': {
      'Guntur': {
        climate: 'Hot and humid, 25-38°C',
        soil: 'Black soil',
        goodCrops: ['Tobacco', 'Chilli', 'Cotton'],
        badCrops: ['Groundnut'],
        opportunities: [
          { crop: 'Tobacco', currentProfit: 150000, potentialProfit: 210000, suggestedAcres: 2, reason: 'High export demand - premium prices' },
          { crop: 'Chilli', currentProfit: 95000, potentialProfit: 128000, suggestedAcres: 3, reason: 'Good market price' }
        ]
      },
      'Vijayawada': {
        climate: 'Humid, 24-35°C',
        soil: 'Alluvial soil',
        goodCrops: ['Rice', 'Sugarcane', 'Banana'],
        badCrops: ['Pulses'],
        opportunities: [
          { crop: 'Rice', currentProfit: 55000, potentialProfit: 78000, suggestedAcres: 3, reason: 'Good irrigation' }
        ]
      },
      'Kurnool': {
        climate: 'Dry, 22-38°C',
        soil: 'Red soil',
        goodCrops: ['Cotton', 'Sunflower', 'Jowar'],
        badCrops: ['Rice'],
        opportunities: [
          { crop: 'Cotton', currentProfit: 68000, potentialProfit: 92000, suggestedAcres: 3, reason: 'Good for dry climate' }
        ]
      }
    },
    'Maharashtra': {
      'Pune': {
        climate: 'Moderate, 18-32°C',
        soil: 'Black soil',
        goodCrops: ['Sugarcane', 'Grapes', 'Jowar'],
        badCrops: ['Cotton'],
        opportunities: [
          { crop: 'Grapes', currentProfit: 200000, potentialProfit: 280000, suggestedAcres: 1, reason: 'Wine industry demand' }
        ]
      },
      'Nagpur': {
        climate: 'Hot, 22-40°C',
        soil: 'Black soil',
        goodCrops: ['Orange', 'Cotton', 'Soybean'],
        badCrops: ['Wheat'],
        opportunities: [
          { crop: 'Orange', currentProfit: 180000, potentialProfit: 250000, suggestedAcres: 1, reason: 'Nagpur oranges famous' }
        ]
      },
      'Nashik': {
        climate: 'Moderate, 20-35°C',
        soil: 'Black soil',
        goodCrops: ['Onion', 'Grapes', 'Tomato'],
        badCrops: ['Rice'],
        opportunities: [
          { crop: 'Onion', currentProfit: 120000, potentialProfit: 175000, suggestedAcres: 2, reason: 'Supply shortage - prices rising' }
        ]
      }
    },
    'Punjab': {
      'Ludhiana': {
        climate: 'Cold winter, hot summer, 5-40°C',
        soil: 'Alluvial soil',
        goodCrops: ['Wheat', 'Rice', 'Maize'],
        badCrops: ['Sugarcane'],
        opportunities: [
          { crop: 'Wheat', currentProfit: 35000, potentialProfit: 50000, suggestedAcres: 5, reason: 'Government MSP support' },
          { crop: 'Rice', currentProfit: 45000, potentialProfit: 65000, suggestedAcres: 4, reason: 'Good irrigation' }
        ]
      },
      'Amritsar': {
        climate: 'Cold, 5-38°C',
        soil: 'Alluvial soil',
        goodCrops: ['Wheat', 'Rice', 'Potato'],
        badCrops: ['Cotton'],
        opportunities: [
          { crop: 'Potato', currentProfit: 40000, potentialProfit: 60000, suggestedAcres: 3, reason: 'Good for cold storage' }
        ]
      }
    }
  };

  // Get current location data
  const currentData = locationData[selectedState]?.[selectedDistrict] || locationData['Karnataka']['Hassan'];

  const calculateProfit = () => {
    if (selectedOpportunity && acres) {
      const numAcres = parseInt(acres);
      const currentProfitOneAcre = selectedOpportunity.currentProfit;
      const newProfitTotal = selectedOpportunity.potentialProfit * numAcres;
      const additionalProfit = newProfitTotal - currentProfitOneAcre;
      
      setProfitResult({
        acres: numAcres,
        currentProfit: currentProfitOneAcre,
        newProfit: newProfitTotal,
        additionalProfit: additionalProfit,
        investment: selectedOpportunity.suggestedAcres === 1 ? 80000 : selectedOpportunity.suggestedAcres === 2 ? 45000 : 25000
      });
    }
  };

  const exportToPDF = async () => {
    const element = document.getElementById('profit-report');
    if (!element) return;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('profit_report.pdf');
  };

  const shareToWhatsApp = () => {
    const message = `🌾 KrishiSetu Profit Report 🌾\n\nLocation: ${selectedDistrict}, ${selectedState}\nCrop: ${selectedOpportunity?.crop}\nAcres: ${profitResult?.acres}\nExpected Profit: ₹${profitResult?.newProfit?.toLocaleString()}\nAdditional Profit: ₹${profitResult?.additionalProfit?.toLocaleString()}\n\nDownload KrishiSetu app for more features! 🌱`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg sticky top-0 z-20">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/dashboard" className="mr-4 text-white text-2xl">←</Link>
              <div>
                <h1 className="text-xl font-bold">Market Intelligence</h1>
                <p className="text-xs text-green-200">Location-based crop recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Location Selector */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <span className="text-xl mr-2">📍</span> Select Your Location
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">State</label>
              <select 
                value={selectedState} 
                onChange={(e) => { 
                  setSelectedState(e.target.value); 
                  setSelectedDistrict(districtsData[e.target.value][0]);
                  setSelectedOpportunity(null);
                  setProfitResult(null);
                  setShowCalculator(false);
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
              >
                {states.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">District</label>
              <select 
                value={selectedDistrict} 
                onChange={(e) => { 
                  setSelectedDistrict(e.target.value);
                  setSelectedOpportunity(null);
                  setProfitResult(null);
                  setShowCalculator(false);
                }}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
              >
                {districtsData[selectedState]?.map(district => <option key={district} value={district}>{district}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Location Insights */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-5 mb-6 border border-green-200">
          <h3 className="font-bold text-green-800 mb-3">🌾 Agricultural Insights</h3>
          <div className="space-y-2 text-sm">
            <div className="flex flex-wrap">
              <span className="w-24 text-gray-600 font-medium">Climate:</span>
              <span className="text-gray-800">{currentData.climate}</span>
            </div>
            <div className="flex flex-wrap">
              <span className="w-24 text-gray-600 font-medium">Soil:</span>
              <span className="text-gray-800">{currentData.soil}</span>
            </div>
            <div className="flex flex-wrap">
              <span className="w-24 text-gray-600 font-medium">Best Crops:</span>
              <span className="text-green-700">{currentData.goodCrops?.join(', ')}</span>
            </div>
            {currentData.badCrops && currentData.badCrops.length > 0 && (
              <div className="flex flex-wrap">
                <span className="w-24 text-gray-600 font-medium">Avoid:</span>
                <span className="text-red-600">{currentData.badCrops.join(', ')}</span>
              </div>
            )}
          </div>
          <div className="mt-3 p-2 bg-yellow-50 rounded-lg">
            <p className="text-xs text-yellow-800">💡 Based on historical data and market trends. Verify with local experts.</p>
          </div>
        </div>

        {/* Profit Opportunities */}
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-xl mr-2">📈</span> Profit Opportunities in {selectedDistrict}
        </h3>
        <div className="space-y-4 mb-6">
          {currentData.opportunities?.map((opp, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md border-l-4 border-green-500 overflow-hidden">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg text-green-700">🌱 {opp.crop}</h4>
                    <p className="text-sm text-gray-600 mt-1">{opp.reason}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span className="text-gray-600">Current: <strong className="text-orange-600">₹{opp.currentProfit.toLocaleString()}/acre</strong></span>
                      <span className="text-gray-600">Potential: <strong className="text-green-600">₹{opp.potentialProfit.toLocaleString()}/acre</strong></span>
                    </div>
                    <p className="text-xs text-blue-600 mt-2">📊 Recommended increase: {opp.suggestedAcres} acres</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedOpportunity(opp);
                      setShowCalculator(true);
                      setAcres('');
                      setProfitResult(null);
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    Calculate
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Profit Calculator Modal */}
        {showCalculator && selectedOpportunity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-xl text-green-700">📊 Profit Calculator</h3>
                  <button 
                    onClick={() => {
                      setShowCalculator(false);
                      setSelectedOpportunity(null);
                      setProfitResult(null);
                      setAcres('');
                    }} 
                    className="text-gray-400 text-2xl hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <p className="font-semibold text-gray-800">{selectedOpportunity.crop}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedOpportunity.reason}</p>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>Current profit/acre: <strong className="text-orange-600">₹{selectedOpportunity.currentProfit.toLocaleString()}</strong></span>
                    <span>Potential: <strong className="text-green-600">₹{selectedOpportunity.potentialProfit.toLocaleString()}</strong></span>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">Recommended: {selectedOpportunity.suggestedAcres} acres</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">How many acres do you want to plant?</label>
                  <input 
                    type="number" 
                    placeholder="Enter acres" 
                    value={acres} 
                    onChange={(e) => setAcres(e.target.value)} 
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 outline-none"
                  />
                </div>

                <button 
                  onClick={calculateProfit} 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all mb-4"
                >
                  Calculate Profit
                </button>

                {profitResult && (
                  <div id="profit-report" className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4">
                    <h4 className="font-bold text-green-800 mb-3">📈 Your Profit Projection</h4>
                    <div className="space-y-2 text-sm">
                      <p>📍 <strong>{selectedDistrict}, {selectedState}</strong></p>
                      <p>🌾 <strong>{profitResult.acres} acres</strong> of <strong className="text-green-700">{selectedOpportunity.crop}</strong></p>
                      <div className="border-t pt-2 mt-2">
                        <p>📊 Current Profit (1 acre): <strong>₹{profitResult.currentProfit.toLocaleString()}</strong></p>
                        <p>📈 New Profit ({profitResult.acres} acres): <strong className="text-green-700">₹{profitResult.newProfit.toLocaleString()}</strong></p>
                        <p className="text-lg font-bold text-green-700 mt-2">✨ Additional Profit: +₹{profitResult.additionalProfit.toLocaleString()}</p>
                        <p className="text-xs text-gray-500 mt-1">💰 Estimated Investment: ₹{(profitResult.investment * profitResult.acres).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {profitResult && (
                  <div className="flex gap-3 mb-4">
                    <button onClick={exportToPDF} className="flex-1 bg-purple-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-purple-700">📄 Download PDF</button>
                    <button onClick={shareToWhatsApp} className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-green-700">📱 Share on WhatsApp</button>
                  </div>
                )}

                <button 
                  onClick={() => {
                    setShowCalculator(false);
                    setSelectedOpportunity(null);
                    setProfitResult(null);
                    setAcres('');
                  }}
                  className="w-full bg-gray-100 text-gray-600 py-2 rounded-xl text-sm font-medium hover:bg-gray-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className="bg-blue-50 rounded-xl p-3 text-center">
          <p className="text-xs text-blue-600">📊 Data is for demonstration purposes. Real-time market data will be integrated with backend.</p>
        </div>
      </div>
      
      <EmergencyButton />
    </div>
  );
};

export default MarketPrediction;