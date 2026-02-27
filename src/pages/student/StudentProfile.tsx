import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import blankProPic from '../../assets/blankProPic.png';
import UploadPhotoOnChange from '../../components/forms/UploadPhotoOnChange';
import Loader from '../../components/Loader';
import { useGetSelfProfileOfStudentQuery } from '../../store/features/student/student.api';
import dateFormatter from '../../utils/dateFormatter';

const StudentProfile = () => {
  const { data: profileData, isLoading } = useGetSelfProfileOfStudentQuery(undefined);

  if (isLoading) return <Loader fullPage={true} />;

  const data = profileData?.data;

  return (
    <Box>
      {/* Profile Info */}
      <Grid container>
        <Grid item xs={12} md={4}>
          <Stack justifyContent="center" alignItems="center" p={2}>
            <Box
              sx={{
                padding: '1.5rem',
                height: '400px',
                border: '1px solid gray',
                borderRadius: 4
              }}
            >
              <img
                src={data.avatar || blankProPic}
                alt="profile"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4 }}
              />
            </Box>
            <UploadPhotoOnChange name="file" studentId={data._id} label="Change Your Photo" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="column" height="100%" justifyContent="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" pl={2}>
              <Typography variant="h3" sx={{ fontWeight: '700' }}>
                {data?.name}
              </Typography>

              <Link to="/profile/update-profile">
                <Button variant="contained">Edit Profile</Button>
              </Link>
            </Stack>
            <Typography pl={2}>
              <strong>Status: </strong>
              <Chip
                label={data?.status}
                color={data?.status === 'ACTIVE' ? 'success' : 'error'}
                sx={{
                  padding: '0.1rem 1rem',
                  height: '1.5rem'
                }}
              />
            </Typography>
            <Grid container>
              <SingleItem name="student Id" value={data?.studentId} />
              <SingleItem name="Email" value={data?.email} />
              <SingleItem name="Department" value={data?.department} />
              <SingleItem name="faculty" value={data?.faculty} />
              <SingleItem name="hall" value={data?.hall} />
              <SingleItem name="session" value={data?.session} />
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      {/* Personal Details */}
      <Stack my={2}>
        <Divider />
        <Typography
          variant="h5"
          sx={{
            padding: '.2rem 1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          Personal Details
        </Typography>
        <Divider />
        <Grid container>
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
      </Stack>

      {/* Present Address Details */}
      <Stack my={2}>
        <Divider />
        <Typography
          variant="h5"
          sx={{
            padding: '.2rem 1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          Present Address
        </Typography>
        <Divider />
        <Grid container>
          <SingleItem md={4} name="village" value={data?.presentAddress?.village} />
          <SingleItem md={4} name="sub District" value={data?.presentAddress?.subDistrict} />
          <SingleItem md={4} name="post Office" value={data?.presentAddress?.postOffice} />
          <SingleItem md={4} name="district" value={data?.presentAddress?.district} />
          <SingleItem md={4} name="zip Code" value={data?.presentAddress?.zipCode} />
        </Grid>
      </Stack>

      {/* permanentAddress Details */}
      <Stack my={2}>
        <Divider />
        <Typography
          variant="h5"
          sx={{
            padding: '.2rem 1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          Permanent Address
        </Typography>
        <Divider />
        <Grid container>
          <SingleItem md={4} name="village" value={data?.permanentAddress?.village} />
          <SingleItem md={4} name="sub District" value={data?.permanentAddress?.subDistrict} />
          <SingleItem md={4} name="post Office" value={data?.permanentAddress?.postOffice} />
          <SingleItem md={4} name="district" value={data?.permanentAddress?.district} />
          <SingleItem md={4} name="zip Code" value={data?.permanentAddress?.zipCode} />
        </Grid>
      </Stack>

      <Stack my={2}>
        <Divider />
        <Typography
          variant="h5"
          sx={{
            padding: '.2rem 1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          Educational Qualifications
        </Typography>
        <Divider />

        <Box my={1}>
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
            hideFooterPagination={true}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default StudentProfile;

const SingleItem = ({ name, value, md = 6 }: { name: string; value: string; md?: number }) => {
  return (
    <Grid item xs={12} md={md} p={1}>
      <Box
        sx={(theme) => ({
          width: '100%',
          boxShadow: `0 0 5px ${theme.palette.divider} inset`,
          padding: '.5rem 1rem',
          borderRadius: '.4rem',
          display: 'flex',
          flexDirection: 'column'
        })}
      >
        <Typography sx={{ fontWeight: '600', fontSize: '1.1rem', textTransform: 'uppercase' }}>
          {name}
        </Typography>
        <Typography>{value}</Typography>
      </Box>
    </Grid>
  );
};
