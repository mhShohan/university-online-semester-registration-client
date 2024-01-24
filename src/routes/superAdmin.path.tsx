import Department from '../pages/super-admin/Department';
import Faculty from '../pages/super-admin/Faculty';
import Hall from '../pages/super-admin/Hall';
import SuperAdminDashboard from '../pages/super-admin/SuperAdminDashboard';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';

const superAdminPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/super-admin/dashboard', element: <SuperAdminDashboard /> },
  { id: 2, name: 'Dashboard', path: '/super-admin/department', element: <Department /> },
  { id: 3, name: 'Dashboard', path: '/super-admin/faculty', element: <Faculty /> },
  { id: 4, name: 'Dashboard', path: '/super-admin/hall', element: <Hall /> }
];

export const superAdminRoute = mapPathToRoutes(superAdminPath);
export const superAdminSidebarItems = mapPathToSidebarItem(superAdminPath);
