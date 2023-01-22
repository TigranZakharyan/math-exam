import React from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top/ScrollToTop';
import StyledChart from './components/chart/styles';
import { AuthProvider } from './hooks/useAuth';
// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}
