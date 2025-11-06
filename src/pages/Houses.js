import React, { useState } from 'react';
import { housesData } from '../utils/mockData';
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

const Houses = ({ onNavigate }) => {
  const { user } = useAuth();
  const { createBooking } = useBooking();
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [bookingData, setBookingData] = useState({
    leaseTerm: '',
    moveInDate: '',
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredHouses = filter === 'all' 
    ? housesData 
    : housesData.filter(house => house.type === filter);

  const handleBookNow = (house) => {
    if (!user) {
      onNavigate('login');
      return;
    }
    setSelectedHouse(house);
    setShowBookingModal(true);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    const result = await createBooking({
      itemId: selectedHouse.id,
      itemName: selectedHouse.name,
      itemType: 'house',
      category: selectedHouse.type,
      ...bookingData,
      price: selectedHouse.pricePerMonth,
      totalAmount: selectedHouse.pricePerMonth
    });
    
    if (result.success) {
      setBookingSuccess(true);
      setTimeout(() => {
        setShowBookingModal(false);
        setBookingData({ leaseTerm: '', moveInDate: '', notes: '' });
      }, 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="heading-2">Houses & Apartments</h1>
        <p className="body-large">Find your perfect home</p>
      </div>

      <div className={styles.filters}>
        <Button
          variant={filter === 'all' ? 'primary' : 'ghost'}
          onClick={() => setFilter('all')}
        >
          All Properties
        </Button>
        <Button
          variant={filter === 'apartment' ? 'primary' : 'ghost'}
          onClick={() => setFilter('apartment')}
        >
          Apartments
        </Button>
        <Button
          variant={filter === 'house' ? 'primary' : 'ghost'}
          onClick={() => setFilter('house')}
        >
          Houses
        </Button>
        <Button
          variant={filter === 'hostel' ? 'primary' : 'ghost'}
          onClick={() => setFilter('hostel')}
        >
          Hostels
          </Button>
        <Button
          variant={filter === 'studio' ? 'primary' : 'ghost'}
          onClick={() => setFilter('studio')}
        >
          Studios
        </Button>
      </div>

      <div className={styles.grid}>
        {filteredHouses.map((house) => (
          <Card key={house.id}>
            <CardImage src={house.image} alt={house.name} />
            <CardContent>
              <CardHeader>
                <CardTitle>{house.name}</CardTitle>
                <CardBadge available={house.available}>
                  {house.available ? 'Available' : 'Rented'}
                </CardBadge>
              </CardHeader>
              
              <CardDescription>{house.description}</CardDescription>
              
              <CardMeta>
                <CardRating rating={house.rating} reviews={house.reviews} />
                <CardMetaItem icon="📍">{house.location}</CardMetaItem>
              </CardMeta>
              
              <CardMeta>
                <CardMetaItem icon="🛏️">{house.bedrooms} Beds</CardMetaItem>
                <CardMetaItem icon="🚿">{house.bathrooms} Baths</CardMetaItem>
                <CardMetaItem icon="📐">{house.area} sqft</CardMetaItem>
              </CardMeta>
              
              <CardPrice amount={house.pricePerMonth} label="/month" />
              
              <CardFeatures features={house.amenities.slice(0, 4)} />
            </CardContent>
            
            <CardFooter>
              <Button
                variant="primary"
                fullWidth
                onClick={() => handleBookNow(house)}
                disabled={!house.available}
              >
                {house.available ? 'Apply Now' : 'Not Available'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        title={`Apply for ${selectedHouse?.name}`}
        footer={
          !bookingSuccess && (
            <>
              <Button variant="ghost" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleBookingSubmit}>
                Submit Application
              </Button>
            </>
          )
        }
      >
        {bookingSuccess ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3>Application Submitted!</h3>
            <p>Your rental application has been submitted successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit}>
            <Select
              label="Lease Term"
              name="leaseTerm"
              value={bookingData.leaseTerm}
              onChange={(e) => setBookingData({ ...bookingData, leaseTerm: e.target.value })}
              options={selectedHouse?.leaseTerms.map(term => ({ value: term, label: term })) || []}
              required
            />
            
            <Input
              label="Desired Move-in Date"
              type="date"
              name="moveInDate"
              value={bookingData.moveInDate}
              onChange={(e) => setBookingData({ ...bookingData, moveInDate: e.target.value })}
              required
            />
            
            <TextArea
              label="Additional Information"
              name="notes"
              value={bookingData.notes}
              onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
              placeholder="Tell us about yourself, pets, employment, etc."
            />
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Houses;