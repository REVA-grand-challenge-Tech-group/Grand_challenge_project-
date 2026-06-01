import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Droplets, Wind, Thermometer, Sunrise, Sunset, Cloud, Sun, CloudRain } from 'lucide-react';

const Weather = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWeatherData();
  }, [user]);

  const loadWeatherData = () => {
    const district = user?.district || 'Mandya';
    
    // Weather data based on district
    const weatherData = {
      'Mandya': { temp: 28, feelsLike: 30, condition: 'Sunny', humidity: 65, wind: 12, pressure: 1012, icon: '☀️', sunrise: '6:15 AM', sunset: '6:45 PM' },
      'Mysore': { temp: 27, feelsLike: 29, condition: 'Partly Cloudy', humidity: 70, wind: 10, pressure: 1011, icon: '⛅', sunrise: '6:20 AM', sunset: '6:40 PM' },
      'Hassan': { temp: 26, feelsLike: 28, condition: 'Cloudy', humidity: 75, wind: 8, pressure: 1010, icon: '☁️', sunrise: '6:25 AM', sunset: '6:35 PM' },
      'Bengaluru': { temp: 25, feelsLike: 26, condition: 'Sunny', humidity: 60, wind: 15, pressure: 1013, icon: '☀️', sunrise: '6:10 AM', sunset: '6:50 PM' },
      'default': { temp: 28, feelsLike: 30, condition: 'Sunny', humidity: 65, wind: 12, pressure: 1012, icon: '☀️', sunrise: '6:15 AM', sunset: '6:45 PM' }
    };
    
    const currentWeather = weatherData[district] || weatherData.default;
    setWeather({ ...currentWeather, district });
    
    // 5-day forecast
    setForecast([
      { day: 'Today', temp: 28, condition: 'Sunny', icon: '☀️', rain: '0%' },
      { day: 'Tomorrow', temp: 29, condition: 'Partly Cloudy', icon: '⛅', rain: '10%' },
      { day: 'Wed', temp: 27, condition: 'Cloudy', icon: '☁️', rain: '20%' },
      { day: 'Thu', temp: 26, condition: 'Light Rain', icon: '🌧️', rain: '60%' },
      { day: 'Fri', temp: 27, condition: 'Sunny', icon: '☀️', rain: '5%' }
    ]);
    
    setLoading(false);
  };

  const getFarmingTip = () => {
    const tips = {
      'Sunny': '☀️ Good day for harvesting! Perfect weather for drying grains.',
      'Partly Cloudy': '⛅ Ideal conditions for pesticide spray. Light wind helps distribution.',
      'Cloudy': '☁️ Good for transplanting seedlings. Less water evaporation.',
      'Light Rain': '🌧️ Avoid fertilizer application. Check drainage systems.',
      'default': '🌱 Regular farming activities can continue.'
    };
    return tips[weather?.condition] || tips.default;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 mb-4 hover:opacity-80">
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl font-bold">Weather</h1>
        <p className="text-emerald-100 text-sm mt-1">Farming forecast for {weather?.district}</p>
      </div>

      {/* Current Weather */}
      <div className="p-5">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="text-center mb-6">
            <span className="text-6xl">{weather?.icon}</span>
            <p className="text-4xl font-bold text-stone-800 mt-2">{weather?.temp}°C</p>
            <p className="text-stone-500">{weather?.condition}</p>
            <p className="text-sm text-stone-400 mt-1">Feels like {weather?.feelsLike}°C</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
              <Droplets size={20} className="text-emerald-600" />
              <div>
                <p className="text-xs text-stone-500">Humidity</p>
                <p className="font-semibold">{weather?.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
              <Wind size={20} className="text-emerald-600" />
              <div>
                <p className="text-xs text-stone-500">Wind Speed</p>
                <p className="font-semibold">{weather?.wind} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
              <Sunrise size={20} className="text-emerald-600" />
              <div>
                <p className="text-xs text-stone-500">Sunrise</p>
                <p className="font-semibold text-sm">{weather?.sunrise}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-xl">
              <Sunset size={20} className="text-emerald-600" />
              <div>
                <p className="text-xs text-stone-500">Sunset</p>
                <p className="font-semibold text-sm">{weather?.sunset}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <h3 className="font-bold text-stone-800 mb-4">5-Day Forecast</h3>
          <div className="space-y-3">
            {forecast.map((day, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b last:border-0">
                <span className="font-medium w-20">{day.day}</span>
                <span className="text-2xl">{day.icon}</span>
                <span className="text-stone-600 flex-1 ml-2">{day.condition}</span>
                <span className="font-semibold">{day.temp}°C</span>
                <span className="text-xs text-blue-500 w-12 text-right">{day.rain}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Farming Tip */}
        <div className="bg-emerald-50 rounded-xl p-5 border-l-4 border-emerald-500">
          <p className="text-xs text-emerald-600 font-semibold mb-1">🌾 TODAY'S FARMING TIP</p>
          <p className="text-stone-700 text-sm">{getFarmingTip()}</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;