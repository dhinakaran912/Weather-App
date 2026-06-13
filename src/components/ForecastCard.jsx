import React from 'react';
import { FiDroplet } from 'react-icons/fi';
import { getWeatherIcon, celsiusToFahrenheit } from '../utils/weatherUtils';

const ForecastCard = ({ day, isCelsius, index }) => {
  const maxTemp = isCelsius ? day.tempMax : celsiusToFahrenheit(day.tempMax);
  const minTemp = isCelsius ? day.tempMin : celsiusToFahrenheit(day.tempMin);
  const unit = isCelsius ? '°C' : '°F';
  const iconUrl = getWeatherIcon(day.icon);

  return (
    <div
      className="forecast-card"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      <div className="forecast-date">{day.date}</div>
      <img src={iconUrl} alt={day.description} className="forecast-icon" />
      <div className="forecast-desc">{day.description}</div>
      {day.pop > 0 && (
        <div className="forecast-pop">
          <FiDroplet className="pop-icon" />
          {day.pop}%
        </div>
      )}
      <div className="forecast-temps">
        <span className="temp-high">{maxTemp}{unit}</span>
        <span className="temp-separator">/</span>
        <span className="temp-low">{minTemp}{unit}</span>
      </div>
    </div>
  );
};

export default ForecastCard;
