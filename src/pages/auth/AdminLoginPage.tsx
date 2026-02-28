import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SendIcon from '@mui/icons-material/Send';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
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

  if (isLoading) return <Loader fullPage />;

  return (
    <Container sx={{ height: '100vh' }}>
      <Grid container gap={4} justifyContent="center" alignItems="center" minHeight="100vh">
        <Grid item xs={12} md={7} display="flex" justifyContent="center">
          <Paper sx={{ p: 2.5, maxWidth: 480, width: '100%' }}>
            <Typography variant="h6" textAlign="center" fontWeight={600} sx={{ pb: 1 }}>
              Admin login credentials
            </Typography>
            <Divider />
            <CredentialTable setDefaultCredentials={setDefaultCredentials} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Paper
            component="form"
            onSubmit={handleSubmit(handleLogin)}
            sx={{ p: 3, maxWidth: 400, width: '100%' }}
          >
            <Typography variant="h5" textAlign="center" fontWeight={700} sx={{ mb: 2 }}>
              Login as admin
            </Typography>
            <TextField
              {...register('email', { required: true })}
              error={!!errors['email']}
              label="Email"
              size="small"
              fullWidth
              sx={{ mb: 1.5 }}
            />
            <FormControl fullWidth variant="outlined" size="small" error={!!errors['password']} sx={{ mb: 2 }}>
              <InputLabel htmlFor="admin-login-password">Password</InputLabel>
              <OutlinedInput
                id="admin-login-password"
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
            <Button variant="contained" type="submit" fullWidth sx={{ py: 1.25 }}>
              Login
            </Button>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="outlined" startIcon={<ArrowBackIosIcon sx={{ fontSize: 18 }} />}>
                  Go back
                </Button>
              </Link>
            </Box>
          </Paper>
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
  createData('Hall Operator (SRH)', 'hall.srh@gmail.com', 'pass123'),
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
