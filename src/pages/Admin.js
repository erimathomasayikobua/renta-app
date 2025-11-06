import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import styles from './Admin.module.css';

const Admin = ({ onNavigate }) => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalProviders: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeListings: 0,
    pendingVerifications: 0
  });
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!isAdmin) {
      onNavigate('home');
      return;
    }
    loadData();
  }, [isAdmin]);

  const loadData = () => {
    const allUsers = JSON.parse(localStorage.getItem('rentaAppUsers') || '[]');
    const allBookings = JSON.parse(localStorage.getItem('rentaAppBookings') || '[]');
    const allTickets = JSON.parse(localStorage.getItem('rentaAppTickets') || '[]');
    
    const customers = allUsers.filter(u => u.role === 'customer');
    const providers = allUsers.filter(u => u.role === 'provider');
    const pendingProviders = providers.filter(p => !p.verified);
    
    const totalRevenue = allBookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
    
    setStats({
      totalUsers: allUsers.length,
      totalCustomers: customers.length,
      totalProviders: providers.length,
      totalBookings: allBookings.length,
      totalRevenue,
      activeListings: 17,
      pendingVerifications: pendingProviders.length
    });
    
    setUsers(allUsers);
    setBookings(allBookings);
    setTickets(allTickets);
  };

  const handleVerifyProvider = (userId) => {
    const allUsers = JSON.parse(localStorage.getItem('rentaAppUsers') || '[]');
    const userIndex = allUsers.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      allUsers[userIndex].verified = true;
      localStorage.setItem('rentaAppUsers', JSON.stringify(allUsers));
      loadData();
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="heading-2">Admin Dashboard</h1>
        <p className="body-large">Manage your rental platform</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statValue}>{stats.totalUsers}</div>
          <div className={styles.statLabel}>Total Users</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👤</div>
          <div className={styles.statValue}>{stats.totalCustomers}</div>
          <div className={styles.statLabel}>Customers</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🏪</div>
          <div className={styles.statValue}>{stats.totalProviders}</div>
          <div className={styles.statLabel}>Providers</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📋</div>
          <div className={styles.statValue}>{stats.totalBookings}</div>
          <div className={styles.statLabel}>Total Bookings</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>💰</div>
          <div className={styles.statValue}>${stats.totalRevenue.toLocaleString()}</div>
          <div className={styles.statLabel}>Total Revenue</div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⚠️</div>
          <div className={styles.statValue}>{stats.pendingVerifications}</div>
          <div className={styles.statLabel}>Pending Verifications</div>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'overview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users & Phone Registry
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'providers' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('providers')}
        >
          Providers
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'tickets' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('tickets')}
        >
          Support Tickets
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Recent Bookings</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>User</th>
              <th>Item</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 10).map((booking) => (
              <tr key={booking.id}>
                <td>#{booking.id.slice(0, 8)}</td>
                <td>{booking.userName}</td>
                <td>{booking.itemName}</td>
                <td>{booking.itemType}</td>
                <td>${booking.totalAmount}</td>
                <td>
                  <span className={`${styles.badge} ${styles[booking.status]}`}>
                    {booking.status}
                  </span>
                </td>
                <td>{new Date(booking.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-text-tertiary)' }}>
            No bookings yet
          </p>
        )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>User Management & Phone Registry</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Location</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className={styles.phoneCell}>{user.phone || 'N/A'}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.location ? `${user.location.city}, ${user.location.country}` : 'N/A'}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'providers' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Service Provider Management</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Services</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(u => u.role === 'provider').map((provider) => (
                <tr key={provider.id}>
                  <td>{provider.name}</td>
                  <td>{provider.email}</td>
                  <td className={styles.phoneCell}>{provider.phone || 'N/A'}</td>
                  <td>
                    {provider.location 
                      ? `${provider.location.city}, ${provider.location.state || provider.location.country}`
                      : 'N/A'}
                  </td>
                  <td>
                    {provider.serviceCategories && provider.serviceCategories.length > 0
                      ? provider.serviceCategories.join(', ')
                      : 'None'}
                  </td>
                  <td>
                    <span className={`${styles.badge} ${provider.verified ? styles.verified : styles.pending}`}>
                      {provider.verified ? 'Verified' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    {!provider.verified && (
                      <Button 
                        variant="primary" 
                        size="small"
                        onClick={() => handleVerifyProvider(provider.id)}
                      >
                        Verify
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.filter(u => u.role === 'provider').length === 0 && (
            <p style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-text-tertiary)' }}>
              No service providers registered yet
            </p>
          )}
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Support Tickets</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>User</th>
                <th>Subject</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td>#{ticket.id.slice(0, 8)}</td>
                  <td>{ticket.userName}</td>
                  <td>{ticket.subject}</td>
                  <td className={styles.capitalize}>{ticket.category}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {tickets.length === 0 && (
            <p style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-text-tertiary)' }}>
              No support tickets yet
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;