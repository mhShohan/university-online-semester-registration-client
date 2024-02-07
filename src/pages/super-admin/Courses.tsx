import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import CreateCourseModal from '../../components/super-admin/CreateCourseModal';
import { useGetAllDepartmentsQuery } from '../../store/features/departmentApi';
import { useGetAllFacultiesQuery } from '../../store/features/facultyApi';
import { useAppDispatch } from '../../store/hook';
import { setDepartments, setFaculties } from '../../store/services/pavilionSlice';

const Courses = () => {
  const { data: departments, isLoading: departmentLoading } = useGetAllDepartmentsQuery(undefined);
  const { data: faculties, isLoading: facultyLoading } = useGetAllFacultiesQuery(undefined);
  const dispatch = useAppDispatch();

  const [modalOpen, setModalOpen] = useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(setDepartments(departments?.data));
    dispatch(setFaculties(faculties?.data));
  }, [departmentLoading, departments?.data, dispatch, faculties?.data, facultyLoading]);

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Create Course
      </Button>
      <CreateCourseModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default Courses;
