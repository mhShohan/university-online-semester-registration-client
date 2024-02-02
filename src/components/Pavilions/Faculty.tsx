import { Box, Button, TextField, useTheme } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import AllFaculties from './AllFaculties';

const Faculty = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const theme = useTheme();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
          label="Faculty Name"
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
          Add New Faculty
        </Button>
      </form>
      <AllFaculties />
    </Box>
  );
};

export default Faculty;
