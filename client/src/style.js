import { createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import logo from './assets/logo.svg';

// theme for the whole page
const theme = createTheme({
    palette: {
        primary: {
        // light: will be calculated from palette.primary.main,
        main: '#31d1d4',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
        // light: will be calculated from palette.primary.main,
        main: '#8732d1',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
        },
        background: {
            default: "#e4f0e2"
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

// top banner
function TopBannerStyle({Logic}) {
    return (
        <ThemeProvider theme={createTheme}>
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
                <img src={logo} style={{height: '30vmin'}} alt=""/>
                { Logic }
            </Box>
        </ThemeProvider>
    );
}

// home page


export { theme,
TopBannerStyle }