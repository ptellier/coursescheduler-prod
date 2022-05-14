import { red, pink, green, lime, lightGreen, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: lightBlue[300],
        },
        secondary: {
            main: purple[500],
        },
        customButton: {
            main: lightBlue[100],
            dark: green[100],
            contrastText: lightBlue[900] //button text dark blue instead of black
        },
        customNavButton: {
            main: grey[600],
            dark: grey[700],
            contrastText: red[900] //button text dark blue instead of black
        },
        customFormLabel: {
            main: lightBlue[900],
        },
        customRadioButtons: {
            main: lightBlue[300],
        },

        calendarTopDayCellsColor: grey[50],

        calendarTimeSlotBackgroundColors: [
            lightBlue[50],
            red[50],
            green[50],
            purple[50],
            orange[50],
            brown[50],
            teal[50],
            yellow[50],
        ],
        calendarTimeSlotTextColors:[
            lightBlue[900],
            red[900],
            green[900],
            purple[900],
            deepOrange[900],
            brown[900],
            teal[900],
            yellow[900],
        ],
    },
});

const COLORS_LENGTH = 8;
export const findCircularColorIndex = (index) => (index % COLORS_LENGTH);
