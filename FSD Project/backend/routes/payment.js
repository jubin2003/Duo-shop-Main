const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');

// Load environment variables from .env file
require('dotenv').config();

router.post('/orders', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: 50000, // amount in smallest currency unit (change as needed)
      currency: 'INR',
      receipt: 'receipt_order_' + Math.floor(Math.random() * 100000), // unique receipt for each order
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).json({ error: 'Some error occurred' });

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
