import React from 'react';
import Button from '../components/common/Button';
import styles from './Home.module.css';

const Home = ({ onNavigate }) => {
  const categories = [
    {
      id: 'rides',
      title: 'Rides',
      description: 'Cars, bikes, and scooters for every journey',
      icon: '🚗',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800'
    },
    {
      id: 'houses',
      title: 'Houses & Apartments',
      description: 'Find your perfect home or investment property',
      icon: '🏠',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'
    },
    {
      id: 'services',
      title: 'Services',
      description: 'Professional services for all your needs',
      icon: '🛠️',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800'
    }
  ];

  const features = [
    {
      icon: '🔒',
      title: 'Secure Payments',
      description: 'Your transactions are protected with industry-leading security'
    },
    {
      icon: '⚡',
      title: 'Instant Booking',
      description: 'Book in seconds and get instant confirmation'
    },
    {
      icon: '💬',
      title: '24/7 Support',
      description: 'Our customer care team is always here to help'
    },
    {
      icon: '⭐',
      title: 'Verified Listings',
      description: 'All listings are verified for your peace of mind'
    }
  ];

  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.heroBackground} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Rent Anything, Anytime, Anywhere
          </h1>
          <p className={styles.heroSubtitle}>
            Your one-stop platform for rides, homes, and professional services
          </p>
          <div className={styles.heroActions}>
            <Button variant="primary" size="large" onClick={() => onNavigate('rides')}>
              Explore Rides
            </Button>
            <Button variant="secondary" size="large" onClick={() => onNavigate('houses')}>
              Find Homes
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>What are you looking for?</h2>
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onClick={() => onNavigate(category.id)}
            >
              <img
                src={category.image}
                alt={category.title}
                className={styles.categoryImage}
              />
              <div className={styles.categoryOverlay}>
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.categoryDescription}>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Choose Renta?</h2>
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;