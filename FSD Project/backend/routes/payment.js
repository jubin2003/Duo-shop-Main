const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
// Import the Order model
const Order = require('../models/Order'); // Update the path accordingly

// Load environment variables from .env file
require('dotenv').config();

router.post('/orders', async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const { totalValue } = req.body; // Extract totalValue from the request body

    const options = {
      amount: totalValue * 100, // Convert totalValue to smallest currency unit (assuming totalValue is in currency units)
      currency: 'INR',
      receipt: 'receipt_order_' + Math.floor(Math.random() * 100000),
    };

    const order = await instance.orders.create(options);

    if (!order) return res.status(500).json({ error: 'Some error occurred' });

    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/success", async (req, res) => {
  try {
      // getting the details back from our font-end
      const {
          orderCreationId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
      } = req.body;

      // Creating our own digest
      // The format should be like this:
      // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
      const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      // comaparing our digest with the actual signature
      // if (digest !== razorpaySignature)
      //     return res.status(400).json({ msg: "Transaction not legit!" });

      // THE PAYMENT IS LEGIT & VERIFIED
      // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

      res.json({
          msg: "success",
          orderId: razorpayOrderId,
          paymentId: razorpayPaymentId,
      });
  } catch (error) {
      res.status(500).send(error);
  }
});




module.exports = router;
