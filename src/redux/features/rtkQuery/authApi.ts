import { getBaseUrl } from '@/redux/service/baseUrl';
import { RootState } from '@/redux/store';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl('baseurl'),
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.token;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
  reducerPath: 'iBondMobile',
  tagTypes: ['iBondMobile'],
});
