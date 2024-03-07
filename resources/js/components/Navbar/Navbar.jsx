import React from 'react';
import { Button, Stack } from '@mui/material';
import authService from '../../app/services/auth/AuthService.js';

function Navbar({ isLoggedIn, setIsLoggedIn, setOpenLoginModal, setOpenRegisterModal }) {
  function handleLogout() {
    setIsLoggedIn(false);
    authService.logout();
  }

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
    {
      !isLoggedIn ? <>
          <Button variant={'contained'}
                  onClick={() => setOpenLoginModal(true)}>Login</Button>
          <Button variant={'outlined'}
                  onClick={() => setOpenRegisterModal(true)}>Register</Button>
        </>
        : <>
          <Button variant={'contained'}
                  onClick={handleLogout}>Logout</Button>
        </>
    }
  </Stack>;
}

export default Navbar;
