import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import SideBar from '../layouts/SideBar';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
const Courses = withSuspense(lazy(() => import('../pages/Courses')));
const ChairmanDashboard = withSuspense(lazy(() => import('../pages/admin/ChairmanDashboard')));

const chairmanPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/', element: <ChairmanDashboard /> },
  { id: 3, name: 'Courses', path: '/courses', element: <Courses /> }
];

const chairmanRoutePath = mapPathToRoutes(chairmanPath);
export const chairmanSidebarItems = mapPathToSidebarItem(chairmanPath);

export const chairmanRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: chairmanRoutePath }
]);
