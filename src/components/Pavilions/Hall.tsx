import { FieldValues, useForm } from 'react-hook-form';

// mui
import { Box, Button, TextField, useTheme } from '@mui/material';

//project import
import AllHalls from './AllHalls';
import { useAddNewHallMutation } from '../../store/features/super-admin/hallApi';
import toastMessage from '../../lib/toastMessage';

const Hall = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const theme = useTheme();
  const [addHall] = useAddNewHallMutation();

  /**
   * Form Submission
   */
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await addHall(data).unwrap();
      if (res.statusCode === 201) {
        reset();
        toastMessage({ icon: 'success', text: res.message });
      }
    } catch (error: any) {
      toastMessage({ icon: 'error', text: error.data.message });
    }
  };

  return (
    <Box height="calc(100vh - 4rem)">
      <form
        style={{
          padding: '0 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: '8px'
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('name', { required: true })}
          color={errors['name'] ? 'error' : 'primary'}
          type="text"
          label="Hall Name"
          id="outlined-start-adornment"
          size="small"
          sx={{ marginTop: '.6rem' }}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: '10px', width: '100%', padding: '8px', borderRadius: '6px' }}
        >
          Add New Hall
        </Button>
      </form>
      <AllHalls />
    </Box>
  );
};

export default Hall;
