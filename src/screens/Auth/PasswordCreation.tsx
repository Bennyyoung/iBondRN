import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import CustomInput from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import MainWrapper from '@/components/MainWrapper';
import background from '@/assets/images/bg-image.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { updateRegistrationData } from '@/reduxFolder/features/auth/slices';
import { validatePassword } from '@/utils/helpers/validatePassword';

const PasswordCreation: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setError('');
  };

  const handleContinue = () => {
    if (password && !validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long, include letters, numbers, and special symbols',
      );
      return;
    }

    if (password && !error) {
      dispatch(updateRegistrationData({ password }));

      navigation.navigate('PostSignUpScreen');
    }
  };

  return (
    <MainWrapper backgroundImage={background} hasBackButton={true}>
      <Box alignContent="center" justifyContent="center" mb="md">
        <Text variant="medium18" textAlign="center">
          Sign up to{' '}
          <Text variant="medium18" color="primary">
            iBond
          </Text>
        </Text>
        <Text variant="regular14" textAlign="center" color="black" mt="xs">
          Create a secure password.
        </Text>
      </Box>

      <CustomInput
        label="Password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        error={error}
      />

      <CustomButton
        label="Continue"
        onPress={handleContinue}
        backgroundColor="primary"
        labelProps={{ color: 'white', variant: 'regular14' }}
        borderRadius="smm"
        marginTop="md"
        disabled={!password || !!error}
      />

      <Text
        textAlign="center"
        mt="lg"
        variant="regular12"
        color="secondaryGrey">
        By tapping "Continue", you accept our{' '}
        <Text color="primary" variant="medium12">
          Terms of Use
        </Text>{' '}
        and{' '}
        <Text color="primary" variant="medium12">
          Privacy Policy
        </Text>
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text textAlign="center" mt="lg">
          Already have an account?{' '}
          <Text color="primary" variant="medium14">
            Log In
          </Text>
        </Text>
      </TouchableOpacity>
    </MainWrapper>
  );
};

export default PasswordCreation;
