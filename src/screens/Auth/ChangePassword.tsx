import React, { useState } from 'react';
import Box from '@/components/Box';
import Text from '@/components/Text';
import CustomInput from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import MainWrapper from '@/components/MainWrapper';
import background from '@/assets/images/bg-image.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamsList } from '@/navigation/types';
import useForgotPassword from '@/utils/hooks/Auth/useForgotPassword';
import { useSelector } from 'react-redux';
import { RootState } from '@/reduxFolder/store';
import { validatePassword } from '@/utils/helpers/validatePassword';

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const { resetPassword, isLoading } = useForgotPassword();
  const navigation = useNavigation<StackNavigationProp<StackParamsList>>();
  const { registrationData } = useSelector((state: RootState) => state.user);

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setError('');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError('');
  };

  const handleContinue = async () => {
    if (password && !validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, include letters, numbers, and special symbols',
      );
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Confirm password must be the same.');
      return;
    }

    if (password && !error) {
      const data = {
        emailOrPhoneNumber: (registrationData.email ||
          registrationData.phone) as string,
        newPassword: password,
        confirmNewPassword: confirmPassword,
      };

      // Reset the password using the hook
      const response = await resetPassword(data);

      if (response) {
        // If successful, navigate to the success screen
        navigation.navigate('SuccessScreen', {
          iconName: 'success',
          title: 'Password changed successfully',
          message: 'You can now login with your new password',
          nextScreen: 'Login',
          buttonText: 'Continue to Log In',
        });
      }
    }
  };

  return (
    <MainWrapper backgroundImage={background} hasBackButton={true}>
      <Box alignContent="center" justifyContent="center" mb="md">
        <Text variant="medium18" textAlign="center">
          New{' '}
          <Text variant="medium18" color="primary">
            Password
          </Text>
        </Text>
        <Text variant="regular14" textAlign="center" color="black" mt="xs">
          Password should be at least 8 characters, containing letters, numbers,
          and symbols.
        </Text>
      </Box>

      <CustomInput
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        error={error}
      />

      <CustomInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry
        error={confirmPasswordError}
      />

      <CustomButton
        label="Change Password"
        onPress={handleContinue}
        backgroundColor="primary"
        labelProps={{ color: 'white', variant: 'regular14' }}
        borderRadius="smm"
        marginTop="md"
        marginBottom="lg"
        disabled={!password || !!error || isLoading}
        isLoading={isLoading}
      />
    </MainWrapper>
  );
};

export default ChangePassword;
