import { Box, Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useGetSingleRegistrationFeeFormQuery } from '../store/features/feeForm.api';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAppSelector } from '../store/hook';

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
  const role = useAppSelector((state) => state.auth.user?.role);

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

  // const handlePayment = () => {
  //   const payload = {
  //     studentId: form.studentId.studentId,
  //     formId: form._id,
  //     amount: totalFee,
  //     backAccountId: '123456789'
  //   };
  // };

  return (
    <Stack>
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
      {role === 'STUDENT' && form.status === 'approved_by_hall_authority' && (
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
      )}
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
