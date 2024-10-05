import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useGetSingleRegistrationFeeFormQuery } from '../store/features/feeForm.api';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAppSelector } from '../store/hook';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { toast } from 'sonner';
import { useCreateApplicationPaymentMutation } from '../store/features/student/student.api';

const departmentFeeArray = ['developmentFee', 'association', 'centerFee'];
const semesterFeeArray = [
  'tuitionFee',
  'transport',
  'library',
  'centralSports',
  'creditFee',
  'studentWelfare',
  'treatment',
  'roverScout',
  'BNCC',
  'computerFee',
  'semesterExamFee',
  'admitCard',
  'othersFee'
];
const residentialFeeArray = ['fee', 'from', 'to', 'totalResidentFee', 'othersFee'];

const ApplicationDetails = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleRegistrationFeeFormQuery(params.id);
  const [createPayment] = useCreateApplicationPaymentMutation();
  const role = useAppSelector((state) => state.auth.user?.role);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  if (isLoading) return <Loader fullPage />;

  const form = data.data;

  const totalDepartmentFee = departmentFeeArray
    .map((item) => form.departmentalFeeId[item])
    .reduce((acc, cur) => (acc += cur), 0);

  const totalSemesterFee = semesterFeeArray
    .map((item) => form.semesterFeeId[item])
    .reduce((acc, cur) => (acc += cur), 0);

  const totalResidentuialFee = residentialFeeArray
    .map((item) => {
      if (item === 'from' || item === 'to') {
        return 0;
      }

      return form.residentialFeeId[item];
    })
    .reduce((acc, cur) => (acc += cur), 0);

  const totalFee = totalDepartmentFee + totalSemesterFee + totalResidentuialFee;

  const handlePayment = async (backAccountId: string) => {
    const payload = {
      formId: form._id,
      amount: totalFee,
      backAccountId
    };

    const toastId = toast.loading('Processing payment...');

    console.log(payload);

    try {
      const res = await createPayment(payload).unwrap();

      console.log(res);

      if (res.success) {
        toast.success('Payment successful', { id: toastId });
        setOpenPaymentModal(false);
      } else {
        toast.error('Payment failed', { id: toastId });
      }
    } catch (error) {
      toast.error('Payment failed', { id: toastId });
    }
  };

  return (
    <Stack>
      <PaymentModal
        open={openPaymentModal}
        handlePayment={handlePayment}
        totalFee={totalFee}
        handleClose={() => setOpenPaymentModal(false)}
      />
      <Stack key={form._id} p={4} borderRadius={4} boxShadow={24} m={1}>
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
              Total Credit: {form.courses.reduce((acc: number, cur: any) => (acc += cur.credit), 0)}
            </Typography>
            <Typography>Total Fee: {`${totalFee} BDT`} </Typography>
            {role === 'STUDENT' && form.status === 'approved_by_hall_authority' && (
              <Button
                size="small"
                variant="contained"
                sx={{ px: 6, mt: 2 }}
                onClick={() => setOpenPaymentModal(true)}
              >
                Pay Now
              </Button>
            )}
          </Grid>
        </Grid>
      </Stack>
      <Grid container>
        <Grid item xs={4}>
          <Stack p={4} borderRadius={2} boxShadow={20} m={1} height="100%">
            <Typography variant="h6" textAlign="center" pb={1}>
              Department Fee
            </Typography>
            <Divider />
            <Stack mt={1}>
              {departmentFeeArray.map((item) => (
                <BoxItem key={item} itemKey={item} value={form.departmentalFeeId[item]} />
              ))}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack p={4} borderRadius={2} boxShadow={20} m={1} height="100%">
            <Typography variant="h6" textAlign="center" pb={1}>
              Semester Fee
            </Typography>
            <Divider />
            <Stack mt={1}>
              {semesterFeeArray.map((item) => (
                <BoxItem key={item} itemKey={item} value={form.semesterFeeId[item]} />
              ))}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack p={4} borderRadius={2} boxShadow={20} m={1} height="100%">
            <Typography variant="h6" textAlign="center" pb={1}>
              Residential Fee
            </Typography>
            <Divider />
            <Stack mt={1}>
              {residentialFeeArray.map((item) => (
                <BoxItem key={item} itemKey={item} value={form.residentialFeeId[item]} />
              ))}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      {/* {role === 'STUDENT' && form.status === 'approved_by_hall_authority' && (
        <Stack justifyItems="center" alignItems="center">
          <Box p={4} borderRadius={2} boxShadow={20} m={4} width={400}>
            <Typography variant="h6" textAlign="center" pb={1}>
              Pay your Application Fee
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <BoxItem itemKey="Total Fee" value={`BDT ${totalFee}`} />
            <TextField label="Your bank account id" fullWidth size="small" sx={{ mt: 2 }} />
            <Button variant="contained" fullWidth sx={{ mt: 4 }}>
              Pay Now
            </Button>
          </Box>
        </Stack>
      )} */}
    </Stack>
  );
};

export default ApplicationDetails;

const BoxItem = ({ itemKey, value }: { itemKey: string; value: string }) => {
  let newValue = value;

  if (itemKey === 'from' || itemKey === 'to') {
    const date = new Date(value);
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    newValue = `${month} ${year}`;
  }

  if (itemKey === 'from' && !value) {
    newValue = 'N/A';
  }

  if (itemKey === 'to' && !value) {
    newValue = 'N/A';
  }

  return (
    <Box display="flex" justifyContent="space-between" mt={1}>
      <Typography fontWeight="700" textTransform="capitalize">
        {itemKey}
      </Typography>
      <Typography>{newValue}</Typography>
    </Box>
  );
};

/// Payment Modal

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 2
};

const PaymentModal = ({
  open,
  handleClose,
  handlePayment,
  totalFee
}: {
  open: boolean;
  handlePayment: any;
  totalFee: number;
  handleClose: () => void;
}) => {
  const [bankAccountId, setBankAccountId] = useState('');
  const [error, setError] = useState(true);

  const onSubmit = async () => {
    if (error) return;
    await handlePayment(bankAccountId);
    setBankAccountId('');
    setError(true);
  };

  useEffect(() => {
    if (bankAccountId.length < 8) {
      setError(true);
    } else {
      setError(false);
    }
  }, [bankAccountId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack justifyItems="center" alignItems="center" bgcolor="#fff" borderRadius={2}>
            <Box p={4} boxShadow={20} width={400}>
              <Typography variant="h6" textAlign="center" pb={1}>
                Pay your Application Fee
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <BoxItem itemKey="Total Fee" value={`BDT ${totalFee}`} />
              <TextField
                label="Your bank account ID"
                fullWidth
                size="small"
                sx={{ mt: 2 }}
                error={error}
                value={bankAccountId}
                onChange={(e) => setBankAccountId(e.target.value)}
                helperText={error && 'Bank account id must have 8 characters'}
              />
              <Stack direction="row" gap={2} mt={4}>
                <Button
                  variant="contained"
                  fullWidth
                  color="success"
                  onClick={onSubmit}
                  disabled={error}
                >
                  Pay Now
                </Button>
                <Button variant="contained" fullWidth color="warning" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};
