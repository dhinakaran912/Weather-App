import React from 'react';
import { FiDroplet } from 'react-icons/fi';
import { getWeatherIcon, formatHour, celsiusToFahrenheit } from '../utils/weatherUtils';

const HourlyStrip = ({ forecastList, timezone, isCelsius }) => {
  if (!forecastList || forecastList.length === 0) return null;

  const next24 = forecastList.slice(0, 8);

  return (
    <div className="hourly-section">
      <h3 className="section-title">Hourly Forecast</h3>
      <div className="hourly-scroll">
        {next24.map((item, idx) => {
          const temp = isCelsius
            ? Math.round(item.main.temp)
            : celsiusToFahrenheit(item.main.temp);
          const unit = isCelsius ? '°C' : '°F';
          const iconUrl = getWeatherIcon(item.weather[0].icon);
          const pop = Math.round((item.pop || 0) * 100);

          return (
            <div key={item.dt} className="hourly-card" style={{ animationDelay: `${idx * 0.05}s` }}>
              <div className="hourly-time">
                {idx === 0 ? 'Now' : formatHour(item.dt, timezone)}
              </div>
              <img src={iconUrl} alt={item.weather[0].description} className="hourly-icon" />
              <div className="hourly-temp">
                {temp}{unit}
              </div>
              {pop > 0 && (
                <div className="hourly-pop">
                  <FiDroplet size={10} />
                  {pop}%
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyStrip;
