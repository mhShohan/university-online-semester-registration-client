import { Container, Grid, Typography } from '@mui/material';
import TourCard from '../components/TourCard';
import { cities } from '../data.js';

export default function Homepage() {
  return (
    <>
      <Container sx={{ marginY: 5 }}>
        {cities.map((city) => (
          <div key={city.id}>
            <Typography
              variant="h4"
              component="h2"
              marginTop={5}
              marginBottom={3}
            >
              {city.name}
            </Typography>
            <Grid container spacing={3}>
              {city.tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </Grid>
          </div>
        ))}
      </Container>
    </>
  );
}
