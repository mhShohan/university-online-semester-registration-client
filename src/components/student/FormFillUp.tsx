import { Box, Button, Grid, Stack } from '@mui/material';
import CustomHookForm from '../../components/forms/CustomHookForm';
import CustomHookInput from '../../components/forms/CustomHookInput';
import { registrationInfoFields } from '../../data/registrationInfoFields';
import { IRegistrationInfo } from '../../types';
import { formFillUpSanitize, retakeFormFillUpSanitize } from '../../utils/sanitize';
import { toast } from 'sonner';
import { useCreateRegistrationFeeFormMutation } from '../../store/features/feeForm.api';
import { useNavigate } from 'react-router-dom';

interface IFormFillUpProps {
  registrationInfo?: IRegistrationInfo;
  examType: string;
  semesterInfo: {
    year: string;
    semester: string;
    courses: any;
  };
}

const FormFillUp = ({ registrationInfo, examType, semesterInfo }: IFormFillUpProps) => {
  const [registerForm] = useCreateRegistrationFeeFormMutation();
  const navigate = useNavigate();
  const handleSubmit = async (data: any) => {
    const totalCredit = semesterInfo.courses.reduce(
      (acc: number, course: any) => acc + course.credit,
      0
    );

    const payload = formFillUpSanitize(data);
    payload.examType = examType;
    payload.courses = semesterInfo.courses;
    payload.year = semesterInfo.year;
    payload.semester = semesterInfo.semester;
    payload.semesterFee.creditFee = totalCredit * payload.semesterFee.creditFee;

    const toastId = toast.loading('Registration is in progress');

    try {
      const res = await registerForm(payload).unwrap();

      if (res.success) {
        toast.success('Registration Success', { id: toastId });
        navigate('/');
      } else {
        toast.error('Failed to Registration', { id: toastId });
      }
    } catch (error) {
      toast.error('Failed to Registration', { id: toastId });
    }
  };

  return (
    <Stack my={5}>
      <CustomHookForm onSubmit={handleSubmit} defaultValues={registrationInfo}>
        <Grid container>
          {registrationInfoFields.semester.map((field) => (
            <Grid item xs={12} md={4} p={1} key={field.name}>
              <CustomHookInput name={field.name} label={field.label} disabled />
            </Grid>
          ))}
        </Grid>

        <Grid container>
          {registrationInfoFields.department.map((field) => (
            <Grid item xs={12} md={4} p={1} key={field.name}>
              <CustomHookInput name={field.name} label={field.label} disabled />
            </Grid>
          ))}
          {/* <Grid item xs={12} md={4} p={1}>
            <CustomHookInput name="amercementFee" label="Amercement Fee" />
          </Grid> */}
        </Grid>

        {/* <Grid container>
          {registrationInfoFields.residentialFee.map((field) => (
            <>
              {field.type === 'date' ? (
                <Grid item xs={12} md={4} p={1} key={field.name}>
                  <CustomHookDatePicker name={field.name} label={field.label} />
                </Grid>
              ) : (
                <Grid item xs={12} md={4} p={1} key={field.name}>
                  <CustomHookInput name={field.name} label={field.label} />
                </Grid>
              )}
            </>
          ))}
        </Grid>
           */}

        <Box m={1}>
          <Button variant="contained" type="submit">
            Request to Registration Start
          </Button>
        </Box>
      </CustomHookForm>
    </Stack>
  );
};

export default FormFillUp;

export const RetakeOfImprovementForm = ({
  registrationInfo,
  examType,
  semesterInfo
}: IFormFillUpProps) => {
  const [registerForm] = useCreateRegistrationFeeFormMutation();
  const navigate = useNavigate();
  const handleSubmit = async (data: any) => {
    const totalCredit = semesterInfo.courses.reduce(
      (acc: number, course: any) => acc + course.credit,
      0
    );

    // admitCard, creditFee, centerFee

    const payload: any = retakeFormFillUpSanitize(data);
    payload.examType = examType;
    payload.courses = semesterInfo.courses;
    payload.year = semesterInfo.year;
    payload.semester = semesterInfo.semester;
    payload.semesterFee.creditFee = totalCredit * payload.semesterFee.creditFee;

    const toastId = toast.loading('Registration is in progress');

    try {
      const res = await registerForm(payload).unwrap();

      if (res.success) {
        toast.success('Registration Success', { id: toastId });
        navigate('/');
      } else {
        toast.error('Failed to Registration', { id: toastId });
      }
    } catch (error) {
      toast.error('Failed to Registration', { id: toastId });
    }
  };

  return (
    <Stack my={5}>
      <CustomHookForm onSubmit={handleSubmit} defaultValues={registrationInfo}>
        <Grid container>
          {registrationInfoFields.retake.map((field) => (
            <Grid item xs={12} md={4} p={1} key={field.name}>
              <CustomHookInput name={field.name} label={field.label} disabled />
            </Grid>
          ))}
        </Grid>

        <Box m={1}>
          <Button variant="contained" type="submit">
            Request to Registration Start
          </Button>
        </Box>
      </CustomHookForm>
    </Stack>
  );
};
