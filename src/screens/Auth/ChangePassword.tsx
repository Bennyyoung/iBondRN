import React, { useState } from 'react';
import Box from '@/components/Box';
import Text from '@/components/Text';
import CustomInput from '@/components/CustomInput';
import { CustomButton } from '@/components/CustomButton';
import MainWrapper from '@/components/MainWrapper';
import background from '@/assets/images/bg-image.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const ChangePassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length < 8) {
      setError(
        'Password is too short. It should be at least 8 characters combination of letters, numbers, and special symbols',
      );
    } else {
      setError('');
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError('');
  };

  const handleContinue = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Confirm password must be the same.');
      return;
    }
    if (password && !error) {
      // Navigate to the next screen or complete the sign-up process
      console.log('Password created successfully');
      navigation.navigate('NextScreen');
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
        disabled={!password || !!error}
      />
    </MainWrapper>
  );
};

export default ChangePassword;
