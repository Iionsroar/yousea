// from mui docs

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} color="inherit">Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" align="center" variant="h6" component="h2" sx={{ mb: 1 }}>
            Login
          </Typography>
          <Stack
            component="form"
            spacing={1}
            justifyContent="space-between"
            noValidate
            autoComplete="off"
          >
            <TextField 
              id="email"
              label="Email" 
              type="email"
              variant="standard"
              size="medium" 
              // onKeyPress={handleEnter}
              fullWidth
            />
            <TextField 
              id="password"
              label="Password" 
              type="password"
              variant="standard"
              size="medium" 
              // onKeyPress={handleEnter}
              fullWidth
            />
          </Stack>
          <Button sx={{ mt: 3 }} variant="contained" fullWidth>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
