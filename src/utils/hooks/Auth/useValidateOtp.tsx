import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { ValidateOtpRequest } from '@/redux/features/auth/services.types';
import { useValidateOtpMutation } from '@/redux/features/auth/service';

const useValidateOtp = () => {
  const [validateOtp, { isLoading, isError }] = useValidateOtpMutation();

  const validateOtpCode = async (data: ValidateOtpRequest) => {
    try {
      const response = await validateOtp(data).unwrap();

      if (response) {
        showSuccessToast('OTP validated successfully');
        return response;
      } else {
        throw new Error('OTP validation failed');
      }
    } catch (error: any) {
      showErrorToast(
        error?.data?.message || 'An error occurred during OTP validation',
      );
    }
  };

  return { isLoading, validateOtpCode, isError };
};

export default useValidateOtp;
