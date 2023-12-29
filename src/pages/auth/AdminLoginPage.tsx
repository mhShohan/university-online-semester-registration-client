import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

//mui
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
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const login = () => {};

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
          onSubmit={handleSubmit(login)}
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
            Login as an admin
          </Typography>

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

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '6px' }}
          >
            Login
          </Button>
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

export default AdminLoginPage;
