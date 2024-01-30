import { lazy } from 'react';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
const Pavilions = withSuspense(lazy(() => import('../pages/super-admin/Pavilions')));
const SuperAdminDashboard = withSuspense(
  lazy(() => import('../pages/super-admin/SuperAdminDashboard'))
);

const superAdminPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/dashboard', element: <SuperAdminDashboard /> },
  { id: 2, name: 'Pavilions', path: '/pavilions', element: <Pavilions /> }
];

export const superAdminRoute = mapPathToRoutes(superAdminPath);
export const superAdminSidebarItems = mapPathToSidebarItem(superAdminPath);
