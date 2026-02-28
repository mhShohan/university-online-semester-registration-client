import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
  Paper,
  Select,
  TextField,
  Typography
} from '@mui/material';

//project import
import toastMessage from '../../lib/toastMessage';
import { useStudentRegistrationMutation } from '../../store/features/authApi';
import { useGetAllDepartmentsQuery } from '../../store/features/super-admin/departmentApi';
import { useGetAllFacultiesQuery } from '../../store/features/super-admin/facultyApi';
import { useGetAllHallsQuery } from '../../store/features/super-admin/hallApi';
import Loader from '../../components/Loader';

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
  const [studentRegistration, { isLoading }] = useStudentRegistrationMutation();
  const navigate = useNavigate();
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

  if (isLoading) return <Loader fullPage />;

  return (
    <Container sx={{ height: '100vh' }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
        flexDirection="column"
      >
        <Paper
          component="form"
          onSubmit={handleSubmit(registerNewStudent)}
          sx={{ maxWidth: 600, p: 3 }}
        >
          <Typography variant="h5" textAlign="center" fontWeight={700} sx={{ mb: 2 }}>
            Register account
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('name', { required: true })}
                error={!!errors['name']}
                label="Student Name"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('studentId', { required: true })}
                error={!!errors['studentId']}
                label="Student ID"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                {...register('email', { required: true })}
                error={!!errors['email']}
                label="Email Address"
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl size="small" fullWidth variant="outlined" error={!!errors['departmentId']}>
                <InputLabel htmlFor="departmentId">Department</InputLabel>
                <Select
                  labelId="departmentId-label"
                  id="departmentId"
                  label="Department"
                  {...register('departmentId', { required: true })}
                >
                  {departments?.data.map((item: TItem) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl size="small" fullWidth variant="outlined" error={!!errors['facultyId']}>
                <InputLabel id="facultyId-label">Faculty</InputLabel>
                <Select
                  labelId="facultyId-label"
                  id="facultyId"
                  label="Faculty"
                  {...register('facultyId', { required: true })}
                >
                  {faculties?.data.map((item: TItem) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl size="small" fullWidth variant="outlined" error={!!errors['hallId']}>
                <InputLabel id="hallId-label">Hall</InputLabel>
                <Select
                  labelId="hallId-label"
                  id="hallId"
                  label="Hall"
                  {...register('hallId', { required: true })}
                >
                  {halls?.data.map((item: TItem) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" size="small" error={!!errors['password']}>
                <InputLabel htmlFor="reg-password">Password</InputLabel>
                <OutlinedInput
                  id="reg-password"
                  {...register('password', { required: true })}
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
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined" size="small" error={!!errors['confirmPassword']}>
                <InputLabel htmlFor="reg-confirm-password">Confirm Password</InputLabel>
                <OutlinedInput
                  id="reg-confirm-password"
                  {...register('confirmPassword', { required: true })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onMouseDown={() => setShowConfirmPassword(true)}
                        onMouseUp={() => setShowConfirmPassword(false)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2, py: 1.25 }}>
            Register
          </Button>
          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login here</Link>
          </Typography>
        </Paper>
        <Box sx={{ mt: 3 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" startIcon={<ArrowBackIosIcon sx={{ fontSize: 18 }} />}>
              Go back
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
