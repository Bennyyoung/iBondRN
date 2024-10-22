import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { GoogleSigninRequest } from '@/reduxFolder/features/auth/services.types';
import { useGoogleSigninMutation } from '@/reduxFolder/features/auth/service';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/reduxFolder/features/auth/slices';

const useGoogleSignin = () => {
  const [login, { isLoading, isError }] = useGoogleSigninMutation();
  const dispatch = useDispatch();

  const googleLogin = async (data: GoogleSigninRequest) => {
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

  return { isLoading, googleLogin, isError };
};

export default useGoogleSignin;
