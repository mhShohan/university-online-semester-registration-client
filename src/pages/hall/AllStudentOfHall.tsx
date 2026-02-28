import { Box, Button, Paper } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';

import { EmptyState, PageSection } from '../../components/ui';
import Loader from '../../components/Loader';
import { useGetAllStudentsQuery } from '../../store/features/operator/operator.api';

const AllStudentOfHall = () => {
  const { data, isLoading } = useGetAllStudentsQuery(undefined);

  if (isLoading) return <Loader fullPage />;

  const rows = data?.data?.map((student: any) => ({ ...student, id: student._id })) ?? [];

  return (
    <PageSection title="Students">
      {rows.length === 0 ? (
        <EmptyState message="No students found" />
      ) : (
        <Paper sx={{ overflow: 'hidden' }}>
          <Table rows={rows} />
        </Paper>
      )}
    </PageSection>
  );
};

export default AllStudentOfHall;

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
    <Box sx={{ width: '100%', minHeight: 400 }}>
      <DataGrid rows={rows} columns={columns} rowSelection={false} />
    </Box>
  );
}
