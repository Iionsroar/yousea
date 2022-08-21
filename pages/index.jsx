import * as React from 'react';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import Layout, { siteTitle } from './components/layout';
import Link from '../src/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Index() {
  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;
  const [url, setUrl] = React.useState('http://url.com');
  const [updates, setUpdates] = React.useState([]); 
  // TODO: SEND delete request ONCLICK of undo button
  const updateItems = updates.map(update =>
      <Alert 
        key={update}
        action={
          <Button color="inherit" size="small">
            UNDO
          </Button>
        }
      >
        Added {update}
      </Alert>
  )

  // TODO: SEND post request IF value IS VALID
  const handleSubmit = (event) => {
    const val = event.target.value;
    setUrl(val);
    if (validUrl.test(val)) {
      if (!updates.includes(val)) {
        let tempUpdates = updates;
        tempUpdates.push(val);
        setUpdates(tempUpdates);
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
          { siteTitle }
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
          error={ !validUrl.test(url) }
          helperText={!validUrl.test(url) ? "URL is not correct" : ""}
          onBlur={handleSubmit}
          variant="standard"
          size="medium" 
          type="url"
          label="URL" 
          fullWidth 
        />
      </Box>

      <Stack sx={{ width: '100%' }} spacing={1}>
          { updateItems }
      </Stack>

      <Box align="center" sx={{ my: 4 }}>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Layout>
  );
}
