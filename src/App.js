import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BookingProvider } from './contexts/BookingContext';
import { ChatProvider } from './contexts/ChatContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { LocationProvider } from './contexts/LocationContext';
import { initializeMockData } from './utils/mockData';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Rides from './pages/Rides';
import Houses from './pages/Houses';
import Services from './pages/Services';
import Bookings from './pages/Bookings';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';
import Support from './pages/Support';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    initializeMockData();
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'login':
        return <Login onNavigate={handleNavigate} />;
      case 'register':
        return <Register onNavigate={handleNavigate} />;
      case 'rides':
        return <Rides onNavigate={handleNavigate} />;
      case 'houses':
        return <Houses onNavigate={handleNavigate} />;
      case 'services':
        return <Services onNavigate={handleNavigate} />;
      case 'bookings':
        return <Bookings onNavigate={handleNavigate} />;
      case 'chat':
        return <Chat onNavigate={handleNavigate} />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      case 'admin':
        return <Admin onNavigate={handleNavigate} />;
      case 'customer-dashboard':
        return <CustomerDashboard onNavigate={handleNavigate} />;
      case 'provider-dashboard':
        return <ProviderDashboard onNavigate={handleNavigate} />;
      case 'support':
        return <Support onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <CurrencyProvider>
          <LocationProvider>
            <BookingProvider>
              <ChatProvider>
                <div className="App">
                  <Header currentPage={currentPage} onNavigate={handleNavigate} />
                  <main>{renderPage()}</main>
                </div>
              </ChatProvider>
            </BookingProvider>
          </LocationProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;