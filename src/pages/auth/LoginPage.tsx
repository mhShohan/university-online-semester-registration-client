import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

// mui
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useStudentLoginMutation } from '../../store/features/authApi';
import { setLoggedInUser } from '../../store/services/authSlice';
import { useAppDispatch } from '../../store/hook';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

const LoginPage = () => {
  const [studentLogin] = useStudentLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      emailOrStudentId: 'john.doe@example.com',
      password: 'pass123'
    }
  });

  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await studentLogin(data).unwrap();

      dispatch(setLoggedInUser(res.data));
      navigate('/');
      Swal.fire({
        text: 'Successfully Login!',
        icon: 'success'
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <form
          style={{
            maxWidth: '400px',
            padding: '2rem 3rem',
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '8px'
          }}
          onSubmit={handleSubmit(handleLogin)}
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
            Login as a student
          </Typography>

          <TextField
            {...register('emailOrStudentId', { required: true })}
            color={errors['emailOrStudentId'] ? 'error' : 'primary'}
            type="text"
            label="Email Address or Student ID"
            id="outlined-start-adornment"
            size="small"
            sx={{ width: '100%', marginTop: '.6rem' }}
          />
          <FormControl sx={{ width: '100%', marginTop: '.6rem' }} variant="outlined" size="small">
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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '6px' }}
          >
            Login
          </Button>
          <Box style={{ textAlign: 'center', marginTop: '10px' }}>
            <Typography variant="body1">
              Have no Account?{' '}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Register Here!
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

export default LoginPage;
