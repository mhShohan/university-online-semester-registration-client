import { Divider, Stack, Typography } from '@mui/material';

const AdmitCardPage = () => {
  return (
    <Stack>
      <Stack spacing={2}>
        <Typography variant="h5" textAlign="center">
          No Admit Card Prepared Yet for you...!!!
        </Typography>
        <Divider />
      </Stack>
    </Stack>
  );
};

export default AdmitCardPage;
