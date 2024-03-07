import React, { useEffect, useState } from 'react';
import {
  Button,
  Card, CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { getAllProducts } from '../../app/api/product/productApi.js';

function HomePage({ isLoggedIn, setIsLoggedIn }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    if (products && products.length > 0) {
      return;
    }

    getAllProducts().then(response => {
      setProducts(response.data.products);
    });
  }, []);

  return <>
    <Stack direction={'row'} gap={'24px'} flexWrap={'wrap'} justifyContent={'center'} sx={{ m: '20px 0' }}>
      {
        products
          ? products.map(product => {
            return <Card key={product.id} sx={{ width: '20%' }}>
              <CardContent>
                <Typography variant={'h6'}>{product.name}</Typography>
                <Typography variant={'span'}>{product.price}</Typography>
                <Typography variant={'p'}>{product.description}</Typography>
              </CardContent>
              <CardActions>
                <Button variant={'contained'} size={'small'}>Add To Cart</Button>
              </CardActions>
            </Card>
          })
          : 'Loading...'
      }
    </Stack>
  </>;
}

export default HomePage;
