import React, { useEffect } from 'react';
import { Button, Modal, Stack, TextField, Typography } from '@mui/material';

function Basket({ open, handleClose, items, setItems }) {
  useEffect(() => {
    if (items.length === 0) {
      handleClose();
      return;
    }

    if (items.find(item => item.quantity === 0)) {
      setItems([...items.filter(item => item.quantity > 0)]);
      return;
    }

    localStorage.setItem('basket', JSON.stringify(items));
  }, [items]);

  const handleRemoveFromBasket = (product) => {
    const newData = [...items.filter(item => item.id !== product.id)];
    setItems(newData);
    localStorage.setItem('basket', JSON.stringify(newData));
  };

  const handleUpdateQuantity = (item, value) => {
    const newItems = [...items];

    setItems([
      ...newItems.map(product => {
        if (item.id === product.id) {
          product.quantity = value;
        }

        return product;
      }),
    ]);
  };

  return <>
    <Modal open={open} onClose={handleClose}>
      <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
        <Stack gap={'24px'} direction={'column'} sx={{
          width: '500px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          m: 10,
          p: 2,
        }}>
          {
            items.map(item => {
              return <Stack key={item.id} direction={'column'} gap={'8px'}>
                <Typography variant={'p'}>{item.name}</Typography>
                <TextField type={'number'}
                           size={'small'}
                           label={'Quantity'}
                           onChange={(e) => handleUpdateQuantity(item, e.currentTarget.value)}
                           value={item.quantity}/>
                <Button variant={'outlined'} type={'small'}
                        onClick={() => handleRemoveFromBasket(
                          item)}>Remove</Button>
              </Stack>;
            })
          }

          <Button variant={'contained'} type={'small'}
                  onClick={() => handleClose()}>Close</Button>
        </Stack>
      </Stack>
    </Modal>
  </>;
}

export default Basket;
