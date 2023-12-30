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
          <ListItemIcon
            sx={{
              '&.MuiListItemIcon-root': {
                marginLeft: '1rem',
                maxWidth: '35px',
                minWidth: '35px'
              }
            }}
          >
            <link.icon />
          </ListItemIcon>
          <ListItemText primary={link.name.toUpperCase()} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarLink;
