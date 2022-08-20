import * as React from 'react';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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
          variant="standard"
          size="small" 
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
