import { Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AppCard, EmptyState, PageSection, StatusChip } from '../../components/ui';
import Loader from '../../components/Loader';
import { useGetRegistrationFeeFormQuery } from '../../store/features/feeForm.api';

const RegisteredSemesters = () => {
  const { data, isLoading } = useGetRegistrationFeeFormQuery({
    status: 'approved_by_exam_controller'
  });

  if (isLoading) return <Loader fullPage />;

  return (
    <PageSection title="Registered semesters">
      {data?.data.length === 0 ? (
        <EmptyState message="No registered semesters found" />
      ) : (
        <Grid container spacing={2}>
          {data?.data.map((regSemester: any) => (
            <SingleSemester key={regSemester._id} regSemester={regSemester} />
          ))}
        </Grid>
      )}
    </PageSection>
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

  const totalCredit = courses.reduce((acc, course) => acc + course.credit, 0);
  const registrationDate = new Date(createdAt).toLocaleDateString();
  const statusLabel =
    status === 'approved_by_hall_authority' ? 'Payment Pending' : status.split('_').join(' ');

  return (
    <Grid item xs={12} md={6}>
      <Link to={`/application/${_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <AppCard padding={3} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
          <BoxItem title="Year" value={year} />
          <BoxItem title="Semester" value={semester} />
          <BoxItem title="Exam Type" value={examType} />
          <BoxItem title="Total Credit" value={String(totalCredit)} />
          <BoxItem title="Registration Date" value={registrationDate} />
          <BoxItem title="Status" value={statusLabel} color />
          <BoxItem title="Message" value={declineMessage || 'N/A'} />
        </AppCard>
      </Link>
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
}) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="center"
    sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1 }}
  >
    <Typography variant="body2" color="text.secondary" fontWeight={600}>
      {title}
    </Typography>
    {color ? (
      <StatusChip label={value} size="small" />
    ) : (
      <Typography variant="body2" textTransform="capitalize">
        {value}
      </Typography>
    )}
  </Stack>
);
