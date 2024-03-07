import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import LoginModal from '../../components/LoginModal/LoginModal.jsx';
import RegisterModal from '../../components/RegisterModal/RegisterModal.jsx';

function HomePage() {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  return <>
    <LoginModal open={openLoginModal}
                handleClose={() => setOpenLoginModal(false)}/>

    <RegisterModal open={openRegisterModal}
                   handleClose={() => setOpenRegisterModal(false)}/>

    <Stack
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
    </Stack>
  </>;
}

export default HomePage;
