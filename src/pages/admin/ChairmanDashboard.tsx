import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Loader from '../../components/Loader';
import {
  useAcceptAllApplicationMutation,
  useAcceptOrDeclineFeeFomMutation,
  useGetRegistrationFeeFormByChairmanQuery
} from '../../store/features/feeForm.api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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
    <Stack>
      <Stack gap={2}>
        {data.data.length !== 0 && (
          <Box>
            <Button variant="contained" color="primary" onClick={handleAllRequestAccept}>
              Accept All Request
            </Button>
          </Box>
        )}
        {data.data.length === 0 && <Typography textAlign="center">No Application Found</Typography>}
        {data.data.map((form: any) => (
          <Stack key={form._id} p={4} borderRadius={4} boxShadow={24}>
            <Grid container>
              <Grid item xs={6}>
                <Typography>StudentId: {form.studentId.studentId}</Typography>
                <Typography>Name: {form.studentId.name}</Typography>
                <Typography>Session: {form.studentId.session}</Typography>
                <Typography>Exam Types: {form.examType}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>Year: {form.year}</Typography>
                <Typography>Semester: {form.semester}</Typography>
                <Typography>
                  Total Credit:{' '}
                  {form.courses.reduce((acc: number, cur: any) => (acc += cur.credit), 0)}
                </Typography>
              </Grid>
            </Grid>
            <>
              <Stack gap={1} direction="row" mt={4}>
                <Link to={`/application/${form._id}`} style={{ width: '100%' }}>
                  <Button size="small" variant="contained" fullWidth>
                    View Application Details
                  </Button>
                </Link>
                <Link to={`/students/${form.studentId._id}`} style={{ width: '100%' }}>
                  <Button size="small" variant="contained" fullWidth color="info">
                    View Student Details
                  </Button>
                </Link>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  fullWidth
                  onClick={() => acceptApplication(form._id)}
                >
                  Accept Application
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={() => declineApplication(form._id)}
                >
                  Decline Application
                </Button>
              </Stack>
            </>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default ChairmanDashboard;
