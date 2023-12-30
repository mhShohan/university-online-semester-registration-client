import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      dark: '#092635',
      main: '#1B4242',
      light: '#9EC8B9'
    },
    secondary: {
      dark: '#18122B',
      main: '#443C68',
      light: '#635985'
    },
    text: {
      primary: '#191919',
      secondary: '#384137',
      disabled: '#607274'
    }
  }
});

export default theme;
