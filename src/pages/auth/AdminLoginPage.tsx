import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

//mui
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

// project import
import Loader from '../../components/Loader';
import toastMessage from '../../lib/toastMessage';
import { useAdminLoginMutation } from '../../store/features/authApi';
import { useAppDispatch } from '../../store/hook';
import { setLoggedInUser } from '../../store/services/authSlice';

const AdminLoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [defaultCredentials, setDefaultCredentials] = useState({
    email: 'chairman.eee@gmail.com',
    password: 'pass123'
  });
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ...defaultCredentials
    }
  });

  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await adminLogin(data).unwrap();

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

  useEffect(() => {
    reset(defaultCredentials);
  }, [defaultCredentials, reset]);

  if (isLoading) return <Loader fullPage={true} />;
  else
    return (
      <Container sx={{ height: '100vh' }}>
        <Grid container gap={6}>
          <Grid item xs={7} justifyContent="center" alignItems="center" height="100vh">
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Box
                style={{
                  flexGrow: 1,
                  padding: '2.2rem 1rem',
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: '8px'
                }}
              >
                <Typography variant="h6" textAlign="center" fontWeight="600" pb={1}>
                  Admin Login Credentials.
                </Typography>
                <Divider />
                <CredentialTable setDefaultCredentials={setDefaultCredentials} />
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={4}
            justifyContent="center"
            alignItems="center"
            height="100vh"
            flexDirection="column"
          >
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
          </Grid>
        </Grid>
      </Container>
    );
};

export default AdminLoginPage;

function createData(role: string, email: string, password: string) {
  return { role, email, password };
}

const rows = [
  createData('Chairman (EEE)', 'chairman.eee@gmail.com', 'pass123'),
  createData('Department Operator (EEE)', 'operator.eee@gmail.com', 'pass123'),
  createData('Hall Operator (SRH)', 'hall.srh@gmail.com	', 'pass123'),
  createData('Exam Controller', 'admin@gmail.com', 'pass123')
];

interface CredentialTableProps {
  setDefaultCredentials: Dispatch<
    SetStateAction<{
      email: string;
      password: string;
    }>
  >;
}

function CredentialTable({ setDefaultCredentials }: CredentialTableProps) {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Role</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Password</TableCell>
            <TableCell component="th" scope="row">
              Fill
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.email} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ p: 0 }}>
                {row.role}
              </TableCell>
              <TableCell component="th" scope="row" sx={{ p: 0 }}>
                {row.email}
              </TableCell>
              <TableCell component="th" scope="row" sx={{ p: 0 }}>
                {row.password}
              </TableCell>
              <TableCell component="th" scope="row" sx={{ p: 0 }}>
                <IconButton
                  onClick={() => {
                    setDefaultCredentials({
                      email: row.email,
                      password: row.password
                    });
                  }}
                >
                  <SendIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
