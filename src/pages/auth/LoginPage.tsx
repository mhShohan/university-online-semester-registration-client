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
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography
} from '@mui/material';

//project import
import toastMessage from '../../lib/toastMessage';
import { useStudentLoginMutation } from '../../store/features/authApi';
import { useAppDispatch } from '../../store/hook';
import { setLoggedInUser } from '../../store/services/authSlice';
import Loader from '../../components/Loader';

const LoginPage = () => {
  const [studentLogin, { isLoading }] = useStudentLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      emailOrStudentId: '17EEE145',
      password: 'pass123'
    }
  });

  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await studentLogin(data).unwrap();

      if (res.statusCode === 200) {
        dispatch(setLoggedInUser(res.data));
        navigate('/');

        return;
      }
      toastMessage({ icon: 'error', text: 'Login Failed!' });
    } catch (error: any) {
      toastMessage({ icon: 'error', title: 'Login Failed!', text: error?.data?.message });
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
        <Paper component="form" onSubmit={handleSubmit(handleLogin)} sx={{ maxWidth: 400, p: 3 }}>
          <Typography variant="h5" textAlign="center" fontWeight={700} sx={{ mb: 2 }}>
            Login as student
          </Typography>
          <TextField
            {...register('emailOrStudentId', { required: true })}
            error={!!errors['emailOrStudentId']}
            type="text"
            label="Email or Student ID"
            size="small"
            fullWidth
            sx={{ mt: 1.5 }}
          />
          <FormControl fullWidth variant="outlined" size="small" sx={{ mt: 1.5 }} error={!!errors['password']}>
            <InputLabel htmlFor="login-password">Password</InputLabel>
            <OutlinedInput
              id="login-password"
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
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2, py: 1.25 }}>
            Login
          </Button>
          <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
            No account? <Link to="/register" style={{ textDecoration: 'none' }}>Register here</Link>
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

export default LoginPage;
