import { lazy } from 'react';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
const Pavilions = withSuspense(lazy(() => import('../pages/super-admin/Pavilions')));
const Courses = withSuspense(lazy(() => import('../pages/super-admin/Courses')));
const AdminDashboard = withSuspense(lazy(() => import('../pages/admin/AdminDashboard')));

const adminPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/dashboard', element: <AdminDashboard /> },
  { id: 2, name: 'Pavilions', path: '/pavilions', element: <Pavilions /> },
  { id: 2, name: 'Courses', path: '/courses', element: <Courses /> }
];

export const adminRoute = mapPathToRoutes(adminPath);
export const adminSidebarItems = mapPathToSidebarItem(adminPath);
