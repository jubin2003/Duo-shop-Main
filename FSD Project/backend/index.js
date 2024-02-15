const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser'); 
// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURL = process.env.MONGO_URL;

if (!mongoURL) {
  console.error("MongoDB URL is not defined. Please check your environment variables.");
  process.exit(1);
}

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.error("Error connecting to database:", err);
    process.exit(1);
  });

// Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const productfetchRoute = require("./routes/productfetch");
const userfetchRoute = require("./routes/userfetch");
const orderdata = require("./routes/orderdata");
const cartproduct = require("./routes/cartproduct");
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/fetchproduct", productfetchRoute);
app.use("/api/fetchuser",userfetchRoute);
app.use("/api/orderdata",orderdata);
app.use("/api/cart",cartproduct)
// Server setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});