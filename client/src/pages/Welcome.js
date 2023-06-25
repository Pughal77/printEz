import CssBaseline from '@mui/material/CssBaseline';
import { Box, Button } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import { theme } from '../styles/theme';
import Typewriter from "typewriter-effect";

function Home({setLogin}) {
    const handleClick = (e) => {
        e.preventDefault();
        setLogin(true);
    }

    return ( 
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box
                sx={{
                margin: 0,
                marginTop: '50px',
                width: 1,
                display: 'flex',
                flexDirection: 'column',
                fontSize: 'calc(20px + 2vmin)',
                color: '#024033',
                marginBottom: '30px',
                alignItems: 'center',
                textAlign: 'center',
                fontWeight: 800,
                }}
            >
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .typeString("Printing made easier")
                            .start();
                    }}
                />
                <Button 
                    variant="outlined"
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