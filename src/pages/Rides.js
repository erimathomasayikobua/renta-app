import React, { useState } from 'react';
import { ridesData } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import Card, {
  CardImage,
  CardContent,
  CardHeader,
  CardTitle,
  CardBadge,
  CardDescription,
  CardMeta,
  CardMetaItem,
  CardRating,
  CardPrice,
  CardFeatures,
  CardFooter
} from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input, { Select, TextArea } from '../components/common/Input';
import styles from './Listings.module.css';

const Rides = ({ onNavigate }) => {
  const { user } = useAuth();
  const { createBooking } = useBooking();
  const [selectedRide, setSelectedRide] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    rentalType: 'daily',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredRides = filter === 'all' 
    ? ridesData 
    : ridesData.filter(ride => ride.category === filter);

  const handleBookNow = (ride) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    setSelectedRide(ride);
    setShowBookingModal(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    const price = bookingData.rentalType === 'hourly' 
      ? selectedRide.pricePerHour 
      : selectedRide.pricePerDay;
    
    const result = await createBooking({
      itemId: selectedRide.id,
      itemName: selectedRide.name,
      itemType: 'ride',
      category: selectedRide.category,
      ...bookingData,
      price,
      totalAmount: price
    });
    
    if (result.success) {
      setBookingSuccess(true);
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingData({ startDate: '', endDate: '', rentalType: 'daily', notes: '' });
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="heading-2">Rides</h1>
        <p className="body-large">Choose from our wide selection of vehicles</p>
      </div>

      <div className={styles.filters}>
        <Button
          variant={filter === 'all' ? 'primary' : 'ghost'}
          onClick={() => setFilter('all')}
        >
          All Rides
        </Button>
        <Button
          variant={filter === 'luxury' ? 'primary' : 'ghost'}
          onClick={() => setFilter('luxury')}
        >
          Luxury Cars
        </Button>
        <Button
          variant={filter === 'economy' ? 'primary' : 'ghost'}
          onClick={() => setFilter('economy')}
        >
          Economy Cars
        </Button>
        <Button
          variant={filter === 'motorcycle' ? 'primary' : 'ghost'}
          onClick={() => setFilter('motorcycle')}
        >
          Motorcycles
        </Button>
        <Button
          variant={filter === 'scooter' ? 'primary' : 'ghost'}
          onClick={() => setFilter('scooter')}
        >
          Scooters
        </Button>
      </div>

      <div className={styles.grid}>
        {filteredRides.map((ride) => (
          <Card key={ride.id}>
            <CardImage src={ride.image} alt={ride.name} />
            <CardContent>
              <CardHeader>
                <CardTitle>{ride.name}</CardTitle>
                <CardBadge available={ride.available}>
                  {ride.available ? 'Available' : 'Booked'}
                </CardBadge>
              </CardHeader>
              
              <CardDescription>{ride.description}</CardDescription>
              
              <CardMeta>
                <CardRating rating={ride.rating} reviews={ride.reviews} />
                <CardMetaItem icon="📍">{ride.location}</CardMetaItem>
              </CardMeta>
              
              <CardPrice amount={ride.pricePerDay} label="/day" />
              <div className="body-small" style={{ color: 'var(--color-text-tertiary)' }}>
                ${ride.pricePerHour}/hour also available
              </div>
              
              <CardFeatures features={ride.features} />
            </CardContent>
            
            <CardFooter>
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleBookNow(ride)}
                disabled={!ride.available}
              >
                {ride.available ? 'Book Now' : 'Not Available'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title={`Book ${selectedRide?.name}`}
        footer={
          !bookingSuccess && (
            <>
              <Button variant="ghost" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleBookingSubmit}>
                Confirm Booking
              </Button>
            </>
          )
        }
      >
        {bookingSuccess ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3>Booking Confirmed!</h3>
            <p>Your ride has been booked successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit}>
            <Select
              label="Rental Type"
              name="rentalType"
              value={bookingData.rentalType}
              onChange={(e) => setBookingData({ ...bookingData, rentalType: e.target.value })}
              options={[
                { value: 'hourly', label: `Hourly - $${selectedRide?.pricePerHour}/hour` },
                { value: 'daily', label: `Daily - $${selectedRide?.pricePerDay}/day` }
              ]}
              required
            />
            
            <Input
              label="Start Date"
              type="date"
              name="startDate"
              value={bookingData.startDate}
              onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
              required
            />
            
            <Input
              label="End Date"
              type="date"
              name="endDate"
              value={bookingData.endDate}
              onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
              required
            />
            
            <TextArea
              label="Additional Notes"
              name="notes"
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              placeholder="Any special requests or requirements?"
            />
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Rides;