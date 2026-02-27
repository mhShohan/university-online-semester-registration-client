import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
import { createBrowserRouter } from 'react-router-dom';
import SideBar from '../layouts/SideBar';
const Courses = withSuspense(lazy(() => import('../pages/Courses')));
const Students = withSuspense(lazy(() => import('../pages/operators/Students')));
const StudentDetails = withSuspense(lazy(() => import('../pages/operators/StudentDetails')));
const Registration = withSuspense(lazy(() => import('../pages/operators/Registration')));
const DepartmentOperatorDashboard = withSuspense(
  lazy(() => import('../pages/operators/DepartmentOperatorDashboard'))
);
const Library = withSuspense(lazy(() => import('../pages/operators/Library')));
const BookDetails = withSuspense(lazy(() => import('../pages/operators/BookDetails')));
const AllApplicationPage = withSuspense(lazy(() => import('../pages/chairman/AllApplicationPage')));
const ApplicationDetails = withSuspense(lazy(() => import('../pages/ApplicationDetails')));

const departmentOperatorPath: TRouteSideBarPath[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
    element: <DepartmentOperatorDashboard />,
    icon: <DashboardIcon />
  },
  { id: 2, name: 'Courses', path: '/courses', element: <Courses />, icon: <MenuBookIcon /> },
  { id: 3, name: 'Students', path: '/students', element: <Students />, icon: <PeopleIcon /> },
  {
    id: 222,
    name: 'Application',
    path: '/application/:id',
    element: <ApplicationDetails />,
    visible: false
  },
  {
    id: 7,
    name: 'Application',
    path: '/applications',
    element: <AllApplicationPage />,
    icon: <DescriptionIcon />
  },
  {
    id: 4,
    name: 'Registration',
    path: '/registration',
    element: <Registration />,
    icon: <AppRegistrationIcon />
  },
  { id: 5, name: 'Students', path: '/students/:id', element: <StudentDetails />, visible: false },
  { id: 6, name: 'Library', path: '/library', element: <Library />, icon: <LocalLibraryIcon /> },
  { id: 7, name: 'BookDetails', path: '/books/:id', element: <BookDetails />, visible: false }
];

const departmentOperatorRoutesPath = mapPathToRoutes(departmentOperatorPath);
export const departmentOperatorSidebarItems = mapPathToSidebarItem(departmentOperatorPath);

export const departmentOperatorRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: departmentOperatorRoutesPath }
]);
