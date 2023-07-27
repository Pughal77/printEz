import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';

import { theme } from './style';

export default function MyButton({ addStyle, text, handleClick }) {

    const includedStyle = {
        margin: '1vmin',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        color: 'primary.main',
        fontSize: 16,
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: 'secondary.main',
            color: '#000000',
        },
        height: '5vh'
    }

    return (
        <ThemeProvider theme={theme}>
            <Button variant='contained' size='small'
            sx={
                {...includedStyle,
                ...addStyle}
            }
            onClick={handleClick}
            >
                { text }
            </Button>
        </ThemeProvider>
    );
}