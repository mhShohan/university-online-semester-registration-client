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
      defaultProps: {
        size: 'medium'
      },
      styleOverrides: {
        root: {
          borderRadius: 8
        },
        contained: {
          '&:hover': {
            boxShadow: 2
          }
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2
      },
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid',
          borderColor: 'divider'
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px'
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td, &:last-child th': {
            border: 0
          },
          '&:hover': {
            backgroundColor: 'action.hover'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          maxWidth: 560
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          fontWeight: 600,
          paddingBottom: 1
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: 2
        }
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: '1px solid',
          borderColor: 'divider',
          padding: 2,
          gap: 1
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600
        }
      }
    }
  }
});

export default theme;
