import { Link } from 'react-router-dom';

//mui
import { ListItemText } from '@mui/material';

// project import
import { ListItem } from './extended/SideBar';

const SideBarLink = ({ link, pathname }: { link: any; pathname: string }) => {
  let activeItem = false;

  if (pathname === '/' && link.link === '/dashboard') {
    activeItem = true;
  } else if (pathname === link.link) {
    activeItem = true;
  }

  return (
    <Link to={link.link} style={{ textDecoration: 'none' }}>
      <ListItem disablePadding isactive={activeItem}>
        <ListItemText primary={link.name.toUpperCase()} />
      </ListItem>
    </Link>
  );
};

export default SideBarLink;
