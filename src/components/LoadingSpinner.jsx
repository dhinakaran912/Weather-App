import React from 'react';

const LoadingSpinner = () => (
  <div className="loading-overlay">
    <div className="loading-content">
      <div className="weather-loader">
        <div className="loader-sun">
          <div className="sun-core" />
          {[...Array(8)].map((_, i) => (
            <div key={i} className="sun-ray" style={{ '--ray-index': i }} />
          ))}
        </div>
        <div className="loader-cloud cloud-1" />
        <div className="loader-cloud cloud-2" />
      </div>
      <div className="loading-text">Fetching weather data...</div>
      <div className="loading-dots">
        <span /><span /><span />
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
