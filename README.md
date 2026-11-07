# Weather App

A simple and responsive weather application built with React and Vite. It allows users to search for cities and check current weather conditions, hourly forecasts, and a 7-day forecast.

## Features

- Search for cities around the world.
- Display current weather conditions.
- View temperature, humidity, wind speed, and precipitation.
- Check wind direction.
- View the next 8 hours of weather.
- View a 7-day weather forecast.
- Display sunrise and sunset times.
- Switch between Celsius and Fahrenheit.
- Add and remove favorite cities.
- Save favorite cities using Local Storage.
- Responsive design for different screen sizes.

## Technologies Used

- **React** – Building the user interface.
- **Vite** – Development environment and build tool.
- **JavaScript** – Application logic.
- **CSS** – Styling and responsive layout.
- **Axios** – Making HTTP requests.
- **Font Awesome** – Icons.
- **Open-Meteo API** – Weather and geocoding data.

## APIs

This project uses two Open-Meteo APIs:

- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api) – Searches for cities and retrieves their coordinates.
- [Weather Forecast API](https://open-meteo.com/en/docs) – Retrieves current weather and forecast information.

No API key is required.

## Installation

Clone the repository:

```bash
git clone https://github.com/BCHAYMAE/weather-app.git
```

Navigate to the project directory:

```bash
cd weather_website
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Project Structure

```text
weather_website/
├── public/
├── src/
│   ├── component/
│   │   ├── Header.jsx
│   │   └── Sidebar.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── services/
│   │   └── Weather.jsx
│   ├── styles/
│   │   ├── global.css
│   │   └── layout.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Running the Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Data Source

Weather information is provided by [Open-Meteo](https://open-meteo.com/).

---

**Developed with React and Open-Meteo.**