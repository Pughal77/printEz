import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import { theme } from './style';

export default function MyButton({ sx, text, handleClick }) {

    return (
        <ThemeProvider theme={theme}>
            <Button variant='contained' size='small'
            sx={{
                margin: '1vmin',
                borderRadius: '15px',
                backgroundColor: '#ffffff',
                color: 'primary.main',
                fontSize: 16,
                fontWeight: 'bold'
            }}
            onClick={handleClick}
            >
                { text }
            </Button>
        </ThemeProvider>
    );
}