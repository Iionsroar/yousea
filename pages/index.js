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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton><Send /></IconButton>
              </InputAdornment>
            )
          }}
          onBlur={() =>
            console.log("Link posted!")
          }
          variant="standard"
          size="small" 
          label="URL" 
          autoFocus
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
