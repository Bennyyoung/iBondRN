import { api } from '../rtkQuery/authApi';
import paths from './paths';
import {
  AuthRequest,
  AuthResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  GeneralResponseType,
  SendOtpRequest,
  ValidateOtpRequest,
  ValidateUsernameResponse,
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
    register: build.mutation<AuthResponse, RegisterRequest>({
      query: credentials => ({
        body: credentials,
        method: 'POST',
        url: paths.register,
      }),
    }),
    sendOtp: build.mutation<GeneralResponseType, SendOtpRequest>({
      query: ({ email }) => ({
        url: paths.sendOtp(email),
        method: 'GET',
      }),
    }),
    forgotPassword: build.mutation<GeneralResponseType, ForgotPasswordRequest>({
      query: request => ({
        url: paths.forgotPassword,
        method: 'POST',
        body: request,
      }),
    }),
    validateOtp: build.mutation<GeneralResponseType, ValidateOtpRequest>({
      query: otpRequest => ({
        url: paths.validateOtp,
        method: 'POST',
        body: otpRequest,
      }),
    }),
    validateToken: build.mutation<GeneralResponseType, string>({
      query: token => ({
        url: paths.validateToken(token),
        method: 'GET',
      }),
    }),
    validateUsername: build.mutation<ValidateUsernameResponse, string>({
      query: username => ({
        url: paths.validateUsername(username),
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useSendOtpMutation,
  useForgotPasswordMutation,
  useValidateOtpMutation,
  useValidateTokenMutation,
  useValidateUsernameMutation,
} = iBondMobileApi;
