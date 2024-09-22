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
const StudentDetails = withSuspense(lazy(() => import('../pages/operators/StudentDetails')));
const ApplicationDetails = withSuspense(lazy(() => import('../pages/ApplicationDetails')));
const HallApplications = withSuspense(lazy(() => import('../pages/hall/HallApplications')));

const hallOperatorPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/', element: <HallOperatorDashboard /> },
  {
    id: 2,
    name: 'Application',
    path: '/application/:id',
    element: <ApplicationDetails />,
    visible: false
  },
  {
    id: 3,
    name: 'Application',
    path: '/applications',
    element: <HallApplications />
  },
  { id: 4, name: 'Students', path: '/students/:id', element: <StudentDetails />, visible: false }
];

const hallOperatorRoutesPath = mapPathToRoutes(hallOperatorPath);
export const hallOperatorSidebarItems = mapPathToSidebarItem(hallOperatorPath);

export const hallOperatorRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: hallOperatorRoutesPath }
]);
