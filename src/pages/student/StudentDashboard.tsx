// mui
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';

// project import
import Loader from '../../components/Loader';
import { useCheckRegistrationStatusQuery } from '../../store/features/operator/operator.api';
import dateFormatter from '../../utils/dateFormatter';
import { useGetRegistrationFeeFormQuery } from '../../store/features/feeForm.api';
import { SingleSemester } from './RegisteredSemesters';

const StudentDashboard = () => {
  const { data: checkRegistrationData, isLoading: isChecking } =
    useCheckRegistrationStatusQuery(undefined);
  const { data, isLoading } = useGetRegistrationFeeFormQuery(undefined);

  if (isChecking || isLoading) return <Loader fullPage={true} />;

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
      <Stack mb={2}>
        <Divider />
        <Typography variant="h5" textAlign="center" fontWeight="600">
          Your Applications
        </Typography>
        <Divider />
      </Stack>
      <Grid container spacing={2}>
        {data?.data.map((regSemester: any) => (
          <SingleSemester key={regSemester.id} regSemester={regSemester} />
        ))}
      </Grid>
    </Box>
  );
};

export default StudentDashboard;
