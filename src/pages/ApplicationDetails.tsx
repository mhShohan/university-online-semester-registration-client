import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useGetSingleRegistrationFeeFormQuery } from '../store/features/feeForm.api';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const departmentFeeArray = ['centerFee', 'association', 'developmentFee'];
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
const residentialFeeArray = ['fee', 'totalResidentFee', 'othersFee'];

const ApplicationDetails = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleRegistrationFeeFormQuery(params.id);

  if (isLoading) return <Loader fullPage />;

  const form = data.data;

  const totalDepartmentFee = departmentFeeArray
    .map((item) => form.departmentalFeeId[item])
    .reduce((acc, cur) => (acc += cur), 0);

  const totalSemesterFee = semesterFeeArray
    .map((item) => form.semesterFeeId[item])
    .reduce((acc, cur) => (acc += cur), 0);

  const totalResidentuialFee = residentialFeeArray
    .map((item) => form.residentialFeeId[item])
    .reduce((acc, cur) => (acc += cur), 0);

  const totalFee = totalDepartmentFee + totalSemesterFee + totalResidentuialFee;

  return (
    <Stack>
      <Stack key={form._id} p={4} borderRadius={4} boxShadow={24} m={1}>
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
              Total Credit: {form.courses.reduce((acc: number, cur: any) => (acc += cur.credit), 0)}
            </Typography>
            <Typography>Total Fee: {totalFee}</Typography>
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
    </Stack>
  );
};

export default ApplicationDetails;

const BoxItem = ({ itemKey, value }: { itemKey: string; value: string }) => {
  return (
    <Box display="flex" justifyContent="space-between" mt={1}>
      <Typography fontWeight="700" textTransform="capitalize">
        {itemKey}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};
