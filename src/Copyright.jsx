import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import { siteTitle } from '../pages/components/layout';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <MuiLink target="_blank" color="inherit" href="https://github.com/Iionsroar/yousea">
        {siteTitle}
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
