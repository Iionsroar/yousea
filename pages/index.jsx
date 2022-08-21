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

export default function Index() {
  const [url, setUrl] = React.useState('http://url.com');
  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/;

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
          error={!validUrl.test(url)}
          helperText={!validUrl.test(url) ? "URL is not correct" : ""}
          onBlur={(event) => {
            setUrl(event.target.value)
            if (validUrl.test(event.target.value)) {
                // CLEAR textfield
                // SEND post request IF value IS VALID
                // SHOW alert
                console.log('Link Posted!')
              }
            }
          }
          variant="standard"
          size="medium" 
          type="url"
          label="URL" 
          fullWidth 
        />
      </Box>
      <Box align="center" sx={{ my: 4 }}>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Layout>
  );
}
