import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6A1B9A',
      light: '#8E24AA',
      dark: '#4A148C',
      contrastText: '#fff',
    },
    secondary: {
      main: '#FFA726',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#000',
    },
    background: {
      default: '#FFFBFE',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '57px',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.25px',
    },
    h2: {
      fontSize: '45px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '36px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: '32px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '14px',
      lineHeight: 1.43,
    },
  },
  shape: {
    borderRadius: 28,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 500,
          padding: '10px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
