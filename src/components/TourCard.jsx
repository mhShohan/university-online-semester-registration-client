import { AccessTime } from '@mui/icons-material';
import {
  Paper,
  Grid,
  Typography,
  Box,
  Rating,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { Link } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        { props: { variant: 'body2' }, style: { fontSize: 12 } },
        { props: { variant: 'body3' }, style: { fontSize: 10 } },
      ],
    },
  },
});

export default function TourCard({ tour }) {
  const { id, name, duration, rating, numberOfReviews, price, image } = tour;
  return (
    <Grid item md={3}>
      <Link to={`/${id}`}>
        <ThemeProvider theme={theme}>
          <Paper elevation={3} square>
            <img src={image} alt={name} className="img" />
            <Box paddingX={1}>
              <Typography variant="subtitle1" component="h2">
                {name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <AccessTime sx={{ width: 15 }} />
                <Typography variant="body2" component="p" marginLeft={0.5}>
                  {duration} Hours
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
                marginTop={3}
              >
                <Rating
                  name="read-only"
                  value={rating}
                  readOnly
                  precision={0.5}
                  size="small"
                />
                <Typography variant="body2" component="p" marginLeft={0.5}>
                  {rating}
                </Typography>
                <Typography variant="body3" component="p" marginLeft={1.5}>
                  ({numberOfReviews})
                </Typography>
              </Box>
              <Box paddingBottom={1}>
                <Typography variant="h5" component="h3" marginLeft={0}>
                  From ${price}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </ThemeProvider>
      </Link>
    </Grid>
  );
}
