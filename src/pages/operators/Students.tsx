// mui
import { Box, Button } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// project import
import Loader from '../../components/Loader';
import { useGetAllStudentsQuery } from '../../store/features/operator/operator.api';
import { Link } from 'react-router-dom';

const Students = () => {
  const { data, isLoading } = useGetAllStudentsQuery(undefined);

  if (isLoading) return <Loader fullPage={true} />;

  return (
    <Box>
      <Table rows={data.data.map((student: any) => ({ ...student, id: student._id }))} />
    </Box>
  );
};

export default Students;

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Student Name', flex: 1 },
  { field: 'studentId', headerName: 'Student ID', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1 },
  { field: 'session', headerName: 'Session', flex: 1 },
  { field: 'phone', headerName: 'Contact No.', flex: 1 },
  {
    field: 'action',
    headerName: 'Action',
    flex: 1,
    renderCell: (p) => {
      return (
        <Link to={`/students/${p.id}`}>
          <Button variant="contained" size="small">
            View Details
          </Button>
        </Link>
      );
    }
  }
];

function Table({ rows }: { rows: GridRowsProp[] }) {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} rowSelection={false} />
    </Box>
  );
}
