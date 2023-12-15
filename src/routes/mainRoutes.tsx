import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../pages/Homepage';

const mainRoutes = createBrowserRouter([{ path: '/', element: <Homepage /> }]);

export default mainRoutes;
