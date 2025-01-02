import { CssBaseline, ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './app/App';
import { RootState, store } from './app/store';

import './index.css';

import { ScrollToTop } from './app/ScrollToTop';
import { darkTheme, lightTheme } from './shared/theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/movie-site/">
        <ScrollToTop />
        {(() => {
          const ThemeWrapper = () => {
            const themeMode = useSelector(
              (state: RootState) => state.theme.mode,
            );

            return (
              <ThemeProvider
                theme={themeMode === 'dark' ? darkTheme : lightTheme}
              >
                <CssBaseline />
                <App />
              </ThemeProvider>
            );
          };

          return <ThemeWrapper />;
        })()}
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
