import '@/assets/scss/app.scss';
import Router from '@/router/Router';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ErrorFallback from './components/ErrorFallback';
import { ThemeModeProvider } from './contexts/theme-mode-context';

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <ThemeModeProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </ThemeModeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
