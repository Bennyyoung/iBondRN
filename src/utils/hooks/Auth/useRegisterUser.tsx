import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { RegisterRequest } from '@/redux/features/auth/services.types';
import { useRegisterMutation } from '@/redux/features/auth/service';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/features/auth/slices';
import { useNavigation } from '@react-navigation/native';

const useRegisterUser = () => {
  const [register, { isLoading, isError }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const registerUser = async (data: RegisterRequest) => {
    try {
      const response = await register(data).unwrap();
      // console.log(response, 'The response did got here');

      if (response && response.data) {
        dispatch(setUserData(response.data));
        showSuccessToast('Registration successful');
        return response.data;
      } else {
        throw new Error('Registration failed');
      }
    } catch (error: any) {
      if (error?.data?.statusCode === 409) {
        navigation.navigate('Login');
        return;
      }
      showErrorToast(
        error?.data?.message || 'An error occurred during registration',
      );
    }
  };

  return { isLoading, registerUser, isError };
};

export default useRegisterUser;
