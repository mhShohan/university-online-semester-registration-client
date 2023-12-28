import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm();

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
            border: '1px solid gray',
            borderRadius: '8px'
          }}
          // onSubmit={handleSubmit(login)}
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
            fullWidth
            variant="filled"
            // color={errors['email'] ? 'error' : 'primary'}
            size="small"
            label="Email Address"
            // {...register('email', { required: true })}
          />

          <FormControl
            variant="filled"
            size="small"
            fullWidth
            // color={errors['password'] ? 'error' : 'primary'}
          >
            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? 'text' : 'password'}
              // {...register('password', { required: true })}
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
              Have an Account?{' '}
              <Link to="/register" style={{ textDecoration: 'none' }}>
                Register Here!
              </Link>
            </Typography>
          </Box>
        </form>
        <Box sx={{ marginTop: '2rem' }}>
          <Link to="/">
            <Button variant="contained">Go back</Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
