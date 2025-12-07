// src/services/weatherService.js
import axios from 'axios';

// Your OpenWeatherMap API key (replace with your real key)
const api_key = 'YOUR_REAL_API_KEY'; 
const base_url = 'https://api.openweathermap.org/data/2.5';

// Get current weather
export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${base_url}/weather`, {
      params: {
        q: city,       // city name + country code, e.g., 'Oujda,MA'
        units: 'metric', // temperature in Celsius
        appid: api_key
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error.response?.data || error.message);
    return null;
  }
};

// Get 5-day forecast
export const getForecast = async (city) => {
  try {
    const response = await axios.get(`${base_url}/forecast`, {
      params: {
        q: city,
        units: 'metric',
        appid: api_key
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error.response?.data || error.message);
    return null;
  }
};
