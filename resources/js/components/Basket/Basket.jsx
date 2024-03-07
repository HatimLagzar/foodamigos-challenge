import React from 'react';
import { Button, Modal, Stack, TextField, Typography } from '@mui/material';

function Basket({ open, handleClose, items, setItems }) {
  return <>
    <Modal open={open} onClose={handleClose}>
      <Stack direction={'column'} gap={'24px'}>
        {
          items.map(item => {
            return <Stack key={item.id} direction={'column'} gap={'8px'}>
              <Typography variant={'p'}>{item.name}</Typography>
              <TextField label={'Quantity'} value={item.quantity} />
              <Button variant={'outlined'} type={'xs'}>Remove</Button>
            </Stack>
          })
        }
      </Stack>
    </Modal>
  </>;
}

export default Basket;
