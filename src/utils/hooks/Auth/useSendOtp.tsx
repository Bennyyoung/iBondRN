import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { useSendOtpMutation } from '@/reduxFolder/features/auth/service';

const useSendOtp = () => {
  const [sendOtp, { isLoading, isError }] = useSendOtpMutation();

  const sendOtpRequest = async (email: string) => {
    try {
      const response = await sendOtp({ email }).unwrap();

      if (response) {
        showSuccessToast('OTP sent successfully');
        return response;
      } else {
        throw new Error('Failed to send OTP');
      }
    } catch (error: any) {
      showErrorToast(
        error?.data?.message || 'An error occurred while sending OTP',
      );
      return null;
    }
  };

  return { isLoading, sendOtpRequest, isError };
};

export default useSendOtp;
