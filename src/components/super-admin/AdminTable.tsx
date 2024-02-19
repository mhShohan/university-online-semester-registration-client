import { useState } from 'react';

// mui
import {
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

//project import
import { useAppDispatch } from '../../store/hook';
import { setUpdateAdminModal } from '../../store/services/modalSlice';
import { IAdmin } from '../../types/admin.types';
import UpdateAdminModal from './UpdateAdminModal';

export default function AdminTable({ data, isFetching }: { data: IAdmin[]; isFetching: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleClickOpen = (data: IAdmin) => {
    dispatch(setUpdateAdminModal(data));
    setModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: '400px', width: '100%', tableLayout: 'auto' }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Hall </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching && (
              <>
                <TableSkeleton />
                <TableSkeleton />
                <TableSkeleton />
              </>
            )}
            {!isFetching &&
              data?.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.hall}</TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{
                        minWidth: '0',
                        minHeight: '0',
                        width: '30px',
                        height: '30px',
                        padding: 0
                      }}
                      onClick={() => handleClickOpen(row)}
                    >
                      <EditNoteIcon sx={{ fontSize: '2.2rem' }} />
                    </Button>
                    {/* <Button
                  sx={{
                    minWidth: '0',
                    minHeight: '0',
                    width: '30px',
                    height: '30px',
                    padding: 0
                  }}
                >
                <DeleteIcon sx={{ fontSize: '1.8rem' }} />
              </Button> */}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateAdminModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

const TableSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
    </TableRow>
  );
};
