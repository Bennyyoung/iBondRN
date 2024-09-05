import {combineReducers} from 'redux';
import authReducer from './features/auth/authSlice';
import {authApi} from './features/rtkQuery/authApi';

const rootReducer = combineReducers({
  // Add your regular slice reducers
  [authReducer.name]: authReducer,

  // Add RTK Query reducers
  [authApi.reducerPath]: authApi.reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
