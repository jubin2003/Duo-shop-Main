const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY, {
  apiVersion: '2020-08-27', // Update with the latest version
});

router.post("/payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      payment_method: req.body.tokenId,
      confirm: true,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
