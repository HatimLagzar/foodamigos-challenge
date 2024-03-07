import React from 'react';
import { Box, Button, Modal, Stack, Typography } from '@mui/material';

function LoginModal({ open, handleClose }) {
  return <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
      <Box sx={{
        width: '500px',
        overflow: 'hidden',
        backgroundColor: '#FFF',
        m: 10,
        p: 2,
      }}>
        <Typography variant={'h5'}>Login</Typography>

        <form>

        </form>

        <Button variant={'outlined'} onClick={handleClose}>Close</Button>
      </Box>
    </Stack>
  </Modal>;
}

export default LoginModal;