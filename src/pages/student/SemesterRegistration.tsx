import { Box, Button, Container, Stack, Typography, useTheme } from '@mui/material';
import CustomHookForm from '../../components/forms/CustomHookForm';
import CustomHookSelectField from '../../components/forms/CustomHookSelectField';
import { examTypeSelectOptions, semesterSelectOptions, yearSelectOptions } from '../../constants';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useCheckRegistrationStatusQuery } from '../../store/features/operator/operator.api';
import Loader from '../../components/Loader';
import axios from 'axios';
import config from '../../config';
import { useAppSelector } from '../../store/hook';
import toastMessage from '../../lib/toastMessage';

const defaultValues = {
  year: '',
  semester: '',
  examType: ''
};

const validator = z.object({
  year: z.string().min(1, 'Year is required'),
  semester: z.string().min(1, 'Semester is required'),
  examType: z.string().min(1, 'Exam Type is required')
});

const SemesterRegistration = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const token = useAppSelector((state) => state.auth.token);
  const { data: checkRegistrationData, isLoading: isChecking } =
    useCheckRegistrationStatusQuery(undefined);

  if (isChecking) return <Loader fullPage={true} />;

  const onSubmit = async (data: any) => {
    if (!data) return;
    const queryString = `year=${data.year}&semester=${data.semester}&examType=${data.examType}`;

    try {
      const res = await axios.get(`${config.baseUrl}/fee-form/check?${queryString}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data.success) {
        navigate('/registration-semester-course?' + queryString);
      } else {
        toastMessage({
          icon: 'error',
          title: 'Not Eligible',
          text: 'You have already registered for this semester'
        });
      }
    } catch (error: any) {
      toastMessage({
        icon: 'warning',
        title: 'Not Eligible',
        text: error.response.data.message
      });
    }
  };

  return (
    <Container maxWidth="xs">
      {checkRegistrationData?.data.status === 'Ongoing' ? (
        <Stack
          sx={{
            mt: { xs: 3, md: 10 },
            padding: '2rem 3rem',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '8px'
          }}
        >
          <CustomHookForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(validator)}
          >
            <Stack spacing={1}>
              <CustomHookSelectField name="year" label="Year" items={yearSelectOptions} />
              <CustomHookSelectField
                name="semester"
                label="Semester"
                items={semesterSelectOptions}
              />
              <CustomHookSelectField
                name="examType"
                label="Exam Type"
                items={examTypeSelectOptions}
              />
              <Button variant="contained" type="submit">
                Start Registration
              </Button>
            </Stack>
          </CustomHookForm>
        </Stack>
      ) : (
        <Stack height="70vh" justifyContent="center" alignItems="center">
          <Box width="400px" boxShadow={24} borderRadius={4} p={4}>
            <Typography variant="h5" textAlign="center" fontWeight="700">
              Registration Closed!!!
            </Typography>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default SemesterRegistration;
