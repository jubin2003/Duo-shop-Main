import React from 'react';
import styled from 'styled-components';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessIcon from '@mui/icons-material/Business';
import { mobile } from "../Responsive";
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  background-color: teal;
  color: black;

  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  margin-bottom: 20px;
`;

const Desc = styled.p`
  margin-bottom: 20px;
  font-weight: bold;
`;

const SocialContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
  font-weight: bold;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-weight: bold;
  color: black; /* Set the text color to black */
  text-decoration: none; /* Remove underlining */
  cursor: pointer; /* Add pointer cursor on hover */

  &:hover {
    text-decoration: underline; /* Underline on hover */
  }
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const Payment = styled.img`
  width: 250px;
  height: 70px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Duo</Logo>
        <Desc>
          Experience Fashion for Every Moment: Elevate your style with our curated duo clothing collection, blending comfort, elegance, and uniqueness. Discover versatile pieces crafted with quality, designed to empower your confidence. Explore the intersection of fashion and comfort in every stitch
        </Desc>
        <SocialContainer>
          <SocialIcon color="#3B5999"><FacebookOutlinedIcon /></SocialIcon>
          <SocialIcon color="#E4405F"><InstagramIcon /></SocialIcon>
          <SocialIcon color="#25D366"><WhatsAppIcon /></SocialIcon>
          <SocialIcon color="#1DA1F2"><TwitterIcon /></SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem><Link to="/userhome">Home</Link></ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Mens Fashion</ListItem>
          <ListItem>Womens Fashion</ListItem>
          <ListItem>Account</ListItem>
          <ListItem>Wishlist</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <BusinessIcon style={{ marginRight: "10px" }} /> Kottayam, Kerala, India , Pincode:68***
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{ marginRight: "10px" }} />+91 9074******
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} />duo@gmail.com
        </ContactItem>
        <Payment src="https://t4.ftcdn.net/jpg/04/73/84/61/360_F_473846184_0k637f6855ZJqaulKqAmgJTEVGVibR1P.jpg" />
      </Right>
    </Container>
  );
};

export default Footer;
