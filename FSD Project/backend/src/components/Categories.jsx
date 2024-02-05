import React from 'react';
import styled from 'styled-components';
import { categories } from '../../data';
import CategoryItem from './CategoryItem'; // Corrected the import name
import { mobile } from "../Responsive";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  
  ${mobile({ 
    padding: "10px", 
    flexDirection: "column",
    alignItems: "center" // Align items to center for mobile
  })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map(item => (
        <CategoryItem key={item.id} item={item} />
      ))}
    </Container>
  );
};

export default Categories;
