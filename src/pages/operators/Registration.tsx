import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import Loader from '../../components/Loader';
import {
  modifiedDataOfRegistrationInfo,
  registrationInfoFields
} from '../../data/registrationInfoFields';
import {
  useGetRegistrationInfoQuery,
  useStartRegistrationMutation
} from '../../store/features/operator/operator.api';
import dayjs from 'dayjs';
import CustomHookForm from '../../components/forms/CustomHookForm';
import { FieldValues } from 'react-hook-form';
import CustomHookInput from '../../components/forms/CustomHookInput';
import CustomHookDatePicker from '../../components/forms/CustomHookDatePicker';
import dateFormatter from '../../utils/dateFormatter';
import toastMessage from '../../lib/toastMessage';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const { data: registrationData, isLoading } = useGetRegistrationInfoQuery(undefined);
  const [startRegistration, { isLoading: isUpdating }] = useStartRegistrationMutation();
  const navigate = useNavigate();

  if (isLoading || isUpdating) return <Loader fullPage={true} />;

  // modify data
  const defaultData = modifiedDataOfRegistrationInfo(registrationData?.data);
  defaultData.startDate = dayjs(
    new Date((defaultData?.startDate as string) || new Date('1990-01-01')).toISOString()
  );
  defaultData.endDate = dayjs(
    new Date((defaultData?.endDate as string) || new Date('1990-01-01')).toISOString()
  );

  const handleUpdateRegistration = async (data: FieldValues) => {
    const { startDate, endDate, ...restData } = data;
    data.startDate = dateFormatter.dateToString(startDate);
    data.endDate = dateFormatter.dateToString(endDate);

    Object.keys(restData).forEach((key) => {
      if (typeof restData[key] === 'string') {
        data[key] = parseFloat(restData[key]);
      }
    });

    try {
      const res = await startRegistration({ id: registrationData?.data?._id, payload: data });

      if (((res as Record<string, unknown>).data as Record<string, unknown>).success) {
        toastMessage({ icon: 'success', text: 'Registration started successfully' });
        navigate('/');
      } else {
        toastMessage({ icon: 'error', text: 'Failed to start registration' });
      }
    } catch (error) {
      toastMessage({ icon: 'error', text: 'Failed to start registration' });
    }
  };

  return (
    <Stack>
      <CustomHookForm onSubmit={handleUpdateRegistration} defaultValues={defaultData}>
        <Stack mb={3}>
          <Divider />
          <Typography variant="h5" textTransform="uppercase" fontWeight="600" textAlign="center">
            Semester Fee
          </Typography>
          <Divider />
        </Stack>
        <Grid container>
          {registrationInfoFields.semester.map((field) => (
            <Grid item xs={12} md={4} p={1} key={field.name}>
              <CustomHookInput name={field.name} label={field.label} />
            </Grid>
          ))}
        </Grid>

        <Stack my={3}>
          <Divider />
          <Typography variant="h5" textTransform="uppercase" fontWeight="600" textAlign="center">
            Departmental Fee
          </Typography>
          <Divider />
        </Stack>
        <Grid container>
          {registrationInfoFields.department.map((field) => (
            <Grid item xs={12} md={4} p={1} key={field.name}>
              <CustomHookInput name={field.name} label={field.label} />
            </Grid>
          ))}
        </Grid>

        <Stack my={3}>
          <Divider />
          <Typography variant="h5" textTransform="uppercase" fontWeight="600" textAlign="center">
            Registration Date
          </Typography>
          <Divider />
        </Stack>
        <Grid container>
          {registrationInfoFields.date.map((field) => (
            <Grid item xs={12} md={4} p={1} key={field.name}>
              <CustomHookDatePicker name={field.name} label={field.label} />
            </Grid>
          ))}
        </Grid>
        <Box my={4}>
          <Button variant="contained" type="submit">
            Registration Start
          </Button>
        </Box>
      </CustomHookForm>
    </Stack>
  );
};

export default Registration;
