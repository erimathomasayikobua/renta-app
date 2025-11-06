import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BookingContext = createContext(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = () => {
    const allBookings = JSON.parse(localStorage.getItem('rentaAppBookings') || '[]');
    const userBookings = allBookings.filter(b => b.userId === user?.id);
    setBookings(userBookings);
  };

  const createBooking = async (bookingData) => {
    setLoading(true);
    
    const newBooking = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      status: 'pending',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    
    const allBookings = JSON.parse(localStorage.getItem('rentaAppBookings') || '[]');
    allBookings.push(newBooking);
    localStorage.setItem('rentaAppBookings', JSON.stringify(allBookings));
    
    setBookings([...bookings, newBooking]);
    setLoading(false);
    
    return { success: true, booking: newBooking };
  };

  const cancelBooking = async (bookingId) => {
    const allBookings = JSON.parse(localStorage.getItem('rentaAppBookings') || '[]');
    const bookingIndex = allBookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex !== -1) {
      allBookings[bookingIndex].status = 'cancelled';
      localStorage.setItem('rentaAppBookings', JSON.stringify(allBookings));
      loadBookings();
      return { success: true };
    }
    
    return { success: false, error: 'Booking not found' };
  };

  const value = {
    bookings,
    loading,
    createBooking,
    cancelBooking,
    refreshBookings: loadBookings
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};