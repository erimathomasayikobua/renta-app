import React from 'react';
import { useBooking } from '../contexts/BookingContext';
import { ridesData, housesData, servicesData } from '../utils/mockData';
import Button from '../components/common/Button';
import styles from './Bookings.module.css';

const Bookings = ({ onNavigate }) => {
  const { bookings, cancelBooking } = useBooking();

  const getItemDetails = (booking) => {
    let allItems = [];
    if (booking.itemType === 'ride') {
      allItems = ridesData;
    } else if (booking.itemType === 'house') {
      allItems = housesData;
    } else if (booking.itemType === 'service') {
      allItems = servicesData;
    }
    return allItems.find(item => item.id === booking.itemId);
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className="heading-2">My Bookings</h1>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📋</div>
          <h3 className="heading-4">No bookings yet</h3>
          <p className="body-base" style={{ marginTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
            Start exploring and book your first ride, home, or service!
          </p>
          <Button variant="primary" onClick={() => onNavigate('home')}>
            Explore Now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="heading-2">My Bookings</h1>
        <p className="body-large">Manage all your bookings in one place</p>
      </div>

      <div className={styles.bookingsList}>
        {bookings.map((booking) => {
          const itemDetails = getItemDetails(booking);
          return (
            <div key={booking.id} className={styles.bookingCard}>
              {itemDetails && (
                <img
                  src={itemDetails.image}
                  alt={booking.itemName}
                  className={styles.bookingImage}
                />
              )}
              
              <div className={styles.bookingContent}>
                <div className={styles.bookingHeader}>
                  <h3 className={styles.bookingTitle}>{booking.itemName}</h3>
                  <span className={`${styles.statusBadge} ${styles[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>

                <div className={styles.bookingDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Type:</span>
                    <span>{booking.itemType}</span>
                  </div>
                  
                  {booking.startDate && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Start Date:</span>
                      <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {booking.endDate && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>End Date:</span>
                      <span>{new Date(booking.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {booking.serviceDate && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Service Date:</span>
                      <span>{new Date(booking.serviceDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {booking.moveInDate && (
                    <div className={styles.detailRow}>
                      <span className={styles.detailLabel}>Move-in Date:</span>
                      <span>{new Date(booking.moveInDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Total Amount:</span>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-bold)' }}>
                      ${booking.totalAmount}
                    </span>
                  </div>
                  
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Booked on:</span>
                    <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className={styles.bookingActions}>
                    <Button
                      variant="danger"
                      size="small"
                      onClick={() => handleCancel(booking.id)}
                    >
                      Cancel Booking
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookings;