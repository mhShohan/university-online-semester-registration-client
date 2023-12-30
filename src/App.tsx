import { RouterProvider } from 'react-router-dom';
import mainRoutes from './routes/mainRoutes';
import publicRoutes from './routes/publicRoutes';
import { Box, CssBaseline, useTheme } from '@mui/material';

const App = () => {
  const theme = useTheme();
  const authenticated = true;

  return (
    <Box component="main" sx={{ backgroundColor: theme.palette.primary.light }}>
      <CssBaseline />
      {authenticated ? (
        <RouterProvider router={mainRoutes} />
      ) : (
        <RouterProvider router={publicRoutes} />
      )}
    </Box>
  );
};

export default App;
