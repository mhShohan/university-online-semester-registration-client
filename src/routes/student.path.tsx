import { lazy } from 'react';

// project import
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
import { createBrowserRouter } from 'react-router-dom';
import SideBar from '../layouts/SideBar';
import RegisteredSemesters from '../pages/student/RegisteredSemesters';
const StudentDashboard = withSuspense(lazy(() => import('../pages/student/StudentDashboard')));
const DetailsRegisteredSemestersPage = withSuspense(
  lazy(() => import('../pages/student/DetailsRegisteredSemestersPage'))
);
const StudentProfile = withSuspense(lazy(() => import('../pages/student/StudentProfile')));
const UpdateStudentPage = withSuspense(lazy(() => import('../pages/student/UpdateStudentPage')));
const SemesterRegistration = withSuspense(
  lazy(() => import('../pages/student/SemesterRegistration'))
);
const RegistrationSemesterCourse = withSuspense(
  lazy(() => import('../pages/student/RegistrationSemesterCourse'))
);
const ApplicationDetails = withSuspense(lazy(() => import('../pages/ApplicationDetails')));
const Result = withSuspense(lazy(() => import('../pages/Result')));
const AdmitCardPage = withSuspense(lazy(() => import('../pages/student/AdmitCardPage')));
const SingleAdmitCard = withSuspense(lazy(() => import('../pages/SingleAdmitCard')));
const LibraryBooks = withSuspense(lazy(() => import('../pages/student/LibraryBooks')));

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
    id: 5,
    name: 'Registration',
    path: '/registration-semester-course',
    visible: false,
    element: <RegistrationSemesterCourse />
  },
  {
    id: 6,
    name: 'registered semesters',
    path: '/registered-semesters',
    element: <RegisteredSemesters />
  },
  {
    id: 60,
    name: 'Admit Cards',
    path: '/admit-cards',
    element: <AdmitCardPage />
  },
  {
    id: 61,
    name: 'Admit Cards',
    path: '/admit-cards/:id',
    element: <SingleAdmitCard />,
    visible: false
  },
  {
    id: 7,
    name: 'registered semesters',
    path: '/registered-semesters/:id',
    visible: false,
    element: <DetailsRegisteredSemestersPage />
  },
  {
    id: 8,
    name: 'Application',
    path: '/application/:id',
    element: <ApplicationDetails />,
    visible: false
  },
  {
    id: 9,
    name: 'Library',
    path: '/library',
    element: <LibraryBooks />
  },
  {
    id: 10,
    name: 'Result',
    path: '/result',
    element: <Result />
  }
];

const studentRoutePath = mapPathToRoutes(studentPath);
export const studentSidebarItems = mapPathToSidebarItem(studentPath);

export const studentRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: studentRoutePath }
]);
