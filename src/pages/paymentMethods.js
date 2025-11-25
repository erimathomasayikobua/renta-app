const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment'); // Mongoose model
const Booking = require('../models/Booking'); // Mongoose model

// Create payment for a booking
router.post('/pay', async (req, res) => {
  const { bookingId, amount, method } = req.body;
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    const payment = new Payment({
      booking: bookingId,
      amount,
      method,
      status: 'pending',
      paidAt: null,
    });
    await payment.save();

    // Optionally update booking status
    booking.paymentStatus = 'pending';
    await booking.save();

    res.json({ success: true, payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get payment status for a booking
router.get('/status/:bookingId', async (req, res) => {
  try {
    const payment = await Payment.findOne({ booking: req.params.bookingId });
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json({ status: payment.status, paidAt: payment.paidAt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;