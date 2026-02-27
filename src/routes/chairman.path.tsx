import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
const Result = withSuspense(lazy(() => import('../pages/Result')));
const AllApplicationPage = withSuspense(lazy(() => import('../pages/chairman/AllApplicationPage')));

const chairmanPath: TRouteSideBarPath[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
    element: <ChairmanDashboard />,
    icon: <DashboardIcon />
  },
  {
    id: 2,
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
  { id: 3, name: 'Courses', path: '/courses', element: <Courses />, icon: <MenuBookIcon /> },
  { id: 4, name: 'Students', path: '/students/:id', element: <StudentDetails />, visible: false },
  { id: 5, name: 'Students', path: '/students', element: <Students />, icon: <PeopleIcon /> },
  { id: 6, name: 'Result', path: '/result', element: <Result />, icon: <AssignmentIcon /> }
];

const chairmanRoutePath = mapPathToRoutes(chairmanPath);
export const chairmanSidebarItems = mapPathToSidebarItem(chairmanPath);

export const chairmanRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: chairmanRoutePath }
]);
