import { Link } from 'react-router-dom';

// mui
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';

// project import
import {
  useCheckRegistrationStatusQuery,
  useGetReviewStudentsQuery
} from '../../store/features/operator/operator.api';
import Loader from '../../components/Loader';
import dateFormatter from '../../utils/dateFormatter';

const DepartmentOperatorDashboard = () => {
  const { data: reviewStudents, isLoading } = useGetReviewStudentsQuery(undefined);
  const { data: checkRegistrationData, isLoading: isChecking } =
    useCheckRegistrationStatusQuery(undefined);

  if (isLoading || isChecking) return <Loader fullPage={true} />;

  console.log({ checkRegistrationData });

  return (
    <Box>
      <Stack mb={2}>
        <Divider />
        <Typography variant="h5" textAlign="center" fontWeight="600">
          Registration Status
        </Typography>
        <Divider />
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" my={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="h6">Status: </Typography>
            <Chip
              label={checkRegistrationData?.data.status}
              color={checkRegistrationData?.data.status === 'Ongoing' ? 'success' : 'error'}
              sx={{
                padding: '0.2rem 1rem',
                height: '1.5rem'
              }}
            />
          </Box>
          <Typography variant="h6">
            Start Date: {dateFormatter.stringToMonth(checkRegistrationData?.data.startDate)}
          </Typography>
          <Typography variant="h6">
            End Date: {dateFormatter.stringToMonth(checkRegistrationData?.data.endDate)}
          </Typography>
        </Stack>
      </Stack>
      {reviewStudents?.data.length > 0 && (
        <Stack my={2}>
          <Divider />
          <Typography variant="h5" textAlign="center" fontWeight="600">
            Students Review Request
          </Typography>
          <Divider />
          <Grid container>
            {reviewStudents?.data.map((student: any) => (
              <Grid item key={student._id} xs={12} md={4} p={1}>
                <Link
                  to={`/students/${student._id}`}
                  style={{
                    textDecoration: 'none',
                    color: 'initial'
                  }}
                >
                  <Stack
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      padding: '.3rem .5rem',
                      borderRadius: '.4rem',
                      textDecoration: 'none',
                      transition: 'all .3s',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'primary.light',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Typography variant="h6">Name: {student.name}</Typography>
                    <Typography>Student ID: {student.studentId}</Typography>
                  </Stack>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Stack>
      )}
    </Box>
  );
};

export default DepartmentOperatorDashboard;
