import { lazy } from 'react';

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

const departmentOperatorPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/', element: <DepartmentOperatorDashboard /> },
  { id: 2, name: 'Courses', path: '/courses', element: <Courses /> },
  { id: 3, name: 'Students', path: '/students', element: <Students /> },
  { id: 3, name: 'Registration', path: '/registration', element: <Registration /> },
  { id: 3, name: 'Students', path: '/students/:id', element: <StudentDetails />, visible: false }
];

const departmentOperatorRoutesPath = mapPathToRoutes(departmentOperatorPath);
export const departmentOperatorSidebarItems = mapPathToSidebarItem(departmentOperatorPath);

export const departmentOperatorRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: departmentOperatorRoutesPath }
]);
