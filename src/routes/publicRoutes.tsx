import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

//project import
import withSuspense from '../components/HOC/withSuspense';
const WelcomePage = withSuspense(lazy(() => import('../pages/WelcomePage')));
const LoginPage = withSuspense(lazy(() => import('../pages/auth/LoginPage')));
const RegisterPage = withSuspense(lazy(() => import('../pages/auth/RegisterPage')));
const AdminLoginPage = withSuspense(lazy(() => import('../pages/auth/AdminLoginPage')));

const publicRoutes = createBrowserRouter([
  { path: '/', element: <WelcomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/admin-login', element: <AdminLoginPage /> }
]);

export default publicRoutes;
