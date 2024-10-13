import { Box, Button, Divider, IconButton, Modal, Stack, Typography } from '@mui/material';
import { useAddBookMutation, useGetAllBooksQuery } from '../store/features/operator/operator.api';
import Loader from '../components/Loader';
import { useState } from 'react';
import CustomHookForm from '../components/forms/CustomHookForm';
import CustomHookInput from '../components/forms/CustomHookInput';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { FieldValues } from 'react-hook-form';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PreviewIcon from '@mui/icons-material/Preview';

const Library = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetAllBooksQuery(undefined);

  if (isLoading) return <Loader fullPage={true} />;

  const bookList = data?.data.map((book: any) => {
    return {
      id: book._id,
      bookName: book.bookName,
      author: book.author,
      quantity: book.quantity
    };
  });

  return (
    <Stack my={2}>
      <AddBookModal open={open} handleClose={() => setOpen(false)} />
      <Stack direction="row" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Book
        </Button>
      </Stack>
      <Stack mt={2}>
        <Table rows={bookList} />
      </Stack>
    </Stack>
  );
};

export default Library;

const columns: GridColDef[] = [
  { field: 'bookName', headerName: 'Book Name', flex: 1 },
  { field: 'author', headerName: 'Author Name', flex: 1 },
  { field: 'quantity', headerName: 'Quantity', flex: 1 },
  {
    field: 'action',
    headerName: 'Action',
    flex: 0.5,
    renderCell: (p) => {
      return (
        <>
          <Link to={`/books/${p.id}`}>
            <IconButton>
              <PreviewIcon />
            </IconButton>
          </Link>
          <IconButton>
            <EditNoteIcon />
          </IconButton>
        </>
      );
    }
  }
];

function Table({ rows }: { rows: GridRowsProp[] }) {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} rowSelection={false} hideFooter={true} />
    </Box>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 2
};

const defaultValues = {
  bookName: '',
  author: '',
  quantity: ''
};

const validator = z.object({
  bookName: z.string().min(1, 'Book name is required'),
  author: z.string().min(1, 'Author name is required'),
  quantity: z.string().min(1, 'Quantity is required')
});

const AddBookModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  const [addBook] = useAddBookMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Adding book...');
    try {
      const res = await addBook(data).unwrap();

      console.log(res);

      if (res.success) {
        toast.success('Book added successfully', { id: toastId });
        handleClose();

        return true;
      } else {
        toast.error('Failed to add book', { id: toastId });
      }
    } catch (error) {
      toast.error('Failed to add book', { id: toastId });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CustomHookForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(validator)}
          >
            <Stack justifyItems="center" alignItems="center" bgcolor="#fff" borderRadius={2}>
              <Box p={4} boxShadow={20} width={400}>
                <Typography variant="h6" textAlign="center" pb={1}>
                  Add New Book to library
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Stack gap={1}>
                  <CustomHookInput name="bookName" label="Book Name" />
                  <CustomHookInput name="author" label="Author name" />
                  <CustomHookInput name="quantity" label="Quantity" type="number" />
                </Stack>

                <Stack direction="row" gap={2} mt={4}>
                  <Button variant="contained" fullWidth color="success" type="submit">
                    Add
                  </Button>
                  <Button variant="contained" fullWidth color="warning" onClick={handleClose}>
                    Close
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </CustomHookForm>
        </Box>
      </Modal>
    </div>
  );
};
