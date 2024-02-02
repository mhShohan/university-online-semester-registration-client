// mui
import { Box, Typography, useTheme } from '@mui/material';

// project import
import { useGetAllFacultiesQuery } from '../../store/features/facultyApi';
import PavilionLoader from './PavilionLoader';
import { useAppDispatch } from '../../store/hook';
import { setFaculties } from '../../store/services/pavilionSlice';

const AllFaculties = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: '1rem 2rem',
        margin: '1rem 0',
        height: 'calc(100vh - 17rem)',
        width: '100%',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '8px',
        overflow: 'auto'
      }}
    >
      <Typography
        variant="h5"
        textAlign="center"
        margin={0}
        textTransform="uppercase"
        fontWeight="700"
      >
        Faculties
      </Typography>
      <Box>
        <Faculties />
      </Box>
    </Box>
  );
};

export default AllFaculties;

// all faculties
const Faculties = () => {
  const { data, isLoading } = useGetAllFacultiesQuery(undefined);
  const dispatch = useAppDispatch();

  //set data to local state
  dispatch(setFaculties(data?.data));

  return (
    <>
      {isLoading ? (
        <PavilionLoader />
      ) : (
        <Box>
          {data?.data.map((item: { _id: string; name: string }) => (
            <SingleFaculty key={item._id} {...item} />
          ))}
        </Box>
      )}
    </>
  );
};

// single faculties
const SingleFaculty = ({ name }: { _id: string; name: string }) => {
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
