import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';

import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import HourlyStrip from './components/HourlyStrip';
import WeatherDetails from './components/WeatherDetails';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import ThemeToggle from './components/ThemeToggle';

import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { getWeatherBackground, getWeatherGradient, groupForecastByDay } from './utils/weatherUtils';

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [isCelsius, setIsCelsius] = useState(true);
  const { weather, forecast, loading, error, fetchWeatherByCity, fetchWeatherByCoords } = useWeather();
  const { coords, geoLoading, requestLocation } = useGeolocation();

  // Fetch weather when coords are available
  useEffect(() => {
    if (coords) {
      fetchWeatherByCoords(coords.lat, coords.lon);
    }
  }, [coords]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const bgCondition = weather
    ? getWeatherBackground(weather.weather[0].id, weather.weather[0].icon.endsWith('d'))
    : 'clear-day';
  const bgGradient = getWeatherGradient(bgCondition);
  const forecastDays = forecast ? groupForecastByDay(forecast.list).slice(0, 5) : [];

  return (
    <div
      className={`app-root ${isDark ? 'dark' : 'light'}`}
      style={{ background: bgGradient }}
    >
      {/* Animated BG particles */}
      <div className="bg-particles">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="particle" style={{ '--i': i }} />
        ))}
      </div>

      {/* Navbar */}
      <nav className="app-navbar">
        <div className="container-xl">
          <div className="navbar-inner d-flex align-items-center justify-content-between">
            <div className="brand">
              <span className="brand-icon">⛅</span>
              <span className="brand-name">WeatherNow</span>
            </div>
            <div className="navbar-controls d-flex align-items-center gap-3">
              {/* Unit toggle */}
              <button
                className="unit-toggle"
                onClick={() => setIsCelsius(!isCelsius)}
                title="Toggle temperature unit"
              >
                <span className={isCelsius ? 'active-unit' : ''}>°C</span>
                <span className="unit-divider">|</span>
                <span className={!isCelsius ? 'active-unit' : ''}>°F</span>
              </button>
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            </div>
          </div>
        </div>
      </nav>

      <main className="app-main">
        <div className="container-xl">
          {/* Header */}
          <div className="app-header text-center">
            <h1 className="app-title">Real-Time Weather</h1>
            <p className="app-subtitle">
              Accurate forecasts for any city worldwide
            </p>
          </div>

          {/* Search */}
          <div className="search-section">
            <SearchBar
              onSearch={fetchWeatherByCity}
              onLocationClick={requestLocation}
              loading={loading || geoLoading}
            />
          </div>

          {/* Loading */}
          {loading && <LoadingSpinner />}

          {/* Error */}
          {!loading && error && <ErrorMessage type={error} />}

          {/* Weather Content */}
          {!loading && !error && weather && (
            <div className="weather-content">
              {/* Main card */}
              <WeatherCard
                weather={weather}
                isCelsius={isCelsius}
              />

              {/* Hourly */}
              {forecast && (
                <HourlyStrip
                  forecastList={forecast.list}
                  timezone={weather.timezone}
                  isCelsius={isCelsius}
                />
              )}

              {/* 5-Day Forecast */}
              {forecastDays.length > 0 && (
                <div className="forecast-section">
                  <h3 className="section-title">5-Day Forecast</h3>
                  <div className="forecast-grid">
                    {forecastDays.map((day, idx) => (
                      <ForecastCard
                        key={day.date}
                        day={day}
                        isCelsius={isCelsius}
                        index={idx}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Details grid */}
              <WeatherDetails weather={weather} isCelsius={isCelsius} />
            </div>
          )}

          {/* Welcome screen (no weather yet) */}
          {!loading && !error && !weather && (
            <div className="welcome-screen">
              <div className="welcome-icon">🌤️</div>
              <h2 className="welcome-title">Welcome to WeatherNow</h2>
              <p className="welcome-text">
                Search for any city or allow location access to see real-time weather data.
              </p>
              <div className="popular-cities">
                <p className="popular-label">Popular Cities</p>
                <div className="city-chips d-flex flex-wrap justify-content-center gap-2">
                  {['London', 'New York', 'Tokyo', 'Mumbai', 'Paris', 'Dubai'].map((city) => (
                    <button
                      key={city}
                      className="city-chip"
                      onClick={() => fetchWeatherByCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container-xl">
          <div className="footer-inner d-flex flex-wrap align-items-center justify-content-between gap-2">
            <span>
              ⛅ <strong>WeatherNow</strong> — Powered by{' '}
              <a href="https://openweathermap.org" target="_blank" rel="noreferrer" className="footer-link">
                OpenWeatherMap
              </a>
            </span>
            <span className="footer-note">
              Built with React + Bootstrap + ❤️
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
