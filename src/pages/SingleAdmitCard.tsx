import { useParams } from 'react-router-dom';
import { useGetSingleRegistrationFeeFormQuery } from '../store/features/feeForm.api';
import Loader from '../components/Loader';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import logo from '../assets/bsmrstu-logo.png';
import examControllerSign from '../assets/exam.jpg';

const hall: { [key: string]: string } = {
  '6594fde21d9dd44c9719ca18': 'Sheikh Rasel Hall',
  '65d244d9bf0704f466743888': 'Bijoy Dibos Hall',
  '6700c88639dad6768526c7f5': 'Swadhinata Dibosh Hall',
  '67012bed4f3a6056b3f5085c': 'Bangamata Sheikh Fazilatunnesa Mujib Hall',
  '67012c074f3a6056b3f50862': 'Sheikh Rehana Hall'
};

const SingleAdmitCard = () => {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleRegistrationFeeFormQuery(params.id);

  if (isLoading) return <Loader fullPage />;

  return (
    <Stack>
      <Stack margin="auto">
        {/* Front Side */}
        <Stack px={6} py={4} bgcolor="background.paper" borderRadius={2} maxWidth={1200}>
          <Stack direction="row" gap={4} alignItems="center">
            <Box width={100} height={100}>
              <img src={logo} alt="logo" style={{ width: '100%', height: '100%' }} />
            </Box>
            <Typography variant="h5" textAlign="left" fontSize={24} fontWeight={700}>
              Bangabandhu Sheikh Mujibur Rahman Science and Technology University,
              <br />
              Gopalganj-8100
            </Typography>
          </Stack>
          <Stack mt={1}>
            <Divider />
            <Typography variant="h6" fontWeight={700} textAlign="center">
              Admit Card
            </Typography>
            <Divider />
          </Stack>
          <Stack direction="row" gap={6} mt={2}>
            <Stack flex={7} gap={1}>
              <Stack direction="row" justifyContent="space-between">
                <BoxItem title="Year" value={data?.data.year} />
                <BoxItem title="Semester" value={data?.data.semester} />
                <Typography textAlign="center" fontSize={18}>
                  BSc. Engineering Exam 2024
                </Typography>
              </Stack>
              <BoxItem title="Student Name" value={data?.data.studentId.name} />
              <BoxItem title="Department" value={data?.data.departmentId.name} />
              <BoxItem title="Student ID" value={data?.data.studentId.studentId} />
              <BoxItem title="Session" value={data?.data.studentId.session} />
              <BoxItem title="Hall Name" value={hall[data?.data.studentId.hallId as string]} />
              <BoxItem title="Exam Center" value="Academic Building" />
            </Stack>
            <Box width={200} flex={2} border="1px solid gray" p={2}>
              <img
                src={data?.data.studentId.avatar}
                alt="logo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mt={4}>
            <Stack alignItems="center">
              <Box width={250} height={60} bgcolor="primary.light" borderRadius={2}></Box>
              <Typography fontSize={12} fontWeight={700}>
                Candidate Signature & Date
              </Typography>
            </Stack>
            <Stack alignItems="center">
              <Box width={150}>
                <img src={examControllerSign} alt="sign" style={{ width: '100%' }} />
              </Box>
              <Typography fontSize={12} fontWeight={700} mt={-2}>
                Exam Controller
              </Typography>
              <Typography fontSize={12} fontWeight={500}>
                Bangabandhu Sheikh Mujibur Rahman Science and Technology University
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Back Side */}
        <Stack px={6} py={4} bgcolor="background.paper" borderRadius={2} maxWidth={1200} minHeight={500} mt={4}>
          <Divider />
          <Typography variant="h6" fontWeight={700} textAlign="center">
            Courses
          </Typography>
          <Divider />
          <Stack>
            <Stack
              direction="row"
              gap={2}
              justifyContent="space-between"
              borderBottom="1px solid gray"
              borderTop="1px solid gray"
              mt={2}
              py={0.5}
            >
              <Typography textAlign="left" flex={1} fontSize={16} fontWeight={700} pl={2}>
                Index
              </Typography>
              <Typography textAlign="center" flex={2} fontSize={16} fontWeight={700}>
                Course Code
              </Typography>
              <Typography textAlign="center" flex={6} fontSize={16} fontWeight={700}>
                Course Title
              </Typography>
              <Typography textAlign="right" flex={1} fontSize={16} fontWeight={700} pr={2}>
                Credit
              </Typography>
            </Stack>
            {data?.data.courses.map((course: any, index: number) => (
              <Stack
                key={course._id}
                direction="row"
                gap={2}
                justifyContent="space-between"
                borderBottom="1px solid gray"
                py={0.5}
              >
                <Typography textAlign="left" flex={1} fontSize={16} fontWeight={500} pl={2}>
                  {index + 1}
                </Typography>
                <Typography textAlign="center" flex={2} fontSize={16} fontWeight={500}>
                  {course.code}
                </Typography>
                <Typography textAlign="center" flex={6} fontSize={16} fontWeight={500}>
                  {course.title}
                </Typography>
                <Typography textAlign="right" flex={1} fontSize={16} fontWeight={500} pr={2}>
                  {course.credit.toFixed(2)}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <Stack mt={2} direction="row" gap={1} justifyContent="center">
            <Typography color="error" fontWeight={700}>
              NB:
            </Typography>
            <Typography color="error">
              Student must bring this admit card to exam hall and should obey all the exam hall
              rules properly.
            </Typography>
          </Stack>
        </Stack>

        <Box mt={2}>
          <Button variant="contained">Download Admit Card</Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default SingleAdmitCard;

const BoxItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <Stack direction="row" gap={1}>
      <Typography textAlign="left" flex={1} flexWrap="nowrap" fontSize={18} fontWeight={700}>
        {title}:
      </Typography>
      <Typography textAlign="left" flex={3} fontSize={18} bgcolor="primary.light" px={2} borderRadius={1}>
        {value}
      </Typography>
    </Stack>
  );
};
