import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentIcon from '@mui/icons-material/Payment';
import PeopleIcon from '@mui/icons-material/People';
import { lazy } from 'react';

// project imports
import { createBrowserRouter } from 'react-router-dom';
import withSuspense from '../components/HOC/withSuspense';
import SideBar from '../layouts/SideBar';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';

const HallOperatorDashboard = withSuspense(
  lazy(() => import('../pages/operators/HallOperatorDashboard'))
);
const StudentDetails = withSuspense(lazy(() => import('../pages/operators/StudentDetails')));
const ApplicationDetails = withSuspense(lazy(() => import('../pages/ApplicationDetails')));
const HallApplications = withSuspense(lazy(() => import('../pages/hall/HallApplications')));
const AllStudentOfHall = withSuspense(lazy(() => import('../pages/hall/AllStudentOfHall')));
const HallPaymentPage = withSuspense(lazy(() => import('../pages/hall/HallPaymentPage')));

const hallOperatorPath: TRouteSideBarPath[] = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/',
    element: <HallOperatorDashboard />,
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
    id: 3,
    name: 'Application',
    path: '/applications',
    element: <HallApplications />,
    icon: <DescriptionIcon />
  },
  { id: 4, name: 'Students', path: '/students/:id', element: <StudentDetails />, visible: false },
  {
    id: 5,
    name: 'Students',
    path: '/students',
    element: <AllStudentOfHall />,
    icon: <PeopleIcon />
  },
  {
    id: 6,
    name: 'Payments',
    path: '/payments',
    element: <HallPaymentPage />,
    icon: <PaymentIcon />
  }
];

const hallOperatorRoutesPath = mapPathToRoutes(hallOperatorPath);
export const hallOperatorSidebarItems = mapPathToSidebarItem(hallOperatorPath);

export const hallOperatorRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: hallOperatorRoutesPath }
]);
