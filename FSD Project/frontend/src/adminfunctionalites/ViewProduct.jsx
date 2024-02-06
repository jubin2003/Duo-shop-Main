import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ResponsiveAppBar from '../assets/ResponsiveAppBar';
import Footer from '../assets/Footer';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the server
    axios.get('http://localhost:5000/api/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleUpdate = (productId) => {
    // Implement the logic for updating a product
    window.location.href = `/update-product/${productId}`;
    console.log(`Update product with ID: ${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/fetchproduct/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product. Please try again.');
    }
  };

  return (
    <div>
    <ResponsiveAppBar />
    <br />
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 445, height: '100%' }}> {/* Set a fixed height for the Card */}
            <CardMedia
              component="img"
              alt="Product Image"
              height="240"
              image={product.img}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {product.desc}
              </Typography>
              <Typography variant="body" color="text.secondary" noWrap>
                {product.categories.join(', ')}
              </Typography>
              <br />
              <Typography variant="body" color="text.secondary">
                {product.size}
              </Typography>
              <br />
              <Typography variant="body" color="text.secondary">
                {product.color}
                <br />
              </Typography>
              <Typography gutterBottom variant="h5" color="text.secondary">
                Rs.{product.price}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => handleUpdate(product._id)} size="small">
                Update
              </Button>
              <Button onClick={() => handleDelete(product._id)} size="small">
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
    <br />
    <Footer />
    <ToastContainer />
  </div>
  );
};

export default ViewProduct;
