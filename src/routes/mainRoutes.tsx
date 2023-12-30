import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import SideBar from '../layouts/SideBar';

const mainRoutes = createBrowserRouter([
  { path: '/', element: <SideBar />, children: [{ path: '/', element: <Homepage /> }] }
]);

export default mainRoutes;
