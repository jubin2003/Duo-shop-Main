import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { grey } from '@mui/material/colors';
import { mobile } from '../Responsive';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: '10px 0px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const Text = styled.div`
  margin-right: 10px;
  font-size: 14px;
`;

const buttonStyle = {
  marginRight: '10px',
  padding: '10px 15px',
  backgroundColor: 'white',
  color: 'black',
  textDecoration: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const Button = styled.button`
  ${buttonStyle}
`;

const NavBarUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
  const [isAdmin, setIsAdmin] = useState(false); // Define isAdmin state
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const accessToken = localStorage.getItem('accessToken');

    if (storedUsername && accessToken) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const handleBrowserBack = (event) => {
      event.preventDefault();
      navigate('/');
    };

    window.addEventListener('popstate', handleBrowserBack);

    return () => {
      window.removeEventListener('popstate', handleBrowserBack);
    };
  }, [navigate]);

  const handleLogout = () => {
    // Clear user-related data
    document.cookie = 'accessToken=; Secure; HttpOnly; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isAdmin');
    sessionStorage.removeItem('userId');
    localStorage.removeItem('cart');

    // Clear cart-related data
    localStorage.removeItem('cartProducts');

    // Update state or dispatch actions as needed
    setIsLoggedIn(false);
    setIsAdmin(false);

    // Navigate to the login page or another appropriate route
    navigate('/login');
  };

  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: grey[500], fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Duo</Logo>
        </Center>
        <Right>
          <Text>{username ? `Hello, ${username}!` : 'User Profile'}</Text>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
          <Button onClick={handleLogout}>Logout</Button>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBarUser;