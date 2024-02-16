const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  product: {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product', // Assuming you have a Product model
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
