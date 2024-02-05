import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Grid } from '@mui/material';
import ResponsiveAppBar from '../assets/ResponsiveAppBar';
import Footer from '../assets/Footer';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    desc: '',
    img: '',
    categories: '',
    size: '',
    color: '',
    price: '',
  });

  useEffect(() => {
    // Fetch the details of the product using the ID from the server
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Update the product details on the server
    axios.put(`http://localhost:5000/api/products/${id}`, product)
      .then((response) => {
        console.log('Product updated successfully:', response.data);
        // Redirect to the view page after successful update
        navigate('/view-product');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div>
      <ResponsiveAppBar />
      <br />
      <div style={{ margin: '6%' }} className='App'>
        <Typography variant='h5' style={{ color: 'blue' }}>
          Update Product
        </Typography>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField label="Product Title" name="title" value={product.title} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField label="Product Description" name="desc" value={product.desc} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField label="Image URL" name="img" value={product.img} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Categories"
              name="categories"
              value={Array.isArray(product.categories) ? product.categories.join(',') : product.categories}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField label="Size" name="size" value={product.size} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField label="Color" name="color" value={product.color} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField label="Price" name="price" value={product.price} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Update Product
            </Button>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateProduct;
