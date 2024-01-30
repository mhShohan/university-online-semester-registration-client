import { Grid } from '@mui/material';

import Department from '../../components/Pavilions/Department';
import FacultyComponent from '../../components/Pavilions/Faculty';
import Hall from '../../components/Pavilions/Hall';

const Faculty = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <FacultyComponent />
      </Grid>
      <Grid item xs={12} md={4}>
        <Department />
      </Grid>
      <Grid item xs={12} md={4}>
        <Hall />
      </Grid>
    </Grid>
  );
};

export default Faculty;
