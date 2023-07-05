import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../utils/theme';
import Typewriter from "typewriter-effect";

function Home({setLogin}) {
    const handleClick = (e) => {
        e.preventDefault();
        setLogin(true);
    }

    return ( 
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                margin: 0,
                marginTop: '150px',
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 'calc(40px + 2vmin)',
                color: '#024033',
                marginBottom: '30px',
                textAlign: 'center',
                fontWeight: 800,
                }}
            >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("WELCOME TO PRINTEZ")
                            .start();
                    }}
                />
                <Button 
                    variant="contained"
                    sx={{
                        fontSize: 'calc(20px + 2vmin)',
                        width: '25%',
                        borderRadius: '10px',
                        marginTop: '30px',
                    }}
                    onClick={handleClick}
                >
                    log in
                </Button>
            </Box>
        </ThemeProvider>
     );
}
 
export default Home;