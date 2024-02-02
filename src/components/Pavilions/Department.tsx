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
import { FieldValues, useForm } from 'react-hook-form';
import AllDepartments from './AllDepartment';

const Department = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const theme = useTheme();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
                <MenuItem value={'h'}>Faculty of Engineering</MenuItem>
                <MenuItem value={'20'}>Twenty</MenuItem>
                <MenuItem value={'30'}>Thirty</MenuItem>
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
