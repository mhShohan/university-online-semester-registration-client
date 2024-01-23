import { RouterProvider } from 'react-router-dom';

//mui
import { Box, CssBaseline, useTheme } from '@mui/material';

//project import
import mainRoutes from './routes/mainRoutes';
import publicRoutes from './routes/publicRoutes';
import { useAppSelector } from './store/hook';
import { getCurrentUser } from './store/services/authSlice';

const App = () => {
  const theme = useTheme();
  const user = useAppSelector(getCurrentUser);

  return (
    <Box component="main" sx={{ backgroundColor: theme.palette.primary.light }}>
      <CssBaseline />
      <RouterProvider router={user ? mainRoutes : publicRoutes} />
    </Box>
  );
};

export default App;
