import { createTheme, ThemeProvider } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
        // light: will be calculated from palette.primary.main,
        main: '#024033',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
        // light: will be calculated from palette.primary.main,
        main: '#979797',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
        },

        custom: {
        // light: '#ffa726',
        main: '#986afd',
        dark: '#ef6c00',
        // contrastText: 'rgba(0, 0, 0, 0.87)',
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