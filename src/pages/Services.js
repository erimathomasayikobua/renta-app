import React, { useState } from 'react';
import { servicesData } from '../utils/mockData';
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
import Input, { TextArea } from '../components/common/Input';
import styles from './Listings.module.css';

const Services = ({ onNavigate }) => {
  const { user } = useAuth();
  const { createBooking } = useBooking();
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [bookingData, setBookingData] = useState({
    serviceDate: '',
    serviceTime: '',
    estimatedHours: '',
    address: '',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredServices = filter === 'all' 
    ? servicesData 
    : servicesData.filter(service => service.category === filter);

  const handleBookNow = (service) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    setSelectedService(service);
    setShowBookingModal(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    const totalAmount = selectedService.pricePerHour * (parseInt(bookingData.estimatedHours) || 1);
    
    const result = await createBooking({
      itemId: selectedService.id,
      itemName: selectedService.name,
      itemType: 'service',
      category: selectedService.category,
      provider: selectedService.provider,
      ...bookingData,
      price: selectedService.pricePerHour,
      totalAmount
    });
    
    if (result.success) {
      setBookingSuccess(true);
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingData({ serviceDate: '', serviceTime: '', estimatedHours: '', address: '', notes: '' });
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="heading-2">Professional Services</h1>
        <p className="body-large">Book trusted professionals for all your needs</p>
      </div>

      <div className={styles.filters}>
        <Button
          variant={filter === 'all' ? 'primary' : 'ghost'}
          onClick={() => setFilter('all')}
        >
          All Services
        </Button>
        <Button
          variant={filter === 'cleaning' ? 'primary' : 'ghost'}
          onClick={() => setFilter('cleaning')}
        >
          Cleaning
        </Button>
        <Button
          variant={filter === 'plumbing' ? 'primary' : 'ghost'}
          onClick={() => setFilter('plumbing')}
        >
          Plumbing
        </Button>
        <Button
          variant={filter === 'electrical' ? 'primary' : 'ghost'}
          onClick={() => setFilter('electrical')}
        >
          Electrical
        </Button>
        <Button
          variant={filter === 'moving' ? 'primary' : 'ghost'}
          onClick={() => setFilter('moving')}
        >
          Moving
        </Button>
        <Button
          variant={filter === 'handyman' ? 'primary' : 'ghost'}
          onClick={() => setFilter('handyman')}
        >
          Handyman
        </Button>
        <Button
          variant={filter === 'driving' ? 'primary' : 'ghost'}
          onClick={() => setFilter('driving')}
        >
          Driving
        </Button>
        <Button
          variant={filter === 'tutoring' ? 'primary' : 'ghost'}
          onClick={() => setFilter('tutoring')}
        >
          Tutoring
        </Button>
      </div>

      <div className={styles.grid}>
        {filteredServices.map((service) => (
          <Card key={service.id}>
            <CardImage src={service.image} alt={service.name} />
            <CardContent>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                {service.verified && <CardBadge available={true}>✓ Verified</CardBadge>}
              </CardHeader>
              
              <div className="body-small" style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-semibold)', marginBottom: 'var(--spacing-sm)' }}>
                {service.provider}
              </div>
              
              <CardDescription>{service.description}</CardDescription>
              
              <CardMeta>
                <CardRating rating={service.rating} reviews={service.reviews} />
                <CardMetaItem icon="📍">{service.location}</CardMetaItem>
              </CardMeta>
              
              <CardMeta>
                <CardMetaItem icon="🕐">{service.availability}</CardMetaItem>
              </CardMeta>
              
              <CardPrice amount={service.pricePerHour} label="/hour" />
              
              <CardFeatures features={service.services.slice(0, 4)} />
            </CardContent>
            
            <CardFooter>
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleBookNow(service)}
              >
                Book Service
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title={`Book ${selectedService?.name}`}
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
            <h3>Service Booked!</h3>
            <p>Your service has been booked successfully. The provider will contact you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit}>
            <Input
              label="Service Date"
              type="date"
              name="serviceDate"
              value={bookingData.serviceDate}
              onChange={(e) => setBookingData({ ...bookingData, serviceDate: e.target.value })}
              required
            />
            
            <Input
              label="Preferred Time"
              type="time"
              name="serviceTime"
              value={bookingData.serviceTime}
              onChange={(e) => setBookingData({ ...bookingData, serviceTime: e.target.value })}
              required
            />
            
            <Input
              label="Estimated Hours"
              type="number"
              name="estimatedHours"
              value={bookingData.estimatedHours}
              onChange={(e) => setBookingData({ ...bookingData, estimatedHours: e.target.value })}
              placeholder="How many hours do you need?"
              required
              helperText={`Estimated cost: $${(selectedService?.pricePerHour || 0) * (parseInt(bookingData.estimatedHours) || 0)}`}
            />
            
            <Input
              label="Service Address"
              type="text"
              name="address"
              value={bookingData.address}
              onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
              placeholder="Where should the service be performed?"
              required
            />
            
            <TextArea
              label="Service Details"
              name="notes"
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              placeholder="Describe what you need done..."
              required
            />
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Services;