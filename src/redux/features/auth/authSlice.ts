import {createSlice} from '@reduxjs/toolkit';

interface AuthUserWithTokenType {
  authUser?: any;
}

export const authState: AuthUserWithTokenType = {
  authUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    updateAuthStateAction: (state, {payload}) => {
      state.authUser =
        payload !== undefined
          ? {...state.authUser, ...payload}
          : state.authUser;
    },
    logout: (state: AuthUserWithTokenType = authState) => {
      state = state;
      return authState;
    },
  },
});

export const {updateAuthStateAction, logout} = authSlice.actions;

export default authSlice.reducer;
