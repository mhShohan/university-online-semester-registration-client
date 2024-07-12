import { lazy } from 'react';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
import { createBrowserRouter } from 'react-router-dom';
import SideBar from '../layouts/SideBar';
const HallOperatorDashboard = withSuspense(
  lazy(() => import('../pages/operators/HallOperatorDashboard'))
);

const hallOperatorPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/', element: <HallOperatorDashboard /> }
];

const hallOperatorRoutesPath = mapPathToRoutes(hallOperatorPath);
export const hallOperatorSidebarItems = mapPathToSidebarItem(hallOperatorPath);

export const hallOperatorRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: hallOperatorRoutesPath }
]);
