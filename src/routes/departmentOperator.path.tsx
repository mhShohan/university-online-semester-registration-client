import { lazy } from 'react';

// project imports
import withSuspense from '../components/HOC/withSuspense';
import { TRouteSideBarPath } from '../types/route.path';
import mapPathToRoutes from '../utils/mapPathToRoutes';
import mapPathToSidebarItem from '../utils/mapPathToSidebarItem';
import { createBrowserRouter } from 'react-router-dom';
import SideBar from '../layouts/SideBar';
const Courses = withSuspense(lazy(() => import('../pages/Courses')));
const DepartmentOperatorDashboard = withSuspense(
  lazy(() => import('../pages/operators/DepartmentOperatorDashboard'))
);

const departmentOperatorPath: TRouteSideBarPath[] = [
  { id: 1, name: 'Dashboard', path: '/', element: <DepartmentOperatorDashboard /> },
  { id: 3, name: 'Courses', path: '/courses', element: <Courses /> }
];

const departmentOperatorRoutesPath = mapPathToRoutes(departmentOperatorPath);
export const departmentOperatorSidebarItems = mapPathToSidebarItem(departmentOperatorPath);

export const departmentOperatorRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: departmentOperatorRoutesPath }
]);
