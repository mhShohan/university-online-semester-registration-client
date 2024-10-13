import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import AdminTable from '../../components/super-admin/AdminTable';
import { adminRoles } from '../../constants';
import toastMessage from '../../lib/toastMessage';
import {
  useCreateAdminMutation,
  useGetAllAdminsQuery
} from '../../store/features/super-admin/adminAPi';
import { useGetAllDepartmentsQuery } from '../../store/features/super-admin/departmentApi';
import { useGetAllHallsQuery } from '../../store/features/super-admin/hallApi';
import { TDepartment, THall } from '../../types';

const ManageAdmin = () => {
  const { data: admins, isFetching } = useGetAllAdminsQuery(undefined);
  return (
    <div>
      <CreateAdmin />
      <br />
      <AdminTable data={admins?.data} isFetching={isFetching} />
    </div>
  );
};

export default ManageAdmin;

const CreateAdmin = () => {
  const { data: departments } = useGetAllDepartmentsQuery(undefined);
  const { data: halls } = useGetAllHallsQuery(undefined);
  const [createAdmin] = useCreateAdminMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      }
    }

    try {
      const res = await createAdmin(data).unwrap();
      if (res.statusCode === 201 || res.statusCode === 200) {
        reset();
        toastMessage({ icon: 'success', text: res.message });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px' }}>
        <Paper
          sx={{
            backgroundColor: 'transparent',
            padding: '1rem 2rem'
          }}
          variant="outlined"
        >
          <Grid container>
            <Grid item xs={12} md={6} sx={{ padding: '.1rem' }}>
              <TextField
                type="text"
                label="Name"
                id="outlined-start-adornment"
                size="small"
                {...register('name', { required: true })}
                color={errors['name'] ? 'error' : 'primary'}
                sx={{ marginTop: '.6rem' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '.1rem' }}>
              <TextField
                type="text"
                label="Email"
                id="outlined-start-adornment"
                size="small"
                {...register('email', { required: true })}
                color={errors['email'] ? 'error' : 'primary'}
                sx={{ marginTop: '.6rem' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '.1rem' }}>
              <TextField
                type="password"
                label="Password"
                id="outlined-start-adornment"
                size="small"
                {...register('password', { required: true })}
                color={errors['password'] ? 'error' : 'primary'}
                sx={{ marginTop: '.6rem' }}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ padding: '.1rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Select
                  labelId="role"
                  id="role"
                  label="Role"
                  {...register('role')}
                  color={errors['role'] ? 'error' : 'primary'}
                >
                  <MenuItem value="">Select Admin Role*</MenuItem>
                  {Object.keys(adminRoles).map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} sx={{ padding: '.1rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="departmentId">Department</InputLabel>
                <Select
                  labelId="departmentId"
                  id="departmentId"
                  label="Department"
                  {...register('departmentId')}
                  color={errors['departmentId'] ? 'error' : 'primary'}
                >
                  <MenuItem value="">Select Department*</MenuItem>
                  {departments?.data.map((item: TDepartment) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '.1rem' }}>
              <FormControl
                size="small"
                fullWidth
                variant="outlined"
                sx={{ marginTop: '.6rem' }}
                color={errors['hallId'] ? 'error' : 'primary'}
              >
                <InputLabel htmlFor="hallId">Hall</InputLabel>
                <Select
                  labelId="Hall"
                  id="hallId"
                  label="Hall"
                  {...register('hallId')}
                  color={errors['hallId'] ? 'error' : 'primary'}
                >
                  <MenuItem value="">Select Hall*</MenuItem>
                  {halls?.data.map((item: THall) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box display="flex" justifyContent="center" paddingTop="1rem">
            <Button variant="contained" type="submit">
              Create Admin
            </Button>
          </Box>
        </Paper>
      </form>
    </Box>
  );
};
