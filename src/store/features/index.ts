import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

// import all slice or reducer & Combine all reducer here
const rootReducer = combineReducers({
  user: userReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
