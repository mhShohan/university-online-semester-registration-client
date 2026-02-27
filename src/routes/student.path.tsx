import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
import { lazy } from 'react';

// project import
import { createBrowserRouter } from 'react-router-dom';
import withSuspense from '../components/HOC/withSuspense';
import SideBar from '../layouts/SideBar';
import RegisteredSemesters from '../pages/student/RegisteredSemesters';
import { TRouteSideBarPath } from '../types';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
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
  { id: 1, name: 'Dashboard', path: '/', element: <StudentDashboard />, icon: <DashboardIcon /> },
  { id: 2, name: 'Profile', path: '/profile', element: <StudentProfile />, icon: <PersonIcon /> },
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
    element: <SemesterRegistration />,
    icon: <AppRegistrationIcon />
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
    element: <RegisteredSemesters />,
    icon: <CalendarMonthIcon />
  },
  {
    id: 60,
    name: 'Admit Cards',
    path: '/admit-cards',
    element: <AdmitCardPage />,
    icon: <ConfirmationNumberIcon />
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
    element: <LibraryBooks />,
    icon: <MenuBookIcon />
  },
  {
    id: 10,
    name: 'Result',
    path: '/result',
    element: <Result />,
    icon: <AssignmentIcon />
  }
];

const studentRoutePath = mapPathToRoutes(studentPath);
export const studentSidebarItems = mapPathToSidebarItem(studentPath);

export const studentRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: studentRoutePath }
]);
