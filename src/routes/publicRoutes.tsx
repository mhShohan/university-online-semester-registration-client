import { createBrowserRouter } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';

const publicRoutes = createBrowserRouter([{ path: '/', element: <WelcomePage /> }]);

export default publicRoutes;
