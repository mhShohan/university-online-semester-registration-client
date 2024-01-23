import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const registerNewStudent = (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        icon: 'error',
        text: 'Password and Confirm password must be same!'
      });

      return;
    }
    console.log(data);
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
            maxWidth: '400px',
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
          <TextField
            {...register('name', { required: true })}
            color={errors['name'] ? 'error' : 'primary'}
            label="Student Name"
            id="outlined-start-adornment"
            size="small"
            sx={{ width: '100%', marginTop: '.6rem', backgroundColor: 'transparent' }}
          />
          <TextField
            {...register('studentId', { required: true })}
            color={errors['studentId'] ? 'error' : 'primary'}
            label="Student ID"
            id="outlined-start-adornment"
            size="small"
            sx={{ width: '100%', marginTop: '.6rem' }}
          />
          <TextField
            {...register('email', { required: true })}
            color={errors['email'] ? 'error' : 'primary'}
            label="Email Address"
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
          <FormControl sx={{ width: '100%', marginTop: '.6rem' }} variant="outlined" size="small">
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
