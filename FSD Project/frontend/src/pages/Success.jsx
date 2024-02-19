import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Typography, Paper } from '@mui/material';



const Wrapper1 = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top:90px;
`;

const Wrapper2 = styled.div`
  padding: 30px;
  text-align: center;
`;

const H1 = styled.h1`
  font-family: 'Kaushan Script', cursive;
  font-size: 4em;
  letter-spacing: 3px;
  color: #5892FF;
  margin: 48px;
  margin-bottom: 20px;
`;

const Wrapper2P = styled.p`
  margin: 0;
  font-size: 1.3em;
  color: #aaa;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing: 1px;
`;

const GoHomeButton = styled.button`
  color: #fff;
  background: #5892FF;
  border: none;
  padding: 10px 50px;
  margin: 30px 0;
  border-radius: 30px;
  text-transform: capitalize;
  box-shadow: 0 10px 16px 1px rgba(174, 199, 251, 1);
`;

const FooterLike = styled.div`
  margin-top: auto;
  background: #d7e6fe;
  padding: 6px;
  text-align: center;
`;

const FooterLikeP = styled.p`
  margin: 0;
  padding: 4px;
  color: #5892ff;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing: 1px;
`;

const FooterLikePA = styled.a`
  text-decoration: none;
  color: #5892ff;
  font-weight: 600;
`;
const Success = () => {
  const orderId = sessionStorage.getItem('orderId');

  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/order/${orderId}`);
        if (!response.ok) {
          throw new Error('Error fetching order details');
        }

        const orderData = await response.json();
        console.log('Order Details:', orderData);
        setOrderDetails(orderData);

        // Fetch items associated with the order
        const itemsResponse = await fetch(`http://localhost:5000/api/order/items/${orderId}`);
        if (!itemsResponse.ok) {
          throw new Error('Error fetching order items');
        }

        const itemsData = await itemsResponse.json();
        console.log('Order Items:', itemsData);

        // Fetch product details for each item
        const productDetailsPromises = itemsData.map(item => fetchProductDetails(item.productId));
        const productDetails = await Promise.all(productDetailsPromises);

        setOrderItems(productDetails);
      } catch (error) {
        console.error('Error fetching order details or items:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchProductDetails = async (productId) => {
    const ProductId = sessionStorage.getItem('productId');

    try {
      const productResponse = await fetch(`http://localhost:5000/api/fetchproduct/select/${ProductId}`);
      if (!productResponse.ok) {
        throw new Error('Error fetching product details');
      }

      return await productResponse.json();
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };
  const redirectToUserHome = () => {
    sessionStorage.removeItem('productId');
    sessionStorage.removeItem('orderId');
    window.location.href = '/userhome';
  };
  return (
    <Wrapper1>
      <Wrapper2>
        <H1>Thank you for Shopping With Us !</H1>
        <Wrapper2P>Expected Delivery of your Product will be on Feb 22 2024</Wrapper2P>
        <GoHomeButton onClick={redirectToUserHome}>Go home</GoHomeButton>   
      </Wrapper2>
      <FooterLike>
        <FooterLikeP>
        </FooterLikeP>
      </FooterLike>
    </Wrapper1>
  );
};

export default Success;
