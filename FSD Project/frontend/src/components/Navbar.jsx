import React from 'react';
import styled from 'styled-components';
import Search from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { grey } from '@mui/material/colors'; // Import 'grey' instead of 'gray'
import { mobile } from "../Responsive";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
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
  ${mobile({ display: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const buttonStyle = {
  marginRight: '10px', // Add margin to create a gap
  padding: '10px 15px',
  backgroundColor: 'white',
  color: 'black',
  textDecoration: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='search'/>
            <Search style={{ color: grey[500], fontSize: 16 }} /> {/* Use 'grey' color from MUI */}
          </SearchContainer>
        </Left> 
        <Center>
          <Logo>Duo</Logo>
        </Center> 
        <Right>
        <div>
      <Link to="/register" style={buttonStyle}>
        REGISTER
      </Link>
      <Link to="/login" style={buttonStyle}>
        SIGN IN
      </Link>
    </div>
          <Link to='/cart'>
          <MenuItem>
            <Badge badgeContent={0} color="primary">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </MenuItem>
          </Link>
        </Right> 
      </Wrapper>
    </Container>
  );
};

export default Navbar;