import PreviewIcon from '@mui/icons-material/Preview';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { useGetRegistrationFeeFormQuery } from '../../store/features/feeForm.api';

const AdmitCardPage = () => {
  const { data, isLoading } = useGetRegistrationFeeFormQuery({
    status: 'approved_by_exam_controller'
  });

  if (isLoading) return <Loader fullPage={true} />;

  const rows =
    data?.data.map((item: any) => ({
      id: item._id,
      year: item.year,
      semester: item.semester,
      examType: item.examType,
      totalCredit: item.courses.reduce((acc: number, course: any) => acc + course.credit, 0)
    })) || [];

  return (
    <Stack>
      {data?.data?.length <= 0 ? (
        <Stack spacing={2}>
          <Typography variant="h5" textAlign="center">
            No Admit Card Prepared Yet for you...!!!
          </Typography>
          <Divider />
        </Stack>
      ) : (
        <Stack>
          <Table rows={rows} />
        </Stack>
      )}
    </Stack>
  );
};

export default AdmitCardPage;

const columns: GridColDef[] = [
  { field: 'year', headerName: 'Year', flex: 1 },
  { field: 'semester', headerName: 'Semester', flex: 1 },
  { field: 'examType', headerName: 'Exam Type', flex: 1 },
  { field: 'totalCredit', headerName: 'Total Credit', flex: 1 },
  {
    field: 'action',
    headerName: 'Action',
    flex: 0.5,
    renderCell: (p) => {
      return (
        <Link to={`/admit-cards/${p.id}`}>
          <IconButton>
            <PreviewIcon />
          </IconButton>
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
