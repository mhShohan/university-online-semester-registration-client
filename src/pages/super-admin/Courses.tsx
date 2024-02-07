import { Button } from '@mui/material';
import { useState } from 'react';
import CreateCourseModal from '../../components/super-admin/CreateCourseModal';

const Courses = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClickOpen = () => {
    setModalOpen(true);
  };

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
