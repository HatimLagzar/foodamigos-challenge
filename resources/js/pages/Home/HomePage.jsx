import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { getAllProducts } from '../../app/api/product/productApi.js';
import ProductItem from '../../components/ProductItem/ProductItem.jsx';

function HomePage({ isLoggedIn, setIsLoggedIn, itemsInBasket, setItemsInBasket }) {
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
    <Stack direction={'row'} gap={'24px'} flexWrap={'wrap'}
           justifyContent={'center'} sx={{ m: '20px 0' }}>
      {
        products
          ? products.map(product => {
            return <ProductItem key={product.id}
                                product={product}
                                itemsInBasket={itemsInBasket}
                                setItemsInBasket={setItemsInBasket}/>;
          })
          : 'Loading...'
      }
    </Stack>
  </>;
}

export default HomePage;
