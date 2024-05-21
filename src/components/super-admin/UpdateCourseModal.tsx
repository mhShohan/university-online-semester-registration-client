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
import { useAppDispatch, useAppSelector } from '../../store/hook';

//project import
import toastMessage from '../../lib/toastMessage';
import { useUpdateCourseMutation } from '../../store/features/courseApi';
import { getUpdateCourseModalData, removeUpdateCourseModal } from '../../store/services/modalSlice';

interface CreateCourseModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateCourseModal({ modalOpen, setModalOpen }: CreateCourseModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const updateModalData = useAppSelector(getUpdateCourseModalData);
  const [updateCourse] = useUpdateCourseMutation();
  const dispatch = useAppDispatch();

  const { handleSubmit, register } = useForm();

  const handleClose = () => {
    dispatch(removeUpdateCourseModal());
    setModalOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await updateCourse({
        id: updateModalData?._id,
        payload: { ...data, credit: Number(data.credit) }
      }).unwrap();

      if (res.statusCode === 200) {
        handleClose();
        toastMessage({ icon: 'success', text: res.message });
      }
    } catch (error: any) {
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
        <DialogTitle id="responsive-dialog-title">Update Course</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <Grid container>
            <Grid item xs={8} sx={{ paddingRight: '.2rem' }}>
              <TextField
                type="text"
                label="Course Title"
                id="outlined-start-adornment"
                size="small"
                defaultValue={updateModalData?.title}
                {...register('title')}
                sx={{ marginTop: '.6rem' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4} sx={{ paddingLeft: '.2rem' }}>
              <TextField
                type="number"
                label="Course Credit"
                id="outlined-start-adornment"
                size="small"
                inputProps={{ step: 0.01 }}
                defaultValue={updateModalData?.credit}
                {...register('credit')}
                sx={{ marginTop: '.6rem' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ paddingRight: '.2rem' }}>
              <TextField
                type="text"
                label="Course Code"
                id="outlined-start-adornment"
                size="small"
                defaultValue={updateModalData?.code}
                {...register('code')}
                sx={{ marginTop: '.6rem' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ paddingLeft: '.2rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="year">Year</InputLabel>
                <Select
                  labelId="year"
                  id="year"
                  label="Year"
                  defaultValue={updateModalData?.year}
                  {...register('year')}
                >
                  <MenuItem value="1st">1st</MenuItem>
                  <MenuItem value="2nd">2nd</MenuItem>
                  <MenuItem value="3rd">3rd</MenuItem>
                  <MenuItem value="4th">4th</MenuItem>
                  <MenuItem value="5th">5th</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sx={{ paddingLeft: '.2rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="semester">Semester</InputLabel>
                <Select
                  labelId="semester"
                  id="semester"
                  label="Semester"
                  defaultValue={updateModalData?.semester}
                  {...register('semester')}
                >
                  <MenuItem value="1st">1st</MenuItem>
                  <MenuItem value="2nd">2nd</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sx={{ paddingLeft: '.2rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="type">Category</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  label="Category"
                  defaultValue={updateModalData?.type}
                  {...register('type')}
                >
                  <MenuItem value="BSc ENGINEERING">BSc ENGINEERING</MenuItem>
                  <MenuItem value="HONOURS">Honours</MenuItem>
                  <MenuItem value="MASTERS">Masters</MenuItem>
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
            sx={{ padding: '.3rem 1rem', borderRadius: '6px' }}
          >
            Update Course
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
