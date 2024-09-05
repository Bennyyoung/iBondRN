import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './features/auth/slices';
import { api } from './features/rtkQuery/authApi';

const rootReducer = combineReducers({
  // Add your regular slice reducers
  [authSlice.name]: authSlice,
  user: authSlice,

  // Add RTK Query reducers
  [api.reducerPath]: api.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
