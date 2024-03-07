import React from 'react';
import { Button, Stack } from '@mui/material';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  return <Stack
    direction={'row'}
    gap={'16px'}
    alignItems={'center'}
    justifyContent={'center'}
    sx={{
      p: 2,
      backgroundColor: '#fff',
      borderBottom: '1px solid #eee',
    }}
  >
    <Button variant={'contained'}
            onClick={() => setOpenLoginModal(true)}>Login</Button>
    <Button variant={'outlined'}
            onClick={() => setOpenRegisterModal(true)}>Register</Button>
  </Stack>;
}

export default Navbar;
