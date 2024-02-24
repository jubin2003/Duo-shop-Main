import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import NavBarUser from "../components/NavBarUser";
import Footer from "../components/Footer";

const OrderItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
  },
}));

const OrderStatus = styled("div")(({ theme, status }) => ({
  color: "white",
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  fontWeight: "bold",
  textAlign: "center",
  backgroundColor: (() => {
    switch (status) {
      case "Processing":
        return "#ff9800";
      case "Order Placed":
        return "#03a9f4";
      case "Shipped":
        return "#4caf50";
      case "Delivered":
        return "#9c27b0";
      case "Canceled":
        return "#f44336";
      default:
        return "#666666";
    }
  })(),
}));

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem("userId");

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/orderdata/find/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const orders = await response.json();
      setOrders(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const cancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/orders/${orderId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to cancel order");
        }
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
      } catch (error) {
        console.error("Error canceling order:", error);
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  return (
    <>
    <NavBarUser/>
    <Container maxWidth="lg" sx={{ mt: 4 }}>
    <Typography variant="h4" align="center" gutterBottom>
      Your Orders
    </Typography>
    {orders.length === 0 ? (
      <Typography variant="subtitle1" align="center">
        You haven't placed any orders yet. Start shopping now!
      </Typography>
    ) : (
      orders.map((order) => (
        <OrderItem key={order._id}>
          <Grid container alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h6">{order.productName}</Typography>
              <Typography variant="body1" paragraph>
                Shipping Address: {order.shippingAddress}
              </Typography>
              <Typography variant="body1">
                Total Value: ${order.totalValue ? order.totalValue.toFixed(2) : "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Placed on: {order.createdAt}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <OrderStatus status={order.status}>
                {order.status}
              </OrderStatus>
              {order.status !== "Delivered" && order.status !== "Canceled" && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => cancelOrder(order._id)}
                  sx={{ mt: 1, width: { xs: "100%", md: "auto" } }} 
                >
                  Cancel Order
                </Button>
              )}
            </Grid>
          </Grid>
        </OrderItem>
      ))
    )}
  </Container>
  <Footer/>
 </>
  );
};

export default Orders;