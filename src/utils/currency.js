// Currency utilities and conversion rates

export const currencies = {
  USD: { symbol: '$', name: 'US Dollar', rate: 1 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.8645 },
  GBP: { symbol: '£', name: 'British Pound', rate: 0.79 },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', rate: 1.53 },
  INR: { symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  JPY: { symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
  CNY: { symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
  MXN: { symbol: 'MX$', name: 'Mexican Peso', rate: 17.08 },
  BRL: { symbol: 'R$', name: 'Brazilian Real', rate: 4.97 },
  UGX: { symbol: 'Ushs', name: 'Ugandan Shilling', rate: 3413},
  KSHS: { symbol: 'Kshs', name: 'Kenyan Shilling', rate: 129.2419},
  TSHS: { symbol: 'Tshs', name: 'Tanzanian Shilling', rate: 2449.2192},
  NAIRA: { symbol: 'N', name: 'Nigerian Naira', rate: 2}
};

// Country to currency mapping
export const countryCurrencyMap = {
  'United States': 'USD',
  'Canada': 'CAD',
  'United Kingdom': 'GBP',
  'Germany': 'EUR',
  'France': 'EUR',
  'Spain': 'EUR',
  'Italy': 'EUR',
  'India': 'INR',
  'Japan': 'JPY',
  'China': 'CNY',
  'Mexico': 'MXN',
  'Brazil': 'BRL',
  'Australia': 'AUD'
};

// State to currency mapping (for US states and other regions)
export const stateCurrencyMap = {
  // US States
  'New York': 'USD',
  'California': 'USD',
  'Texas': 'USD',
  'Florida': 'USD',
  // Add more as needed
};

export const getCurrencyByLocation = (country, state) => {
  // First try country
  if (country && countryCurrencyMap[country]) {
    return countryCurrencyMap[country];
  }
  
  // Then try state
  if (state && stateCurrencyMap[state]) {
    return stateCurrencyMap[state];
  }
  
  // Default to USD
  return 'USD';
};

export const convertCurrency = (amount, fromCurrency, toCurrency) => {
  if (fromCurrency === toCurrency) return amount;
  
  const fromRate = currencies[fromCurrency]?.rate || 1;
  const toRate = currencies[toCurrency]?.rate || 1;
  
  // Convert to USD first, then to target currency
  const usdAmount = amount / fromRate;
  return usdAmount * toRate;
};

export const formatCurrency = (amount, currencyCode) => {
  const currency = currencies[currencyCode] || currencies.USD;
  return `${currency.symbol}${amount.toFixed(2)}`;
};

export const getCurrencyList = () => {
  return Object.entries(currencies).map(([code, data]) => ({
    code,
    ...data
  }));
};