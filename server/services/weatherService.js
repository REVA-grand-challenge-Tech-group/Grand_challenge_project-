const axios = require('axios');

// Your FREE API key from OpenWeatherMap
const API_KEY = 'f7a8a66bfd3c72f73f7d3abaf01d8823';

const getWeather = async (city) => {
  try {
    // If no city provided, use default
    const cityName = city || 'Hassan';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    
    const response = await axios.get(url);
    
    // Format the weather data for your app
    return {
      success: true,
      temp: Math.round(response.data.main.temp),
      condition: response.data.weather[0].main,
      icon: getWeatherIcon(response.data.weather[0].main),
      humidity: response.data.main.humidity,
      advice: getFarmingAdvice(response.data.main.temp, response.data.weather[0].main)
    };
  } catch (error) {
    console.error('Weather API error:', error.message);
    // Return fallback data if API fails
    return {
      success: false,
      temp: 28,
      condition: 'Sunny',
      icon: '☀️',
      humidity: 65,
      advice: 'Good day for farming activities'
    };
  }
};

// Get weather icon based on condition
const getWeatherIcon = (condition) => {
  if (condition.includes('Rain')) return '🌧️';
  if (condition.includes('Cloud')) return '☁️';
  if (condition.includes('Clear')) return '☀️';
  return '🌤️';
};

// Get farming advice based on weather
const getFarmingAdvice = (temp, condition) => {
  if (condition.includes('Rain')) {
    return '💧 Rain expected - good for sowing, avoid spraying pesticides';
  }
  if (temp > 35) {
    return '🌞 Very hot - water crops in morning/evening';
  }
  if (temp < 15) {
    return '❄️ Cold weather - protect young plants';
  }
  return '🌱 Perfect weather for farming activities';
};

module.exports = { getWeather };