import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TDepartment, TFaculty, THall } from "../../types";
import { RootState } from "../store";

interface InitialState {
  faculties: null | Array<TFaculty>
  departments: null | Array<TDepartment>
  halls: null | Array<THall>
}

const initialState: InitialState = {
  faculties: null,
  departments: null,
  halls: null
}

const pavilionSlice = createSlice({
  name: 'pavilion',
  initialState,
  reducers: {
    setFaculties: (state, actions: PayloadAction<TFaculty[]>) => {
      state.faculties = actions.payload
    },
    setDepartments: (state, actions: PayloadAction<TDepartment[]>) => {
      state.departments = actions.payload
    },
    setHalls: (state, actions: PayloadAction<THall[]>) => {
      state.halls = actions.payload
    },
  }
})

export const { setFaculties, setDepartments, setHalls } = pavilionSlice.actions
export default pavilionSlice.reducer


export const getHalls = (state: RootState) => state.pavilion.halls
export const getFaculties = (state: RootState) => state.pavilion.faculties
export const getDepartments = (state: RootState) => state.pavilion.departments