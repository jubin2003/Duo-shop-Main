const router = require("express").Router();
const Cart = require("../models/Cart");

router.post('/add', async (req, res) => {
    console.log('Received POST request at /api/cart/add');
    try {
      const { userId, productId, quantity } = req.body;
      console.log('Received userId:', userId);

      // Check if Cart model is properly defined
      if (!Cart) {
        throw new Error('Cart model is not defined');
      }

      // Check if data structure is as expected
      const existingCartItem = await Cart.findOne({ userId, product: productId });
  
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
        await existingCartItem.save();
      } else {
        const newCartItem = new Cart({ userId, product: productId, quantity });
        await newCartItem.save();
      }
  
      res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
  

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedcart = await newCart.save();
    res.status(200).json(savedcart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err); // Fixed parentheses here
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart product deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('products.productId', 'title price');

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.status(200).json({ products: cart.products });
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/:userId", async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { products: req.body.product } },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('products');
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
