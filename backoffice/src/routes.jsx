import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import SimpleLayout from './layouts/simple/SimpleLayout';
// pages
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import BooksPage from './pages/BooksPage';
import QuizesPage from './pages/QuizesPage';
// hookss
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { CircularProgress } from '@mui/material';

// ----------------------------------------------------------------------

export default function Router() {
  const { user, fetchUserData } = useAuth();
  React.useEffect(() => {
    fetchUserData()
  }, [])
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'books', element: <BooksPage /> },
        { path: 'quizes', element: <QuizesPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes
}
