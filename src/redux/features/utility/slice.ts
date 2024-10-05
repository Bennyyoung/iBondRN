import { createSlice } from '@reduxjs/toolkit';
import { iBondMobileApi } from './service';
import {
  FacultiesAndDepartmentsResponse,
  InstitutionsResponse,
  InterestsResponse,
} from './services.types';
import { RootState } from '@/redux/store';

interface IUtilityState {
  institutions: InstitutionsResponse | null;
  facultiesAndDepartments: FacultiesAndDepartmentsResponse | null;
  interests: InterestsResponse | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: IUtilityState = {
  institutions: [],
  facultiesAndDepartments: null,
  interests: null,
  status: 'idle',
};

export const utilitiesSlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    clearData: state => {
      state.institutions = null;
      state.facultiesAndDepartments = null;
      state.interests = null;
      state.status = 'idle';
    },
  },
  extraReducers: builder => {
    // Handling Institutions
    builder.addMatcher(
      iBondMobileApi.endpoints.getInstitutions.matchPending,
      state => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      iBondMobileApi.endpoints.getInstitutions.matchFulfilled,
      (state, { payload }) => {
        state.institutions = payload;
        state.status = 'succeeded';
      },
    );
    builder.addMatcher(
      iBondMobileApi.endpoints.getInstitutions.matchRejected,
      state => {
        state.status = 'failed';
      },
    );

    // Handling Faculties and Departments
    builder.addMatcher(
      iBondMobileApi.endpoints.getFacultiesAndDepartments.matchPending,
      state => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      iBondMobileApi.endpoints.getFacultiesAndDepartments.matchFulfilled,
      (state, { payload }) => {
        state.facultiesAndDepartments = payload;
        state.status = 'succeeded';
      },
    );
    builder.addMatcher(
      iBondMobileApi.endpoints.getFacultiesAndDepartments.matchRejected,
      state => {
        state.status = 'failed';
      },
    );

    // Handling Interests
    builder.addMatcher(
      iBondMobileApi.endpoints.getInterests.matchPending,
      state => {
        state.status = 'loading';
      },
    );
    builder.addMatcher(
      iBondMobileApi.endpoints.getInterests.matchFulfilled,
      (state, { payload }) => {
        state.interests = payload;
        state.status = 'succeeded';
      },
    );
    builder.addMatcher(
      iBondMobileApi.endpoints.getInterests.matchRejected,
      state => {
        state.status = 'failed';
      },
    );
  },
});

export const { clearData } = utilitiesSlice.actions;

export const selectInstitutions = (state: RootState) =>
  state.utility.institutions;
export const selectFacultiesAndDepartments = (state: RootState) =>
  state.utility.facultiesAndDepartments;
export const selectInterests = (state: RootState) => state.utility.interests;

export default utilitiesSlice.reducer;
