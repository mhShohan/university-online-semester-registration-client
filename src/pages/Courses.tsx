import React, { useEffect, useState } from 'react';

//mui
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select
} from '@mui/material';

// project import
import Loader from '../components/Loader';
import CourseTable from '../components/super-admin/CourseTable';
import CreateCourseModal from '../components/super-admin/CreateCourseModal';
import { useGetAllCoursesQuery } from '../store/features/courseApi';
import { useGetAllDepartmentsQuery } from '../store/features/super-admin/departmentApi';
import { useGetAllFacultiesQuery } from '../store/features/super-admin/facultyApi';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { setDepartments, setFaculties } from '../store/services/pavilionSlice';
import { getCurrentUser } from '../store/services/authSlice';
import { userRole } from '../constants';

const initState = { limit: 10, page: 1, department: '', year: '', semester: '' };

const Courses = () => {
  const [query, setQuery] = useState(initState);
  const [modalOpen, setModalOpen] = useState(false);
  const user = useAppSelector(getCurrentUser);

  const { data: departments, isLoading: departmentLoading } = useGetAllDepartmentsQuery(undefined);
  const { data: faculties, isLoading: facultyLoading } = useGetAllFacultiesQuery(undefined);
  const { data: courses, isLoading: coursesLoading, isFetching } = useGetAllCoursesQuery(query);
  const dispatch = useAppDispatch();

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setQuery((prev) => ({ ...prev, page: value }));
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(setDepartments(departments?.data));
    dispatch(setFaculties(faculties?.data));
  }, [departmentLoading, departments?.data, dispatch, faculties?.data, facultyLoading]);

  if (coursesLoading && departmentLoading && facultyLoading) return <Loader fullPage={true} />;

  return (
    <Box width="100%" overflow="auto">
      <Paper sx={{ padding: '1rem', backgroundColor: 'transparent' }} variant="outlined">
        <Grid container justifyContent="space-evenly" alignItems="center">
          {user?.role === userRole.DEPARTMENT_OPERATOR && (
            <Grid item xs={12} md={6} lg={3} sx={{ paddingRight: '.2rem', paddingTop: '.5rem' }}>
              <Button fullWidth variant="contained" onClick={handleClickOpen}>
                Create Course
              </Button>
            </Grid>
          )}

          {user?.role !== userRole.DEPARTMENT_OPERATOR && user?.role !== userRole.CHAIRMAN && (
            <Grid item xs={12} sm={12} md={6} lg={4} sx={{ paddingRight: '.2rem' }}>
              <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
                <InputLabel htmlFor="departmentId">Filter by Department</InputLabel>
                <Select
                  labelId="departmentId"
                  id="departmentId"
                  label="Filter by Department"
                  value={query.department}
                  onChange={(e) => setQuery((prev) => ({ ...prev, department: e.target.value }))}
                >
                  {departments?.data?.map((item: any) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} sm={12} md={6} lg={3} sx={{ paddingRight: '.2rem' }}>
            <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
              <InputLabel htmlFor="year">Filter by Year</InputLabel>
              <Select
                labelId="year"
                id="year"
                label="Filter by Year"
                value={query.year}
                onChange={(e) => setQuery((prev) => ({ ...prev, year: e.target.value }))}
              >
                <MenuItem value="1st">1st</MenuItem>
                <MenuItem value="2nd">2nd</MenuItem>
                <MenuItem value="3rd">3rd</MenuItem>
                <MenuItem value="4th">4th</MenuItem>
                <MenuItem value="5th">5th</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={3} sx={{ paddingRight: '.2rem' }}>
            <FormControl size="small" fullWidth variant="outlined" sx={{ marginTop: '.6rem' }}>
              <InputLabel htmlFor="semester">Filter by Semester</InputLabel>
              <Select
                labelId="semester"
                id="semester"
                label="Filter by Semester"
                value={query.semester}
                onChange={(e) => setQuery((prev) => ({ ...prev, semester: e.target.value }))}
              >
                <MenuItem value="1st">1st</MenuItem>
                <MenuItem value="2nd">2nd</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={2}
            sx={{ paddingRight: '.2rem', paddingTop: '.5rem' }}
          >
            <Button variant="contained" fullWidth onClick={() => setQuery(initState)}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <br />
      <CreateCourseModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <CourseTable data={courses?.data} isFetching={isFetching} />
      <Box sx={{ padding: '1rem' }} display="flex" justifyContent="center">
        <Pagination
          count={courses?.meta?.totalPage}
          variant="outlined"
          page={query.page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
};

export default Courses;
