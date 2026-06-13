import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const [geoError, setGeoError] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lon: position.coords.longitude });
        setGeoLoading(false);
      },
      () => {
        setGeoError('Unable to retrieve location. Please search manually.');
        setGeoLoading(false);
      }
    );
  };

  useEffect(() => {
    requestLocation();
  }, []);

  return { coords, geoError, geoLoading, requestLocation };
};
