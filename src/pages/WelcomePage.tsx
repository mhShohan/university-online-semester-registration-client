import { Box, Button, Chip, Container, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/gstu_logo.png';

const WelcomePage = () => {
  const navigate = useNavigate();

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
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ m: 4 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 200,
                height: 200,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid',
                borderColor: 'primary.main',
                margin: '0 auto',
                boxShadow: 2,
                bgcolor: 'background.paper'
              }}
            >
              <img
                src={logo}
                alt="GSTU LOGO"
                width={220}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 2 }}>
              University Online Semester Registration
            </Typography>
            <Typography variant="h6" fontWeight={700} color="text.secondary" sx={{ mt: 0.5 }}>
              Gopalganj Science and Technology University, Gopalganj-8100
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Paper sx={{ p: 4, width: '100%', maxWidth: 360, textAlign: 'center' }}>
            <Stack spacing={1.5}>
              <Button
                onClick={() => handleNavigate('/login')}
                variant="contained"
                fullWidth
                size="large"
              >
                Login as student
              </Button>
              <Button
                onClick={() => handleNavigate('/register')}
                variant="contained"
                fullWidth
                size="large"
              >
                Register new account
              </Button>
              <Divider sx={{ py: 1 }}>
                <Chip label="OR" size="small" />
              </Divider>
              <Button
                onClick={() => handleNavigate('/admin-login')}
                variant="outlined"
                fullWidth
                size="large"
              >
                Login as admin
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WelcomePage;
