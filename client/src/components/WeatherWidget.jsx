import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Hassan');

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      // Call your backend API
      const response = await fetch(`http://localhost:5001/api/weather/${city}`);
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Weather fetch error:', error);
      // Fallback data
      setWeather({
        temp: 28,
        condition: 'Sunny',
        icon: '☀️',
        humidity: 65,
        advice: 'Good day for farming'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-3 shadow-sm">
        <div className="animate-pulse">Loading weather...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-3 text-white shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-3xl mr-2">{weather?.icon || '☀️'}</span>
          <div>
            <div className="text-2xl font-bold">{weather?.temp}°C</div>
            <div className="text-xs text-blue-100">{weather?.condition}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-blue-100">💧 {weather?.humidity}%</div>
          <div className="text-xs text-blue-100 mt-1">{weather?.advice}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;