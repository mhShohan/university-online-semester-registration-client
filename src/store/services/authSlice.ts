import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TAuthUser } from '../../types';
import { RootState } from '../store';

interface InitialState {
  user: null | TAuthUser
  token: null | string
}

const initialState: InitialState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedInUser: (state, action: PayloadAction<{ token: string, user: TAuthUser }>) => {
      console.log({ action });

      state.user = action.payload.user
      state.token = action.payload.token
    },
    logoutUser: (state) => {
      state.user = null
      state.token = null
    },
  }
});

export const { setLoggedInUser, logoutUser } = authSlice.actions

export default authSlice.reducer;

export const getCurrentUser = (state: RootState) => state.auth.user
export const getCurrentToken = (state: RootState) => state.auth.token
export const getCurrentUserRole = (state: RootState) => state.auth.user?.role

