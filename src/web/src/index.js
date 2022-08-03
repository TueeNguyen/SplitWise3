import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import theme from './styles';
import { AppProvider } from './providers';

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <AppProvider>
          <App />
        </AppProvider>
      </React.StrictMode>
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById('root')
);
