import { useState } from 'react';

import EditNoteIcon from '@mui/icons-material/EditNote';
import {
  IconButton,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from '@mui/material';

import { useAppDispatch } from '../../store/hook';
import { setUpdateAdminModal } from '../../store/services/modalSlice';
import { IAdmin } from '../../types/admin.types';
import UpdateAdminModal from './UpdateAdminModal';

export default function AdminTable({ data, isFetching }: { data: IAdmin[]; isFetching: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleClickOpen = (row: IAdmin) => {
    dispatch(setUpdateAdminModal(row));
    setModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table
          sx={{ minWidth: 400, width: '100%', tableLayout: 'auto' }}
          size="medium"
          aria-label="Admins table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.dark' }}>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 700 }}>Name</TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Role
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Department
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Hall
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Actions
              </TableCell>
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
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.role}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.hall}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit admin">
                      <IconButton
                        size="small"
                        onClick={() => handleClickOpen(row)}
                        aria-label={`Edit ${row.name}`}
                      >
                        <EditNoteIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
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

const TableSkeleton = () => (
  <TableRow>
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <TableCell key={i}>
        <Skeleton variant="text" width="80%" />
      </TableCell>
    ))}
  </TableRow>
);
