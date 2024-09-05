import { api } from '../rtkQuery/authApi';
import paths from './paths';
import {
  AuthRequest,
  AuthResponse,
  RegisterRequest,
  RegisterResponse,
} from './services.types';

export const iBondMobileApi = api.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<AuthResponse, AuthRequest>({
      query: credentials => ({
        body: credentials,
        method: 'POST',
        url: paths.login,
      }),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: credentials => ({
        body: credentials,
        method: 'POST',
        url: paths.register,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = iBondMobileApi;
