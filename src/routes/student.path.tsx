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
const UpdateStudentPage = withSuspense(lazy(() => import('../pages/student/UpdateStudentPage')));
const SemesterRegistration = withSuspense(
  lazy(() => import('../pages/student/SemesterRegistration'))
);
const RegistrationSemesterCourse = withSuspense(
  lazy(() => import('../pages/student/RegistrationSemesterCourse'))
);

const studentPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/', element: <StudentDashboard /> },
  { id: 2, name: 'Profile', path: '/profile', element: <StudentProfile /> },
  {
    id: 3,
    name: 'Edit Profile',
    path: '/profile/update-profile',
    visible: false,
    element: <UpdateStudentPage />
  },
  {
    id: 4,
    name: 'Registration',
    path: '/registration',
    element: <SemesterRegistration />
  },
  {
    id: 4,
    name: 'Registration',
    path: '/registration-semester-course',
    visible: false,
    element: <RegistrationSemesterCourse />
  }
];

const studentRoutePath = mapPathToRoutes(studentPath);
export const studentSidebarItems = mapPathToSidebarItem(studentPath);

export const studentRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: studentRoutePath }
]);
