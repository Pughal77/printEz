import { createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Button, styled, Card } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import logo from '../assets/logo.svg';
import Typewriter from "typewriter-effect";

import TopBanner from '../components/TopBanner';

// theme for the whole page
const theme = createTheme({
    palette: {
        primary: {
        // light: will be calculated from palette.primary.main,
        main: '#14409F',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
        // light: will be calculated from palette.primary.main,
        main: '#90caf9',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
        },
        background: {
            default: "#ffffff"
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

const myCard = styled(Card) ({ minWidth: 240, backgroundColor: "#aaacaf", borderRadius:"20px"  })
// top banner
function TopBannerStyle() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box
                    sx={{
                    margin: 0,
                    width: 1,
                    minHeight: '15vh',
                    maxHeight:  '20vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.main'
                    }}
                >
                    <img src={logo} style={{height: '20vmin'}} alt=""/>
                </Box>
            </ThemeProvider>
        </div>
    );
}

// welcome page
function WelcomeStyle(handleClick) {
    return (
        <div>
            <TopBanner /> 
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box
                    sx={{
                    margin: 0,
                    marginTop: '50px',
                    width: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: 'calc(30px + 2vmin)',
                    marginBottom: '30px',
                    alignItems: 'center',
                    textAlign: 'center',
                    fontWeight: 800,
                    }}
                >
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .typeString("PRINTING MADE EASIER")
                                .start();
                        }}
                    />
                    <Button 
                        variant="contained"
                        sx={{
                            fontSize: 'calc(20px + 2vmin)',
                            width: '20%',
                            borderRadius: '10px',
                            marginTop: '30px',
                            backgroundcolor: 'primary.main'
                        }}
                        onClick={handleClick}
                    >
                        Login
                    </Button>
                </Box>
            </ThemeProvider>
            </div>
     );
}

export { theme,
    myCard,
    TopBannerStyle,
    WelcomeStyle }