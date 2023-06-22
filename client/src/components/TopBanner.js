import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@emotion/react';

import logo from '../assets/logo.svg';
import { theme } from '../utils/theme';

export default function TopBanner() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                sx={{
                margin: 0,
                width: 1,
                minHeight: '30vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'primary.main'
                }}
            >
                <img src={logo} style={{height: '30vmin'}}/>
            </Box>
        </ThemeProvider>
    );
}