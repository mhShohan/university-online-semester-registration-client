import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import SideBar from '../layouts/SideBar';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
const Courses = withSuspense(lazy(() => import('../pages/Courses')));
const StudentDetails = withSuspense(lazy(() => import('../pages/operators/StudentDetails')));
const ApplicationDetails = withSuspense(lazy(() => import('../pages/ApplicationDetails')));
const ChairmanDashboard = withSuspense(lazy(() => import('../pages/admin/ChairmanDashboard')));
const Students = withSuspense(lazy(() => import('../pages/operators/Students')));

const chairmanPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/', element: <ChairmanDashboard /> },
  { id: 3, name: 'Courses', path: '/courses', element: <Courses /> },
  {
    id: 2,
    name: 'Application',
    path: '/application/:id',
    element: <ApplicationDetails />,
    visible: false
  },
  { id: 4, name: 'Students', path: '/students/:id', element: <StudentDetails />, visible: false },
  { id: 5, name: 'Students', path: '/students', element: <Students /> }
];

const chairmanRoutePath = mapPathToRoutes(chairmanPath);
export const chairmanSidebarItems = mapPathToSidebarItem(chairmanPath);

export const chairmanRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: chairmanRoutePath }
]);
