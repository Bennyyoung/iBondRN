import { createSlice } from '@reduxjs/toolkit';

import { iBondMobileApi } from './service';
import { AuthResponse } from './services.types';
import { RootState } from '@/redux/store';

export interface LoginInitialState {
  status: 'login' | 'login-success' | 'login-error' | 'idle';
  token: AuthResponse['token'] | null;
  isAuthenticated: boolean;
  username: string;
  email: string;
  job: string;
}

const initState: LoginInitialState = {
  email: '',
  isAuthenticated: false,
  job: '',
  status: 'idle',
  token: null,
  username: '',
};

export const userSlice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(iBondMobileApi.endpoints.login.matchPending, state => {
      state.status = 'login';
    });
    builder.addMatcher(
      iBondMobileApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const { token } = payload;
        if (token === null || token === undefined) {
          state.status = 'login-error';
          state.isAuthenticated = false;
          state.token = null;
          return;
        }
        state.status = 'login-success';
        state.isAuthenticated = true;
        state.token = token;
      },
    );
    builder.addMatcher(iBondMobileApi.endpoints.login.matchRejected, state => {
      state.status = 'login-error';
      state.isAuthenticated = false;
    });
  },
  initialState: initState,
  name: 'userAuth',

  reducers: {
    login: state => {
      state.status = 'login';
    },
    loginError: state => {
      state.status = 'login-error';
      state.isAuthenticated = false;
    },
    loginSuccess: state => {
      state.status = 'login-success';
      state.isAuthenticated = true;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.email = '';
      state.job = '';
      state.status = 'idle';
    },
    setUserData: (state, { payload }) => {
      const { email, username, job } = payload;
      if (username) {
        state.username = username;
      }
      if (email) {
        state.email = email;
      }
      if (job) {
        state.job = job;
      }
    },
  },
});

export const { logout, login, loginSuccess, loginError, setUserData } =
  userSlice.actions;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export default userSlice.reducer;
