
import { useState, useEffect } from "react";
import Header from "../component/Header";
import Sidebar from "../component/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import {
  getCurrentWeather,
  getWeatherDescription,
  getWeatherIcon,
  getWindDirection,
} from "../services/Weather";

function Home() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);

  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [temperatureUnit, setTemperatureUnit] = useState("°C");

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("weather-favorites") || "[]"
      );
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem(
      "weather-favorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const convertTemperature = (temperature) => {
    if (temperatureUnit === "°F") {
      return (temperature * 9) / 5 + 32;
    }
    return temperature;
  };

  const handleUnitChange = () => {
    setTemperatureUnit((currentUnit) =>
      currentUnit === "°C" ? "°F" : "°C"
    );
  };

  const handleToggleFavorite = () => {
    if (!selectedCity) return;

    const alreadyFavorite = favorites.some(
      (city) => city.id === selectedCity.id
    );

    if (alreadyFavorite) {
      setFavorites(
        favorites.filter((city) => city.id !== selectedCity.id)
      );
    } else {
      setFavorites([...favorites, selectedCity]);
    }
  };

  const isFavorite = selectedCity
    ? favorites.some((city) => city.id === selectedCity.id)
    : false;
    
    const formatTime = (dateTime) => {
    if (!dateTime) return "--:--";

    return dateTime.split("T")[1]?.slice(0, 5) || "--:--";
  };

  useEffect(() => {
    if (!selectedCity) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError("");

        setWeather(null);
        setHourlyForecast([]);
        setDailyForecast([]);
        setSunrise(null);
        setSunset(null);

        const data = await getCurrentWeather(
          selectedCity.latitude,
          selectedCity.longitude
        );

        setWeather(data.current);

        const currentIndex = data.hourly.time.findIndex(
          (time) => time === data.current.time
        );

        const startIndex = Math.max(0, currentIndex);

        const forecast = data.hourly.time
          .slice(startIndex, startIndex + 8)
          .map((time, index) => ({
            time,
            temperature: data.hourly.temperature_2m[startIndex + index],
            weatherCode: data.hourly.weather_code[startIndex + index],
          }));

        setHourlyForecast(forecast);

        const daily = data.daily.time.map((date, index) => ({
          date,
          maxTemp: data.daily.temperature_2m_max[index],
          minTemp: data.daily.temperature_2m_min[index],
          weatherCode: data.daily.weather_code[index],
        }));

        setDailyForecast(daily);

        setSunrise(data.daily.sunrise[0]);
        setSunset(data.daily.sunset[0]);

      } catch (err) {
        console.error(err);
        setError("Unable to fetch weather data.");

        setWeather(null);
        setHourlyForecast([]);
        setDailyForecast([]);
        setSunrise(null);
        setSunset(null);

      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity]);

  return (
    <div className="dashboard">
      <Sidebar
        favorites={favorites}
        onSelectFavorite={setSelectedCity}
      />

      <div className="main-content">
        <Header
          onCitySelect={setSelectedCity}
          temperatureUnit={temperatureUnit}
          onUnitChange={handleUnitChange}
        />

        <main className="weather-content" id="overview">
          <h1>Weather Overview</h1>

          {!selectedCity && (
            <p>Search for a city to see its weather.</p>
          )}

          {loading && (
            <div className="status-message loading-message">
              Loading weather data...
            </div>
          )}

          {error && (
            <div className="status-message error-message">
              {error}
            </div>
          )}

          {weather && selectedCity && (
            <div className="weather-dashboard">
              <div className="current-weather">
                <div className="current-weather-info">
                  <h2>
                    {selectedCity.name}, {selectedCity.country}
                  </h2>

                  <p>
                    {getWeatherDescription(weather.weather_code)}
                  </p>

                  <div className="current-weather-icon">
                    {getWeatherIcon(weather.weather_code)}
                  </div>
                </div>

                <h1>
                  {convertTemperature(weather.temperature_2m).toFixed(1)}
                  {temperatureUnit}
                </h1>

                <p>
                  Feels like{" "}
                  {convertTemperature(weather.apparent_temperature).toFixed(1)}
                  {temperatureUnit}
                </p>

                <button
                  className="favorite-button"
                  onClick={handleToggleFavorite}
                >
                  {isFavorite
                    ? "★ Remove from Favorites"
                    : "☆ Add to Favorites"}
                </button>
              </div>

              <div className="weather-cards">
                <div className="weather-card">
                  <h3>Humidity</h3>
                  <p>{weather.relative_humidity_2m}%</p>
                </div>

                <div className="weather-card">
                  <h3>Wind Speed</h3>
                  <p>{weather.wind_speed_10m} km/h</p>
                </div>

                <div className="weather-card">
                  <h3>Precipitation</h3>
                  <p>{weather.precipitation} mm</p>
                </div>

                <div className="weather-card">
                  <h3>Wind Direction</h3>
                  <p>
                    {getWindDirection(weather.wind_direction_10m)}
                  </p>
                </div>
              </div>

                <div className="sun-section">
                <div className="sun-card">
                    <h3>
                    <FontAwesomeIcon icon={faSun} />
                    Sun's Clocking In
                    </h3>
                    <p>{formatTime(sunrise)}</p>
                </div>

                <div className="sun-card">
                    <h3>
                    <FontAwesomeIcon icon={faMoon} />
                    Sun's Clocking Out
                    </h3>
                    <p>{formatTime(sunset)}</p>
                </div>
                </div>

              <div className="hourly-section" id="hourly">
                <h2>Hourly Forecast</h2>

                <div className="hourly-cards">
                  {hourlyForecast.map((hour) => (
                    <div className="hourly-card" key={hour.time}>
                      <p>
                        {new Date(hour.time).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      <div className="forecast-icon">
                        {getWeatherIcon(hour.weatherCode)}
                      </div>

                      <h3>
                        {convertTemperature(hour.temperature).toFixed(1)}
                        {temperatureUnit}
                      </h3>

                      <p>
                        {getWeatherDescription(hour.weatherCode)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="daily-section" id="daily">
                <h2>7-Day Forecast</h2>

                <div className="daily-cards">
                  {dailyForecast.map((day) => (
                    <div className="daily-card" key={day.date}>
                      <h3>
                        {new Date(day.date + "T12:00:00").toLocaleDateString(
                          "en-US",
                          { weekday: "short" }
                        )}
                      </h3>

                      <div className="forecast-icon">
                        {getWeatherIcon(day.weatherCode)}
                      </div>

                      <p>
                        {getWeatherDescription(day.weatherCode)}
                      </p>

                      <div className="daily-temperatures">
                        <strong>
                          {convertTemperature(day.maxTemp).toFixed(1)}
                          {temperatureUnit}
                        </strong>

                        <span>
                          {convertTemperature(day.minTemp).toFixed(1)}
                          {temperatureUnit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;
