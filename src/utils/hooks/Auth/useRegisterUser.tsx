import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { RegisterRequest } from '@/redux/features/auth/services.types';
import { useRegisterMutation } from '@/redux/features/auth/service';
import { useDispatch } from 'react-redux';
import { updateNewUser } from '@/redux/features/auth/slices';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useRegisterUser = () => {
  const [register, { isLoading, isError }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const registerUser = async (data: RegisterRequest) => {
    try {
      const response = await register(data).unwrap();
      // console.log(response, 'The response did got here');

      if (response && response.status === 201) {
        dispatch(updateNewUser(true));
        await AsyncStorage.setItem('@newlyregistered', 'true');
        await AsyncStorage.setItem('@shouldupdateinterests', 'true');
        showSuccessToast('Registration successful');
        return true;
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
