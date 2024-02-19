const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming you have a 'User' model
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Assuming you have a 'Product' model
  quantity: { type: Number, required: true },
  orderCreationId: { type: String, required: true },
  razorpayPaymentId: { type: String, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpaySignature: { type: String, required: true },
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
  },
  status: { type: String, enum: ['Order Placed', 'Processing', 'Shipped', 'Delivered', 'Canceled', 'Pending'], default: 'Order Placed' },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
