import React from 'react';
import styles from './Card.module.css';

const Card = ({ 
  children, 
  onClick, 
  className = '',
  glass = false 
}) => {
  const cardClasses = [
    styles.card,
    onClick && styles.clickable,
    glass && styles.glassCard,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardImage = ({ src, alt }) => (
  <img src={src} alt={alt} className={styles.image} />
);

export const CardContent = ({ children }) => (
  <div className={styles.content}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className={styles.header}>{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className={styles.title}>{children}</h3>
);

export const CardBadge = ({ children, available = true }) => (
  <span className={`${styles.badge} ${available ? styles.available : styles.unavailable}`}>
    {children}
  </span>
);

export const CardDescription = ({ children }) => (
  <p className={styles.description}>{children}</p>
);

export const CardMeta = ({ children }) => (
  <div className={styles.meta}>{children}</div>
);

export const CardMetaItem = ({ icon, children }) => (
  <div className={styles.metaItem}>
    {icon}
    <span>{children}</span>
  </div>
);

export const CardRating = ({ rating, reviews }) => (
  <div className={styles.rating}>
    <span className={styles.star}>★</span>
    <span>{rating}</span>
    <span className={styles.metaItem}>({reviews} reviews)</span>
  </div>
);

export const CardPrice = ({ amount, label }) => (
  <div>
    <div className={styles.price}>
      ${amount}
      {label && <span className={styles.priceLabel}> {label}</span>}
    </div>
  </div>
);

export const CardFeatures = ({ features }) => (
  <div className={styles.features}>
    {features.map((feature, index) => (
      <span key={index} className={styles.feature}>
        {feature}
      </span>
    ))}
  </div>
);

export const CardFooter = ({ children }) => (
  <div className={styles.footer}>{children}</div>
);

export default Card;