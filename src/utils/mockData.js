// Initialize mock data in localStorage if not exists
export const initializeMockData = () => {
  // Check if data already exists
  if (!localStorage.getItem('rentaAppInitialized')) {
    // Create admin user
    const users = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@renta.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1234567890',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'John Provider',
        email: 'provider@renta.com',
        password: 'provider123',
        role: 'provider',
        phone: '+1234567891',
        createdAt: new Date().toISOString()
      }
    ];
    
    localStorage.setItem('rentaAppUsers', JSON.stringify(users));
    localStorage.setItem('rentaAppInitialized', 'true');
  }
};

export const ridesData = [
  {
    id: 'ride-1',
    type: 'car',
    name: 'Tesla Model 3',
    description: 'Luxury electric sedan with autopilot features',
    pricePerHour: 25,
    pricePerDay: 150,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    rating: 4.8,
    reviews: 124,
    features: ['Autopilot', 'Premium Sound', 'Leather Seats', 'GPS Navigation'],
    location: 'Downtown, New York',
    available: true,
    category: 'luxury'
  },
  {
    id: 'ride-2',
    type: 'car',
    name: 'Honda Civic',
    description: 'Reliable and fuel-efficient compact car',
    pricePerHour: 12,
    pricePerDay: 70,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800',
    rating: 4.5,
    reviews: 89,
    features: ['Bluetooth', 'Backup Camera', 'Air Conditioning', 'USB Charging'],
    location: 'Midtown, New York',
    available: true,
    category: 'economy'
  },
  {
    id: 'ride-3',
    type: 'bike',
    name: 'Harley Davidson Street 750',
    description: 'Iconic cruiser motorcycle for the open road',
    pricePerHour: 20,
    pricePerDay: 120,
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
    rating: 4.7,
    reviews: 56,
    features: ['Helmet Included', 'GPS Tracker', 'Insurance', 'Roadside Assistance'],
    location: 'Brooklyn, New York',
    available: true,
    category: 'motorcycle'
  },
  {
    id: 'ride-4',
    type: 'scooter',
    name: 'Vespa Primavera 150',
    description: 'Classic Italian scooter perfect for city rides',
    pricePerHour: 8,
    pricePerDay: 45,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    rating: 4.6,
    reviews: 78,
    features: ['Helmet Included', 'Storage Box', 'Fuel Efficient', 'Easy Parking'],
    location: 'Queens, New York',
    available: true,
    category: 'scooter'
  },
  {
    id: 'ride-5',
    type: 'car',
    name: 'BMW X5',
    description: 'Spacious luxury SUV with advanced features',
    pricePerHour: 35,
    pricePerDay: 200,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
    rating: 4.9,
    reviews: 145,
    features: ['Panoramic Roof', 'Premium Sound', 'All-Wheel Drive', 'Parking Assist'],
    location: 'Manhattan, New York',
    available: true,
    category: 'luxury'
  },
  {
    id: 'ride-6',
    type: 'bike',
    name: 'Yamaha YZF-R3',
    description: 'Sport bike with excellent handling and performance',
    pricePerHour: 18,
    pricePerDay: 100,
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800',
    rating: 4.7,
    reviews: 92,
    features: ['Racing Gear', 'GPS Tracker', 'Full Insurance', 'Track Day Ready'],
    location: 'Bronx, New York',
    available: false,
    category: 'motorcycle'
  }
];

export const housesData = [
  {
    id: 'house-1',
    type: 'apartment',
    name: 'Modern Downtown Loft',
    description: 'Spacious loft with city views and modern amenities',
    pricePerMonth: 2500,
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    rating: 4.8,
    reviews: 67,
    amenities: ['WiFi', 'Gym', 'Parking', 'Pet Friendly', 'Balcony', 'Dishwasher'],
    location: 'Downtown, New York',
    available: true,
    furnished: true,
    leaseTerms: ['6 months', '1 year']
  },
  {
    id: 'house-2',
    type: 'house',
    name: 'Suburban Family Home',
    description: 'Beautiful 3-bedroom house with backyard',
    pricePerMonth: 3200,
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2000,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    rating: 4.9,
    reviews: 89,
    amenities: ['Backyard', 'Garage', 'Fireplace', 'Central AC', 'Washer/Dryer', 'Garden'],
    location: 'Westchester, New York',
    available: true,
    furnished: false,
    leaseTerms: ['1 year', '2 years']
  },
  {
    id: 'house-3',
    type: 'studio',
    name: 'Cozy Studio Apartment',
    description: 'Perfect for singles or couples in the heart of the city',
    pricePerMonth: 1500,
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    rating: 4.5,
    reviews: 45,
    amenities: ['WiFi', 'Laundry', 'Security', 'Near Subway', 'Utilities Included'],
    location: 'East Village, New York',
    available: true,
    furnished: true,
    leaseTerms: ['Month-to-month', '6 months', '1 year']
  },
  {
    id: 'house-4',
    type: 'apartment',
    name: 'Luxury Penthouse',
    description: 'Exclusive penthouse with panoramic views',
    pricePerMonth: 5500,
    bedrooms: 3,
    bathrooms: 3,
    area: 2500,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    rating: 5.0,
    reviews: 34,
    amenities: ['Rooftop Access', 'Concierge', 'Pool', 'Gym', 'Smart Home', 'Wine Cellar'],
    location: 'Upper East Side, New York',
    available: true,
    furnished: true,
    leaseTerms: ['1 year', '2 years']
  },
  {
    id: 'house-5',
    type: 'apartment',
    name: 'Riverside Apartment',
    description: 'Peaceful apartment with river views',
    pricePerMonth: 2800,
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    rating: 4.7,
    reviews: 56,
    amenities: ['River View', 'Balcony', 'Parking', 'Storage', 'Elevator', 'Doorman'],
    location: 'Battery Park, New York',
    available: false,
    furnished: false,
    leaseTerms: ['1 year']
  }
];

export const servicesData = [
  {
    id: 'service-1',
    category: 'cleaning',
    name: 'Professional House Cleaning',
    provider: 'CleanPro Services',
    description: 'Deep cleaning services for homes and apartments',
    pricePerHour: 35,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800',
    rating: 4.9,
    reviews: 234,
    services: ['Deep Cleaning', 'Regular Maintenance', 'Move-in/Move-out', 'Window Cleaning'],
    availability: 'Mon-Sat, 8AM-6PM',
    location: 'All NYC Boroughs',
    verified: true
  },
  {
    id: 'service-2',
    category: 'plumbing',
    name: 'Emergency Plumbing Services',
    provider: 'QuickFix Plumbers',
    description: '24/7 plumbing repairs and installations',
    pricePerHour: 75,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800',
    rating: 4.8,
    reviews: 189,
    services: ['Leak Repairs', 'Pipe Installation', 'Drain Cleaning', 'Water Heater'],
    availability: '24/7',
    location: 'Manhattan, Brooklyn',
    verified: true
  },
  {
    id: 'service-3',
    category: 'electrical',
    name: 'Licensed Electrician',
    provider: 'Spark Electric Co.',
    description: 'Certified electrical services for residential properties',
    pricePerHour: 85,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800',
    rating: 4.9,
    reviews: 156,
    services: ['Wiring', 'Panel Upgrades', 'Lighting Installation', 'Smart Home Setup'],
    availability: 'Mon-Fri, 7AM-7PM',
    location: 'All NYC',
    verified: true
  },
  {
    id: 'service-4',
    category: 'moving',
    name: 'Professional Movers',
    provider: 'EasyMove NYC',
    description: 'Reliable moving services with care and efficiency',
    pricePerHour: 120,
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=800',
    rating: 4.7,
    reviews: 298,
    services: ['Local Moving', 'Packing Services', 'Storage', 'Furniture Assembly'],
    availability: 'Every Day, 6AM-8PM',
    location: 'Tri-State Area',
    verified: true
  },
  {
    id: 'service-5',
    category: 'handyman',
    name: 'General Handyman Services',
    provider: 'FixIt All',
    description: 'All-around handyman for home repairs and improvements',
    pricePerHour: 50,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800',
    rating: 4.6,
    reviews: 167,
    services: ['Furniture Assembly', 'Painting', 'Drywall Repair', 'Minor Repairs'],
    availability: 'Mon-Sat, 8AM-6PM',
    location: 'Manhattan, Queens',
    verified: true
  },
  {
    id: 'service-6',
    category: 'landscaping',
    name: 'Garden & Lawn Care',
    provider: 'GreenThumb Landscaping',
    description: 'Professional landscaping and garden maintenance',
    pricePerHour: 60,
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800',
    rating: 4.8,
    reviews: 134,
    services: ['Lawn Mowing', 'Garden Design', 'Tree Trimming', 'Seasonal Cleanup'],
    availability: 'Mon-Sat, 7AM-5PM',
    location: 'Westchester, Long Island',
    verified: true
  }
];