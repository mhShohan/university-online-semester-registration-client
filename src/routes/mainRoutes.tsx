import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import withSuspense from '../components/HOC/withSuspense';

//project import
import SideBar from '../layouts/SideBar';
const Homepage = withSuspense(lazy(() => import('../pages/Homepage')));

const mainRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: [{ path: '/', element: <Homepage /> }] }
]);

export default mainRoutes;
