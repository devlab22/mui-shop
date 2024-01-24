import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function Title({ title = '', style = { fontWeight: 'bold', fontSize: "1.5rem", p: '20px 0 0 20px'} }) {

  return (
    <Typography
      component="h2"
      variant="h2"
      color="primary"
      gutterBottom
      sx={style}
    >
      {title}
    </Typography>
  );
}