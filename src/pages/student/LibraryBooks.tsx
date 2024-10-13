import { Divider, Stack, Typography } from '@mui/material';

const LibraryBooks = () => {
  return (
    <Stack>
      <Divider />
      <Typography variant="h5" textAlign="center">
        You Have not borrowed any books from seminar library
      </Typography>
      <Divider />
    </Stack>
  );
};

export default LibraryBooks;
