import { RouterProvider } from 'react-router-dom';
import mainRoutes from './routes/mainRoutes';
import publicRoutes from './routes/publicRoutes';
import { CssBaseline } from '@mui/material';

const App = () => {
  const authenticated = false;

  return (
    <div style={{ backgroundColor: 'lightcyan' }}>
      <CssBaseline />
      {authenticated ? (
        <RouterProvider router={mainRoutes} />
      ) : (
        <RouterProvider router={publicRoutes} />
      )}
    </div>
  );
};

export default App;
