import { lazy } from 'react';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
const Department = withSuspense(lazy(() => import('../pages/super-admin/Department')));
const Faculty = withSuspense(lazy(() => import('../pages/super-admin/Faculty')));
const Hall = withSuspense(lazy(() => import('../pages/super-admin/Hall')));
const SuperAdminDashboard = withSuspense(
  lazy(() => import('../pages/super-admin/SuperAdminDashboard'))
);

const superAdminPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/dashboard', element: <SuperAdminDashboard /> },
  { id: 2, name: 'Faculty', path: '/faculty', element: <Faculty /> },
  { id: 3, name: 'Department', path: '/department', element: <Department /> },
  { id: 4, name: 'Hall', path: '/hall', element: <Hall /> }
];

export const superAdminRoute = mapPathToRoutes(superAdminPath);
export const superAdminSidebarItems = mapPathToSidebarItem(superAdminPath);
