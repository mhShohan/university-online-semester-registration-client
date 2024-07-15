import { Box, Button, Grid, Stack } from '@mui/material';
import CustomHookDatePicker from '../../components/forms/CustomHookDatePicker';
import CustomHookForm from '../../components/forms/CustomHookForm';
import CustomHookInput from '../../components/forms/CustomHookInput';
import { registrationInfoFields } from '../../data/registrationInfoFields';
import { IRegistrationInfo } from '../../types';

interface IFormFillUpProps {
  registrationInfo?: IRegistrationInfo;
}

const FormFillUp = ({ registrationInfo }: IFormFillUpProps) => {
  console.log('Form', registrationInfo);

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Stack my={5}>
      <CustomHookForm onSubmit={handleSubmit} defaultValues={registrationInfo}>
        <Grid container>
          {registrationInfoFields.semester.map((field) => (
            <Grid item xs={12} md={4} p={1} key={field.name}>
              <CustomHookInput name={field.name} label={field.label} />
            </Grid>
          ))}
        </Grid>

        <Grid container>
          {registrationInfoFields.department.map((field) => (
            <Grid item xs={12} md={4} p={1} key={field.name}>
              <CustomHookInput name={field.name} label={field.label} />
            </Grid>
          ))}
        </Grid>

        <Grid container>
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

        <Box m={1}>
          <Button variant="contained" type="submit">
            Checkout to Payment
          </Button>
        </Box>
      </CustomHookForm>
    </Stack>
  );
};

export default FormFillUp;

const sendingData = {
  year: '1st',
  semester: '1st',
  departmentalFee: {
    centerFee: 5000,
    association: 1000,
    developmentFee: 2000,
    amercementFee: 500
  },
  semesterFee: {
    tuitionFee: 15000,
    transport: 2000,
    library: 1000,
    centralSports: 1500,
    studentWelfare: 1000,
    treatment: 2000,
    roverScout: 500,
    BNCC: 500,
    computerFee: 3000,
    semesterExamFee: 1000,
    admitCard: 500,
    othersFee: 500
  },
  residentialFee: {
    from: '2024-01-01',
    to: '2024-04-30',
    fee: 10000
  }
};
