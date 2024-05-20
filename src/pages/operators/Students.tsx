// mui
import { Box } from '@mui/material';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// project import
import Loader from '../../components/Loader';
import { useGetAllStudentsQuery } from '../../store/features/operator/operator.api';

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
  { field: 'phone', headerName: 'Contact No.', flex: 1 }
];

function Table({ rows }: { rows: GridRowsProp[] }) {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
}
