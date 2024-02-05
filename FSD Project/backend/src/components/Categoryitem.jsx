import React from 'react';
import styled from 'styled-components';
import { mobile } from "../Responsive";
import { Link } from 'react-router-dom';
import { categories } from '../../data';

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;

  ${mobile({ height: "20vh" })}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* crop */
  ${mobile({ height: "100%" })}
`;

const Info = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%; /* Adjusted width for mobile view */
  text-align: center;
  z-index: 1; /* Ensure the text overlays the image */
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: grey;
  cursor: pointer;
  font-weight: 600;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
    <Link to={`/products/${item.cat}`}>     
     <Image src={item.img} alt={item.title} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
