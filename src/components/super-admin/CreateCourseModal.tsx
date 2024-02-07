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
import { useAppSelector } from '../../store/hook';

//project import
import { getDepartments, getFaculties } from '../../store/services/pavilionSlice';
import { useAddNewCourseMutation } from '../../store/features/courseApi';
import toastMessage from '../../lib/toastMessage';

interface CreateCourseModalProps {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateCourseModal({ modalOpen, setModalOpen }: CreateCourseModalProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const departments = useAppSelector(getDepartments);
  const faculties = useAppSelector(getFaculties);
  const [addNewCourse] = useAddNewCourseMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm();

  const handleClose = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addNewCourse({ ...data, credit: Number(data.credit) }).unwrap();
      if (res.statusCode === 201) {
        reset();
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
        <DialogTitle id="responsive-dialog-title">Add New Course</DialogTitle>
        <DialogContent sx={{ minWidth: '400px' }}>
          <Grid container>
            <Grid item xs={8} sx={{ paddingRight: '.2rem' }}>
              <TextField
                type="text"
                label="Course Title"
                id="outlined-start-adornment"
                size="small"
                {...register('title', { required: true })}
                color={errors['title'] ? 'error' : 'primary'}
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
                {...register('credit', { required: true })}
                color={errors['credit'] ? 'error' : 'primary'}
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
                {...register('code', { required: true })}
                color={errors['code'] ? 'error' : 'primary'}
                sx={{ marginTop: '.6rem' }}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sx={{ paddingRight: '.2rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="semester">Semester</InputLabel>
                <Select
                  labelId="semester"
                  id="semester"
                  label="Semester"
                  {...register('semester', { required: true })}
                  color={errors['semester'] ? 'error' : 'primary'}
                >
                  <MenuItem value="1st">1st</MenuItem>
                  <MenuItem value="2nd">2nd</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ paddingLeft: '.2rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="facultyId">Faculty</InputLabel>
                <Select
                  labelId="facultyId"
                  id="facultyId"
                  label="Faculty"
                  {...register('facultyId', { required: true })}
                  color={errors['facultyId'] ? 'error' : 'primary'}
                >
                  {faculties?.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ paddingLeft: '.2rem' }}>
              <FormControl
                size="small"
                fullWidth
                variant="outlined"
                sx={{ marginTop: '.6rem' }}
                color={errors['year'] ? 'error' : 'primary'}
              >
                <InputLabel htmlFor="year">Year</InputLabel>
                <Select
                  labelId="year"
                  id="year"
                  label="Year"
                  {...register('year', { required: true })}
                  color={errors['year'] ? 'error' : 'primary'}
                >
                  <MenuItem value="1st">1st</MenuItem>
                  <MenuItem value="2nd">2nd</MenuItem>
                  <MenuItem value="3rd">3rd</MenuItem>
                  <MenuItem value="4th">4th</MenuItem>
                  <MenuItem value="5th">5th</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sx={{ paddingRight: '.2rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="departmentId">Department</InputLabel>
                <Select
                  labelId="departmentId"
                  id="departmentId"
                  label="Faculty"
                  {...register('departmentId', { required: true })}
                  color={errors['departmentId'] ? 'error' : 'primary'}
                >
                  {departments?.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
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
                  {...register('type', { required: true })}
                  color={errors['type'] ? 'error' : 'primary'}
                >
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
            Create Course
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
