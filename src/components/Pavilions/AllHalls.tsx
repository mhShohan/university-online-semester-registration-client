import { Box, Typography, useTheme } from '@mui/material';
import PavilionLoader from './PavilionLoader';

const AllHalls = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: '1rem 2rem',
        margin: '1rem 0',
        height: 'calc(100vh - 17rem)',
        width: '100%',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px'
      }}
    >
      <Typography variant="h5" textAlign="center" margin={0}>
        All Residential Hall
      </Typography>
      <Box>
        <PavilionLoader />
      </Box>
    </Box>
  );
};

export default AllHalls;
