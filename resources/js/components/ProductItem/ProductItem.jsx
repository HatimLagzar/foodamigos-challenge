import React from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';

function ProductItem({ product, itemsInBasket, setItemsInBasket }) {
  const handleAddToBasket = () => {
    const newData = [...itemsInBasket, {
      ...product,
      quantity: 1,
    }];
    setItemsInBasket(newData);
    localStorage.setItem('basket', JSON.stringify(newData));
  };

  const handleRemoveFromBasket = () => {
    const newData = [...itemsInBasket.filter(item => item.id !== product.id)];
    setItemsInBasket(newData);
    localStorage.setItem('basket', JSON.stringify(newData));
  };

  return <Card sx={{ width: '20%' }}>
    <CardContent>
      <Typography variant={'h6'}>{product.name}</Typography>
      <Typography variant={'body2'}>{(product.price / 1000).toFixed(
        2)} EUR</Typography>
      <Typography variant={'body2'}>{product.description}</Typography>
    </CardContent>
    <CardActions>
      {
        itemsInBasket.find(item => item.id === product.id)
          ? <Button variant={'outlined'} size={'small'}
                    onClick={handleRemoveFromBasket}>
            Remove From Basket
          </Button>
          : <Button variant={'contained'} size={'small'}
                    onClick={handleAddToBasket}>
            Add To Cart
          </Button>
      }

    </CardActions>
  </Card>;
}

export default ProductItem;
