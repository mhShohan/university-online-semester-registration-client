import { Link } from 'react-router-dom';

//mui
import { ListItemText } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';

// project import
import { ListItem } from './extended/SideBar';

const SideBarLink = ({ link, pathname }: { link: any; pathname: string }) => {
  return (
    <Link to={link.link} style={{ textDecoration: 'none' }}>
      <ListItem disablePadding isActive={pathname === link.link}>
        <ListItemButton>
          <ListItemText primary={link.name.toUpperCase()} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarLink;
