import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import { addProduct } from '../redux/cartRedux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
  font-weight: 2px;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;
const fetchCart = async (userId) => {
  
  try {
    const response = await fetch(`http://localhost:5000/api/cart/find/${userId}`);
    const data = await response.json();

    if (response.ok) {
      console.log('Updated cart data:', data);
      // You can update the state or perform other actions based on the fetched cart data
    } else {
      console.error('Error fetching cart data:', data);
    }
  } catch (error) {
    console.error('Error fetching cart data:', error);
  }
};
const Product = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/find/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    getProduct();
  }, []);

  const userId = sessionStorage.getItem('userId');

  const handleQuantity = (type) => {
    if (type === 'dec') {
      setQuantity(quantity > 1 ? quantity - 1 : 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleColorChange = (color) => {
    setColor(color);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleClick = () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      // If userId is not present, show alert and redirect to login
      toast.warning('Please log in to add products to the cart.', {
        // position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
        className: 'custom-toast',
      });
      navigate('/login');
      return; // Add a return statement to prevent further execution
    }

    dispatch(addProduct({ ...product, quantity, color, size }));
    fetchCart(userId);
  };

  return (
    <>
    
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} alt="Product Image" />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>Rs.{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {Array.isArray(product.color) &&
                product.color.map((c) => (
                  <FilterColor
                    color={c}
                    key={c}
                    onClick={() => handleColorChange(c)}
                  />
                ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={handleSizeChange}>
                {Array.isArray(product.size) &&
                  product.size.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveCircleOutlineIcon onClick={() => handleQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <AddCircleOutlineIcon onClick={() => handleQuantity('inc')} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
    </>
  );
};

export default Product;
