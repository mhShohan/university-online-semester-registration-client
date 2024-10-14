import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import Loader from '../../components/Loader';
import { useGetAllHallPaymentsQuery } from '../../store/features/feeForm.api';
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

const HallPaymentPage = () => {
  const { data, isLoading } = useGetAllHallPaymentsQuery(undefined);

  if (isLoading) return <Loader fullPage={true} />;

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleString('default', { month: 'short' }) + ', ' + newDate.getFullYear();
  };

  const payments = data?.data?.map((form: any) => {
    return {
      id: form._id,
      studentId: form.studentId.studentId,
      studentName: form.studentId.name,
      amount: form.residentialFeeId.totalResidentFee,
      duration: `${formatDate(form.residentialFeeId.from)} - ${formatDate(
        form.residentialFeeId.to
      )}`
    };
  });

  return (
    <Stack>
      <Divider />
      <Typography variant="h4" textAlign="center">
        Hall Payments
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

export default HallPaymentPage;

const columns: GridColDef[] = [
  { field: 'studentId', headerName: 'Student ID', flex: 1 },
  { field: 'studentName', headerName: 'Student Name', flex: 1 },
  { field: 'duration', headerName: 'Duration', flex: 1 },
  { field: 'amount', headerName: 'Amount', flex: 0.5 },
  {
    field: 'action',
    headerName: 'Action',
    flex: 0.5,
    renderCell: (p) => {
      return (
        <Link to={`/application/${p.id}`}>
          <Button variant="contained" size="small">
            Details
          </Button>
        </Link>
      );
    }
  }
];

function Table({ rows }: { rows: GridRowsProp[] }) {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} rowSelection={false} hideFooter={true} />
    </Box>
  );
}
