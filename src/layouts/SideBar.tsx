import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// mui
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

// project import
import SideBarLink from '../components/SideBarLink';
import { userRole } from '../constants';
import { studentSidebarItems } from '../routes/student.path';
import { superAdminSidebarItems } from '../routes/superAdmin.path';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { getCurrentUserRole, logoutUser } from '../store/services/authSlice';
import { adminSidebarItems } from '../routes/admin.path';
import { departmentOperatorSidebarItems } from '../routes/departmentOperator.path';

const drawerWidth = 240;

export default function SideBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = useAppSelector(getCurrentUserRole);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let sidebarItem;

  // logout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //sidebar view based on role
  switch (role) {
    case userRole.STUDENT:
      sidebarItem = studentSidebarItems;
      break;

    case userRole.ADMIN:
      sidebarItem = adminSidebarItems;
      break;

    case userRole.DEPARTMENT_OPERATOR:
      sidebarItem = departmentOperatorSidebarItems;
      break;

    case userRole.SUPER_ADMIN:
      sidebarItem = superAdminSidebarItems;
      break;

    default:
      break;
  }

  const drawer = (
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
      <Box>
        <DashboardLogo name="BSMRSTU" />
        <Divider />
        <List sx={{ padding: 0 }}>
          {sidebarItem?.map((item) => (
            <SideBarLink link={item} key={item.id} pathname={location.pathname} />
          ))}
        </List>
      </Box>
      <Box display="flex" justifyContent="center" marginBottom="1rem">
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: theme.palette.secondary.dark
          }}
        >
          <LogoutIcon sx={{ fontSize: '1rem' }} />
          Logout
        </Button>
        <Divider />
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` }
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 }
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth
            }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        {/* <Toolbar /> */}
        <Box sx={{ padding: '2rem', minHeight: '100vh' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

const DashboardLogo = ({ name }: { name: string }) => {
  return (
    <Toolbar>
      <Typography
        variant="h5"
        sx={{
          color: 'primary.light',
          textTransform: 'uppercase',
          fontWeight: '700',
          textAlign: 'center'
        }}
      >
        {name}
      </Typography>
    </Toolbar>
  );
};
