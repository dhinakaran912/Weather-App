import React from 'react';
import {
  FiWind, FiEye, FiDroplet, FiThermometer,
} from 'react-icons/fi';
import { WiBarometer, WiCloudy } from 'react-icons/wi';
import { BsArrowUpRight } from 'react-icons/bs';
import {
  getWindDirection, getVisibilityLabel, getUVLevel, celsiusToFahrenheit,
} from '../utils/weatherUtils';

const WeatherDetails = ({ weather, isCelsius }) => {
  if (!weather) return null;

  const unit = isCelsius ? '°C' : '°F';
  const windDir = getWindDirection(weather.wind.deg || 0);
  const visLabel = getVisibilityLabel(weather.visibility);
  const dewPoint = isCelsius
    ? Math.round(weather.main.temp - ((100 - weather.main.humidity) / 5))
    : celsiusToFahrenheit(Math.round(weather.main.temp - ((100 - weather.main.humidity) / 5)));

  const details = [
    {
      icon: <FiWind />,
      label: 'Wind Speed',
      value: `${Math.round(weather.wind.speed * 3.6)} km/h`,
      sub: `Direction: ${windDir}`,
      color: 'var(--accent-blue)',
    },
    {
      icon: <FiDroplet />,
      label: 'Humidity',
      value: `${weather.main.humidity}%`,
      sub: `Dew point: ${dewPoint}${unit}`,
      color: 'var(--accent-cyan)',
      bar: weather.main.humidity,
    },
    {
      icon: <FiEye />,
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      sub: visLabel,
      color: 'var(--accent-purple)',
    },
    {
      icon: <WiBarometer />,
      label: 'Pressure',
      value: `${weather.main.pressure} hPa`,
      sub: weather.main.pressure > 1013 ? 'High pressure' : 'Low pressure',
      color: 'var(--accent-orange)',
    },
    {
      icon: <FiThermometer />,
      label: 'Feels Like',
      value: isCelsius
        ? `${Math.round(weather.main.feels_like)}${unit}`
        : `${celsiusToFahrenheit(weather.main.feels_like)}${unit}`,
      sub: weather.main.feels_like < weather.main.temp ? 'Colder than actual' : 'Warmer than actual',
      color: 'var(--accent-pink)',
    },
    {
      icon: <WiCloudy />,
      label: 'Cloud Cover',
      value: `${weather.clouds?.all || 0}%`,
      sub: weather.clouds?.all > 70 ? 'Overcast' : weather.clouds?.all > 30 ? 'Partly cloudy' : 'Clear skies',
      color: 'var(--accent-teal)',
      bar: weather.clouds?.all || 0,
    },
  ];

  return (
    <div className="details-section">
      <h3 className="section-title">Weather Details</h3>
      <div className="row g-3">
        {details.map((item, idx) => (
          <div key={idx} className="col-6 col-md-4">
            <div className="detail-card" style={{ '--detail-color': item.color }}>
              <div className="detail-icon" style={{ color: item.color }}>
                {item.icon}
              </div>
              <div className="detail-label">{item.label}</div>
              <div className="detail-value">{item.value}</div>
              <div className="detail-sub">{item.sub}</div>
              {item.bar !== undefined && (
                <div className="detail-bar-wrap">
                  <div
                    className="detail-bar"
                    style={{ width: `${item.bar}%`, background: item.color }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
