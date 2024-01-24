import { createBrowserRouter } from 'react-router-dom';

//project import
import SideBar from '../layouts/SideBar';
import { studentRoute } from './student.path';
import { superAdminRoute } from './superAdmin.path';

const mainRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: superAdminRoute },
  { path: '/', element: <SideBar />, children: studentRoute }
]);

export default mainRoutes;
