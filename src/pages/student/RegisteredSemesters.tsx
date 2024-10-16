import { Chip, Grid, Stack, Typography } from '@mui/material';
import Loader from '../../components/Loader';
import { useGetRegistrationFeeFormQuery } from '../../store/features/feeForm.api';
import { Link } from 'react-router-dom';

const RegisteredSemesters = () => {
  const { data, isLoading } = useGetRegistrationFeeFormQuery({
    status: 'approved_by_exam_controller'
  });

  if (isLoading) return <Loader fullPage={true} />;

  return (
    <Stack>
      {data?.data.length === 0 && (
        <Typography variant="h5" textAlign="center">
          No registered semesters found...
        </Typography>
      )}
      <Grid container spacing={2}>
        {data?.data.map((regSemester: any) => (
          <SingleSemester key={regSemester.id} regSemester={regSemester} />
        ))}
      </Grid>
    </Stack>
  );
};

export default RegisteredSemesters;

interface SingleSemesterProps {
  regSemester: {
    _id: string;
    year: string;
    semester: string;
    examType: string;
    courses: any[];
    createdAt: string;
    status: string;
    declineMessage: string;
  };
}

export const SingleSemester = ({ regSemester }: SingleSemesterProps) => {
  const { _id, year, semester, examType, courses, createdAt, status, declineMessage } = regSemester;

  const totalCredit = courses.reduce((acc, course) => {
    console.log('acc', acc, 'course', course);

    return acc + course.credit;
  }, 0);
  console.log('totalCredit', regSemester);
  const registrationDate = new Date(createdAt).toLocaleDateString();

  return (
    <Grid item xs={12} md={6}>
      <Stack
        p={6}
        boxShadow={24}
        borderRadius={4}
        component={Link}
        to={`/application/${_id}`}
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        <BoxItem title="Year" value={year} />
        <BoxItem title="Semester" value={semester} />
        <BoxItem title="Exam Type" value={examType} />
        <BoxItem title="Total Credit" value={totalCredit} />
        <BoxItem title="Registration Date" value={registrationDate} />
        <BoxItem
          title="Status"
          value={
            status === 'approved_by_hall_authority'
              ? 'Payment Pending'
              : status.split('_').join(' ')
          }
          color
        />
        <BoxItem title="Message" value={declineMessage || 'N/A'} />
      </Stack>
    </Grid>
  );
};

const BoxItem = ({
  title,
  value,
  color = false
}: {
  title: string;
  value: string;
  color?: boolean;
}) => {
  let outLineColor: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' = 'info';

  if (String(value).includes('approved')) {
    outLineColor = 'success';
  }

  if (String(value).includes('rejected')) {
    outLineColor = 'error';
  }

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography variant="h6" textAlign="left">
        {title}:
      </Typography>
      {color ? (
        <Chip
          label={value}
          color={outLineColor}
          sx={{
            padding: '0',
            height: '1.3rem',
            textTransform: 'capitalize'
          }}
        />
      ) : (
        <Typography textAlign="justify" ml={2} textTransform="capitalize">
          {value}
        </Typography>
      )}
    </Stack>
  );
};
