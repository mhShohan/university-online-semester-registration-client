import { RouterProvider } from 'react-router-dom';
import mainRoutes from './routes/mainRoutes';
import authRoutes from './routes/authRoutes';
import { CssBaseline } from '@mui/material';

const App = () => {
  const authenticated = true;

  return (
    <>
      <CssBaseline />
      {authenticated ? (
        <RouterProvider router={mainRoutes} />
      ) : (
        <RouterProvider router={authRoutes} />
      )}
    </>
  );
};

export default App;
