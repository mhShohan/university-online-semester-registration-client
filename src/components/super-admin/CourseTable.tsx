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
import { ICourse } from '../../types';
import UpdateCourseModal from './UpdateCourseModal';
import { useAppDispatch } from '../../store/hook';
import { setUpdateCourseModal } from '../../store/services/modalSlice';

export default function CourseTable({
  data,
  isFetching
}: {
  data: ICourse[];
  isFetching: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleClickOpen = (data: ICourse) => {
    dispatch(setUpdateCourseModal(data));

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
              <TableCell>Course Title</TableCell>
              <TableCell align="center">Course Code</TableCell>
              <TableCell align="center">Credit</TableCell>
              <TableCell align="center">Department</TableCell>
              <TableCell align="center">Year </TableCell>
              <TableCell align="center">Semester</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                    {row.title}
                  </TableCell>
                  <TableCell align="center">{row.code}</TableCell>
                  <TableCell align="center">{row.credit}</TableCell>
                  <TableCell align="center">{row.department}</TableCell>
                  <TableCell align="center">{row.year}</TableCell>
                  <TableCell align="center">{row.semester}</TableCell>
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
      <UpdateCourseModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
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
