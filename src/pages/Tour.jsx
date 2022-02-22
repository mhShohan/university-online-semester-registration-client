import {
  BottomNavigation,
  Box,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import BasicModal from '../components/BasicModal';
import ControlledAccordions from '../components/ControlledAccordions';
import QuiltedImageList from '../components/QuiltedImageList';

export default function Tour() {
  return (
    <Container>
      <Typography variant="h3" component="h1" marginTop={3}>
        Explore the world!
      </Typography>
      <Box sx={{ marginTop: '20px', display: 'flex' }}>
        <img
          src="https://media.timeout.com/images/105124791/750/422/image.jpg"
          alt="Las Vegas"
        />
        <QuiltedImageList />
      </Box>
      <Box>
        <Typography variant="h4" component="h3" marginTop={3}>
          About This tour
        </Typography>
        <Typography variant="subtitle1" component="p" marginTop={3}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          provident veritatis ad aliquid praesentium corporis odio consequuntur.
          Aspernatur commodi odit doloremque deserunt laborum aliquam, tempore,
          illum ad in adipisci ab.
        </Typography>
      </Box>
      <Box sx={{ marginBottom: '100px' }}>
        <Typography variant="h4" component="h3" marginTop={3}>
          Frequiently Asked Questions...
        </Typography>
        <Paper elevation={6} sx={{ marginTop: '10px', marginBottom: '30px' }}>
          <ControlledAccordions />
        </Paper>
      </Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BasicModal />
        </BottomNavigation>
      </Paper>
    </Container>
  );
}
