// Weather utility functions

export const getWeatherBackground = (weatherCode, isDay = true) => {
  if (!weatherCode) return 'clear';
  
  const code = parseInt(weatherCode);
  
  if (code === 800) return isDay ? 'clear-day' : 'clear-night';
  if (code >= 801 && code <= 804) return 'cloudy';
  if (code >= 200 && code <= 232) return 'thunderstorm';
  if (code >= 300 && code <= 321) return 'drizzle';
  if (code >= 500 && code <= 531) return 'rain';
  if (code >= 600 && code <= 622) return 'snow';
  if (code >= 700 && code <= 781) return 'fog';
  
  return 'clear-day';
};

export const getWeatherGradient = (condition) => {
  const gradients = {
    'clear-day': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
    'clear-night': 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 40%, #1a0533 100%)',
    'cloudy': 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 40%, #3d3d5c 100%)',
    'thunderstorm': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 40%, #2d1b4e 100%)',
    'drizzle': 'linear-gradient(135deg, #1a2a3a 0%, #1e3a4a 40%, #2a4a5a 100%)',
    'rain': 'linear-gradient(135deg, #0d1b2a 0%, #1a2a3a 40%, #1e3a4a 100%)',
    'snow': 'linear-gradient(135deg, #1a2a3a 0%, #2a3a4a 40%, #3a4a5a 100%)',
    'fog': 'linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 40%, #3a3a4e 100%)',
  };
  return gradients[condition] || gradients['clear-day'];
};

export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toUTCString().slice(-11, -7);
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

export const formatHour = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  const hours = date.getUTCHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 || 12;
  return `${hour12} ${ampm}`;
};

export const celsiusToFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);
export const fahrenheitToCelsius = (fahrenheit) => Math.round(((fahrenheit - 32) * 5) / 9);

export const getWindDirection = (degrees) => {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(degrees / 22.5) % 16];
};

export const getUVLevel = (uv) => {
  if (uv <= 2) return { label: 'Low', color: '#4ade80' };
  if (uv <= 5) return { label: 'Moderate', color: '#fbbf24' };
  if (uv <= 7) return { label: 'High', color: '#f97316' };
  if (uv <= 10) return { label: 'Very High', color: '#ef4444' };
  return { label: 'Extreme', color: '#a855f7' };
};

export const getVisibilityLabel = (visibility) => {
  const km = visibility / 1000;
  if (km >= 10) return 'Excellent';
  if (km >= 5) return 'Good';
  if (km >= 2) return 'Moderate';
  return 'Poor';
};

export const groupForecastByDay = (forecastList) => {
  const days = {};
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    if (!days[date]) {
      days[date] = { items: [], dt: item.dt };
    }
    days[date].items.push(item);
  });
  
  return Object.entries(days).map(([date, data]) => {
    const temps = data.items.map((i) => i.main.temp);
    const midItem = data.items[Math.floor(data.items.length / 2)];
    return {
      date,
      dt: data.dt,
      tempMax: Math.round(Math.max(...temps)),
      tempMin: Math.round(Math.min(...temps)),
      icon: midItem.weather[0].icon,
      description: midItem.weather[0].description,
      pop: Math.round(Math.max(...data.items.map((i) => i.pop || 0)) * 100),
    };
  });
};
