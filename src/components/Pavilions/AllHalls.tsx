// mui
import { Box, Typography, useTheme } from '@mui/material';

// project import
import { useGetAllHallsQuery } from '../../store/features/hallApi';
import PavilionLoader from './PavilionLoader';
import { useAppDispatch } from '../../store/hook';
import { setHalls } from '../../store/services/pavilionSlice';

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
      <Typography
        variant="h5"
        textAlign="center"
        margin={0}
        textTransform="uppercase"
        fontWeight="700"
      >
        Residential Halls
      </Typography>
      <Box>
        <Halls />
      </Box>
    </Box>
  );
};

export default AllHalls;

// all Halls
const Halls = () => {
  const { data, isLoading } = useGetAllHallsQuery(undefined);
  const dispatch = useAppDispatch();

  //set data to local state
  dispatch(setHalls(data?.data));

  return (
    <>
      {isLoading ? (
        <PavilionLoader />
      ) : (
        <Box>
          {data?.data.map((item: { _id: string; name: string }) => (
            <SingleHall key={item._id} {...item} />
          ))}
        </Box>
      )}
    </>
  );
};

// single Hall
const SingleHall = ({ name }: { name: string }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: '.3rem 1rem',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '.3rem',
        marginTop: '.3rem'
      }}
    >
      <Typography variant="body2">{name}</Typography>
    </Box>
  );
};
