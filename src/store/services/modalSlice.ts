import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICourse } from "../../types";
import { RootState } from "../store";

interface InitialState {
  updateCourseModal: null | ICourse
}

const initialState: InitialState = {
  updateCourseModal: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setUpdateCourseModal: (state, actions: PayloadAction<ICourse>) => {
      state.updateCourseModal = actions.payload
    },
    removeUpdateCourseModal: (state) => {
      state.updateCourseModal = null
    },
  }
})

export const { setUpdateCourseModal, removeUpdateCourseModal } = modalSlice.actions
export default modalSlice.reducer

export const getUpdateCourseModalData = (state: RootState) => state.modal.updateCourseModal
