import '@/assets/scss/app.scss';
import Router from '@/router/Router';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ErrorFallback from './components/ErrorFallback';
import { ThemeModeProvider } from './contexts/theme-mode-context';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <HelmetProvider>
          <ThemeModeProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </ThemeModeProvider>
        </HelmetProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
