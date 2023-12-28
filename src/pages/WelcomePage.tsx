import { Box, Button, Chip, Container, Divider, Grid, Typography } from '@mui/material';
import logo from '../assets/bsmrstu.svg';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Grid container>
        <Grid item xs={12} md={8}>
          <Box>
            <img src={logo} alt="BSMRSTU LOGO" width={200} />
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Academic Semester Registration
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Bangabandhu Sheikh Mujibur Rahman Science and Technology University
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Box
            sx={{
              width: '100%',
              border: '1px solid gray',
              padding: '3rem 2rem',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <Button
              onClick={() => handleNavigate('/login')}
              variant="contained"
              sx={{
                width: '100%',
                margin: '.8rem 0',
                padding: '.5rem'
              }}
            >
              Login as Student
            </Button>
            <Button
              onClick={() => handleNavigate('/register')}
              variant="contained"
              sx={{
                width: '100%',
                margin: '.8rem 0',
                padding: '.5rem'
              }}
            >
              Create Student Account
            </Button>
            <Divider>
              <Chip label="OR" />
            </Divider>
            <Button
              onClick={() => handleNavigate('/admin-login')}
              variant="contained"
              sx={{
                width: '100%',
                margin: '.8rem 0',
                padding: '.5rem'
              }}
            >
              Login as Admin
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomePage;
