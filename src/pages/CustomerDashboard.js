import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCurrency } from '../contexts/CurrencyContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import styles from './CustomerDashboard.module.css';

const CustomerDashboard = ({ onNavigate }) => {
  const { user, isCustomer } = useAuth();
  const { format } = useCurrency();
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    activeBookings: 0,
    totalSpent: 0
  });

  useEffect(() => {
    if (!isCustomer) {
      onNavigate('home');
      return;
    }
    loadBookings();
  }, [isCustomer]);

  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem('rentaAppBookings') || '[]');
    const userBookings = allBookings.filter(b => b.userId === user.id);
    
    const activeBookings = userBookings.filter(b => 
      b.status === 'confirmed' || b.status === 'pending'
    );
    
    const totalSpent = userBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
    
    setBookings(userBookings);
    setStats({
      totalBookings: userBookings.length,
      activeBookings: activeBookings.length,
      totalSpent
    });
  };

  if (!isCustomer) {
    return null;
  }

  const quickActions = [
    {
      icon: '🚗',
      title: 'Book a Ride',
      description: 'Find cars, bikes, and scooters',
      action: () => onNavigate('rides')
    },
    {
      icon: '🏠',
      title: 'Find Housing',
      description: 'Browse apartments and houses',
      action: () => onNavigate('houses')
    },
    {
      icon: '🛠️',
      title: 'Get Services',
      description: 'Professional services at your door',
      action: () => onNavigate('services')
    },
    {
      icon: '💬',
      title: 'Contact Support',
      description: 'Get help from our team',
      action: () => onNavigate('support')
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className="heading-2">Welcome back, {user.name}!</h1>
          <p className="body-large" style={{ color: 'var(--color-text-secondary)' }}>
            Here's what's happening with your bookings
          </p>
        </div>
        <Button variant="primary" onClick={() => onNavigate('profile')}>
          Edit Profile
        </Button>
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statValue}>{stats.totalBookings}</div>
          <div className={styles.statLabel}>Total Bookings</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statValue}>{stats.activeBookings}</div>
          <div className={styles.statLabel}>Active Bookings</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statValue}>{format(stats.totalSpent)}</div>
          <div className={styles.statLabel}>Total Spent</div>
        </Card>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <Card key={index} className={styles.actionCard} onClick={action.action}>
              <div className={styles.actionIcon}>{action.icon}</div>
              <h3 className={styles.actionTitle}>{action.title}</h3>
              <p className={styles.actionDescription}>{action.description}</p>
            </Card>
          ))}
        </div>
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
            {bookings.slice(0, 5).map((booking) => (
              <Card key={booking.id} className={styles.bookingCard}>
                <div className={styles.bookingInfo}>
                  <h3 className={styles.bookingTitle}>{booking.itemName}</h3>
                  <p className={styles.bookingType}>{booking.itemType}</p>
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
              </Card>
            ))}
          </div>
        ) : (
          <Card className={styles.emptyState}>
            <div className={styles.emptyIcon}>📭</div>
            <h3 className={styles.emptyTitle}>No bookings yet</h3>
            <p className={styles.emptyDescription}>
              Start exploring our services and make your first booking!
            </p>
            <Button variant="primary" onClick={() => onNavigate('rides')}>
              Browse Services
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;