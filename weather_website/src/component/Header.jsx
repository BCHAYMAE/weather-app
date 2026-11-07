
import { useState } from "react";
import { searchCity } from "../services/Weather";

function Header({ onCitySelect }) {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Search for a city when the form is submitted
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    try {
      setLoading(true);
      setError("");
      setCities([]);

      const results = await searchCity(city);

      setCities(results);

      if (results.length === 0) {
        setError("No cities found.");
      }
    } catch (err) {
      console.error(err);
      setError("Search failed. Check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // Select a city from the results
  const handleSelectCity = (selectedCity) => {
    onCitySelect(selectedCity);
    setCity("");
    setCities([]);
    setError("");
  };

  return (
    <header className="header">
      <div className="header-search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="search-error">{error}</p>}

        {cities.length > 0 && (
          <div className="search-results">
            {cities.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => handleSelectCity(item)}
              >
                {item.name}, {item.country}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="header-actions">
        <button>°C</button>
        <button>Settings</button>
      </div>
    </header>
  );
}

export default Header;
