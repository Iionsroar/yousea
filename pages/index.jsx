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
import { child, ref, set, push, update } from 'firebase/database';
import Layout from './components/layout';
import Link from '../src/Link';
import { db } from '../src/initFirebaseClientSDK';

export default function Index() {
  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  const [url, setUrl] = React.useState('http://url.com');
  const [urls, setUrls] = React.useState([]); 
  
  const urlListRef = ref(db, 'urls');
  const tagListRef = ref(db, 'tags');

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
    const newUrlRef = push(urlListRef);
    set(newUrlRef, {
      "url": url,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

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
      <Typography align="center" variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <Box 
        component="form"
        align="center" 
        sx={{ 
          my: 4,
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >

        <TextField 
          id="url"
          label="URL" 
          type="url"
          onKeyPress={handleEnter}
          error={ !validUrl.test(url) && Boolean(url)}
          helperText={!validUrl.test(url) && Boolean(url) ? "URL is not correct" : ""}
          variant="standard"
          size="medium" 
          />
        <TextField 
          id="tags"
          label="Tags" 
          onKeyPress={handleEnter}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSubmit}><Send /></IconButton>
              </InputAdornment>
            )
          }}
          variant="standard"
          size="medium"
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
