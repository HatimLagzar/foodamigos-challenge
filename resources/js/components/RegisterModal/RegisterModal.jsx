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
  const inputStyle = {};

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    registerService.register(name, phoneNumber, password).then((response) => {
      toastr.success(response.data.message);
      setIsLoading(false);
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
                       sx={inputStyle} fullWidth required/>
            <TextField size={'small'} name={'phone_number'}
                       onChange={handlePhoneNumberChange}
                       label={'Phone Number'} sx={inputStyle} fullWidth
                       required/>
            <TextField size={'small'} name={'password'} label={'Password'}
                       onChange={handlePasswordChange}
                       type={'password'} sx={inputStyle} fullWidth required/>

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