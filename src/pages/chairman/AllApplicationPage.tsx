import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import Loader from '../../components/Loader';
import {
  useAcceptOrDeclineFeeFomMutation,
  useGetRegistrationFeeFormByChairmanQuery
} from '../../store/features/feeForm.api';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const AllApplicationPage = () => {
  const [query, setQuery] = useState({ status: true });
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, isFetching } = useGetRegistrationFeeFormByChairmanQuery({
    ...query
  });
  const [acceptOrDecline] = useAcceptOrDeclineFeeFomMutation();

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchTerm.length !== 0 && searchTerm.length < 8) return;
      setQuery((p) => ({ ...p, search: searchTerm }));
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  if (isLoading || isFetching) return <Loader fullPage />;

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

  return (
    <Stack>
      <Stack my={2} alignItems="flex-end">
        <Box width="300px" display="flex">
          <TextField
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            placeholder="Search by StudentId"
          />
        </Box>
      </Stack>
      <Stack gap={2}>
        {(data?.data?.length === 0 || !data) && (
          <Typography variant="h6" textAlign="center">
            No Application Found
          </Typography>
        )}
        {isLoading || isFetching ? (
          <Loader fullPage />
        ) : (
          <>
            {data?.data?.map((form: any) => (
              <Stack key={form._id} p={4} borderRadius={4} boxShadow={24}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>StudentId: {form.studentId.studentId}</Typography>
                    <Typography>Name: {form.studentId.name}</Typography>
                    <Typography>Session: {form.studentId.session}</Typography>
                    <Typography>Exam Types: {form.examType}</Typography>
                    <Typography textTransform="capitalize">
                      Status: {form.status.split('_').join(' ')}
                    </Typography>
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
                    <>
                      {form.status === 'rejected_by_chairman' && (
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={() => acceptApplication(form._id)}
                        >
                          Accept Application
                        </Button>
                      )}
                      {form.status === 'approved_by_chairman' && (
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          fullWidth
                          onClick={() => declineApplication(form._id)}
                        >
                          Decline Application
                        </Button>
                      )}
                    </>
                  </Stack>
                </>
              </Stack>
            ))}
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default AllApplicationPage;
