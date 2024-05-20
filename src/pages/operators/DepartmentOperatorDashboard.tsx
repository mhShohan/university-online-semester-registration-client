import { Link } from 'react-router-dom';

// mui
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

// project import
import { useGetReviewStudentsQuery } from '../../store/features/operator/operator.api';
import Loader from '../../components/Loader';

const DepartmentOperatorDashboard = () => {
  const { data: reviewStudents, isLoading } = useGetReviewStudentsQuery(undefined);

  if (isLoading) return <Loader fullPage={true} />;

  console.log({ reviewStudents });

  return (
    <Box>
      {reviewStudents?.data.length > 0 && (
        <Stack>
          <Divider />
          <Typography variant="h5" p={1} textAlign="center" fontWeight="600">
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
                      border: '1px solid #252525',
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
