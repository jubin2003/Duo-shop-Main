import React, { useState } from 'react';
import { Button, TextField, Typography, Grid } from '@mui/material';
import axios from 'axios';
import ResponsiveAppBar from '../assets/ResponsiveAppBar';
import Footer from '../assets/Footer';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';
const AddProduct = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    desc: '',
    img: '',
    categories: [],
    size: [],
    color: [],
    price: '',
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputs((prevData) => ({ ...prevData, [name]: value }));
  };

  const addHandler = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/fetchproduct/add', inputs);

      if (response.status === 200) {
        toast.success('Product added successfully');
        setTimeout(() => {
          navigate('/view-product');
        }, 2000);
      } else {
        toast.error('Error adding product. Please try again');
      }
    } catch (error) {
      toast.error('Error adding product. Please try again');
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <ResponsiveAppBar/>
      <ToastContainer/>
    <div style={{ margin: '6%' }} className='App'>
      <Typography variant='h5' style={{ color: 'blue' }}>
        Add Product
      </Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <TextField variant="outlined" label="Product Title" name="title" value={inputs.title} onChange={inputHandler} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField variant="outlined" label="Product Description" name="desc" value={inputs.desc} onChange={inputHandler} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField variant="outlined" label="Image URL" name="img" value={inputs.img} onChange={inputHandler} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField
            variant="outlined"
            label="Categories"
            name="categories"
            value={Array.isArray(inputs.categories) ? inputs.categories.join(',') : inputs.categories}
            onChange={inputHandler}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField variant="outlined" label="Size" name="size" value={Array.isArray(inputs.size) ? inputs.size.join(',') : inputs.size} onChange={inputHandler} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <TextField variant="outlined" label="Color" name="color" value={Array.isArray(inputs.color) ? inputs.color.join(',') : inputs.color} onChange={inputHandler} fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField variant="outlined" label="Price" name="price" value={inputs.price} onChange={inputHandler} fullWidth />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button variant="contained" color="primary" fullWidth onClick={addHandler}>
            Submit
          </Button>
       
        </Grid>
      </Grid>
    </div>
    <Footer/>
    </div>
  );
};

export default AddProduct;
