const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create an order
router.post('/', async (req, res) => {
    try {
      const { userId, productId, quantity, ...orderDetails } = req.body;
      
      const order = new Order({
        userId,
        productId,
        quantity,
        ...orderDetails,
      });
  
      await order.save();
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Get order details by ID
  router.get('/:orderId', async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
      } else {
        res.json(order);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports = router;
