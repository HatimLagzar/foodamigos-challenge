import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import authService from '../../app/services/auth/AuthService.js';

function LoginModal({ open, handleClose, setIsLoggedIn }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    authService.login(phoneNumber, password).then((response) => {
      authService.saveToken(response.data.token);
      setPhoneNumber('');
      setPassword('');
      setIsLoggedIn(true);
      handleClose();
    });
  }

  function handlePhoneNumberChange(e) {
    setPhoneNumber(e.currentTarget.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.currentTarget.value);
  }

  return <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
      <Stack gap={'24px'} sx={{
        width: '500px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        m: 10,
        p: 2,
      }}>
        <Typography variant={'h5'}>Login</Typography>

        <form onSubmit={handleSubmit}>
          <Stack direction={'column'} gap={'16px'}>
            <TextField size={'small'} name={'phone_number'}
                       onChange={handlePhoneNumberChange}
                       value={phoneNumber}
                       label={'Phone Number'} fullWidth
                       required/>
            <TextField size={'small'} name={'password'} label={'Password'}
                       onChange={handlePasswordChange}
                       value={password}
                       type={'password'} fullWidth required/>

            <Button variant={'contained'} type={'submit'}
                    disabled={isLoading}>Login</Button>
          </Stack>
        </form>

        <Button variant={'outlined'} onClick={handleClose}>Close</Button>
      </Stack>
    </Stack>
  </Modal>;
}

export default LoginModal;