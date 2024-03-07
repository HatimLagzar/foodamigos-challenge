import React, { useState } from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import registerService from '../../app/services/auth/RegisterService.js';
import toastr from 'toastr';

function RegisterModal({ open, handleClose, handleOpenLogin }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    registerService.register(name, phoneNumber, password, address).then((response) => {
      toastr.success(response.data.message);
      setIsLoading(false);
      setName('');
      setPhoneNumber('');
      setPassword('');
      setAddress('');
      handleClose();
      handleOpenLogin();
    }).catch((error) => {
      if (error.response && error.response.data.message) {
        toastr.error(error.response.data.message);
      }

      setIsLoading(false);
    });
  }

  function handleNameChange(e) {
    setName(e.currentTarget.value);
  }

  function handleAddressChange(e) {
    setAddress(e.currentTarget.value);
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
        <Typography variant={'h5'}>Register</Typography>

        <form onSubmit={handleSubmit}>
          <Stack direction={'column'} gap={'16px'}>
            <TextField size={'small'} name={'name'} label={'Name'}
                       onChange={handleNameChange}
                       value={name}
                       fullWidth required/>
            <TextField size={'small'} name={'phone_number'}
                       onChange={handlePhoneNumberChange}
                       value={phoneNumber}
                       label={'Phone Number'} fullWidth
                       required/>
            <TextField size={'small'} name={'password'} label={'Password'}
                       value={password}
                       onChange={handlePasswordChange}
                       type={'password'} fullWidth required/>
            <TextField size={'small'} name={'address'} label={'Address'}
                       onChange={handleAddressChange}
                       value={address}
                       fullWidth required/>

            <Button variant={'contained'} type={'submit'} disabled={isLoading}>Create
              Account</Button>
          </Stack>
        </form>

        <Button variant={'outlined'} onClick={handleClose}>Close</Button>
      </Stack>
    </Stack>
  </Modal>;
}

export default RegisterModal;