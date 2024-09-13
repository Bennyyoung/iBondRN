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

const PasswordCreation: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

  const handleContinue = () => {
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
