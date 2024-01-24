import { lazy } from 'react';

// project import
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
const StudentDashboard = withSuspense(lazy(() => import('../pages/student/StudentDashboard')));
const StudentProfile = withSuspense(lazy(() => import('../pages/student/StudentProfile')));

const studentPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/dashboard', element: <StudentDashboard /> },
  { id: 2, name: 'Profile', path: '/profile', element: <StudentProfile /> }
];

export const studentRoute = mapPathToRoutes(studentPath);
export const studentSidebarItems = mapPathToSidebarItem(studentPath);
