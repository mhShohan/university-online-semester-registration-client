import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import blankProPic from '../../assets/blankProPic.png';
import UploadPhotoOnChange from '../../components/forms/UploadPhotoOnChange';
import { PageSection, StatusChip } from '../../components/ui';
import Loader from '../../components/Loader';
import { useGetSelfProfileOfStudentQuery } from '../../store/features/student/student.api';
import dateFormatter from '../../utils/dateFormatter';

const StudentProfile = () => {
  const { data: profileData, isLoading } = useGetSelfProfileOfStudentQuery(undefined);

  if (isLoading) return <Loader fullPage />;

  const data = profileData?.data;

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Paper variant="outlined" sx={{ p: 2, height: 320, width: '100%', overflow: 'hidden' }}>
              <img
                src={data?.avatar || blankProPic}
                alt="profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
              />
            </Paper>
            <UploadPhotoOnChange name="file" studentId={data?._id} label="Change photo" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Typography variant="h4" fontWeight={700}>
                {data?.name}
              </Typography>
              <Link to="/profile/update-profile" style={{ textDecoration: 'none' }}>
                <Button variant="contained">Edit profile</Button>
              </Link>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="body2" fontWeight={600}>Status</Typography>
              <StatusChip
                label={data?.status ?? ''}
                status={data?.status === 'ACTIVE' ? 'success' : 'error'}
              />
            </Stack>
            <Grid container spacing={1}>
              <SingleItem name="Student ID" value={data?.studentId} />
              <SingleItem name="Email" value={data?.email} />
              <SingleItem name="Department" value={data?.department} />
              <SingleItem name="Faculty" value={data?.faculty} />
              <SingleItem name="Hall" value={data?.hall} />
              <SingleItem name="Session" value={data?.session} />
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      <PageSection title="Personal Details">
        <Grid container spacing={2}>
          <SingleItem md={4} name="Father Name" value={data?.fatherName} />
          <SingleItem md={4} name="Mother Name" value={data?.motherName} />
          <SingleItem md={4} name="Contact Number" value={data?.phone} />
          <SingleItem
            md={4}
            name="Date of Birth"
            value={dateFormatter.stringToMonth(data?.dateOfBirth)}
          />
          <SingleItem md={4} name="nationality" value={data?.nationality} />
          <SingleItem md={4} name="religion" value={data?.religion} />
        </Grid>
      </PageSection>

      <PageSection title="Present Address">
        <Grid container spacing={2}>
          <SingleItem md={4} name="village" value={data?.presentAddress?.village} />
          <SingleItem md={4} name="sub District" value={data?.presentAddress?.subDistrict} />
          <SingleItem md={4} name="post Office" value={data?.presentAddress?.postOffice} />
          <SingleItem md={4} name="district" value={data?.presentAddress?.district} />
          <SingleItem md={4} name="zip Code" value={data?.presentAddress?.zipCode} />
        </Grid>
      </PageSection>

      <PageSection title="Permanent Address">
        <Grid container spacing={2}>
          <SingleItem md={4} name="village" value={data?.permanentAddress?.village} />
          <SingleItem md={4} name="sub District" value={data?.permanentAddress?.subDistrict} />
          <SingleItem md={4} name="post Office" value={data?.permanentAddress?.postOffice} />
          <SingleItem md={4} name="district" value={data?.permanentAddress?.district} />
          <SingleItem md={4} name="zip Code" value={data?.permanentAddress?.zipCode} />
        </Grid>
      </PageSection>

      <PageSection title="Educational Qualifications">
        <Paper sx={{ overflow: 'hidden', mt: 1 }}>
          <DataGrid
            autoHeight
            columns={[
              { field: 'institute', headerName: 'Institute', flex: 1 },
              { field: 'name', headerName: 'Exam', flex: 1 },
              { field: 'board', headerName: 'Board', flex: 1 },
              { field: 'passingYear', headerName: 'Passing Year', flex: 1 },
              { field: 'roll', headerName: 'Roll', flex: 1 },
              { field: 'GPA', headerName: 'GPA', flex: 1 }
            ]}
            rows={
              data?.educationalQualifications.map((item: any, i: any) => ({ id: i, ...item })) || []
            }
            hideFooter
          />
        </Paper>
      </PageSection>
    </Box>
  );
};

export default StudentProfile;

const SingleItem = ({ name, value, md = 6 }: { name: string; value: string; md?: number }) => (
  <Grid item xs={12} md={md}>
    <Box
      sx={(theme) => ({
        width: '100%',
        boxShadow: `0 0 5px ${theme.palette.divider} inset`,
        padding: 1,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column'
      })}
    >
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
        {name}
      </Typography>
      <Typography variant="body2">{value}</Typography>
    </Box>
  </Grid>
);
