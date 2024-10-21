export default {
  login: 'auth/auth/login',
  googleSignin: 'auth/auth/google-signin',
  sendOtp: (email: string) => `auth/auth/send-otp?email=${email}`,
  register: 'auth/auth/register',
  forgotPassword: 'auth/auth/forgot-password',
  validateOtp: 'auth/auth/validate-otp',
  validateToken: (token: string) => `auth/auth/validate-token?token=${token}`,
  validateUsername: (username: string) =>
    `auth/auth/username/generate?username=${username}`,
  validateAccount: (emailOrPhoneNumber: string) =>
    `auth/auth/validate-account?emailOrPhoneNumber=${emailOrPhoneNumber}`,
  connectUsers: 'auth/users/by-phone-numbers',
  updateInterests: 'auth/users/set-interests',
  followUser: (userId: number) => `auth/users/${userId}/follow`,
};
