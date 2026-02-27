import { useParams } from 'react-router-dom';
import {
  useBorrowedBackMutation,
  useGetSingleBooksQuery,
  useProvideBookToStudentMutation
} from '../../store/features/operator/library.api';
import Loader from '../../components/Loader';
import { Box, Button, Chip, Divider, Modal, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import toastMessage from '../../lib/toastMessage';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const BookDetails = () => {
  const params = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetSingleBooksQuery(params.id);
  const [provideBook] = useProvideBookToStudentMutation();
  const [borrowedBack] = useBorrowedBackMutation();

  if (isLoading) return <Loader fullPage={true} />;

  const handleProvideBook = async (studentId: string) => {
    try {
      const res = await provideBook({ id: params.id, payload: { studentId } }).unwrap();

      if (res.success) {
        toastMessage({
          icon: 'success',
          title: 'Success',
          text: 'Book provided to student successfully'
        });
      }
    } catch (error: any) {
      toastMessage({
        icon: 'error',
        title: 'Error',
        text: error.data.message
      });
    }
  };

  const handleBack = async (studentId: string) => {
    try {
      const res = await borrowedBack({
        id: params.id,
        payload: { studentId }
      }).unwrap();

      if (res.success) {
        toastMessage({
          icon: 'success',
          title: 'Success',
          text: 'Book provided to student successfully'
        });
      }
    } catch (error: any) {
      toastMessage({
        icon: 'error',
        title: 'Error',
        text: error.data.message
      });
    }
  };

  const rows = data.data.borrowedBy.map((student: any) => {
    return {
      id: student._id,
      studentId: student.studentId,
      studentName: student.name,
      handleBack
    };
  });

  return (
    <Stack>
      <BookModal
        open={open}
        handleClose={() => setOpen(false)}
        handleProvideBook={handleProvideBook}
      />
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h5">Name: {data.data.bookName}</Typography>
          <Typography variant="body1">Author: {data.data.author}</Typography>
          <Typography variant="body1">
            Available Quantity:{' '}
            <Chip label={data.data.quantity - data.data.borrowedBy.length} color="success" />
          </Typography>
        </Box>
        <Stack>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Provide Book To student
          </Button>
        </Stack>
      </Stack>
      <Divider />
      <Stack>
        <Table rows={rows} />
      </Stack>
    </Stack>
  );
};

export default BookDetails;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: 2
};

const BookModal = ({
  open,
  handleClose,
  handleProvideBook
}: {
  open: boolean;
  handleClose: () => void;
  handleProvideBook: any;
}) => {
  const [studentId, setStudentId] = useState('');

  const onSubmit = async () => {
    handleProvideBook(studentId);
    handleClose();
    setStudentId('');
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
          <Stack justifyItems="center" alignItems="center" bgcolor="background.paper" borderRadius={2}>
            <Box p={4} boxShadow={20} width={400}>
              <Typography variant="h6" textAlign="center" pb={1}>
                Provide Book To student
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TextField
                label="Student ID"
                fullWidth
                size="small"
                sx={{ mt: 2 }}
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <Stack direction="row" gap={2} mt={4}>
                <Button variant="contained" fullWidth color="success" onClick={onSubmit}>
                  Provide
                </Button>
                <Button variant="contained" fullWidth color="warning" onClick={handleClose}>
                  Close
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

const columns: GridColDef[] = [
  { field: 'studentId', headerName: 'Student ID', flex: 1 },
  { field: 'studentName', headerName: 'Student Name', flex: 1 },
  {
    field: 'action',
    headerName: 'Action',
    flex: 0.5,
    renderCell: (payload) => {
      return (
        <Button
          variant="contained"
          size="small"
          onClick={() => payload.row.handleBack(payload.row.id)}
        >
          Borrowed back
        </Button>
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
