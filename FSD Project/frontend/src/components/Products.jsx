import styled from "styled-components";
import { popularProducts } from '../../data'; // Ensure correct import or define the data here
import Product from './Product';
import { useEffect, useState } from "react";
import axios from "axios";



const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({cat,filter,sort}) => {
  const [products,setProducts] = useState([]);
   const[ filteredProducts,setFilterdProducts] = useState([]);
   useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? `http://localhost:5000/api/products?category=${cat}` : 'http://localhost:5000/api/products/'
        );
        setProducts(res.data);
      } catch (err) {
        // Handle errors here, for example:
        console.error('Error fetching products:', err);
      }
    };
  
    getProducts();
  }, [cat]);
  useEffect(()=>{
   cat && setFilterdProducts(
    products.filter(item=> Object.entries(filter).every(([key,value])=>
     item[key].includes(value)
    ))
   )
  },[products,cat,filter]);
useEffect(()=>{
  if(sort==="newest"){
    setFilterdProducts(prev=>
      [...prev].sort((a,b)=>a.createdAt - b.createdAt)
      );
  }else if ((sort === "asc")){
    setFilterdProducts((prev)=>
    [...prev].sort((a,b)=>a.price - b.price));
  }else{
    setFilterdProducts((prev)=>
    [...prev].sort((a,b)=>b.price - a.price));
  }
},[sort]);
  return (
    <Container>
     {cat ? filteredProducts.map(item => (
    <Product item={item} key={item.id} />
  )) : products.slice(0, 8).map((item, index) => (
    <Product item={item} key={index} />
  ))}
    </Container>
  );
};

export default Products;
