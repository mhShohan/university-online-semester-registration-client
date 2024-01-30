import { Link } from 'react-router-dom';

//mui
import { ListItemText } from '@mui/material';

// project import
import { ListItem } from './extended/SideBar';

const SideBarLink = ({ link, pathname }: { link: any; pathname: string }) => {
  return (
    <Link to={link.link} style={{ textDecoration: 'none' }}>
      <ListItem disablePadding isActive={pathname === link.link}>
        <ListItemText primary={link.name.toUpperCase()} />
      </ListItem>
    </Link>
  );
};

export default SideBarLink;
