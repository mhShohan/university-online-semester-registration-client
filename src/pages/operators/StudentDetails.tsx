import { FieldValues } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

// mui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// project import
import blankProPic from '../../assets/blankProPic.png';
import Loader from '../../components/Loader';
import {
  useGetStudentDetailsQuery,
  useUpdateStudentStatusMutation
} from '../../store/features/operator/operator.api';
import dateFormatter from '../../utils/dateFormatter';
import CustomHookForm from '../../components/forms/CustomHookForm';
import CustomHookSelectField from '../../components/forms/CustomHookSelectField';
import toastMessage from '../../lib/toastMessage';
import { statusSelectOptions } from '../../constants';

const StudentDetails = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: profileData, isLoading } = useGetStudentDetailsQuery(params.id);
  const [updateStatus] = useUpdateStudentStatusMutation();

  const handleUpdateStatus = async (data: FieldValues) => {
    try {
      const res = await updateStatus({ id: params.id, payload: data }).unwrap();

      if (res.success) {
        toastMessage({ icon: 'success', text: res.message });
        navigate('/');
      }
    } catch (error) {
      toastMessage({ icon: 'error', text: 'Failed to update student status' });
    }
  };

  if (isLoading) return <Loader fullPage={true} />;

  const data = profileData?.data;

  return (
    <Box>
      {/* Profile Info */}
      <Grid container>
        <Grid item xs={12} md={4}>
          <Box sx={{ padding: '.5rem 1rem' }}>
            <img
              src={data.avatar || blankProPic}
              alt="profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack direction="column" height="100%" justifyContent="center">
            <Stack direction="row" justifyContent="space-between" alignItems="center" pl={2}>
              <Typography variant="h3" sx={{ fontWeight: '700' }}>
                {data?.name}
              </Typography>
            </Stack>
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
        <Typography
          variant="h5"
          sx={{
            padding: '.2rem 1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            textAlign: 'center',
            marginBottom: '.3rem'
          }}
        >
          Personal Details
        </Typography>
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
        <Typography
          variant="h5"
          sx={{
            padding: '.2rem 1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            textAlign: 'center',
            marginBottom: '.3rem'
          }}
        >
          Present Address
        </Typography>
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
        <Typography
          variant="h5"
          sx={{
            padding: '.2rem 1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            textAlign: 'center',
            marginBottom: '.3rem'
          }}
        >
          Permanent Address
        </Typography>
        <Grid container>
          <SingleItem md={4} name="village" value={data?.permanentAddress?.village} />
          <SingleItem md={4} name="sub District" value={data?.permanentAddress?.subDistrict} />
          <SingleItem md={4} name="post Office" value={data?.permanentAddress?.postOffice} />
          <SingleItem md={4} name="district" value={data?.permanentAddress?.district} />
          <SingleItem md={4} name="zip Code" value={data?.permanentAddress?.zipCode} />
        </Grid>
      </Stack>

      <Stack my={2}>
        <Typography
          variant="h5"
          sx={{
            padding: '.2rem 1rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            borderBottom: '1px solid #000',
            textAlign: 'center',
            marginBottom: '.3rem'
          }}
        >
          Educational Qualifications
        </Typography>

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

      <Stack p={3}>
        <CustomHookForm onSubmit={handleUpdateStatus} defaultValues={{ status: data.status }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            alignItems="center"
            gap={1}
            justifyContent="center"
          >
            <CustomHookSelectField
              name="status"
              label="Status"
              items={statusSelectOptions}
              sx={{ maxWidth: '200px' }}
            />
            <Button type="submit" variant="contained">
              Update Student Status
            </Button>
          </Stack>
        </CustomHookForm>
      </Stack>
    </Box>
  );
};

export default StudentDetails;

const SingleItem = ({ name, value, md = 6 }: { name: string; value: string; md?: number }) => {
  return (
    <Grid item xs={12} md={md} p={1}>
      <Box
        sx={{
          width: '100%',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.20) inset',
          padding: '.5rem 1rem',
          borderRadius: '.4rem',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography sx={{ fontWeight: '600', fontSize: '1.1rem', textTransform: 'uppercase' }}>
          {name}
        </Typography>
        <Typography>{value}</Typography>
      </Box>
    </Grid>
  );
};
