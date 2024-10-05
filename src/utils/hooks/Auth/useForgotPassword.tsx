import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { ForgotPasswordRequest } from '@/redux/features/auth/services.types';
import { useForgotPasswordMutation } from '@/redux/features/auth/service';

const useForgotPassword = () => {
  const [forgotPassword, { isLoading, isError }] = useForgotPasswordMutation();

  const resetPassword = async (data: ForgotPasswordRequest) => {
    try {
      const response = await forgotPassword(data).unwrap();

      if (response) {
        showSuccessToast('Password reset successfully');
        return response;
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error: any) {
      showErrorToast(
        error?.data?.message || 'An error occurred during password reset',
      );
    }
  };

  return { isLoading, resetPassword, isError };
};

export default useForgotPassword;
