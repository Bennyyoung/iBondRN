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
import useValidateUsername from '@/utils/hooks/Auth/useValidateUsername';
import { useDispatch } from 'react-redux';
import { updateRegistrationData } from '@/redux/features/auth/slices';

const UsernameSelection: React.FC = () => {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    validate,
    isLoading,
    error,
    suggestions,
    isUsernameValid,
    setIsUsernameValid,
  } = useValidateUsername();
  const [buttonLabel, setButtonLabel] = useState('Validate');
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setButtonLabel('Validate');
    setIsUsernameValid(false);
  };

  const handleValidate = async () => {
    // Remove
    // navigation.navigate('PasswordCreation');
    if (username.length > 4) {
      await validate(username);
      if (!error && !isLoading && isUsernameValid) {
        setButtonLabel('Continue');
      }
    }
  };

  const handleContinue = () => {
    if (isUsernameValid) {
      setIsSubmitting(true);
      dispatch(updateRegistrationData({ username }));

      navigation.navigate('PasswordCreation');
      setIsSubmitting(false);
    } else {
      handleValidate();
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
          Pick a username for your account. You can change this at any time.
        </Text>
      </Box>

      <CustomInput
        label="Username"
        value={username}
        onChangeText={handleUsernameChange}
        error={error || ''}
        iconName={error ? 'error_close' : isUsernameValid ? 'check_mark' : ''}
        iconSize="sm"
      />

      {suggestions.length > 0 && (
        <Text variant="regular12" color="secondaryGrey" mt="xs">
          Suggestions: {suggestions.join(', ')}
        </Text>
      )}

      <CustomButton
        label={isUsernameValid ? 'Continue' : buttonLabel}
        onPress={handleContinue}
        backgroundColor="primary"
        labelProps={{ color: 'white', variant: 'regular14' }}
        borderRadius="smm"
        marginTop="md"
        isLoading={isLoading || isSubmitting}
        disabled={isLoading || isSubmitting || username.length <= 4}
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

export default UsernameSelection;
