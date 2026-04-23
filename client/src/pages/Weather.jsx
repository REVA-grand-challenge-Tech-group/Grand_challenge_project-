import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Weather = () => {
  const { t, language } = useApp();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated weather data (will connect to real API later)
    setTimeout(() => {
      const weatherData = {
        current: {
          temp: 28,
          condition: language === 'hi' ? 'धूप' : language === 'kn' ? 'ಬಿಸಿಲು' : 'Sunny',
          humidity: 65,
          windSpeed: 12,
          icon: '☀️'
        },
        forecast: [
          { day: language === 'hi' ? 'आज' : language === 'kn' ? 'ಇಂದು' : 'Today', temp: 28, condition: 'Sunny', icon: '☀️', rain: '0%' },
          { day: language === 'hi' ? 'कल' : language === 'kn' ? 'ನಾಳೆ' : 'Tomorrow', temp: 26, condition: 'Partly Cloudy', icon: '⛅', rain: '10%' },
          { day: language === 'hi' ? 'बुधवार' : language === 'kn' ? 'ಬುಧವಾರ' : 'Wed', temp: 25, condition: 'Cloudy', icon: '☁️', rain: '30%' },
          { day: language === 'hi' ? 'गुरुवार' : language === 'kn' ? 'ಗುರುವಾರ' : 'Thu', temp: 24, condition: 'Rain', icon: '🌧️', rain: '70%' },
          { day: language === 'hi' ? 'शुक्रवार' : language === 'kn' ? 'ಶುಕ್ರವಾರ' : 'Fri', temp: 26, condition: 'Sunny', icon: '☀️', rain: '5%' },
          { day: language === 'hi' ? 'शनिवार' : language === 'kn' ? 'ಶನಿವಾರ' : 'Sat', temp: 27, condition: 'Sunny', icon: '☀️', rain: '0%' },
          { day: language === 'hi' ? 'रविवार' : language === 'kn' ? 'ಭಾನುವಾರ' : 'Sun', temp: 29, condition: 'Sunny', icon: '☀️', rain: '0%' }
        ],
        advice: language === 'hi' 
          ? 'बुवाई के लिए अच्छा मौसम। गुरुवार को हल्की बारिश की संभावना।'
          : language === 'kn'
          ? 'ಬಿತ್ತನೆಗೆ ಉತ್ತಮ ಹವಾಮಾನ. ಗುರುವಾರ ಸ್ವಲ್ಪ ಮಳೆಯ ನಿರೀಕ್ಷೆಯಿದೆ.'
          : 'Good weather for sowing. Light rain expected on Thursday.'
      };
      setWeather(weatherData);
      setLoading(false);
    }, 1000);
  }, [language]);

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
              {language === 'hi' ? 'मौसम पूर्वानुमान' : language === 'kn' ? 'ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ' : 'Weather Forecast'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {/* Current Weather */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-blue-100 text-sm">
                    {language === 'hi' ? 'वर्तमान मौसम' : language === 'kn' ? 'ಪ್ರಸ್ತುತ ಹವಾಮಾನ' : 'Current Weather'}
                  </p>
                  <div className="text-5xl font-bold mt-2">{weather.current.temp}°C</div>
                  <p className="text-xl mt-1">{weather.current.condition}</p>
                  <div className="flex space-x-4 mt-3 text-sm">
                    <span>💧 {weather.current.humidity}%</span>
                    <span>💨 {weather.current.windSpeed} km/h</span>
                  </div>
                </div>
                <div className="text-7xl">{weather.current.icon}</div>
              </div>
            </div>

            {/* Farmer Advice */}
            <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🌾</span>
                <div>
                  <h3 className="font-semibold text-amber-800">
                    {language === 'hi' ? 'किसान सलाह' : language === 'kn' ? 'ರೈತರ ಸಲಹೆ' : "Farmer's Advice"}
                  </h3>
                  <p className="text-amber-700 text-sm mt-1">{weather.advice}</p>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <h3 className="font-semibold text-gray-800 mb-3">
              {language === 'hi' ? '7 दिन का पूर्वानुमान' : language === 'kn' ? '7 ದಿನಗಳ ಮುನ್ಸೂಚನೆ' : '7-Day Forecast'}
            </h3>
            <div className="space-y-2 mb-6">
              {weather.forecast.map((day, index) => (
                <div key={index} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{day.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800">{day.day}</div>
                        <div className="text-xs text-gray-500">{day.condition}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{day.temp}°C</div>
                      <div className="text-xs text-blue-600">{language === 'hi' ? 'बारिश' : language === 'kn' ? 'ಮಳೆ' : 'Rain'}: {day.rain}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Crop Recommendation based on weather */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">
                {language === 'hi' ? 'इस मौसम के लिए अनुशंसित फसलें' : language === 'kn' ? 'ಈ ಹವಾಮಾನಕ್ಕೆ ಶಿಫಾರಸು ಮಾಡಲಾದ ಬೆಳೆಗಳು' : 'Recommended Crops for this Weather'}
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white px-3 py-1 rounded-full text-sm text-green-700">🌾 Rice</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm text-green-700">🌽 Corn</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm text-green-700">🍅 Tomato</span>
                <span className="bg-white px-3 py-1 rounded-full text-sm text-green-700">🌶️ Chilli</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;