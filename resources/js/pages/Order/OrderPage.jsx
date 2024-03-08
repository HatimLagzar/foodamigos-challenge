import React, {useEffect, useState} from 'react';
import {Card, Stack, Typography} from '@mui/material';
import {getOrder} from '../../app/api/order/orderApi.js';
import {useParams} from 'react-router-dom';

function OrderPage({}) {
  const [orderData, setOrderData] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    if (orderData) {
      return;
    }

    getOrder(id, localStorage.getItem('authToken')).then(response => {
      setOrderData(response.data);
    });
  }, []);

  return <>
    <Stack direction={'row'} gap={'24px'} flexWrap={'wrap'}
           justifyContent={'center'} sx={{m: '20px 0'}}>
      {
        orderData
            ? <Stack direction={'column'} gap={'24px'}>
              <Stack direction={'column'} gap={'8px'}>
                <Typography>Total Price: {orderData.order.total} EUR</Typography>
                <Typography>Notes: {orderData.order.notes}</Typography>
              </Stack>

              <Stack direction={'column'} gap={'8px'}>
                <Typography variant={'h6'}>User Information</Typography>
                <Typography>Name: {orderData.user.name}</Typography>
                <Typography>Phone: {orderData.user.phone_number}</Typography>
                <Typography>Address: {orderData.user.address}</Typography>
              </Stack>

              <Typography variant={'h6'}>Products</Typography>
              {
                orderData.order.items.map(item => {
                  return <Card sx={{p: 2}}>
                    <Stack direction={'column'} gap={'8px'}>
                      <Typography>Name: {item.product.name}</Typography>
                      <Typography>Quantity: {item.quantity}</Typography>
                    </Stack>
                  </Card>;
                })
              }
            </Stack>
            : 'Loading...'
      }
    </Stack>
  </>;
}

export default OrderPage;
