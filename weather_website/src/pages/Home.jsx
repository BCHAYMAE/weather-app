
import { useState, useEffect } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import { getCurrentWeather } from "../services/Weather";

function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch weather whenever the selected city changes
  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCurrentWeather(
          selectedCity.latitude,
          selectedCity.longitude
        );

        setWeather(data.current);
      } catch (err) {
        setError("Unable to fetch weather data.");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main-content">
        <Header onCitySelect={setSelectedCity} />

        <main className="weather-content">
          <h1>Weather Overview</h1>

          {!selectedCity && <p>Search for a city to see its weather.</p>}

          {loading && <p>Loading weather...</p>}

          {error && <p>{error}</p>}

          {weather && selectedCity && (
            <div>
              <h2>{selectedCity.name}, {selectedCity.country}</h2>

              <h1>{weather.temperature_2m}°C</h1>

              <p>Feels like: {weather.apparent_temperature}°C</p>
              <p>Humidity: {weather.relative_humidity_2m}%</p>
              <p>Wind speed: {weather.wind_speed_10m} km/h</p>
              <p>Precipitation: {weather.precipitation} mm</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
