import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICourse } from '../../types';
import { RootState } from '../store';
import { IAdmin } from '../../types/admin.types';

interface InitialState {
  updateCourseModal: null | ICourse;
  updateAdminModal: null | IAdmin;
}

const initialState: InitialState = {
  updateCourseModal: null,
  updateAdminModal: null
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setUpdateCourseModal: (state, actions: PayloadAction<ICourse>) => {
      state.updateCourseModal = actions.payload;
    },
    removeUpdateCourseModal: (state) => {
      state.updateCourseModal = null;
    },
    setUpdateAdminModal: (state, actions: PayloadAction<IAdmin>) => {
      state.updateAdminModal = actions.payload;
    },
    removeUpdateAdminModal: (state) => {
      state.updateAdminModal = null;
    }
  }
});

export const {
  setUpdateCourseModal,
  removeUpdateCourseModal,
  setUpdateAdminModal,
  removeUpdateAdminModal
} = modalSlice.actions;

export default modalSlice.reducer;

export const getUpdateCourseModalData = (state: RootState) => state.modal.updateCourseModal;
export const getUpdateAdminModalData = (state: RootState) => state.modal.updateAdminModal;
