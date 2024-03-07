import React from 'react';
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

function RegisterModal({ open, handleClose }) {
  const inputStyle = {
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
        backgroundColor: '#FFF',
        m: 10,
        p: 2,
      }}>
        <Typography variant={'h5'}>Register</Typography>

        <form>
          <Stack direction={'column'} gap={'16px'}>
            <TextField size={'small'} name={'name'} label={'Name'} sx={inputStyle} fullWidth required />
            <TextField size={'small'} name={'phone_number'} label={'Phone Number'} sx={inputStyle} fullWidth required />
            <TextField size={'small'} name={'password'} label={'Password'} type={'password'} sx={inputStyle} fullWidth required />

            <Button variant={'contained'} type={'submit'}>Create Account</Button>
          </Stack>
        </form>

        <Button variant={'outlined'} onClick={handleClose}>Close</Button>
      </Stack>
    </Stack>
  </Modal>;
}

export default RegisterModal;