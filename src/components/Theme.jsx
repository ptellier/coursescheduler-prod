import * as React from 'react';
import { red, blue, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: blue[100],
            contrastText: blue[900] //button text dark blue instead of black
        },
        secondary: {
            main: grey[600],
        },
    },
});

