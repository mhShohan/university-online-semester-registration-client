import { ListItemProps, ListItem as MuiListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IListItem extends ListItemProps {
  isactive: boolean;
}

export const ListItem = styled(MuiListItem)<IListItem>(({ theme, isactive }) => ({
  transition: 'all ease 300ms',
  padding: '.1rem 1rem',
  borderBottom: `1px solid ${theme.palette.primary.light}`,
  background: isactive ? theme.palette.primary.light : theme.palette.primary.main,
  '&:hover': {
    background: theme.palette.secondary.dark,
    '& .MuiSvgIcon-root': {
      fill: theme.palette.primary.contrastText
    },
    '& .MuiTypography-root': {
      color: theme.palette.primary.contrastText
    }
  },
  '& .MuiSvgIcon-root': {
    fill: isactive ? theme.palette.primary.dark : theme.palette.primary.contrastText
  },
  '& .MuiTypography-root': {
    color: isactive ? theme.palette.primary.dark : theme.palette.primary.contrastText,
    fontWeight: '600',
    fontSize: '.8rem'
  }
}));
