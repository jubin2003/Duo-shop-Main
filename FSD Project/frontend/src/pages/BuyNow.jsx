// BuyNow.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Grid, Card, CardMedia, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled(Grid)({
  padding: '20px',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: '20px',
});

const StyledTextField = styled(TextField)({
  marginBottom: '20px',
});

const StyledButton = styled(Button)({
  margin: '20px 0',
});

const StyledCard = styled(Card)({
  maxWidth: '400px',
});

const StyledCardMedia = styled(CardMedia)({
  height: '200px',
  objectFit: 'contain',
  backgroundSize: 'contain',
});

const StyledPaper = styled(Paper)({
  padding: '20px',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
});

const TotalValueBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
  padding: '10px',
  marginTop: '20px',
  fontSize: '24px',
});

const BuyNow = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const quantity = parseInt(queryParams.get('quantity')) || 1;

  const [customerName, setCustomerName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [alternatePhoneNumber, setAlternatePhoneNumber] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [product, setProduct] = useState(null);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      fetchCurrentUser(userId);
    }
  }, []);

  const fetchCurrentUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/fetchuser/find/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch current user details');
      }
      const data = await response.json();
      setCurrentUser(data);
    } catch (error) {
      console.error('Error fetching current user details:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let productId = id;

        // If id is not defined, get productId from sessionStorage
        if (!productId) {
          productId = sessionStorage.getItem('productId');
        }

        if (productId) {
          const response = await fetch(`http://localhost:5000/api/products/find/${productId}`);
          if (!response.ok) {
            throw new Error('Error fetching product details');
          }
          const data = await response.json();
          console.log('Fetched product data:', data);
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [id]); 

  useEffect(() => {
    if (product) {
      const totalPrice = product.price * quantity;
      setTotalValue(totalPrice);
    }
  }, [product, quantity]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Placing order...');
    console.log('Product ID:', id);
    console.log('Customer Name:', customerName);
    console.log('Customer email:', currentUser.email);
    console.log('Shipping Address:', shippingAddress);
    console.log('Phone Number:', phoneNumber);
    console.log('Landmark:', landmark);
    console.log('Alternate Phone Number:', alternatePhoneNumber);
    console.log('Quantity:', quantity);
    console.log('Total Value:', totalValue);
  };

  return (
    <StyledContainer container justifyContent="center">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h4" align="center" gutterBottom>
              Place Your Order
            </Typography>
            <Typography variant="h6" gutterBottom>
              Product Details:
            </Typography>
            
            {product && (
              <center>
                <StyledCard>
                  <StyledCardMedia
                    component="img"
                    image={product.img}
                    alt={product.title}
                  />
                </StyledCard>
              </center>
            )}
       
            {product && (
              <>
                <Typography variant="body1" gutterBottom>
                  Name: {product.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Description: {product.desc}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: ${product.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quantity: {quantity}
                </Typography>
              </>
            )}
            <TotalValueBox>Total Value: ${totalValue}</TotalValueBox>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper elevation={3}>
            <Typography variant="h6" gutterBottom>
              Order Details:
            </Typography>
            {currentUser && (
              <StyledForm onSubmit={handleSubmit}>
                <StyledTextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={currentUser.email}
                  disabled
                  required
                />
                <StyledTextField
                  label="Shipping Address"
                  variant="outlined"
                  fullWidth
                  value={currentUser.address}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={currentUser.phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Landmark"
                  variant="outlined"
                  fullWidth
                  value={currentUser.landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Alternate Contact (Optional)"
                  variant="outlined"
                  fullWidth
                  value={alternatePhoneNumber}
                  onChange={(e) => setAlternatePhoneNumber(e.target.value)}
                />
                <StyledButton type="submit" variant="contained" color="primary" fullWidth>
                  Proceed to payment
                </StyledButton>
              </StyledForm>
            )}
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default BuyNow;
