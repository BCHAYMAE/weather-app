
import axios from "axios";

// API URLs
const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// Search for a city
export const searchCity = async (city) => {
  const response = await axios.get(GEO_URL, {
    params: {
      name: city,
      count: 5,
      language: "en",
      format: "json",
    },
  });

  return response.data.results || [];
};

// Get current weather using city coordinates
export const getCurrentWeather = async (latitude, longitude) => {
  const response = await axios.get(WEATHER_URL, {
    params: {
      latitude,
      longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "weather_code",
        "wind_speed_10m",
        "wind_direction_10m",
      ].join(","),
      timezone: "auto",
    },
  });

  return response.data;
};
