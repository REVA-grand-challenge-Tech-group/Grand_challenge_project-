import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const MandiPrices = () => {
  const { t, language } = useApp();
  const [mandis, setMandis] = useState([]);
  const [selectedMandi, setSelectedMandi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const mandiData = [
        {
          id: 1,
          name: language === 'hi' ? 'आज़ादपुर मंडी' : language === 'kn' ? 'ಆಜಾದ್ಪುರ ಮಂಡಿ' : 'Azadpur Mandi',
          location: language === 'hi' ? 'दिल्ली' : language === 'kn' ? 'ದೆಹಲಿ' : 'Delhi',
          distance: '15 km',
          crops: [
            { name: 'Tomato', price: 28, unit: 'kg', trend: 'up', change: '+5' },
            { name: 'Onion', price: 35, unit: 'kg', trend: 'up', change: '+8' },
            { name: 'Potato', price: 22, unit: 'kg', trend: 'down', change: '-3' }
          ]
        },
        {
          id: 2,
          name: language === 'hi' ? 'करनाल मंडी' : language === 'kn' ? 'ಕರ್ನಾಲ್ ಮಂಡಿ' : 'Karnal Mandi',
          location: language === 'hi' ? 'हरियाणा' : language === 'kn' ? 'ಹರಿಯಾಣ' : 'Haryana',
          distance: '45 km',
          crops: [
            { name: 'Wheat', price: 2150, unit: 'quintal', trend: 'up', change: '+2' },
            { name: 'Rice', price: 2200, unit: 'quintal', trend: 'up', change: '+3' }
          ]
        }
      ];
      setMandis(mandiData);
      setLoading(false);
    }, 1000);
  }, [language]);

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '📈';
    if (trend === 'down') return '📉';
    return '📊';
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  const filteredMandis = mandis.filter(mandi =>
    mandi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mandi.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link to="/dashboard" className="mr-4 text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-xl font-bold text-gray-800">
              {language === 'hi' ? 'नजदीकी मंडी भाव' : language === 'kn' ? 'ಹತ್ತಿರದ ಮಂಡಿ ಬೆಲೆಗಳು' : 'Nearby Mandi Prices'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-6">
          <input
            type="text"
            placeholder={language === 'hi' ? '🔍 मंडी खोजें...' : language === 'kn' ? '🔍 ಮಂಡಿ ಹುಡುಕಿ...' : '🔍 Search mandi...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all outline-none"
          />
        </div>

        <div className="bg-green-50 rounded-xl p-3 mb-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-green-600 text-xl mr-2">🟢</span>
              <span className="text-sm text-green-800">
                {language === 'hi' ? 'कीमतें हर 30 मिनट में अपडेट होती हैं' : language === 'kn' ? 'ಬೆಲೆಗಳು ಪ್ರತಿ 30 ನಿಮಿಷಗಳಿಗೊಮ್ಮೆ ನವೀಕರಿಸಲ್ಪಡುತ್ತವೆ' : 'Prices updated every 30 minutes'}
              </span>
            </div>
            <span className="text-xs text-green-600">
              {language === 'hi' ? 'लाइव' : language === 'kn' ? 'ಲೈವ್' : 'Live'}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {filteredMandis.map((mandi) => (
              <div key={mandi.id} className="mb-6">
                <button
                  onClick={() => setSelectedMandi(selectedMandi?.id === mandi.id ? null : mandi)}
                  className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{mandi.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">📍 {mandi.location} • 🚗 {mandi.distance}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-600 text-sm mr-2">
                        {selectedMandi?.id === mandi.id ? '▲' : '▼'}
                      </span>
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xl">🏪</span>
                      </div>
                    </div>
                  </div>
                </button>

                {selectedMandi?.id === mandi.id && (
                  <div className="mt-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-4 py-2 border-b">
                      <p className="text-sm font-semibold text-gray-700">
                        {language === 'hi' ? 'आज के भाव' : language === 'kn' ? 'ಇಂದಿನ ಬೆಲೆಗಳು' : "Today's Prices"}
                      </p>
                    </div>
                    {mandi.crops.map((crop, idx) => (
                      <div key={idx} className="p-3 border-b last:border-b-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-gray-800">{crop.name}</span>
                            <span className="text-xs text-gray-400 ml-2">per {crop.unit}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-800">₹{crop.price}</div>
                            <div className={`flex items-center text-xs ${getTrendColor(crop.trend)}`}>
                              <span className="mr-1">{getTrendIcon(crop.trend)}</span>
                              <span>{crop.change}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button className="w-full p-3 bg-green-50 text-green-700 text-sm font-medium hover:bg-green-100 transition-colors">
                      {language === 'hi' ? 'दिशा निर्देश प्राप्त करें →' : language === 'kn' ? 'ದಿಕ್ಕುಗಳನ್ನು ಪಡೆಯಿರಿ →' : 'Get Directions →'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MandiPrices;