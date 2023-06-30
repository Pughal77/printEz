import { useState } from "react"

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { ThemeProvider } from '@emotion/react';

import React from 'react'
import { theme } from '../utils/theme'

export default function PrintFile({ socket }) {
  const [printer, setPrinter] = useState('');
  const [warning, setWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (printer == '') {
      setWarning(true);
    } else {
      console.log(`ATTEMPTING TO PRINT THROUGH ${printer}`)
      socket.emit("printAttempt", printer);
      setWarning(false);
    }
    
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl required fullWidth margin="normal">
            <InputLabel id="usertype-label">Select Your Printer</InputLabel>
            <Select
              labelId="printer-label"
              id="printer-select"
              value={printer}
              label="Select Your Printer *"
              onChange={(e) => setPrinter(e.target.value)}
            >
              <MenuItem value={"psc008"}>PSC008, COM1 B1</MenuItem>
              <MenuItem value={"psc011"}>PSC011, COM1 B1</MenuItem>
              <MenuItem value={"psts"}>PSTS, COM1 L1</MenuItem>
              <MenuItem value={"pstsb"}>PSTSB, COM1 L1</MenuItem>
              <MenuItem value={"pstsc"}>PSTSC, COM1 L1</MenuItem>
            </Select>
          </FormControl>
          <Button 
            type="submit"
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
        </Box>
        {warning && 
          <Alert 
            severity="error"
            onClose={() => {setWarning(false)}}
          >
            <AlertTitle>ERROR</AlertTitle>
            printer not selected<br/>
            <strong>please choose a printer</strong>
          </Alert>
        }
      </Container>
    </ThemeProvider>
  );
}
