import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import { AppCard, EmptyState, PageSection } from '../../components/ui';
import Loader from '../../components/Loader';
import {
  useAcceptAllApplicationMutation,
  useAcceptOrDeclineFeeFomMutation,
  useGetRegistrationFeeFormByChairmanQuery
} from '../../store/features/feeForm.api';

const ChairmanDashboard = () => {
  const { data, isLoading } = useGetRegistrationFeeFormByChairmanQuery(undefined);
  const [acceptOrDecline] = useAcceptOrDeclineFeeFomMutation();
  const [acceptAllApplication] = useAcceptAllApplicationMutation();

  if (isLoading) return <Loader fullPage />;

  const declineApplication = async (id: string) => {
    const { isDenied, isDismissed, value } = await Swal.fire({
      title: 'Decline Application',
      text: 'Please Provide details message for decline this application...!!!',
      input: 'textarea',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Decline',
      confirmButtonColor: 'red',
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve('Please provide and message');
          }
        });
      }
    });

    if (isDenied || isDismissed) {
      return;
    }

    const payload = {
      declineMessage: value,
      status: 'rejected_by_chairman'
    };

    await acceptOrDecline({ id, payload });
  };

  const acceptApplication = async (id: string) => {
    const { isConfirmed, isDenied } = await Swal.fire({
      text: 'Do you want to Accept this Application?',
      showCancelButton: true,
      confirmButtonText: 'Accept'
    });

    if (isConfirmed) {
      const payload = { status: 'approved_by_chairman' };
      await acceptOrDecline({ id, payload });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Application Accepted!!!',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (isDenied) {
      Swal.fire('Changes are not saved', '', 'info');
    }
  };

  const handleAllRequestAccept = async () => {
    const payload = { oldStatus: 'submitted', newStatus: 'approved_by_chairman' };

    const { isConfirmed, isDenied } = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Do you want to accept all application?',
      showCancelButton: true,
      confirmButtonText: 'Accept'
    });

    if (isConfirmed) {
      await acceptAllApplication(payload).unwrap();

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'All Application Accepted!!!',
        showConfirmButton: false,
        timer: 1500
      });
    } else if (isDenied) {
      Swal.fire('Changes are not saved', '', 'info');
    }
  };

  return (
    <PageSection title="Applications">
      <Stack gap={2}>
        {data.data.length !== 0 && (
          <Box>
            <Button variant="contained" color="primary" onClick={handleAllRequestAccept}>
              Accept All Request
            </Button>
          </Box>
        )}
        {data.data.length === 0 && <EmptyState message="No applications found" />}
        {data.data.map((form: any) => (
          <AppCard key={form._id} padding={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">Student ID</Typography>
                <Typography>{form.studentId.studentId}</Typography>
                <Typography variant="body2" color="text.secondary">Name</Typography>
                <Typography>{form.studentId.name}</Typography>
                <Typography variant="body2" color="text.secondary">Session</Typography>
                <Typography>{form.studentId.session}</Typography>
                <Typography variant="body2" color="text.secondary">Exam Type</Typography>
                <Typography>{form.examType}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body2" color="text.secondary">Year</Typography>
                <Typography>{form.year}</Typography>
                <Typography variant="body2" color="text.secondary">Semester</Typography>
                <Typography>{form.semester}</Typography>
                <Typography variant="body2" color="text.secondary">Total Credit</Typography>
                <Typography>
                  {form.courses.reduce((acc: number, cur: any) => (acc += cur.credit), 0)}
                </Typography>
              </Grid>
            </Grid>
            <Stack gap={1} direction="row" flexWrap="wrap" mt={2}>
              <Link to={`/application/${form._id}`} style={{ flex: '1 1 140px' }}>
                <Button size="small" variant="contained" fullWidth>
                  View Details
                </Button>
              </Link>
              <Link to={`/students/${form.studentId._id}`} style={{ flex: '1 1 140px' }}>
                <Button size="small" variant="outlined" fullWidth>
                  View Student
                </Button>
              </Link>
              <Button
                size="small"
                variant="contained"
                color="success"
                sx={{ flex: '1 1 140px' }}
                onClick={() => acceptApplication(form._id)}
              >
                Accept
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                sx={{ flex: '1 1 140px' }}
                onClick={() => declineApplication(form._id)}
              >
                Decline
              </Button>
            </Stack>
          </AppCard>
        ))}
      </Stack>
    </PageSection>
  );
};

export default ChairmanDashboard;
