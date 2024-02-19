import * as React from 'react';
import { FieldValues, useForm } from 'react-hook-form';

// mui import
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

//project import
import { adminRoles } from '../../constants';
import toastMessage from '../../lib/toastMessage';
import { useUpdateAdminMutation } from '../../store/features/super-admin/adminAPi';
import { useGetAllDepartmentsQuery } from '../../store/features/super-admin/departmentApi';
import { useGetAllHallsQuery } from '../../store/features/super-admin/hallApi';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getUpdateAdminModalData, removeUpdateAdminModal } from '../../store/services/modalSlice';
import { TDepartment, THall } from '../../types';

interface CreateAdminModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateAdminModal({ modalOpen, setModalOpen }: CreateAdminModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateModalData = useAppSelector(getUpdateAdminModalData);

  const { data: departments } = useGetAllDepartmentsQuery(undefined);
  const { data: halls } = useGetAllHallsQuery(undefined);

  const [updateAdmin] = useUpdateAdminMutation();
  const dispatch = useAppDispatch();

  const { handleSubmit, register } = useForm();

  const handleClose = () => {
    dispatch(removeUpdateAdminModal());
    setModalOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const payload: FieldValues = {};

    Object.keys(data).forEach((item) => {
      if (data[item] !== '') {
        payload[item] = data[item];
      }
    });

    try {
      const res = await updateAdmin({
        id: updateModalData?._id,
        payload: payload
      }).unwrap();

      if (res.statusCode === 200) {
        handleClose();
        toastMessage({ icon: 'success', text: res.message });
      }
    } catch (error: any) {
      console.log(error);

      handleClose();
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={modalOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id="responsive-dialog-title">Update Admin Info</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <Grid container>
            <Grid item xs={12} md={6} sx={{ padding: '.1rem' }}>
              <TextField
                type="text"
                label="Name"
                id="outlined-start-adornment"
                size="small"
                defaultValue={updateModalData?.name}
                {...register('name')}
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
                inputProps={{ step: 0.01 }}
                defaultValue={updateModalData?.email}
                {...register('email')}
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
                  defaultValue={updateModalData?.role}
                >
                  {Object.keys(adminRoles).map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sx={{ padding: '.1rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="departmentId">Department</InputLabel>
                <Select
                  labelId="departmentId"
                  id="departmentId"
                  label="Department"
                  defaultValue={updateModalData?.departmentId}
                  {...register('departmentId')}
                >
                  {departments?.data.map((item: TDepartment) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{ padding: '.1rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="hallId">Hall</InputLabel>
                <Select
                  labelId="Hall"
                  id="hallId"
                  label="Hall"
                  defaultValue={updateModalData?.hallId}
                  {...register('hallId')}
                >
                  {halls?.data.map((item: THall) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ padding: '.3rem 1rem', borderRadius: '6px' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{ padding: '.3rem 1rem', borderRadius: '6px', marginRight: '1rem' }}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
