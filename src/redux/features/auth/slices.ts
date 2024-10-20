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
  isNewlyRegistered: boolean;
}

const initState: InitialState = {
  isAuthenticated: false,
  status: 'idle',
  token: null,
  userData: null,
  isNewlyRegistered: true, // Remove true and initialise as false
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
    updateNewUser: (state, { payload }) => {
      state.isNewlyRegistered = payload;
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

    // Handle google signin process
    builder.addMatcher(
      iBondMobileApi.endpoints.googleSignin.matchPending,
      state => {
        state.status = 'login';
      },
    );

    builder.addMatcher(
      iBondMobileApi.endpoints.googleSignin.matchFulfilled,
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

    builder.addMatcher(
      iBondMobileApi.endpoints.googleSignin.matchRejected,
      state => {
        state.status = 'login-error';
        state.isAuthenticated = false;
      },
    );

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
  updateNewUser,
  updateRegistrationData,
  clearRegistrationData,
} = userSlice.actions;

export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectRegistrationData = (state: RootState) =>
  state.user.registrationData;
export const selectUserData = (state: RootState) => state.user.userData;

export default userSlice.reducer;
