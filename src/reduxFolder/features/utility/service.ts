import { api } from '../rtkQuery/authApi';
import paths from './paths';
import {
  FacultiesAndDepartmentsResponse,
  InstitutionsResponse,
  InterestsResponse,
} from './services.types';

export const iBondMobileApi = api.injectEndpoints({
  endpoints: build => ({
    getInstitutions: build.query<InstitutionsResponse, void>({
      query: () => ({
        url: paths.schools,
        method: 'GET',
      }),
    }),
    getFacultiesAndDepartments: build.query<
      FacultiesAndDepartmentsResponse,
      void
    >({
      query: () => ({
        url: paths.facultiesAndDepartments,
        method: 'GET',
      }),
    }),
    getInterests: build.query<InterestsResponse, void>({
      query: () => ({
        url: paths.interests,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetInstitutionsQuery,
  useGetFacultiesAndDepartmentsQuery,
  useGetInterestsQuery,
} = iBondMobileApi;
