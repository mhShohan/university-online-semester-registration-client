import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import { ListItem } from './extended/SideBar';
import { ILink } from '../constants/sideBar';
import { ListItemIcon, ListItemText } from '@mui/material';

const SideBarLink = ({ link, pathname }: { link: ILink; pathname: string }) => {
  return (
    <Link to={link.link} style={{ textDecoration: 'none' }}>
      <ListItem disablePadding isActive={pathname === link.link}>
        <ListItemButton>
          <ListItemIcon>
            <link.icon />
          </ListItemIcon>
          <ListItemText primary={link.name} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarLink;
