import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import Input, { Select } from '../components/common/Input';
import Button from '../components/common/Button';
import { countries, getStatesByCountry } from '../utils/location';
import { getCurrencyList } from '../utils/currency';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { changeCurrency, selectedCurrency } = useCurrency();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    country: user.location?.country || '',
    state: user.location?.state || '',
    city: user.location?.city || '',
    address: user.location?.address || '',
    currency: user.currency || selectedCurrency
  });
  const [availableStates, setAvailableStates] = useState([]);
  const [success, setSuccess] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (formData.country) {
      const states = getStatesByCountry(formData.country);
      setAvailableStates(states);
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Reset state if country changes
    if (name === 'country') {
      setFormData(prev => ({ ...prev, state: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare location data
    const locationData = formData.country ? {
      country: formData.country,
      state: formData.state,
      city: formData.city,
      address: formData.address
    } : null;
    
    updateProfile({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: locationData,
      currency: formData.currency
    });
    
    // Update currency preference
    changeCurrency(formData.currency);
    
    setSuccess(true);
    setEditing(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      country: user.location?.country || '',
      state: user.location?.state || '',
      city: user.location?.city || '',
      address: user.location?.address || '',
      currency: user.currency || selectedCurrency
    });
    setEditing(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="heading-2">My Profile</h1>
      </div>

      <div className={styles.avatarSection}>
        <div className={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </div>
        <h2 className="heading-4">{user.name}</h2>
        <p className="body-base" style={{ color: 'var(--color-text-secondary)' }}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>

      <div className={styles.card}>
        {success && (
          <div className={styles.success}>
            Profile updated successfully!
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editing}
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editing}
            required
          />

          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editing}
          />

          <div className={styles.sectionDivider}>
            <h3 className={styles.sectionTitle}>Location</h3>
          </div>

          <Select
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled={!editing}
            options={[
              { value: '', label: 'Select Country' },
              ...countries.map(c => ({ value: c, label: c }))
            ]}
          />

          {availableStates.length > 0 && (
            <Select
              label="State/Province"
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={!editing}
              options={[
                { value: '', label: 'Select State' },
                ...availableStates.map(s => ({ value: s, label: s }))
              ]}
            />
          )}

          <Input
            label="City"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!editing}
          />

          <Input
            label="Address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={!editing}
          />

          <div className={styles.sectionDivider}>
            <h3 className={styles.sectionTitle}>Preferences</h3>
          </div>

          <Select
            label="Currency Preference"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            disabled={!editing}
            options={getCurrencyList().map(c => ({
              value: c.code,
              label: `${c.name} (${c.symbol})`
            }))}
          />

          <div className={styles.formActions}>
            {editing ? (
              <>
                <Button variant="ghost" onClick={handleCancel} type="button">
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setEditing(true)} type="button">
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;