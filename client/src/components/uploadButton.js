import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { theme } from '../style/style';

export default function UploadButton() {
    return (
        <ThemeProvider theme={theme}>
            <Box
            sx={{
                margin: 0,
                marginTop: "10px",
                minHeight: '5vh',
                maxHeight:  '20vh',
                width: '175px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <CssBaseline/>
                <Button variant='contained' size='small'
                sx={{
                    margin: '1vmin',
                    borderRadius: '15px',
                    backgroundColor: '#ffffff',
                    color: 'primary.main',
                    fontSize: 16,
                    fontWeight: 'bold'
                }}>
                    upload a file
                </Button>
            </Box>
        </ThemeProvider>
    );
}