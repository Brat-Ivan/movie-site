import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6565e6',
    },
    secondary: {
      main: '#e6e665',
    },
    background: {
      default: '#ffffff',
      paper: '#ececfc',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e6e665',
    },
    secondary: {
      main: '#6565e6',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

export { lightTheme, darkTheme };
