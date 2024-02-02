import { FieldValues, useForm } from 'react-hook-form';

// mui
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme
} from '@mui/material';

//project imports
import toastMessage from '../../lib/toastMessage';
import { useAddNewDepartmentMutation } from '../../store/features/departmentApi';
import { useAppSelector } from '../../store/hook';
import { getFaculties } from '../../store/services/pavilionSlice';
import AllDepartments from './AllDepartment';

const Department = () => {
  const faculties = useAppSelector(getFaculties);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const theme = useTheme();
  const [addDepartment] = useAddNewDepartmentMutation();

  /**
   * Form Submission
   */
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addDepartment(data).unwrap();
      if (res.statusCode === 201) {
        reset();
        toastMessage({ icon: 'success', text: res.message });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Box height="calc(100vh - 4rem)">
      <form
        style={{
          padding: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '8px'
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('name', { required: true })}
          color={errors['name'] ? 'error' : 'primary'}
          type="text"
          label="Department Name"
          id="outlined-start-adornment"
          size="small"
          sx={{ marginTop: '.6rem' }}
          fullWidth
        />
        <Grid container>
          <Grid item xs={6}>
            <TextField
              {...register('shortName', { required: true })}
              color={errors['shortName'] ? 'error' : 'primary'}
              type="text"
              label="Short Name"
              id="outlined-start-adornment"
              size="small"
              sx={{ marginTop: '.6rem' }}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl
              size="small"
              fullWidth
              variant="outlined"
              sx={{ margin: '.6rem 0 0 .2rem' }}
            >
              <InputLabel htmlFor="facultyId" color={errors['facultyId'] ? 'error' : 'primary'}>
                Faculty
              </InputLabel>
              <Select
                labelId="facultyId"
                id="facultyId"
                label="Faculty"
                {...register('facultyId', { required: true })}
                color={errors['facultyId'] ? 'error' : 'primary'}
              >
                {faculties?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '6px' }}
        >
          Add New Department
        </Button>
      </form>
      <AllDepartments />
    </Box>
  );
};

export default Department;
