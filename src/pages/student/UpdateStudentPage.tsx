import dayjs from 'dayjs';
import { FieldValues } from 'react-hook-form';

// project import
import Loader from '../../components/Loader';
import CustomHookDatePicker from '../../components/forms/CustomHookDatePicker';
import CustomHookForm from '../../components/forms/CustomHookForm';
import CustomHookInput from '../../components/forms/CustomHookInput';
import {
  useGetSelfProfileOfStudentQuery,
  useUpdateStudentProfileMutation
} from '../../store/features/student/student.api';
import dateFormatter from '../../utils/dateFormatter';

import { Box, Button, Grid } from '@mui/material';

import { PageSection } from '../../components/ui';
import CustomHookSelectField from '../../components/forms/CustomHookSelectField';
import academicSession from '../../constants/academicSession';
import toastMessage from '../../lib/toastMessage';
import { useNavigate } from 'react-router-dom';
import { updateProfileSchema } from '../../validationSchema/updateProfile.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const UpdateStudentPage = () => {
  const navigate = useNavigate();
  const { data: profileData, isLoading } = useGetSelfProfileOfStudentQuery(undefined);
  const [updateStudentProfile, { isLoading: isUpdating }] = useUpdateStudentProfileMutation();

  if (isLoading) return <Loader fullPage={true} />;

  const data = { ...profileData?.data };
  const studentId = data?._id;
  data.dateOfBirth = dayjs(new Date(data?.dateOfBirth || new Date('1990-01-01')).toISOString());
  data.ssc = data?.educationalQualifications.find((item: any) => {
    return item.name === 'Secondary School Certificate';
  });
  data.hsc = data?.educationalQualifications.find((item: any) => {
    return item.name === 'Higher Secondary Certificate';
  });

  const removeFields = [
    'avatar',
    'educationalQualifications',
    'department',
    'departmentId',
    'departmentShortName',
    'faculty',
    'facultyId',
    'hall',
    'hallId',
    'isVerified',
    'status',
    '_id',
    'password'
  ];

  for (const key of removeFields) {
    delete data[key];
  }

  const handleProfileUpdate = async (fields: FieldValues) => {
    const { ssc, hsc, dateOfBirth, ...rest } = fields;

    const educationalQualifications = [
      { ...ssc, name: 'Secondary School Certificate' },
      { ...hsc, name: 'Higher Secondary Certificate' }
    ];

    const payload = {
      ...rest,
      dateOfBirth: dateFormatter.dateToString(dateOfBirth),
      educationalQualifications
    };

    try {
      const res = await updateStudentProfile({ id: studentId, payload }).unwrap();

      if (res?.success) {
        toastMessage({ icon: 'success', title: 'Profile updated successfully' });
      }
      navigate('/profile');
    } catch (error) {
      toastMessage({ icon: 'error', title: 'Failed to update profile' });
    }
  };

  if (isUpdating) return <Loader fullPage={true} />;

  return (
    <Box>
      <CustomHookForm
        onSubmit={handleProfileUpdate}
        defaultValues={data}
        resolver={zodResolver(updateProfileSchema)}
      >
        <PageSection title="Personal Information" withDivider={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="name" label="Name" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="studentId" label="Student ID" disabled />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="email" label="Email" disabled />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookSelectField name="session" label="Session" items={academicSession()} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookDatePicker name="dateOfBirth" label="Date of Birth" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="phone" label="Contact Number" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="fatherName" label="Father Name" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="motherName" label="Mother Name" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="nationality" label="Nationality" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="religion" label="Religion" />
          </Grid>
        </Grid>
        </PageSection>

        <PageSection title="Present Address" withDivider={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="presentAddress.village" label="Village" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="presentAddress.subDistrict" label="Sub District" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="presentAddress.postOffice" label="Post Office" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="presentAddress.district" label="District" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="presentAddress.zipCode" label="Zip Code" />
          </Grid>
        </Grid>
        </PageSection>

        <PageSection title="Permanent Address" withDivider={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="permanentAddress.village" label="Village" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="permanentAddress.subDistrict" label="Sub District" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="permanentAddress.postOffice" label="Post Office" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="permanentAddress.district" label="District" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="permanentAddress.zipCode" label="Zip Code" />
          </Grid>
        </Grid>
        </PageSection>

        <PageSection title="Educational Qualifications (HSC)" withDivider={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="hsc.name" label="Exam Name" disabled />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="hsc.institute" label="Institute" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="hsc.board" label="Board" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="hsc.passingYear" label="Passing Year" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="hsc.roll" label="Roll" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="hsc.GPA" label="GPA" />
          </Grid>
        </Grid>
        </PageSection>

        <PageSection title="Educational Qualifications (SSC)" withDivider={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="ssc.name" label="Exam Name" disabled />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="ssc.institute" label="Institute" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="ssc.board" label="Board" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="ssc.passingYear" label="Passing Year" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="ssc.roll" label="Roll" />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomHookInput name="ssc.GPA" label="GPA" />
          </Grid>
        </Grid>
        </PageSection>
        <Button type="submit" variant="contained" sx={{ mt: 2, py: 1.25, px: 3 }}>
          Update Profile
        </Button>
      </CustomHookForm>
    </Box>
  );
};

export default UpdateStudentPage;
