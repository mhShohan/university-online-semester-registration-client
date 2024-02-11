import { lazy } from 'react';

// project import
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
import { createBrowserRouter } from 'react-router-dom';
import SideBar from '../layouts/SideBar';
const StudentDashboard = withSuspense(lazy(() => import('../pages/student/StudentDashboard')));
const StudentProfile = withSuspense(lazy(() => import('../pages/student/StudentProfile')));

const studentPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/dashboard', element: <StudentDashboard /> },
  { id: 2, name: 'Profile', path: '/profile', element: <StudentProfile /> }
];

const studentRoutePath = mapPathToRoutes(studentPath);
export const studentSidebarItems = mapPathToSidebarItem(studentPath);

export const studentRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: studentRoutePath }
]);
