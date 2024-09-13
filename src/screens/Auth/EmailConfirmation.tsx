import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { CustomButton } from '@/components/CustomButton';
import MainWrapper from '@/components/MainWrapper';
import background from '@/assets/images/bg-image.png';
import OTPInput from '@/components/InputOtp';

const EmailConfirmation: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setError('The code is incorrect. Try again.');
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
          Sign up to{' '}
          <Text variant="medium18" color="primary">
            iBond
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
        isLoading={isSubmitting}
        disabled={isSubmitting}
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

      <TouchableOpacity onPress={handleResend}>
        <Text textAlign="center" mt="md" color="primary" variant="medium14">
          Didn't receive code? Resend
        </Text>
      </TouchableOpacity>
    </MainWrapper>
  );
};

export default EmailConfirmation;
