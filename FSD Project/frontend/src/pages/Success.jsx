import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Paper } from '@mui/material';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get('orderId');

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/order/${orderId}`);
        if (!response.ok) {
          throw new Error('Error fetching order details');
        }

        const data = await response.json();
        console.log('Order Details:', data);
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Order Placed Successfully
      </Typography>
      {orderDetails && (
        <>
          <Typography variant="body1" gutterBottom>
            Order ID: {orderDetails._id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Customer Name: {orderDetails.customerDetails.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Customer Email: {orderDetails.customerDetails.email}
          </Typography>
          {/* Add more order details based on your data structure */}
          <Typography variant="body1" gutterBottom>
            Address: {orderDetails.customerDetails.address}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Contact: {orderDetails.customerDetails.contact}
          </Typography>
          <Typography variant="body1" gutterBottom>
      Product ID: {orderDetails.productId}
    </Typography>
    <Typography variant="body1" gutterBottom>
      Quantity: {orderDetails.quantity}
    </Typography>
          {/* Add more fields as needed */}
        </>
      )}
    </Paper>
  );
};

export default Success;
