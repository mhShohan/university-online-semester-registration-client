import {
  Box,
  Button,
  Divider,
  Grid,
  Modal,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import {
  useAcceptOrDeclineFeeFomMutation,
  useGetRegistrationFeeFormByHallQuery
} from '../../store/features/feeForm.api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import dayjs from 'dayjs';
import { useAcceptApplicationByHallMutation } from '../../store/features/operator/operator.api';

const HallOperatorDashboard = () => {
  const { data, isLoading } = useGetRegistrationFeeFormByHallQuery(undefined);
  const [acceptOrDecline] = useAcceptOrDeclineFeeFomMutation();
  const [open, setOpen] = useState(false);
  const [updateIds, setUpdateIds] = useState<{
    id: string | null;
    residentialFeeId: string | null;
  }>({
    id: null,
    residentialFeeId: null
  });

  const handleClose = () => {
    setOpen(false);
    setUpdateIds({ id: null, residentialFeeId: null });
  };

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
      status: 'rejected_by_hall_authority'
    };

    await acceptOrDecline({ id, payload });
  };

  const onModalOpen = (id: string, residentialFeeId: string) => {
    setOpen(true);
    setUpdateIds({ id, residentialFeeId });
  };

  return (
    <Stack>
      <AcceptApplicationModal open={open} handleClose={handleClose} updateIds={updateIds} />
      <Stack gap={2}>
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
                  onClick={() => onModalOpen(form._id, form.residentialFeeId._id)}
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

export default HallOperatorDashboard;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4
};

const AcceptApplicationModal = ({
  open,
  handleClose,
  updateIds
}: {
  open: boolean;
  handleClose: () => void;
  updateIds: { id: string | null; residentialFeeId: string | null };
}) => {
  const [acceptOrDecline] = useAcceptOrDeclineFeeFomMutation();
  const [updateForm] = useAcceptApplicationByHallMutation();
  const { register, handleSubmit, reset } = useForm();
  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = async (data: any) => {
    const toastId = toast.loading('Accepting the application...');

    try {
      await acceptOrDecline({
        id: updateIds.id,
        payload: { status: 'approved_by_hall_authority' }
      });
      const payload: Record<string, unknown> = {};

      for (let key in data) {
        if (data[key]) {
          payload[key] = data[key];
        }
      }

      const date1 = dayjs(payload.to as string);
      const date2 = dayjs(payload.from as string);

      const monthDiff = date1.diff(date2, 'months', true);

      payload.fee = Number(payload.fee);
      payload.from = new Date(payload.from as string);
      payload.to = new Date(payload.to as string);
      payload.totalResidentFee = (payload.fee as number) * (monthDiff + 1);

      await updateForm({ id: updateIds.residentialFeeId, payload });
      toast.success('Application accepted successfully', { id: toastId });
    } catch (error) {
      toast.error('Failed to accept the application', { id: toastId });
    } finally {
      handleClose();
      reset();
      setIsDisabled(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" textAlign="center" mb={1}>
            Provide the value if the student have any due...
          </Typography>
          <Divider />
          <Switch
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
            color="secondary"
          />

          <Stack my={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap={1}>
                <TextField
                  type="text"
                  label="Monthly Fee"
                  size="small"
                  variant="outlined"
                  focused
                  {...register('fee')}
                  disabled={!isDisabled}
                />
                <TextField
                  type="month"
                  label="Due From"
                  size="small"
                  variant="outlined"
                  focused
                  {...register('from')}
                  disabled={!isDisabled}
                />
                <TextField
                  type="month"
                  label="Due To"
                  size="small"
                  variant="outlined"
                  focused
                  {...register('to')}
                  disabled={!isDisabled}
                />
                <TextField
                  type="text"
                  label="Other Fee"
                  size="small"
                  variant="outlined"
                  focused
                  {...register('othersFee')}
                  disabled={!isDisabled}
                />
              </Stack>
              <Stack direction="row" justifyContent="center" mt={2} gap={1}>
                <Button onClick={() => reset()} variant="contained" color="warning">
                  Reset
                </Button>
                <Button type="submit" variant="contained" color="success">
                  Accept
                </Button>
                <Button variant="contained" color="error" onClick={handleClose}>
                  Cancel
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
