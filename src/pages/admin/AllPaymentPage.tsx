import { Box, Divider, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Loader from '../../components/Loader';
import { useGetAllApplicationPaymentQuery } from '../../store/features/student/student.api';

const AllPaymentPage = () => {
  const { data, isLoading } = useGetAllApplicationPaymentQuery(undefined);

  if (isLoading) return <Loader fullPage={true} />;

  console.log(data);

  const payments =
    data?.data?.map((form: any) => {
      return {
        id: form._id,
        studentId: form.studentId.studentId,
        studentName: form.studentId.name,
        department: form.departmentId.name,
        amount: form.amount + ' BDT'
      };
    }) || [];

  return (
    <Stack>
      <Divider />
      <Typography variant="h4" textAlign="center">
        Application Payments
      </Typography>
      <Divider />
      <Stack mt={4}>
        {payments.length <= 0 ? (
          <Typography variant="h6" textAlign="center">
            No Payment Found
          </Typography>
        ) : (
          <Table rows={payments}></Table>
        )}
      </Stack>
    </Stack>
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
    <Box sx={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} rowSelection={false} hideFooter={true} />
    </Box>
  );
}
