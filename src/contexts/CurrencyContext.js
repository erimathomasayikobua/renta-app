import React, { createContext, useContext, useState, useEffect } from 'react';
import { currencies, convertCurrency, formatCurrency, getCurrencyByLocation } from '../utils/currency';

const CurrencyContext = createContext(null);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    // Load saved currency preference
    const savedCurrency = localStorage.getItem('rentaAppCurrency');
    if (savedCurrency && currencies[savedCurrency]) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  const changeCurrency = (currencyCode) => {
    if (currencies[currencyCode]) {
      setSelectedCurrency(currencyCode);
      localStorage.setItem('rentaAppCurrency', currencyCode);
    }
  };

  const autoDetectCurrency = (country, state) => {
    const detectedCurrency = getCurrencyByLocation(country, state);
    changeCurrency(detectedCurrency);
  };

  const convert = (amount, fromCurrency = 'USD') => {
    return convertCurrency(amount, fromCurrency, selectedCurrency);
  };

  const format = (amount, fromCurrency = 'USD') => {
    const convertedAmount = convert(amount, fromCurrency);
    return formatCurrency(convertedAmount, selectedCurrency);
  };

  const value = {
    selectedCurrency,
    currencySymbol: currencies[selectedCurrency]?.symbol || '$',
    currencyName: currencies[selectedCurrency]?.name || 'US Dollar',
    changeCurrency,
    autoDetectCurrency,
    convert,
    format,
    currencies
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};