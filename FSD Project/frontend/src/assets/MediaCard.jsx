import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MediaCard = () => {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const userResponse = await axios.get('http://localhost:5000/api/fetchuser/alluser');
        if (userResponse.status === 200) {
          setUserCount(userResponse.data.total || 0);
        } else {
          console.error('Error fetching user count:', userResponse.statusText);
        }

        // Fetch total products
        const productResponse = await axios.get('http://localhost:5000/api/fetchproduct/stats');

        if (productResponse.status === 200) {
          setProductCount(productResponse.data.total || 0);
        } else {
          console.error('Error fetching product count:', productResponse.statusText);
        }
      } catch (error) {
        console.error('Error during data fetching:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sm={4} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://t4.ftcdn.net/jpg/02/27/45/09/240_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg"
            title="User Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Total Users: {userCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Registered Number of Users Listed
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={4} sm={4} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://www.pngitem.com/pimgs/m/325-3256236_products-icon-vector-product-icon-png-transparent-png.png"
            title="Product Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Total Products: {productCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Number of Products Listed
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid item xs={4} sm={4} md={4}>
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://t4.ftcdn.net/jpg/01/14/35/21/360_F_114352197_sHub7KkRAU3AmFzbb9I0tpmzcx1oJg21.jpg"
            title="Payment Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Payment Amount: {productCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amount Received From Users
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MediaCard;
