import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

const darkTheme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#484747", //grid and navbar
      light:"#5A75C8", //buttons
      dark:"linear-gradient(180deg, #225093 0%, #212020 143.9%)", //left side bar
    }
  },
  typography: {
    fontFamily: 'Dosis',
  } 
})
)
export {darkTheme}