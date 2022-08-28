// from mui docs

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/initFirebaseClientSDK";

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
  const [signInFailed, setSignInFailed] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (event) => {
    // https://github.com/vercel/next.js/blob/canary/examples/next-forms/pages/js-form.js
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    }

    signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setSignInFailed(true);
    });
  };

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
            onSubmit={handleSubmit}
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
              error={ signInFailed }
              onFocus={ () => setSignInFailed(false) }
              fullWidth
              />
            <TextField 
              id="password"
              label="Password" 
              type="password"
              variant="standard"
              size="medium" 
              error={ signInFailed }
              helperText={ signInFailed ? "Email or password is incorrect": "" }
              onFocus={ () => setSignInFailed(false) }
              fullWidth
            />
            <br />
            <Button type="submit" variant="contained" fullWidth>Submit</Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
