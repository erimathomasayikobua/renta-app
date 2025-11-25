import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useChat } from '../../contexts/ChatContext';
import Button from '../common/Button';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './Header.module.css';

const Header = ({ currentPage, onNavigate }) => {
  const { user, logout, isAdmin, isProvider, isCustomer } = useAuth();
  const { theme, setTheme, themes } = useTheme();
  const { unreadCount } = useChat();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    onNavigate('home');
    setShowUserMenu(false);
  };

  const navigate = (page) => {
    onNavigate(page);
    setShowMobileMenu(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => navigate('home')}>
          Renta
        </div>

        <nav className={`${styles.nav} ${showMobileMenu ? styles.mobileOpen : ''}`}>
          <a
            className={`${styles.navLink} ${currentPage === 'rides' ? styles.active : ''}`}
            onClick={() => navigate('rides')}
          >
            Rides
          </a>
          <a
            className={`${styles.navLink} ${currentPage === 'houses' ? styles.active : ''}`}
            onClick={() => navigate('houses')}
          >
            Houses
          </a>
          <a
            className={`${styles.navLink} ${currentPage === 'services' ? styles.active : ''}`}
            onClick={() => navigate('services')}
          >
            Services
          </a>
          {user && (
            <a
              className={`${styles.navLink} ${currentPage === 'bookings' ? styles.active : ''}`}
              onClick={() => navigate('bookings')}
            >
              My Bookings
            </a>
          )}
          {user && isCustomer && (
            <a
              className={`${styles.navLink} ${currentPage === 'customer-dashboard' ? styles.active : ''}`}
              onClick={() => navigate('customer-dashboard')}
            >
              Dashboard
            </a>
          )}
          {user && isProvider && (
            <a
              className={`${styles.navLink} ${currentPage === 'provider-dashboard' ? styles.active : ''}`}
              onClick={() => navigate('provider-dashboard')}
            >
              Dashboard
            </a>
          )}
          {isAdmin && (
            <a
              className={`${styles.navLink} ${currentPage === 'admin' ? styles.active : ''}`}
              onClick={() => navigate('admin')}
            >
              Admin
            </a>
          )}
        </nav>

        <div className={styles.actions}>
          <div className={styles.themeToggle}>
            <select
              className={styles.themeSelect}
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {themes.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {user ? (
            <>
              <div className={styles.chatBadge}>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => navigate('support')}
                >
                  💬 Support
                </Button>
                {unreadCount > 0 && (
                  <span className={styles.badge}>{unreadCount}</span>
                )}
              </div>
              
              <div className={styles.userMenu}>
                <button
                  className={styles.userButton}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className={styles.avatar}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                </button>
                
                {showUserMenu && (
                  <div className={styles.dropdown}>
                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        navigate('profile');
                        setShowUserMenu(false);
                      }}
                    >
                      Profile
                    </button>
                    {isCustomer && (
                      <button
                        className={styles.dropdownItem}
                        onClick={() => {
                          navigate('customer-dashboard');
                          setShowUserMenu(false);
                        }}
                      >
                        Dashboard
                      </button>
                    )}
                    {isProvider && (
                      <button
                        className={styles.dropdownItem}
                        onClick={() => {
                          navigate('provider-dashboard');
                          setShowUserMenu(false);
                        }}
                      >
                        Dashboard
                      </button>
                    )}
                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        navigate('bookings');
                        setShowUserMenu(false);
                      }}
                    >
                      My Bookings
                    </button>
                    <button
                      className={styles.dropdownItem}
                      onClick={() => {
                        navigate('support');
                        setShowUserMenu(false);
                      }}
                    >
                      Support
                    </button>
                    <div className={styles.dropdownDivider} />
                    <button className={styles.dropdownItem} onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" size="small" onClick={() => navigate('login')}>
                Login
              </Button>
              <Button variant="primary" size="small" onClick={() => navigate('register')}>
                Sign Up
              </Button>
            </>
          )}
          
          <button
            className={styles.mobileMenuButton}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;