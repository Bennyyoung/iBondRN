import { showErrorToast } from '@/utils/helpers/toastHelper';
import { AuthRequest } from '@/redux/features/auth/services.types';
import { useLoginMutation } from '@/redux/features/auth/service';

const useLoginUser = () => {
  const [login, { isLoading, isError, isSuccess }] = useLoginMutation();

  const logInUser = async (data: AuthRequest) => {
    try {
      const response = await login(data).unwrap();
      console.log(response);

      if (response) {
        return response;
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      showErrorToast(
        (error.message as string) || 'An error occurred during login',
      );
    } finally {
    }
  };

  return { isLoading, logInUser, isError, isSuccess };
};

export default useLoginUser;
