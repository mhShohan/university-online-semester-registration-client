import { Link } from 'react-router-dom';

import { ListItemIcon, ListItemText } from '@mui/material';

import { ListItem } from './extended/SideBar';
import { TSideBarItems } from '../types/route.path';

const SideBarLink = ({ link, pathname }: { link: TSideBarItems; pathname: string }) => {
  const isExactMatch = pathname === link.link;
  const isDashboard = pathname === '/' && link.link === '/';
  const isNested = link.link !== '/' && pathname.startsWith(link.link);
  const activeItem = isExactMatch || isDashboard || isNested;

  const label = link.name.charAt(0).toUpperCase() + link.name.slice(1).toLowerCase();

  return (
    <Link to={link.link} style={{ textDecoration: 'none' }}>
      <ListItem disablePadding isactive={activeItem}>
        {link.icon && <ListItemIcon sx={{ minWidth: 40 }}>{link.icon}</ListItemIcon>}
        <ListItemText primary={label} />
      </ListItem>
    </Link>
  );
};

export default SideBarLink;
