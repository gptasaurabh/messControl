import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import menuimg from '../images/menu.jpeg';

export default function Todaymenu() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{
          bgcolor: '#cfe8fc',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'  
        }}>
          <img src={menuimg} alt="menu image" style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%'  
          }}/>
        </Box>
      </Container>
    </React.Fragment>
  );
}
