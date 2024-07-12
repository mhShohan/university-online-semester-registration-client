import { Button, Container, Stack, useTheme } from '@mui/material';
import CustomHookForm from '../../components/forms/CustomHookForm';
import CustomHookSelectField from '../../components/forms/CustomHookSelectField';
import { examTypeSelectOptions, semesterSelectOptions, yearSelectOptions } from '../../constants';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

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

  const onSubmit = (data: any) => {
    if (data) {
      const queryString = `year=${data.year}&semester=${data.semester}&examType=${data.examType}`;
      navigate('/registration-semester-course?' + queryString);
    }
    return;
  };

  return (
    <Container maxWidth="xs">
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
            <CustomHookSelectField name="semester" label="Semester" items={semesterSelectOptions} />
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
    </Container>
  );
};

export default SemesterRegistration;
