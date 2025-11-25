import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import styles from './Support.module.css';

const Support = ({ onNavigate }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('faq');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      category: 'Bookings',
      questions: [
        {
          q: 'How do I make a booking?',
          a: 'Browse our services, select the item you want, choose your dates, and click "Book Now". You\'ll receive instant confirmation.'
        },
        {
          q: 'Can I cancel my booking?',
          a: 'Yes, you can cancel up to 24 hours before your booking start time for a full refund.'
        },
        {
          q: 'How do I modify my booking?',
          a: 'Go to "My Bookings", select the booking you want to modify, and click "Modify Booking".'
        }
      ]
    },
    {
      category: 'Payments',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, debit cards, and digital wallets.'
        },
        {
          q: 'When will I be charged?',
          a: 'Your payment method will be charged immediately upon booking confirmation.'
        },
        {
          q: 'How do refunds work?',
          a: 'Refunds are processed within 5-7 business days to your original payment method.'
        }
      ]
    },
    {
      category: 'Account',
      questions: [
        {
          q: 'How do I update my profile?',
          a: 'Click on your profile icon, select "Profile", and click "Edit Profile" to make changes.'
        },
        {
          q: 'How do I change my password?',
          a: 'Go to your Profile page and click on "Change Password" in the security section.'
        },
        {
          q: 'Can I have multiple accounts?',
          a: 'Each email address and phone number can only be associated with one account.'
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      description: 'support@renta.com',
      action: 'Send Email',
      link: 'mailto:support@renta.com'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      description: '+256 726 137 083',
      action: 'Call Now',
      link: 'tel:+256726137083'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Chat with our team',
      action: 'Start Chat',
      onClick: () => onNavigate('chat')
    },
    {
      icon: '🕐',
      title: 'Business Hours',
      description: 'Mon-Fri: 9AM-6PM EST',
      action: null
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    
    const tickets = JSON.parse(localStorage.getItem('rentaAppTickets') || '[]');
    const newTicket = {
      id: Date.now().toString(),
      userId: user?.id,
      userName: user?.name || 'Guest',
      userEmail: user?.email || ticketForm.email,
      ...ticketForm,
      status: 'open',
      createdAt: new Date().toISOString()
    };
    
    tickets.push(newTicket);
    localStorage.setItem('rentaAppTickets', JSON.stringify(tickets));
    
    setSubmitted(true);
    setTicketForm({ subject: '', category: 'general', message: '' });
    
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleInputChange = (e) => {
    setTicketForm({
      ...ticketForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="heading-2">Help & Support</h1>
        <p className="body-large" style={{ color: 'var(--color-text-secondary)' }}>
          We're here to help you with any questions or issues
        </p>
      </div>

      <div className={styles.contactGrid}>
        {contactMethods.map((method, index) => (
          <Card key={index} className={styles.contactCard}>
            <div className={styles.contactIcon}>{method.icon}</div>
            <h3 className={styles.contactTitle}>{method.title}</h3>
            <p className={styles.contactDescription}>{method.description}</p>
            {method.action && (
              method.link ? (
                <a href={method.link} className={styles.contactLink}>
                  {method.action}
                </a>
              ) : (
                <Button variant="ghost" size="small" onClick={method.onClick}>
                  {method.action}
                </Button>
              )
            )}
          </Card>
        ))}
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'faq' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          📚 FAQs
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'ticket' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('ticket')}
        >
          🎫 Submit Ticket
        </button>
      </div>

      {activeTab === 'faq' && (
        <div className={styles.faqSection}>
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className={styles.faqCategory}>
              <h2 className={styles.categoryTitle}>{category.category}</h2>
              <div className={styles.faqList}>
                {category.questions.map((faq, qIndex) => (
                  <Card key={qIndex} className={styles.faqCard}>
                    <h3 className={styles.faqQuestion}>{faq.q}</h3>
                    <p className={styles.faqAnswer}>{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ticket' && (
        <Card className={styles.ticketForm}>
          <h2 className={styles.formTitle}>Submit a Support Ticket</h2>
          <p className={styles.formDescription}>
            Describe your issue and we'll get back to you as soon as possible
          </p>

          {submitted && (
            <div className={styles.successMessage}>
              ✅ Your ticket has been submitted successfully! We'll respond within 24 hours.
            </div>
          )}

          <form onSubmit={handleTicketSubmit}>
            <Input
              label="Subject"
              type="text"
              name="subject"
              value={ticketForm.subject}
              onChange={handleInputChange}
              placeholder="Brief description of your issue"
              required
            />

            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select
                name="category"
                value={ticketForm.category}
                onChange={handleInputChange}
                className={styles.select}
                required
              >
                <option value="general">General Inquiry</option>
                <option value="booking">Booking Issue</option>
                <option value="payment">Payment Problem</option>
                <option value="account">Account Issue</option>
                <option value="technical">Technical Problem</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                name="message"
                value={ticketForm.message}
                onChange={handleInputChange}
                placeholder="Please provide as much detail as possible..."
                className={styles.textarea}
                rows="6"
                required
              />
            </div>

            <Button type="submit" variant="primary" size="large" fullWidth>
              Submit Ticket
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Support;