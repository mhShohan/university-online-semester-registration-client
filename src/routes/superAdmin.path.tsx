import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
import { createBrowserRouter } from 'react-router-dom';
import SideBar from '../layouts/SideBar';
const Pavilions = withSuspense(lazy(() => import('../pages/super-admin/Pavilions')));
const SuperAdminDashboard = withSuspense(
  lazy(() => import('../pages/super-admin/SuperAdminDashboard'))
);
const ManageAdmin = withSuspense(lazy(() => import('../pages/super-admin/ManageAdmin')));

const superAdminPath: TRouteSideBarPath[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
    element: <SuperAdminDashboard />,
    icon: <DashboardIcon />
  },
  {
    id: 2,
    name: 'Pavilions',
    path: '/pavilions',
    element: <Pavilions />,
    icon: <AccountTreeIcon />
  },
  {
    id: 4,
    name: 'Admins',
    path: '/admins',
    element: <ManageAdmin />,
    icon: <AdminPanelSettingsIcon />
  }
];

const superAdminRoutePath = mapPathToRoutes(superAdminPath);
export const superAdminSidebarItems = mapPathToSidebarItem(superAdminPath);

export const superAdminRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: superAdminRoutePath }
]);
