import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

// mui
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

//project import
import toastMessage from '../../lib/toastMessage';
import { useStudentRegistrationMutation } from '../../store/features/authApi';
import { useGetAllDepartmentsQuery } from '../../store/features/super-admin/departmentApi';
import { useGetAllFacultiesQuery } from '../../store/features/super-admin/facultyApi';
import { useGetAllHallsQuery } from '../../store/features/super-admin/hallApi';

type TItem = {
  _id: string;
  name: string;
};

const RegisterPage = () => {
  const { data: departments } = useGetAllDepartmentsQuery(undefined);
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const { data: halls } = useGetAllHallsQuery(undefined);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [studentRegistration] = useStudentRegistrationMutation();
  const navigate = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const registerNewStudent = async (data: FieldValues) => {
    try {
      if (data.password !== data.confirmPassword) {
        toastMessage({
          icon: 'error',
          text: 'Password and Confirm password must be same!'
        });

        return;
      }

      const res = await studentRegistration(data).unwrap();

      if (res.statusCode === 201) {
        navigate('/');
        toastMessage({
          icon: 'success',
          title: 'New Student Registered successfully!',
          text: 'Login Now'
        });

        return;
      } else {
        toastMessage({ icon: 'error', title: 'Student registration failed!' });
      }
    } catch (error: any) {
      toastMessage({
        icon: 'error',
        title: 'Student registration failed!',
        text: error?.data?.message
      });
    }
  };

  return (
    <Container sx={{ height: '100vh' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <form
          style={{
            maxWidth: '600px',
            padding: '2rem 3rem',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '8px'
          }}
          onSubmit={handleSubmit(registerNewStudent)}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              marginBottom: '.8rem',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            Register account!
          </Typography>

          <Grid container>
            <Grid item xs={12} md={6} sx={{ padding: '0 2px' }}>
              <TextField
                {...register('name', { required: true })}
                color={errors['name'] ? 'error' : 'primary'}
                label="Student Name"
                id="outlined-start-adornment"
                size="small"
                sx={{ width: '100%', marginTop: '.6rem', backgroundColor: 'transparent' }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '0 2px' }}>
              <TextField
                {...register('studentId', { required: true })}
                color={errors['studentId'] ? 'error' : 'primary'}
                label="Student ID"
                id="outlined-start-adornment"
                size="small"
                sx={{ width: '100%', marginTop: '.6rem' }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '0 2px' }}>
              <TextField
                {...register('email', { required: true })}
                color={errors['email'] ? 'error' : 'primary'}
                label="Email Address"
                id="outlined-start-adornment"
                size="small"
                sx={{ width: '100%', marginTop: '.6rem' }}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '0 2px' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="departmentId">Department</InputLabel>
                <Select
                  labelId="departmentId"
                  id="departmentId"
                  label="Faculty"
                  {...register('departmentId', { required: true })}
                  color={errors['departmentId'] ? 'error' : 'primary'}
                >
                  {departments?.data.map((item: TItem) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '0 2px' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="departmentId">Faculty</InputLabel>
                <Select
                  labelId="departmentId"
                  id="departmentId"
                  label="Faculty"
                  {...register('facultyId', { required: true })}
                  color={errors['facultyId'] ? 'error' : 'primary'}
                >
                  {faculties?.data.map((item: TItem) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '0 2px' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="departmentId">Hall</InputLabel>
                <Select
                  labelId="departmentId"
                  id="departmentId"
                  label="Hall"
                  {...register('hallId', { required: true })}
                  color={errors['hallId'] ? 'error' : 'primary'}
                >
                  {halls?.data.map((item: TItem) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '0 2px' }}>
              <FormControl
                sx={{ width: '100%', marginTop: '.6rem' }}
                variant="outlined"
                size="small"
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  color={errors['password'] ? 'error' : 'primary'}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  {...register('password', { required: true })}
                  color={errors['password'] ? 'error' : 'primary'}
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} sx={{ padding: '0 2px' }}>
              <FormControl
                sx={{ width: '100%', marginTop: '.6rem' }}
                variant="outlined"
                size="small"
              >
                <InputLabel
                  htmlFor="outlined-adornment-password"
                  color={errors['confirmPassword'] ? 'error' : 'primary'}
                >
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  {...register('confirmPassword', { required: true })}
                  color={errors['confirmPassword'] ? 'error' : 'primary'}
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onMouseDown={() => setShowConfirmPassword(true)}
                        onMouseUp={() => setShowConfirmPassword(false)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '6px' }}
          >
            Register
          </Button>
          <Box style={{ textAlign: 'center', marginTop: '10px' }}>
            <Typography variant="body1">
              Already Have an Account?{' '}
              <Link to="/login" style={{ textDecoration: 'none' }}>
                Login Here!
              </Link>
            </Typography>
          </Box>
        </form>
        <Box sx={{ marginTop: '2rem' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={{ display: 'flex', alignItems: 'center' }}>
              <ArrowBackIosIcon style={{ fontSize: '1rem' }} />
              Go back
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
