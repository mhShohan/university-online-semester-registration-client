import { Box, Grid, Stack, Typography } from '@mui/material';

import { PageSection, StatusChip } from '../../components/ui';
import Loader from '../../components/Loader';
import { useCheckRegistrationStatusQuery } from '../../store/features/operator/operator.api';
import { useGetRegistrationFeeFormQuery } from '../../store/features/feeForm.api';
import dateFormatter from '../../utils/dateFormatter';
import { SingleSemester } from './RegisteredSemesters';

const StudentDashboard = () => {
  const { data: checkRegistrationData, isLoading: isChecking } =
    useCheckRegistrationStatusQuery(undefined);
  const { data, isLoading } = useGetRegistrationFeeFormQuery(undefined);

  if (isChecking || isLoading) return <Loader fullPage />;

  return (
    <Box>
      <PageSection title="Registration Status">
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} spacing={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="subtitle1" fontWeight={600}>Status</Typography>
            <StatusChip
              label={checkRegistrationData?.data.status ?? ''}
              status={checkRegistrationData?.data.status === 'Ongoing' ? 'success' : 'error'}
            />
          </Box>
          <Typography variant="body1">
            Start: {dateFormatter.stringToMonth(checkRegistrationData?.data.startDate)} — End:{' '}
            {dateFormatter.stringToMonth(checkRegistrationData?.data.endDate)}
          </Typography>
        </Stack>
      </PageSection>
      <PageSection title="Your Applications">
        <Grid container spacing={2}>
          {data?.data?.map((regSemester: any) => (
            <SingleSemester key={regSemester._id} regSemester={regSemester} />
          ))}
        </Grid>
      </PageSection>
    </Box>
  );
};

export default StudentDashboard;
