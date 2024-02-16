// BuyNow.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Grid, Card, CardMedia, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'; // Import axios
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
        let selectedProduct = sessionStorage.getItem('selectedProduct');

        if (!selectedProduct) {
          console.error('Selected product details not found in sessionStorage.');
          return;
        }

        selectedProduct = JSON.parse(selectedProduct);

        const response = await fetch(`http://localhost:5000/api/products/find/${selectedProduct._id}`);
        if (!response.ok) {
          throw new Error('Error fetching product details');
        }
        
        const data = await response.json();
        console.log('Fetched product data:', data);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, []);
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
// Move the loadScript and displayRazorpay functions inside BuyNow component
const loadScript = async (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const result = await axios.post('http://localhost:5000/api/payment/orders');

      if (!result) {
        alert('Server error. Are you online?');
        return;
      }

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: 'rzp_test_qSuIgz3hFLcQ68', // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: 'Duo Clothing',
        description: 'Test Transaction',
        image:"https://www.logotypes101.com/logos/650/4D9F7231ECDCC11B64396DC74395DCC8/duo.png" ,
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post('http://localhost:5000/payment/success', data);

          alert(result.data.msg);

          // Use window.location to navigate to the Success page
          window.location.href = '/success'; 
        },
        prefill: {
          name: 'Jubin Thomas',
          email: 'Duo@gmail.com',
          contact: '9568124578',
        },
        notes: {
          address: 'Duo Clothing Store , Kottayam,Kerala,Pincode:686522',
        },
        theme: {
          color: '#0593ba',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Error during Razorpay payment:', error);
    }
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
                  Price: {product.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quantity: {quantity}
                </Typography>
              </>
            )}
            <TotalValueBox>Total Price: Rs.{totalValue}</TotalValueBox>
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
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
                <StyledTextField
                  label="Landmark"
                  variant="outlined"
                  fullWidth
                  value={landmark}
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
                <StyledButton type="submit" variant="contained" color="primary" fullWidth onClick={displayRazorpay}>
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
