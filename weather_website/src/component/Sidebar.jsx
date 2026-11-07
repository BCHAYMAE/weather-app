import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCloudSun,
  faHeart,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ favorites, onSelectFavorite }) {
  return (
    <aside className="sidebar">
      <h2>Weather App</h2>
      <nav>
        <ul>
          <li>
            <a href="#overview" className="active">
              <FontAwesomeIcon icon={faHouse} />
              The Situation
            </a>
          </li>
          <li>
            <a href="#favorites">
              <FontAwesomeIcon icon={faHeart} />
              My Favorites
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-favorites" id="favorites">
        <h3>Favorite Cities</h3>

        {favorites.length === 0 && (
          <p className="no-favorites">
            No favorite cities yet.
          </p>
        )}

        {favorites.map((city) => (
          <button
            key={city.id}
            onClick={() => onSelectFavorite(city)}
          >
            <FontAwesomeIcon icon={faStar} />
            {city.name}
          </button>
        ))}
      </div>
      <div className="sidebar-footer">
        <p>Weather App</p>
        <span>Powered by Open-Meteo</span>
      </div>
    </aside>
  );
}
export default Sidebar;