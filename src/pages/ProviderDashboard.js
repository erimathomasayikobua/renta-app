import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { formatLocation } from '../utils/location';
import styles from './ProviderDashboard.module.css';

const ProviderDashboard = ({ onNavigate }) => {
  const { user, isProvider } = useAuth();
  const { format } = useCurrency();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    activeBookings: 0,
    completedBookings: 0,
    rating: 4.8
  });

  useEffect(() => {
    if (!isProvider) {
      onNavigate('home');
      return;
    }
    loadProviderData();
  }, [isProvider]);

  const loadProviderData = () => {
    const allBookings = JSON.parse(localStorage.getItem('rentaAppBookings') || '[]');
    // In a real app, filter by provider ID
    const providerBookings = allBookings.slice(0, 3); // Mock data
    
    const activeBookings = providerBookings.filter(b => 
      b.status === 'confirmed' || b.status === 'pending'
    );
    
    const completedBookings = providerBookings.filter(b => b.status === 'completed');
    
    const totalEarnings = completedBookings.reduce((sum, b) => 
      sum + (b.totalAmount || 0), 0
    );
    
    setBookings(providerBookings);
    setStats({
      totalEarnings,
      activeBookings: activeBookings.length,
      completedBookings: completedBookings.length,
      rating: 4.8
    });
  };

  if (!isProvider) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className="heading-2">Provider Dashboard</h1>
          <p className="body-large" style={{ color: 'var(--color-text-secondary)' }}>
            Manage your services and bookings
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="secondary" onClick={() => onNavigate('profile')}>
            Edit Profile
          </Button>
          <Button variant="primary">Add New Service</Button>
        </div>
      </div>

      {!user.verified && (
        <Card className={styles.verificationBanner}>
          <div className={styles.bannerIcon}>⚠️</div>
          <div className={styles.bannerContent}>
            <h3 className={styles.bannerTitle}>Account Verification Pending</h3>
            <p className={styles.bannerText}>
              Your account is under review. You'll be able to receive bookings once verified.
            </p>
          </div>
          <Button variant="ghost">Learn More</Button>
        </Card>
      )}

      <div className={styles.profileCard}>
        <Card>
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{user.name}</h2>
              <p className={styles.profileLocation}>
                📍 {user.location ? formatLocation(user.location) : 'Location not set'}
              </p>
              <div className={styles.profileRating}>
                <span className={styles.ratingStars}>⭐⭐⭐⭐⭐</span>
                <span className={styles.ratingValue}>{stats.rating} (24 reviews)</span>
              </div>
            </div>
          </div>
          <div className={styles.profileCategories}>
            <strong>Service Categories:</strong>
            <div className={styles.categoryTags}>
              {user.serviceCategories && user.serviceCategories.length > 0 ? (
                user.serviceCategories.map((cat, idx) => (
                  <span key={idx} className={styles.categoryTag}>{cat}</span>
                ))
              ) : (
                <span className={styles.noCategories}>No categories selected</span>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statValue}>{format(stats.totalEarnings)}</div>
          <div className={styles.statLabel}>Total Earnings</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statValue}>{stats.activeBookings}</div>
          <div className={styles.statLabel}>Active Bookings</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statValue}>{stats.completedBookings}</div>
          <div className={styles.statLabel}>Completed</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>⭐</div>
          <div className={styles.statValue}>{stats.rating}</div>
          <div className={styles.statLabel}>Average Rating</div>
        </Card>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Bookings</h2>
          <Button variant="ghost" onClick={() => onNavigate('bookings')}>
            View All
          </Button>
        </div>
        
        {bookings.length > 0 ? (
          <div className={styles.bookingsList}>
            {bookings.map((booking) => (
              <Card key={booking.id} className={styles.bookingCard}>
                <div className={styles.bookingInfo}>
                  <h3 className={styles.bookingTitle}>{booking.itemName}</h3>
                  <p className={styles.bookingCustomer}>Customer: {booking.userName}</p>
                  <p className={styles.bookingDate}>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.bookingDetails}>
                  <div className={styles.bookingAmount}>
                    {format(booking.totalAmount)}
                  </div>
                  <span className={`${styles.badge} ${styles[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
                <div className={styles.bookingActions}>
                  {booking.status === 'pending' && (
                    <>
                      <Button variant="primary" size="small">Accept</Button>
                      <Button variant="ghost" size="small">Decline</Button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <Button variant="primary" size="small">Mark Complete</Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <h3 className={styles.emptyTitle}>No bookings yet</h3>
            <p className={styles.emptyDescription}>
              Your bookings will appear here once customers start booking your services.
            </p>
          </Card>
        )}
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <Card className={styles.actionCard}>
            <div className={styles.actionIcon}>📝</div>
            <h3 className={styles.actionTitle}>Manage Services</h3>
            <p className={styles.actionDescription}>Add or edit your service listings</p>
            <Button variant="ghost" size="small">Manage</Button>
          </Card>

          <Card className={styles.actionCard}>
            <div className={styles.actionIcon}>📅</div>
            <h3 className={styles.actionTitle}>Set Availability</h3>
            <p className={styles.actionDescription}>Update your working hours</p>
            <Button variant="ghost" size="small">Update</Button>
          </Card>

          <Card className={styles.actionCard}>
            <div className={styles.actionIcon}>💬</div>
            <h3 className={styles.actionTitle}>Messages</h3>
            <p className={styles.actionDescription}>Chat with your customers</p>
            <Button variant="ghost" size="small" onClick={() => onNavigate('chat')}>
              Open Chat
            </Button>
          </Card>

          <Card className={styles.actionCard}>
            <div className={styles.actionIcon}>📊</div>
            <h3 className={styles.actionTitle}>Analytics</h3>
            <p className={styles.actionDescription}>View your performance metrics</p>
            <Button variant="ghost" size="small">View Stats</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;