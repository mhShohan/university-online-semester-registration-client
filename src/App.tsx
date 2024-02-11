import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

//mui
import { Box, CssBaseline, useTheme } from '@mui/material';

//project import
import { userRole } from './constants';
import { adminRoutes } from './routes/admin.path';
import publicRoutes from './routes/publicRoutes';
import { studentRoutes } from './routes/student.path';
import { useAppSelector } from './store/hook';
import { getCurrentToken } from './store/services/authSlice';
import decodeToken from './utils/decodeToken';
import { superAdminRoutes } from './routes/superAdmin.path';

const App = () => {
  const theme = useTheme();
  const token = useAppSelector(getCurrentToken);
  const user = decodeToken(token!);

  let router;

  switch (user?.role) {
    case userRole.ADMIN:
      router = adminRoutes;
      break;

    case userRole.STUDENT:
      router = studentRoutes;
      break;

    case userRole.SUPER_ADMIN:
      router = superAdminRoutes;
      break;

    default:
      router = publicRoutes;
      break;
  }

  return (
    <Box component="main" sx={{ backgroundColor: theme.palette.primary.light }}>
      <CssBaseline />
      <Toaster />
      <RouterProvider router={router} />
    </Box>
  );
};

export default App;
