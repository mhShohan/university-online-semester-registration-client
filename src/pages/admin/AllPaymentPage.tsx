import { Box, Paper, Stack } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

import { EmptyState, PageSection } from '../../components/ui';
import Loader from '../../components/Loader';
import { useGetAllApplicationPaymentQuery } from '../../store/features/student/student.api';

const AllPaymentPage = () => {
  const { data, isLoading } = useGetAllApplicationPaymentQuery(undefined);

  if (isLoading) return <Loader fullPage />;

  const payments =
    data?.data?.map((form: any) => ({
      id: form._id,
      studentId: form.studentId.studentId,
      studentName: form.studentId.name,
      department: form.departmentId.name,
      amount: form.amount + ' BDT'
    })) ?? [];

  return (
    <PageSection title="Application Payments">
      <Stack mt={2}>
        {payments.length === 0 ? (
          <EmptyState message="No payments found" />
        ) : (
          <Paper sx={{ overflow: 'hidden' }}>
            <Table rows={payments} />
          </Paper>
        )}
      </Stack>
    </PageSection>
  );
};

export default AllPaymentPage;

const columns: GridColDef[] = [
  { field: 'studentId', headerName: 'Student ID', flex: 1 },
  { field: 'studentName', headerName: 'Student Name', flex: 1 },
  { field: 'department', headerName: 'Department Name', flex: 2 },
  { field: 'amount', headerName: 'Amount total', flex: 0.5 }
];

function Table({ rows }: { rows: GridRowsProp[] }) {
  return (
    <Box sx={{ width: '100%', minHeight: 400 }}>
      <DataGrid rows={rows} columns={columns} rowSelection={false} hideFooter />
    </Box>
  );
}
