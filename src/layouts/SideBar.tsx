import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

// mui
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { useTheme } from '@mui/material/styles';

// project import
import SideBarLink from '../components/SideBarLink';
import { userRole } from '../constants';
import { studentSidebarItems } from '../routes/student.path';
import { superAdminSidebarItems } from '../routes/superAdmin.path';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { getCurrentUser, getCurrentUserRole, logoutUser } from '../store/services/authSlice';
import { adminSidebarItems } from '../routes/admin.path';
import { departmentOperatorSidebarItems } from '../routes/departmentOperator.path';
import { chairmanSidebarItems } from '../routes/chairman.path';
import { hallOperatorSidebarItems } from '../routes/hallOperator.path';
import { TSideBarItems } from '../types/route.path';

const drawerWidth = 260;

const logo: Record<string, string> = {
  STUDENT: 'Student Dashboard',
  ADMIN: 'Exam Controller',
  DEPARTMENT_OPERATOR: 'Department Operator',
  CHAIRMAN: 'Chairman',
  HALL_OPERATOR: 'Hall Operator',
  SUPER_ADMIN: 'Super Admin'
};

function getPageTitle(pathname: string, items: TSideBarItems[] | undefined): string {
  if (!items?.length) return 'Dashboard';
  const exact = items.find((i) => pathname === i.link);
  if (exact) return exact.name;
  const withParam = items.find(
    (i) => i.link.includes(':') && pathname.startsWith(i.link.replace(/:[^/]+$/, ''))
  );
  if (withParam) return withParam.name;
  return 'Dashboard';
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';
}

export default function SideBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const role = useAppSelector(getCurrentUserRole);
  const user = useAppSelector(getCurrentUser);
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let sidebarItem: TSideBarItems[] | undefined;

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
    case userRole.CHAIRMAN:
      sidebarItem = chairmanSidebarItems;
      break;
    case userRole.HALL_OPERATOR:
      sidebarItem = hallOperatorSidebarItems;
      break;
    case userRole.SUPER_ADMIN:
      sidebarItem = superAdminSidebarItems;
      break;
    default:
      break;
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const pageTitle = getPageTitle(location.pathname, sidebarItem);

  const drawer = (
    <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
      <Box>
        <BrandBlock title={logo[role || ''] || 'BSMRSTU'} />
        <Divider sx={{ borderColor: 'primary.light' }} />
        <List
          component="nav"
          aria-label="Primary"
          sx={{ padding: 0, paddingTop: 1, paddingBottom: 1 }}
        >
          {sidebarItem?.map((item) => (
            <SideBarLink link={item} key={item.id} pathname={location.pathname} />
          ))}
        </List>
      </Box>
      <Box>
        <Divider sx={{ borderColor: 'primary.light', marginBottom: 1 }} />
        {user && (
          <UserBlock
            name={user.name}
            role={user.role?.replace(/_/g, ' ')}
            initials={getInitials(user.name)}
          />
        )}
        <Box display="flex" justifyContent="center" padding={2} paddingTop={1}>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.secondary.contrastText
            }}
          >
            <LogoutIcon sx={{ fontSize: '1.1rem' }} />
            Logout
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: theme.palette.primary.dark
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 48, sm: 64 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1, fontWeight: 600 }}>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="Main navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
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
        <Toolbar sx={{ minHeight: { xs: 48, sm: 64 } }} />
        <Box sx={{ padding: '2rem', minHeight: '100vh' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

function BrandBlock({ title }: { title: string }) {
  return (
    <Toolbar sx={{ minHeight: 56, justifyContent: 'center' }}>
      <Typography
        sx={{
          fontSize: '0.95rem',
          color: 'primary.contrastText',
          fontWeight: 700,
          textAlign: 'center'
        }}
      >
        {title}
      </Typography>
    </Toolbar>
  );
}

function UserBlock({
  name,
  role,
  initials
}: {
  name: string;
  role: string;
  initials: string;
}) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        padding: '12px 16px',
        paddingBottom: 0
      }}
    >
      <Avatar
        sx={{
          width: 36,
          height: 36,
          fontSize: '0.875rem',
          backgroundColor: theme.palette.primary.light,
          color: theme.palette.primary.dark
        }}
      >
        {initials}
      </Avatar>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'primary.contrastText',
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'primary.contrastText',
            opacity: 0.85,
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {role}
        </Typography>
      </Box>
    </Box>
  );
}
