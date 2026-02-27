import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      dark: '#181C14',
      main: '#3C3D37',
      light: '#697565',
      contrastText: '#ECDFCC'
    },
    secondary: {
      dark: '#181C14',
      main: '#3C3D37',
      light: '#697565',
      contrastText: '#ECDFCC'
    },
    text: {
      primary: '#181C14',
      secondary: '#3C3D37',
      disabled: '#697565'
    },
    background: {
      default: '#ECDFCC',
      paper: '#ffffff'
    },
    divider: '#697565'
  },
  shape: {
    borderRadius: 8
  },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    }
  }
});

export default theme;
