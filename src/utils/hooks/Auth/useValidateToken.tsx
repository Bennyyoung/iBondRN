import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { useValidateTokenMutation } from '@/reduxFolder/features/auth/service';

const useValidateToken = () => {
  const [validateToken, { isLoading, isError }] = useValidateTokenMutation();

  const validateUserToken = async (token: string) => {
    try {
      const response = await validateToken(token).unwrap();

      if (response) {
        showSuccessToast('Token validated successfully');
        return response;
      } else {
        throw new Error('Token validation failed');
      }
    } catch (error: any) {
      showErrorToast(
        error?.data?.message || 'An error occurred during token validation',
      );
    }
  };

  return { isLoading, validateUserToken, isError };
};

export default useValidateToken;
