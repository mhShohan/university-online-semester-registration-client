import { ListItemProps, ListItem as MuiListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IListItem extends ListItemProps {
  isActive: boolean;
}

export const ListItem = styled(MuiListItem)<IListItem>(({ theme, isActive }) => ({
  transition: 'all ease 300ms',
  borderBottom: `1px solid ${theme.palette.primary.light}`,
  background: isActive ? theme.palette.primary.light : theme.palette.primary.main,
  '&:hover': {
    background: theme.palette.secondary.dark,
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.light
    },
    '& .MuiTypography-root': {
      color: theme.palette.primary.light
    }
  },
  '& .MuiSvgIcon-root': {
    fill: isActive ? theme.palette.primary.dark : theme.palette.primary.light
  },
  '& .MuiTypography-root': {
    color: isActive ? theme.palette.primary.dark : theme.palette.primary.light,
    fontWeight: '600'
  }
}));
