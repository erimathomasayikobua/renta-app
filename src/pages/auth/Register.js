import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCurrency } from '../../contexts/CurrencyContext';
import Input, { Select } from '../../components/common/Input';
import Button from '../../components/common/Button';
import { countries, getStatesByCountry } from '../../utils/location';
import { getCurrencyList } from '../../utils/currency';
import styles from './Login.module.css';

const Register = ({ onNavigate }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'customer',
    country: '',
    state: '',
    city: '',
    address: '',
    currency: 'USD',
    serviceCategories: []
  });
  const [availableStates, setAvailableStates] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { autoDetectCurrency } = useCurrency();

  useEffect(() => {
    if (formData.country) {
      const states = getStatesByCountry(formData.country);
      setAvailableStates(states);
      
      // Auto-detect currency based on country
      autoDetectCurrency(formData.country, formData.state);
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    setError('');
    
    // Reset state if country changes
    if (name === 'country') {
      setFormData(prev => ({ ...prev, state: '' }));
    }
  };

  const handleServiceCategoryChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData({
      ...formData,
      serviceCategories: selected
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Prepare location data
    const locationData = formData.country ? {
      country: formData.country,
      state: formData.state,
      city: formData.city,
      address: formData.address
    } : null;

    const result = await register({
      ...formData,
      location: locationData
    });
    
    if (result.success) {
      onNavigate('home');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Join Renta today</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.error}>{error}</div>}
          
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          
          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
          
          <Select
            label="Account Type"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: 'customer', label: 'Customer' },
              { value: 'provider', label: 'Service Provider' }
            ]}
            required
          />

          {formData.role === 'provider' && (
            <>
              <Select
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Select Country' },
                  ...countries.map(c => ({ value: c, label: c }))
                ]}
                required
              />

              {availableStates.length > 0 && (
                <Select
                  label="State/Province"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Select State' },
                    ...availableStates.map(s => ({ value: s, label: s }))
                  ]}
                  required
                />
              )}

              <Input
                label="City"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
              />

              <Input
                label="Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />

              <Select
                label="Currency Preference"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                options={getCurrencyList().map(c => ({
                  value: c.code,
                  label: `${c.name} (${c.symbol})`
                }))}
                required
              />

              <div>
                <label className={styles.label}>Service Categories (Hold Ctrl/Cmd to select multiple)</label>
                <select
                  name="serviceCategories"
                  multiple
                  value={formData.serviceCategories}
                  onChange={handleServiceCategoryChange}
                  className={styles.multiSelect}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--color-border-light)',
                    minHeight: '100px'
                  }}
                >
                  <option value="cleaning">Cleaning</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="moving">Moving</option>
                  <option value="handyman">Handyman</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="painting">Painting</option>
                  <option value="carpentry">Carpentry</option>
                </select>
              </div>
            </>
          )}
          
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
          
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <div className={styles.footer}>
          Already have an account?{' '}
          <span className={styles.link} onClick={() => onNavigate('login')}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;