import { createMuiTheme } from '@material-ui/core';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: "#ABC0FF", //grid and nav-bar
      light:"#5A75C8", //buttons
      dark:"#7A90D2", //left side bar
    }
  }
});