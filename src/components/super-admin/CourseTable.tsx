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

import { userRole } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { getCurrentUserRole } from '../../store/services/authSlice';
import { setUpdateCourseModal } from '../../store/services/modalSlice';
import { ICourse } from '../../types';
import UpdateCourseModal from './UpdateCourseModal';

interface CourseTableProps {
  data: ICourse[];
  isFetching: boolean;
}

export default function CourseTable({ data, isFetching }: CourseTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const role = useAppSelector(getCurrentUserRole);
  const dispatch = useAppDispatch();

  const handleClickOpen = (row: ICourse) => {
    dispatch(setUpdateCourseModal(row));
    setModalOpen(true);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Table
          sx={{ minWidth: 400, width: '100%', tableLayout: 'auto' }}
          size="medium"
          aria-label="Courses table"
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.dark' }}>
              <TableCell sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Course Title
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Course Code
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Credit
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Department
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Year
              </TableCell>
              <TableCell align="center" sx={{ color: 'primary.contrastText', fontWeight: 700 }}>
                Semester
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
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">{row.credit}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.year}</TableCell>
                  <TableCell align="center">{row.semester}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit course">
                      <span>
                        <IconButton
                          size="small"
                          onClick={() => handleClickOpen(row)}
                          disabled={role !== userRole.DEPARTMENT_OPERATOR}
                          aria-label={`Edit ${row.title}`}
                        >
                          <EditNoteIcon fontSize="medium" />
                        </IconButton>
                      </span>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <UpdateCourseModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}

const TableSkeleton = () => (
  <TableRow>
    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
      <TableCell key={i}>
        <Skeleton variant="text" width="80%" />
      </TableCell>
    ))}
  </TableRow>
);
