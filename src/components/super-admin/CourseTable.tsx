// mui
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

//project import
import { ICourse } from '../../types';
import { Button } from '@mui/material';

export default function CourseTable({ data }: { data: ICourse[] }) {
  return (
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
          {data?.map((row) => (
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
  );
}
