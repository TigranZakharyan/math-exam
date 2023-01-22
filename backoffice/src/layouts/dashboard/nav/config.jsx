import React from 'react';
// @mui/icons-material
import { Dashboard, AccountBox, AutoStories, Quiz, Hail, ImageNotSupported } from '@mui/icons-material';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <Dashboard />,
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: <AccountBox />,
  },
  {
    title: 'books',
    path: '/dashboard/books',
    icon: <AutoStories />,
  },
  {
    title: 'quizes',
    path: '/dashboard/quizes',
    icon: <Quiz />,
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: <Hail />,
  },
  {
    title: 'Not found',
    path: '/404',
    icon: <ImageNotSupported />,
  },
];

export default navConfig;
