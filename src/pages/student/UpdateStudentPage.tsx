import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { FieldValues } from 'react-hook-form';

// project import
import Loader from '../../components/Loader';
import CustomHookDatePicker from '../../components/forms/CustomHookDatePicker';
import CustomHookForm from '../../components/forms/CustomHookForm';
import CustomHookInput from '../../components/forms/CustomHookInput';
import { useGetSelfProfileOfStudentQuery } from '../../store/features/student/student.api';
import dateFormatter from '../../utils/dateFormatter';
import { updateProfileSchema } from '../../validationSchema/updateProfile.schema';

// mui
import { Box, Button, Grid, Typography } from '@mui/material';
import CustomHookSelectField from '../../components/forms/CustomHookSelectField';
import academicSession from '../../constants/academicSession';

const UpdateStudentPage = () => {
  const { data: profileData, isLoading } = useGetSelfProfileOfStudentQuery(undefined);

  if (isLoading) return <Loader fullPage={true} />;

  const data = { ...profileData?.data };
  data.dateOfBirth = dayjs(new Date(data?.dateOfBirth || new Date('1990-01-01')).toISOString());

  const onSubmit = (data: FieldValues) => {
    const { ssc, hsc, dateOfBirth, ...rest } = data;

    const educationalQualifications = [
      { name: 'Secondary School Certificate', ...ssc },
      { name: 'Higher Secondary Certificate', ...hsc }
    ];

    const payload = {
      ...rest,
      dateOfBirth: dateFormatter.dateToString(dateOfBirth),
      educationalQualifications
    };
    console.log(payload);
  };

  return (
    <Box>
      <CustomHookForm
        onSubmit={onSubmit}
        defaultValues={data}
        resolver={zodResolver(updateProfileSchema)}
      >
        <Typography
          variant="h5"
          textAlign="left"
          sx={{ pb: 1, borderBottom: '1px solid #000', mb: 2 }}
        >
          Personal Information
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="name" label="Name" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="studentId" label="Student ID" disabled />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="email" label="Email" disabled />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookSelectField name="session" label="Session" items={academicSession()} />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookDatePicker name="dateOfBirth" label="Date of Birth" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="phone" label="Contact Number" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="fatherName" label="Father Name" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="motherName" label="Mother Name" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="nationality" label="Nationality" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="religion" label="Religion" />
          </Grid>
        </Grid>

        {/* present address info */}
        <Typography
          variant="h5"
          textAlign="left"
          sx={{ pb: 1, borderBottom: '1px solid #000', my: 2 }}
        >
          Present Address Information
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="presentAddress.village" label="Village" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="presentAddress.subDistrict" label="Sub District" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="presentAddress.postOffice" label="Post Office" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="presentAddress.district" label="District" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="presentAddress.zipCode" label="Zip Code" />
          </Grid>
        </Grid>

        {/* permanent Address  info */}
        <Typography
          variant="h5"
          textAlign="left"
          sx={{ pb: 1, borderBottom: '1px solid #000', my: 2 }}
        >
          Permanent Address Information
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="permanentAddress.village" label="Village" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="permanentAddress.subDistrict" label="Sub District" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="permanentAddress.postOffice" label="Post Office" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="permanentAddress.district" label="District" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="permanentAddress.zipCode" label="Zip Code" />
          </Grid>
        </Grid>

        {/* educational Qualifications */}
        <Typography
          variant="h5"
          textAlign="left"
          sx={{ pb: 1, borderBottom: '1px solid #000', my: 2 }}
        >
          Educational Qualifications (Higher Secondary Certificate)
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="hsc.institute" label="Institute" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="hsc.board" label="Board" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="hsc.passingYear" label="Passing Year" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="hsc.roll" label="Roll" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="hsc.GPA" label="GPA" />
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          textAlign="left"
          sx={{ pb: 1, borderBottom: '1px solid #000', my: 2 }}
        >
          Educational Qualifications (Secondary School Certificate)
        </Typography>
        <Grid container>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="ssc.institute" label="Institute" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="ssc.board" label="Board" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="ssc.passingYear" label="Passing Year" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="ssc.roll" label="Roll" />
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="ssc.GPA" label="GPA" />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ m: 1, padding: '.5rem 3rem' }}>
          Update Profile
        </Button>
      </CustomHookForm>
    </Box>
  );
};

export default UpdateStudentPage;
