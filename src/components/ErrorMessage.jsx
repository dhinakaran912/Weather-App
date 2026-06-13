import React from 'react';
import { FiAlertCircle, FiKey, FiWifiOff, FiMapPin } from 'react-icons/fi';

const ERROR_CONFIG = {
  not_found: {
    icon: <FiMapPin size={40} />,
    title: 'City Not Found',
    message: 'We couldn\'t find the city you searched for. Please check the spelling and try again.',
    color: 'var(--accent-orange)',
  },
  api_key: {
    icon: <FiKey size={40} />,
    title: 'API Key Required',
    message: (
      <>
        To use this app, you need a free OpenWeatherMap API key.
        <br /><br />
        <ol style={{ textAlign: 'left', paddingLeft: '1.2rem' }}>
          <li>Visit <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer" className="error-link">openweathermap.org/api</a> and register for free</li>
          <li>Copy your API key from the dashboard</li>
          <li>Open the <code>.env</code> file in the project root</li>
          <li>Replace <code>YOUR_OPENWEATHERMAP_API_KEY_HERE</code> with your key</li>
          <li>Restart the dev server</li>
        </ol>
      </>
    ),
    color: 'var(--accent-yellow)',
  },
  network: {
    icon: <FiWifiOff size={40} />,
    title: 'Connection Error',
    message: 'Unable to reach the weather service. Please check your internet connection and try again.',
    color: 'var(--accent-pink)',
  },
};

const ErrorMessage = ({ type }) => {
  const config = ERROR_CONFIG[type] || {
    icon: <FiAlertCircle size={40} />,
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again.',
    color: 'var(--accent-pink)',
  };

  return (
    <div className="error-container">
      <div className="error-card">
        <div className="error-icon" style={{ color: config.color }}>
          {config.icon}
        </div>
        <h3 className="error-title">{config.title}</h3>
        <div className="error-message">{config.message}</div>
      </div>
    </div>
  );
};

export default ErrorMessage;
