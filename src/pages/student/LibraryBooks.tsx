import { Box, Divider, Stack, Typography } from '@mui/material';
import { useGetBooksOfStudentQuery } from '../../store/features/operator/library.api';
import Loader from '../../components/Loader';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const LibraryBooks = () => {
  const { data, isLoading } = useGetBooksOfStudentQuery(undefined);

  if (isLoading) return <Loader fullPage={true} />;

  const bookList = data?.data.map((book: any) => {
    return {
      id: book._id,
      bookName: book.bookName,
      author: book.author
    };
  });

  return (
    <Stack>
      {bookList.length > 0 ? (
        <Table rows={bookList} />
      ) : (
        <Stack>
          <Divider />
          <Typography variant="h5" textAlign="center">
            You Have not borrowed any books from seminar library
          </Typography>
          <Divider />
        </Stack>
      )}
    </Stack>
  );
};

export default LibraryBooks;

const columns: GridColDef[] = [
  { field: 'bookName', headerName: 'Book Name', flex: 1 },
  { field: 'author', headerName: 'Author Name', flex: 1 }
];

function Table({ rows }: { rows: GridRowsProp[] }) {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} rowSelection={false} hideFooter={true} />
    </Box>
  );
}
