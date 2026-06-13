import React from 'react';
import { FiWind, FiDroplet, FiEye, FiThermometer, FiSunrise, FiSunset } from 'react-icons/fi';
import { WiHumidity, WiBarometer } from 'react-icons/wi';
import { getWeatherIcon, formatTime, celsiusToFahrenheit } from '../utils/weatherUtils';

const WeatherCard = ({ weather, isCelsius }) => {
  if (!weather) return null;

  const temp = isCelsius
    ? Math.round(weather.main.temp)
    : celsiusToFahrenheit(weather.main.temp);
  const feelsLike = isCelsius
    ? Math.round(weather.main.feels_like)
    : celsiusToFahrenheit(weather.main.feels_like);
  const unit = isCelsius ? '°C' : '°F';
  const iconUrl = getWeatherIcon(weather.weather[0].icon);
  const isDay = weather.weather[0].icon.endsWith('d');
  const sunrise = formatTime(weather.sys.sunrise, weather.timezone);
  const sunset = formatTime(weather.sys.sunset, weather.timezone);

  return (
    <div className="weather-card">
      {/* City & Country */}
      <div className="city-info">
        <div className="city-name">
          {weather.name}
          <span className="country-badge">{weather.sys.country}</span>
        </div>
        <div className="weather-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
          })}
        </div>
      </div>

      {/* Main temp + icon */}
      <div className="main-weather d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div className="temp-block">
          <div className="temperature">
            {temp}
            <span className="unit">{unit}</span>
          </div>
          <div className="feels-like">Feels like {feelsLike}{unit}</div>
          <div className="weather-desc">{weather.weather[0].description}</div>
        </div>
        <div className="weather-icon-wrap">
          <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon-large" />
          <div className="weather-condition-badge">
            {isDay ? '☀️ Day' : '🌙 Night'}
          </div>
        </div>
      </div>

      {/* Sun info */}
      <div className="sun-info d-flex gap-4 mt-2">
        <div className="sun-item">
          <FiSunrise className="sun-icon sunrise" />
          <span>{sunrise}</span>
        </div>
        <div className="sun-item">
          <FiSunset className="sun-icon sunset" />
          <span>{sunset}</span>
        </div>
      </div>

      {/* Quick stats row */}
      <div className="quick-stats row g-2 mt-3">
        <div className="col-6 col-md-3">
          <div className="stat-chip">
            <WiHumidity className="stat-icon humidity" />
            <div>
              <div className="stat-value">{weather.main.humidity}%</div>
              <div className="stat-label">Humidity</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-chip">
            <FiWind className="stat-icon wind" />
            <div>
              <div className="stat-value">{Math.round(weather.wind.speed * 3.6)} km/h</div>
              <div className="stat-label">Wind</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-chip">
            <FiEye className="stat-icon visibility" />
            <div>
              <div className="stat-value">{(weather.visibility / 1000).toFixed(1)} km</div>
              <div className="stat-label">Visibility</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="stat-chip">
            <WiBarometer className="stat-icon pressure" />
            <div>
              <div className="stat-value">{weather.main.pressure} hPa</div>
              <div className="stat-label">Pressure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
