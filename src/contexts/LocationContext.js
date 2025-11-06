import React, { createContext, useContext, useState } from 'react';
import { calculateDistance } from '../utils/location';

const LocationContext = createContext(null);

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  const updateUserLocation = (location) => {
    setUserLocation(location);
    localStorage.setItem('rentaAppUserLocation', JSON.stringify(location));
  };

  const getUserLocation = () => {
    if (userLocation) return userLocation;
    
    const saved = localStorage.getItem('rentaAppUserLocation');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUserLocation(parsed);
      return parsed;
    }
    
    return null;
  };

  const getDistance = (targetLocation) => {
    const current = getUserLocation();
    if (!current?.coordinates || !targetLocation?.coordinates) {
      return null;
    }
    
    return calculateDistance(
      current.coordinates.lat,
      current.coordinates.lng,
      targetLocation.coordinates.lat,
      targetLocation.coordinates.lng
    );
  };

  const value = {
    userLocation,
    updateUserLocation,
    getUserLocation,
    getDistance
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};