import { Box, Skeleton } from '@mui/material';

const PavilionLoader = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
      <Skeleton sx={{ bgcolor: 'grey.500' }} />
    </Box>
  );
};

export default PavilionLoader;
