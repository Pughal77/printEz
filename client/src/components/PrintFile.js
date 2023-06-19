import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@emotion/react';

import React from 'react'
import { theme } from '../utils/theme'

export default function PrintFile({ socket }) {
    const handleClick = (e) => {
        e.preventDefault()
        socket.emit("printAttempt")
    }
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        width: '100%',
        bgcolor: 'primary.main',
        alignItems: 'center',
        textAlign: 'center',
        color: '#ffffff',
        padding: '5px 0px'
      }}>
        <Typography variant="h5" sx={{
          fontWeight: 800,
        }}>
          File Successfully Uploaded
        </Typography>
      </Box>
      <Container component="main" maxWidth="xs">
        <Button 
          onClick={handleClick}
          fullWidth
          variant="contained"
          sx={{ 
              mt: 3, 
              mb: 2,
              fontWeight: 700
          }}
        >
          print
        </Button>
      </Container>
    </ThemeProvider>
  );
}
