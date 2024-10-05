import { lazy } from 'react';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
import { createBrowserRouter } from 'react-router-dom';
import SideBar from '../layouts/SideBar';
// const Pavilions = withSuspense(lazy(() => import('../pages/super-admin/Pavilions')));
// const Courses = withSuspense(lazy(() => import('../pages/Courses')));
const AdminDashboard = withSuspense(lazy(() => import('../pages/admin/AdminDashboard')));
const AllApplicationPage = withSuspense(lazy(() => import('../pages/admin/AllApplicationPage')));
const StudentDetails = withSuspense(lazy(() => import('../pages/operators/StudentDetails')));
const ApplicationDetails = withSuspense(lazy(() => import('../pages/ApplicationDetails')));

const adminPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/', element: <AdminDashboard /> },
  {
    id: 2,
    name: 'Application',
    path: '/application/:id',
    element: <ApplicationDetails />,
    visible: false
  },
  { id: 3, name: 'Application', path: '/applications', element: <AllApplicationPage /> },
  { id: 4, name: 'Students', path: '/students/:id', element: <StudentDetails />, visible: false }

  // { id: 2, name: 'Pavilions', path: '/pavilions', element: <Pavilions /> },
  // { id: 3, name: 'Courses', path: '/courses', element: <Courses /> }
];

const adminRoutePath = mapPathToRoutes(adminPath);
export const adminSidebarItems = mapPathToSidebarItem(adminPath);

export const adminRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: adminRoutePath }
]);
