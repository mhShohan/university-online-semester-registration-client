import { Box, Button, Chip, Container, Divider, Grid, Typography } from '@mui/material';
import logo from '../assets/bsmrstu.svg';

const WelcomePage = () => {
  return (
    <Container sx={{ height: '100vh' }}>
      <Grid container>
        <Grid item xs={8}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}
          >
            <img src={logo} alt="BSMRSTU LOGO" width={200} />
            <Typography variant="h4">Academic Semester Registration</Typography>
            <Typography variant="h6">
              Bangabandhu Sheikh Mujibur Rahman Science and Technology University
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100vh'
            }}
          >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  margin: '.8rem 0'
                }}
              >
                Login as Student
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  margin: '.8rem 0'
                }}
              >
                Create Student Account
              </Button>
              <Divider>
                <Chip label="OR" />
              </Divider>
              <Button
                variant="contained"
                sx={{
                  width: '100%',
                  margin: '.8rem 0'
                }}
              >
                Login as Admin
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomePage;
