import * as React from 'react';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Layout, { siteTitle } from './components/layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <Box align="center" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          { siteTitle }
        </Typography>
      </Box>
    </Layout>
  );
}
