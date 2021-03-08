import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const lightTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: "#ABC0FF", //grid and nav-bar
      light:"#5A75C8", //buttons
      dark:"#7A90D2", //left side bar
    }
  },
  typography: {
    fontFamily: 'Dosis',
  } 
})
)
export { lightTheme }