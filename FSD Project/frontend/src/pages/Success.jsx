import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { userRequest } from "../requestMethod";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Extracting Razorpay response data
  const razorpayResponse = location.state.razorpayResponse;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        // Use Razorpay response data to extract relevant information
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: razorpayResponse.amount,
          address: razorpayResponse.notes.address,
          // Add any additional information needed for your order creation
        });

        setOrderId(res.data._id);
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    // Check if Razorpay response is available before creating the order
    razorpayResponse && createOrder();
  }, [cart, razorpayResponse, currentUser]);

  const goToHomepage = () => {
    // Redirect to the homepage using navigate
    navigate("/userhome");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId ? (
        `Order has been created successfully. Your order number is ${orderId}`
      ) : (
        `Successful. Your order is being prepared...`
      )}
      <button style={{ padding: 10, marginTop: 20 }} onClick={goToHomepage}>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
