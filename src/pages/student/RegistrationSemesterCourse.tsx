import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAllCoursesQuery } from '../../store/features/courseApi';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import Loader from '../../components/Loader';
import { useAppSelector } from '../../store/hook';
import { useGetRegistrationInfoQuery } from '../../store/features/operator/operator.api';
import FormFillUp, { RetakeOfImprovementForm } from '../../components/student/FormFillUp';

interface ISingleCourse {
  _id: string;
  code: string;
  title: string;
  credit: number;
}

const RegistrationSemesterCourse = () => {
  const [selectedCourse, setSelectedCourse] = useState([] as ISingleCourse[]);
  const theme = useTheme();
  const [params] = useSearchParams();
  const depId = useAppSelector((state) => state.auth.user?.departmentId);
  const [query, setQuery] = useState({
    year: '',
    department: depId || '',
    semester: '',
    examType: ''
  });
  const { data, isLoading } = useGetAllCoursesQuery(query);
  const [isGenerateFormStart, setIsGenerateFormStart] = useState(false);
  const { data: registrationInfo } = useGetRegistrationInfoQuery(undefined);

  const handleSelectCourse = (course: ISingleCourse, checked: true) => {
    if (checked) {
      setSelectedCourse((prev) => [...prev, course]);
    } else {
      setSelectedCourse(selectedCourse.filter((c) => c._id !== course._id));
    }
  };

  const handleGenerateForm = () => {
    setIsGenerateFormStart(true);
  };

  useEffect(() => {
    if (query.examType === 'Regular') {
      setSelectedCourse(data?.data || []);
    }
  }, [isLoading]);

  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      year: params.get('year') || '',
      semester: params.get('semester') || '',
      examType: params.get('examType') || ''
    }));
  }, [params]);

  if (isLoading) return <Loader fullPage={false} />;

  return (
    <>
      <Container maxWidth="lg">
        <Stack>
          <Typography variant="h4" textAlign="center">
            {query.year} Year, {query.semester} Semester Courses for {query.examType} Exam!
          </Typography>
          <Divider />
          <Container maxWidth="md" sx={{ mt: 2 }}>
            <Stack
              sx={{
                padding: '2rem 3rem',
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '8px'
              }}
            >
              <Grid container textAlign="center">
                <Grid item md={2}>
                  Select
                </Grid>
                <Grid item md={3}>
                  Course Code
                </Grid>
                <Grid item md={5}>
                  Course Name
                </Grid>
                <Grid item md={2}>
                  Credit
                </Grid>
              </Grid>
              <Divider />
              {query.examType === 'Regular' && (
                <>
                  {data?.data?.map((course: ISingleCourse) => (
                    <SingleCourse key={course._id} course={course} checked={true} />
                  ))}
                </>
              )}
              {query.examType !== 'Regular' && (
                <>
                  {data?.data?.map((course: ISingleCourse) => (
                    <SingleCourseForRetake
                      key={course._id}
                      course={course}
                      handleSelectCourse={handleSelectCourse}
                    />
                  ))}
                </>
              )}
              <Button variant="contained" sx={{ mt: 2 }} onClick={handleGenerateForm}>
                Generate Form
              </Button>
            </Stack>
          </Container>
        </Stack>
      </Container>

      {isGenerateFormStart && (
        <Container maxWidth="lg">
          <Stack mt={2}>
            <Typography variant="h4" textAlign="center" sx={{ mt: 2 }}>
              Fill Up the forms
            </Typography>
            <Divider />

            {/* Registration  From*/}
            {query.examType === 'Regular' ? (
              <FormFillUp
                registrationInfo={registrationInfo?.data}
                examType={query.examType}
                semesterInfo={{
                  year: query.year,
                  semester: query.semester,
                  courses: selectedCourse
                }}
              />
            ) : (
              <RetakeOfImprovementForm
                registrationInfo={registrationInfo?.data}
                examType={query.examType}
                semesterInfo={{
                  year: query.year,
                  semester: query.semester,
                  courses: selectedCourse
                }}
              />
            )}
          </Stack>
        </Container>
      )}
    </>
  );
};

export default RegistrationSemesterCourse;

const SingleCourse = ({ course, checked }: { course: ISingleCourse; checked?: boolean }) => {
  return (
    <>
      <Grid container textAlign="center" alignItems="center">
        <Grid item md={2}>
          <Checkbox checked={checked} />
        </Grid>
        <Grid item md={3}>
          {course.code}
        </Grid>
        <Grid item md={5}>
          {course.title}
        </Grid>
        <Grid item md={2}>
          {course.credit}
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

const SingleCourseForRetake = ({
  course,
  handleSelectCourse
}: {
  course: ISingleCourse;
  handleSelectCourse: any;
}) => {
  return (
    <>
      <Grid container textAlign="center" alignItems="center">
        <Grid item md={2}>
          <Checkbox
            defaultChecked={false}
            onChange={(e) => handleSelectCourse(course, Boolean(e.target.checked))}
          />
        </Grid>
        <Grid item md={3}>
          {course.code}
        </Grid>
        <Grid item md={5}>
          {course.title}
        </Grid>
        <Grid item md={2}>
          {course.credit}
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};
