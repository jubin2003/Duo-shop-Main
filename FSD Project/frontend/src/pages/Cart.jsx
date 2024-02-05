// Cart.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import StripeCheckout from 'react-stripe-checkout';
import { userRequest } from '../requestMethod';
const KEY = 'pk_test_51OVyM9SBqq3RJksXlACJz3v239mH9KKpBId9wuddMXdCrB6RJtuKhah0gHhGqSIpircX6B3utSeo7CxCuUpN0DX3002nPmLoER';

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
`;
// ... (other styled components)
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => (props.type === 'filled' ? 'none' : '1px solid black')};
  background-color: ${(props) => (props.type === 'filled' ? 'black' : 'transparent')};
  color: ${(props) => (props.type === 'filled' && 'white')};
`;

const TopTexts = styled.div``;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductDetails = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 150px;  
  height: 150px; 
  object-fit: cover;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 300;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === 'total' && '500'};
  font-size: ${(props) => props.type === 'total' && '24px'};
`;
const SummaryItemPrice = styled.span``;
const SummaryItemText = styled.span``;
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        if (stripeToken) {
          const response = await userRequest.post("/checkout/payment", {
            tokenId: stripeToken.id,
            amount: 500,
          });

          // Log the response for debugging
          console.log('Server Response:', response);

          navigate("/success", {
            state: {
              stripeData: response.data,
              products: cart,
            },
          });
        }
      } catch (error) {
        // Log the error for debugging
        console.error('Error making request:', error);
      }
    };

    makeRequest();
  }, [stripeToken, cart, navigate]);
  const handleDelete = async (productId) => {
    try {
      // Make a request to your server to delete the product from the cart
      const response = await userRequest.delete(`/api/carts/${productId}`);
      
      // Assuming the server responds with a success message
      console.log('Product deleted from cart:', response.data);
      
      // You may want to update the local state or Redux store here
      // dispatch(deleteProduct(productId));
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  };

  return (
    <Container>
      {/* <Navbar /> */}
      <Announcement />
      <Wrapper>
        <Title>Your BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>WishList(0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
        <Info>
        {cart.products.map((product) => (
          <Product key={product._id}>
            <ProductDetails>
              <Image src={product.img} />
              <Details>
                <ProductName>
                  <b>Product:</b>
                  {product.title}
                </ProductName>
                <ProductId>
                  <b>ID:</b>
                  {product._id}
                </ProductId>
                <ProductColor color={product.color} />
                <ProductSize>
                  <b>Size:</b>
                  {product.size}
                </ProductSize>
              </Details>
            </ProductDetails>
            <PriceDetails>
              <ProductAmountContainer>
                <AddBoxIcon />
                <ProductAmount>{product.quantity}</ProductAmount>
                <RemoveCircleIcon />
           
                <DeleteIcon onClick={() => handleDelete(product._id)} style={{ cursor: 'pointer' }} />
              </ProductAmountContainer>
              <ProductPrice>Rs.{product.price * product.quantity}</ProductPrice>
            </PriceDetails>
          </Product>
        ))}
        <Hr />
      </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs.50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs.50</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Duo Clothing"
              image="https://www.logotypes101.com/logos/650/4D9F7231ECDCC11B64396DC74395DCC8/duo.png"
              billingAddress
              shippingAddress
              description={`Your total amount is Rs ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <SummaryButton>CHECKOUT NOW</SummaryButton>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;