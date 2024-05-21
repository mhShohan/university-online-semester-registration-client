// mui
import { Box, Divider, Stack, Typography } from '@mui/material';

// project import
import Loader from '../../components/Loader';
import { useCheckRegistrationStatusQuery } from '../../store/features/operator/operator.api';
import dateFormatter from '../../utils/dateFormatter';

const StudentDashboard = () => {
  const { data: checkRegistrationData, isLoading: isChecking } =
    useCheckRegistrationStatusQuery(undefined);

  if (isChecking) return <Loader fullPage={true} />;

  return (
    <Box>
      <Stack mb={2}>
        <Divider />
        <Typography variant="h5" textAlign="center" fontWeight="600">
          Registration Status
        </Typography>
        <Divider />
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" my={2}>
          <Typography variant="h6">Status: {checkRegistrationData?.data.status}</Typography>
          <Typography variant="h6">
            Start Date: {dateFormatter.stringToMonth(checkRegistrationData?.data.startDate)}
          </Typography>
          <Typography variant="h6">
            End Date: {dateFormatter.stringToMonth(checkRegistrationData?.data.endDate)}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StudentDashboard;
