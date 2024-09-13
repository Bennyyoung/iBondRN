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

const UsernameSelection: React.FC = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    setError('');
    // Simulating username availability check
    if (text === 'shegs') {
      setError('The username is already taken');
      setSuggestions(['Shigo231', 'Segun_official', 'Shegz']);
    } else {
      setSuggestions([]);
    }
  };

  const handleContinue = () => {
    if (username && !error) {
      setIsSubmitting(true);
      // Navigate to the next screen (password creation)
      setTimeout(() => {
        navigation.navigate('PasswordCreation');
        setIsSubmitting(false);
      }, 1000);
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
        error={error}
        iconName={
          error ? 'error_close' : username?.length > 4 ? 'check_mark' : ''
        }
        iconSize="sm"
      />

      {suggestions.length > 0 && (
        <Text variant="regular12" color="secondaryGrey" mt="xs">
          Suggestion: {suggestions.join(', ')}
        </Text>
      )}

      <CustomButton
        label="Continue"
        onPress={handleContinue}
        backgroundColor="primary"
        labelProps={{ color: 'white', variant: 'regular14' }}
        borderRadius="smm"
        marginTop="md"
        isLoading={isSubmitting}
        disabled={!username || !!error || isSubmitting}
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
