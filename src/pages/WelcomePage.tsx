import { Box, Button, Chip, Container, Divider, Grid, Typography, useTheme } from '@mui/material';
import logo from '../assets/gstu_logo.png';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleNavigate = (link: string) => {
    navigate(link);
  };

  return (
    <Container
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Grid container>
        <Grid item xs={12} md={8}>
          <Box sx={{ margin: '3rem' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                border: `3px solid ${theme.palette.primary.main}`,
                // padding: '.4rem',
                margin: '0 auto',
                boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
                bgcolor: theme.palette.background.paper
              }}
            >
              <img
                src={logo}
                alt="GSTU LOGO"
                width={220}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              University Online Semester Registration
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '16px' }}>
              Gopalganj Science and Technology University, Gopalganj-8100
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
              border: `1px solid ${theme.palette.primary.main}`,
              padding: '3rem',
              borderRadius: '8px',
              textAlign: 'center',
              margin: '2rem 0'
            }}
          >
            <Button
              onClick={() => handleNavigate('/login')}
              variant="contained"
              sx={{
                width: '100%',
                margin: '.6rem 0',
                padding: '.6rem',
                fontSize: '.8rem'
              }}
            >
              Login as a Student
            </Button>
            <Button
              onClick={() => handleNavigate('/register')}
              variant="contained"
              sx={{
                width: '100%',
                margin: '.6rem 0',
                padding: '.6rem',
                fontSize: '.8rem'
              }}
            >
              Register new Student Account
            </Button>
            <Divider>
              <Chip label="OR" />
            </Divider>
            <Button
              onClick={() => handleNavigate('/admin-login')}
              variant="contained"
              sx={{
                width: '100%',
                margin: '.6rem 0',
                padding: '.6rem',
                fontSize: '.8rem'
              }}
            >
              Login as an Admin
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomePage;
