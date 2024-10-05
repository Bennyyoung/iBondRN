import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { AuthRequest } from '@/redux/features/auth/services.types';
import { useLoginMutation } from '@/redux/features/auth/service';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/features/auth/slices';

const useLoginUser = () => {
  const [login, { isLoading, isError }] = useLoginMutation();
  const dispatch = useDispatch();

  const logInUser = async (data: AuthRequest) => {
    try {
      const response = await login(data).unwrap();

      if (response && response.data) {
        dispatch(setUserData(response.data));
        showSuccessToast('Login successful');
        return response.data;
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      showErrorToast(error?.data?.message || 'An error occurred during login');
    }
  };

  return { isLoading, logInUser, isError };
};

export default useLoginUser;
