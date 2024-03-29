const Product = require("../models/Product");
const router = require("express").Router();

// CREATE
router.post("/add", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({ message: "Product added successfully", data: savedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET PRODUCT
router.get("/select/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ data: product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL PRODUCTS
router.get("/getall", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/stats", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    res.status(200).json({ total: totalProducts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;