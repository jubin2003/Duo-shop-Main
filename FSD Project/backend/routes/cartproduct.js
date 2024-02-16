const router = require("express").Router();
const Cart = require("../models/Cart");

router.post('/add', async (req, res) => {
  console.log('Received POST request at /api/cart/add');
  try {
    const { userId, product } = req.body;

    // Check if data structure is as expected
    if (!product || !product.productId || !product.quantity) {
      return res.status(400).json({ error: 'Invalid request format' });
    }

    const existingCartItem = await Cart.findOne({ userId, 'product.productId': product.productId });

    if (existingCartItem) {
      // If the item already exists, update the quantity
      existingCartItem.product.quantity += product.quantity;
      await existingCartItem.save();
    } else {
      // If the item does not exist, create a new cart item
      const newCartItem = new Cart({ userId, product });
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
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;

    // Convert productId to ObjectId
    const productIdObjectId = new ObjectId(productId);

    // Find the cart item by the provided productId and remove it
    const updatedCart = await Cart.findOneAndUpdate(
      { "products.productId": productIdObjectId },
      { $pull: { products: { productId: productIdObjectId } } },
      { new: true }
    );

    if (!updatedCart) {
      // If the cart is not found or product is not in the cart, return an error response
      return res.status(404).json({ error: 'Cart or product not found' });
    }

    // Return the updated cart
    res.status(200).json({ cartItems: updatedCart.products });
  } catch (error) {
    // Handle errors, e.g., database connection issues
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get("/find/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('product.productId', 'title price');

    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.status(200).json({ product: cart.product});
    }
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get cart items for a particular user
// Route to get cart items for a particular user
router.get('/getCart/:userId', async (req, res) => {
  console.log('Received GET request at /api/cart/getCart');

  try {
    const userId = req.params.userId;

    // Additional validation
    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Find cart items for the specified user with details from the Product model
    const userCartItems = await Cart.find({ userId })
      .populate({
        path: 'product.productId',
        model: 'Product', // Assuming your Product model is named 'Product'
        select: 'title desc img categories size color price',
      });

    res.status(200).json({ cartItems: userCartItems });
  } catch (error) {
    console.error('Error getting user cart:', error);
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
//

router.delete("/:userId/:productId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const productId = req.params.productId;

    // Find and delete the cart item with matching userId and productId
    const updatedCart = await Cart.findOneAndDelete({
      userId,
      "products.productId": productId
    });

    if (!updatedCart) {
      // If the cart or product is not found, return an error response
      return res.status(404).json({ error: 'Cart or product not found' });
    }

    // Return the updated cart or any other necessary data
    res.status(200).json({ message: 'Product deleted from cart successfully' });
  } catch (error) {
    // Handle errors, e.g., database connection issues
    console.error('Error deleting product from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
