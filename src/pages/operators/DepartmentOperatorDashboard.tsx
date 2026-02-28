import { Link } from 'react-router-dom';

import { Box, Grid, Stack, Typography } from '@mui/material';

import { AppCard, PageSection, StatusChip } from '../../components/ui';
import Loader from '../../components/Loader';
import {
  useCheckRegistrationStatusQuery,
  useGetReviewStudentsQuery
} from '../../store/features/operator/operator.api';
import dateFormatter from '../../utils/dateFormatter';

const DepartmentOperatorDashboard = () => {
  const { data: reviewStudents, isLoading } = useGetReviewStudentsQuery(undefined);
  const { data: checkRegistrationData, isLoading: isChecking } =
    useCheckRegistrationStatusQuery(undefined);

  if (isLoading || isChecking) return <Loader fullPage />;

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
      {reviewStudents?.data?.length > 0 && (
        <PageSection title="Students Review Request">
          <Grid container spacing={2}>
            {reviewStudents.data.map((student: any) => (
              <Grid item key={student._id} xs={12} md={4}>
                <Link to={`/students/${student._id}`} style={{ textDecoration: 'none' }}>
                  <AppCard padding={2} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                    <Typography variant="subtitle1" fontWeight={600}>{student.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {student.studentId}
                    </Typography>
                  </AppCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </PageSection>
      )}
    </Box>
  );
};

export default DepartmentOperatorDashboard;
