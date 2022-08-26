import * as React from 'react';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { child, ref, push, update } from 'firebase/database';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import Layout from './components/layout';
import { auth } from "../src/initFirebaseClientSDK";
import Link from '../src/Link';
import { db } from '../src/initFirebaseClientSDK';

export default function Index() {
  signInWithEmailAndPassword(auth, process.env.NEXT_PUBLIC_EMAIL, process.env.NEXT_PUBLIC_PASSWORD)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  const [url, setUrl] = React.useState('http://url.com');
  const [urls, setUrls] = React.useState([]); 
  // TODO: SEND delete request ONCLICK of undo button
  const urlItems = urls.map(url =>
      <Alert 
        key={url}
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        Added {url}
      </Alert>
  )

  const handleEnter = (event) => {
    if (event.key == "Enter") {
      handleSubmit(event);
    }
  }
  
  const writeNewUrl = (url) => {
    const newUrlKey = push(child(ref(db), 'urls')).key;
    const updates = {};
    updates['/urls/' + newUrlKey] = url;

    return update(ref(db), updates);
  }

  const handleSubmit = (event) => {
    const val = event.target.value;
    setUrl(val);
    if (validUrl.test(val)) {
      if (!urls.includes(val)) {
        let tempUrls = urls;
        tempUrls.push(val);
        setUrls(tempUrls);
        writeNewUrl(val);
      }
      event.target.value = '';
    }
  }

  return (
    <Layout home>
      <Head>
        <title>Home</title>
      </Head>
      <Box align="center" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>

        <TextField 
          id="url"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><Send /></IconButton>
              </InputAdornment>
            )
          }}
          error={ !validUrl.test(url) && Boolean(url)}
          helperText={!validUrl.test(url) && Boolean(url) ? "URL is not correct" : ""}
          onBlur={handleSubmit}
          onKeyPress={handleEnter}
          variant="standard"
          size="medium" 
          type="url"
          label="URL" 
          fullWidth 
        />
      </Box>

      <Stack sx={{ width: '100%' }} spacing={1}>
          { urlItems }
      </Stack>

      <Box align="center" sx={{ my: 4 }}>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Layout>
  );
}
