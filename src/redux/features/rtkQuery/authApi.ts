import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '@/redux/service/baseUrl';
import { RootState } from '@/redux/store';

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl('baseurl'),
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).user.token;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithEncryption: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let encryptedArgs = args;
  if (typeof args === 'object' && args.body) {
    encryptedArgs = {
      ...args,
      body: args.body,
    };
  }

  try {
    const result = await baseQuery(encryptedArgs, api, extraOptions);
    // console.log('request', result.meta?.request, 'result type', result);

    if (result.error) {
      const { status, data } = result.error;

      if (typeof status === 'number' && status >= 500) {
        return {
          error: {
            status,
            data: 'Currently unable to process your request',
          } as FetchBaseQueryError,
        };
      }

      if (typeof status === 'number' && status >= 400 && status < 500) {
        if (typeof data === 'string') {
          try {
            const decryptedError = data;
            return {
              error: { status, data: decryptedError } as FetchBaseQueryError,
            };
          } catch {
            return {
              error: {
                status,
                data: 'Error processing the response',
              } as FetchBaseQueryError,
            };
          }
        }
      }

      return { error: result.error };
    }

    if (result.data) {
      const decryptedData = result.data;
      return { data: decryptedData };
    }

    return { data: undefined };
  } catch (error) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        error: 'Unknown error occurred',
      } as FetchBaseQueryError,
    };
  }
};

export const api = createApi({
  baseQuery: baseQueryWithEncryption,
  endpoints: () => ({}),
  reducerPath: 'iBondMobile',
  tagTypes: ['iBondMobile'],
});

export const enhancedApi = api.enhanceEndpoints({
  endpoints: () => ({
    // Add your endpoints here
  }),
});
