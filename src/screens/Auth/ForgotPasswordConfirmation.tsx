import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { CustomButton } from '@/components/CustomButton';
import MainWrapper from '@/components/MainWrapper';
import background from '@/assets/images/bg-image.png';
import OTPInput from '@/components/InputOtp';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordConfirmation: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleConfirmation = () => {
    if (code.length !== 6) {
      setError('Please enter a 6-digit code.');
    } else {
      // Handle confirmation logic here
      console.log('Confirmation code:', code);
      setIsSubmitting(true);
      // If successful, navigate to the next screen
      // navigation.navigate('NextScreen');
      setTimeout(() => {
        navigation.navigate('ChangePassword');
        setIsSubmitting(false);
      }, 3000);
    }
  };

  const handleResend = () => {
    // Handle resend logic here
    console.log('Resending code');
  };

  return (
    <MainWrapper backgroundImage={background} hasBackButton={true}>
      <Box alignContent="center" justifyContent="center" mb="md">
        <Text variant="medium18" textAlign="center" mb="sml">
          Confirm{' '}
          <Text variant="medium18" color="primary">
            Account
          </Text>
        </Text>
        <Text variant="regular12" textAlign="center" color="black" mb="lg">
          To confirm your email address, enter the code sent to sh****l.com
        </Text>
      </Box>

      <OTPInput onCodeComplete={setCode} error={error} />

      <CustomButton
        label="Continue"
        onPress={handleConfirmation}
        backgroundColor="primary"
        labelProps={{ color: 'white', variant: 'regular14' }}
        borderRadius="smm"
        marginTop="sm"
        marginBottom="xl"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      />

      <TouchableOpacity onPress={handleResend}>
        <Text textAlign="center" mt="xl">
          Didn't receive code?{' '}
          <Text color="primary" variant="medium14">
            Resend
          </Text>
        </Text>
      </TouchableOpacity>
    </MainWrapper>
  );
};

export default ForgotPasswordConfirmation;
