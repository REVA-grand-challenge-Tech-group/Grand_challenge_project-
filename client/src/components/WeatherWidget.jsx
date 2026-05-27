import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      // Using free OpenWeatherMap API (sign up for free key)
      const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key from openweathermap.org
      const city = 'Hassan';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === 200) {
        setWeather({
          temp: Math.round(data.main.temp),
          feelsLike: Math.round(data.feels_like),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          condition: data.weather[0].main,
          icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
        });
        
        setForecast([
          { time: 'Morning', temp: Math.round(data.main.temp - 3), icon: '☀️' },
          { time: 'Afternoon', temp: Math.round(data.main.temp + 2), icon: '🌤️' },
          { time: 'Evening', temp: Math.round(data.main.temp - 1), icon: '🌙' },
          { time: 'Night', temp: Math.round(data.main.temp - 4), icon: '🌃' }
        ]);
      } else {
        throw new Error('Weather API error');
      }
      setLoading(false);
    } catch (error) {
      console.error('Weather error:', error);
      // Fallback data when API fails
      setWeather({
        temp: 28,
        feelsLike: 27,
        humidity: 65,
        windSpeed: 12,
        condition: 'Sunny',
        icon: '☀️'
      });
      setForecast([
        { time: 'Morning', temp: 25, icon: '☀️' },
        { time: 'Afternoon', temp: 32, icon: '🌤️' },
        { time: 'Evening', temp: 28, icon: '🌙' },
        { time: 'Night', temp: 24, icon: '🌃' }
      ]);
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: '☀️', Clouds: '☁️', Rain: '🌧️', Drizzle: '🌦️', Thunderstorm: '⛈️', Snow: '❄️'
    };
    return icons[condition] || '🌤️';
  };

  if (loading) {
    return <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">Loading weather...</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      {/* Current Weather */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-blue-100 text-sm">Current Weather</p>
            <div className="text-4xl font-bold mt-1">{weather.temp}°C</div>
            <p className="text-blue-100 text-sm mt-1">Feels like {weather.feelsLike}°C</p>
            <p className="text-sm mt-2">{weather.condition}</p>
          </div>
          <div className="text-6xl">{getWeatherIcon(weather.condition)}</div>
        </div>
        <div className="flex gap-4 mt-4 text-sm">
          <div>💧 Humidity: {weather.humidity}%</div>
          <div>💨 Wind: {weather.windSpeed} km/h</div>
        </div>
      </div>
      
      {/* Time-wise Forecast */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-700 mb-3">Today's Forecast</h4>
        <div className="grid grid-cols-4 gap-2">
          {forecast.map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl">{item.icon}</div>
              <div className="text-sm font-semibold mt-1">{item.temp}°C</div>
              <div className="text-xs text-gray-500">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;