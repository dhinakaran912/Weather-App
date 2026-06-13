import { useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherByCity = useCallback(async (city) => {
    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY_HERE') {
      setError('api_key');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, {
          params: { q: city, appid: API_KEY, units: 'metric' },
        }),
        axios.get(`${BASE_URL}/forecast`, {
          params: { q: city, appid: API_KEY, units: 'metric' },
        }),
      ]);
      setWeather(currentRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('not_found');
      } else if (err.response?.status === 401) {
        setError('api_key');
      } else {
        setError('network');
      }
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat, lon) => {
    if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY_HERE') {
      setError('api_key');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, {
          params: { lat, lon, appid: API_KEY, units: 'metric' },
        }),
        axios.get(`${BASE_URL}/forecast`, {
          params: { lat, lon, appid: API_KEY, units: 'metric' },
        }),
      ]);
      setWeather(currentRes.data);
      setForecast(forecastRes.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('api_key');
      } else {
        setError('network');
      }
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { weather, forecast, loading, error, fetchWeatherByCity, fetchWeatherByCoords };
};
