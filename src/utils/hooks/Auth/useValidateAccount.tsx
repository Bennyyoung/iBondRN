import { showErrorToast } from '@/utils/helpers/toastHelper';
import { useValidateAccountMutation } from '@/redux/features/auth/service';

const useValidateAccount = () => {
  const [validateAccount, { isLoading, isError }] =
    useValidateAccountMutation();

  const validateUserAccount = async (account: string) => {
    try {
      const response = await validateAccount(account).unwrap();

      if (response) {
        return response;
      } else {
        throw new Error('Invalid Credential');
      }
    } catch (error: any) {
      showErrorToast(
        error?.data?.message || 'An error occurred during token validation',
      );
    }
  };

  return { isLoading, validateUserAccount, isError };
};

export default useValidateAccount;
