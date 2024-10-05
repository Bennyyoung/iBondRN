import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { iBondMobileApi } from './service';
import { AuthResponse, RegisterRequest } from './services.types';
import { RootState } from '@/redux/store';

export interface InitialState {
  status:
    | 'login'
    | 'login-success'
    | 'login-error'
    | 'register'
    | 'register-success'
    | 'register-error'
    | 'idle';
  token: string | null;
  isAuthenticated: boolean;
  userData: Omit<AuthResponse['data'], 'status' | 'message'> | null;
  registrationData: Partial<RegisterRequest>;
}

const initState: InitialState = {
  isAuthenticated: false,
  status: 'idle',
  token: null,
  userData: null,
  registrationData: {},
};

export const userSlice = createSlice({
  name: 'userAuth',
  initialState: initState,

  reducers: {
    // Actions for handling registration data collection
    updateRegistrationData: (
      state,
      action: PayloadAction<Partial<RegisterRequest>>,
    ) => {
      console.log(action.payload, 'payload', state.registrationData);
      state.registrationData = {
        ...state.registrationData,
        ...action.payload,
      };
    },
    clearRegistrationData: state => {
      state.registrationData = {};
    },
    logout: state => {
      state.isAuthenticated = false;
      state.userData = null;
      state.token = null;
      state.status = 'idle';
      state.registrationData = {};
    },
    setUserData: (state, { payload }) => {
      state.userData = payload;
      state.isAuthenticated = true;
      state.status = 'login-success';
      state.token = payload.token;
    },
  },

  extraReducers: builder => {
    // Handle login process
    builder.addMatcher(iBondMobileApi.endpoints.login.matchPending, state => {
      state.status = 'login';
    });

    builder.addMatcher(
      iBondMobileApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const userData = payload.data;
        if (userData.token) {
          state.status = 'login-success';
          state.isAuthenticated = true;
          state.userData = userData;
          state.token = userData.token;
        } else {
          state.status = 'login-error';
          state.isAuthenticated = false;
        }
      },
    );

    builder.addMatcher(iBondMobileApi.endpoints.login.matchRejected, state => {
      state.status = 'login-error';
      state.isAuthenticated = false;
    });

    // Handle registration process
    builder.addMatcher(
      iBondMobileApi.endpoints.register.matchPending,
      state => {
        state.status = 'register';
      },
    );

    builder.addMatcher(
      iBondMobileApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        const userData = payload.data;
        state.status = 'register-success';
        state.isAuthenticated = true;
        state.userData = userData;
        state.token = userData.token;
      },
    );

    builder.addMatcher(
      iBondMobileApi.endpoints.register.matchRejected,
      state => {
        state.status = 'register-error';
        state.isAuthenticated = false;
      },
    );
  },
});

export const {
  logout,
  setUserData,
  updateRegistrationData,
  clearRegistrationData,
} = userSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectRegistrationData = (state: RootState) =>
  state.user.registrationData;
export const selectUserData = (state: RootState) => state.user.userData;

export default userSlice.reducer;
