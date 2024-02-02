//mui
import { Box, Typography, useTheme } from '@mui/material';

// project imports
import { useGetAllDepartmentsQuery } from '../../store/features/departmentApi';
import PavilionLoader from './PavilionLoader';
import { useAppDispatch } from '../../store/hook';
import { setDepartments } from '../../store/services/pavilionSlice';

const AllDepartments = () => {
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
        Departments
      </Typography>
      <Box>
        <Departments />
      </Box>
    </Box>
  );
};

export default AllDepartments;

// all departments
const Departments = () => {
  const { data, isLoading } = useGetAllDepartmentsQuery(undefined);
  const dispatch = useAppDispatch();

  //set data to local state
  dispatch(setDepartments(data?.data));

  return (
    <>
      {isLoading ? (
        <PavilionLoader />
      ) : (
        <Box>
          {data?.data.map((item: { _id: string; name: string }) => (
            <SingleDepartment key={item._id} {...item} />
          ))}
        </Box>
      )}
    </>
  );
};

// single department
const SingleDepartment = ({ name }: { name: string }) => {
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
