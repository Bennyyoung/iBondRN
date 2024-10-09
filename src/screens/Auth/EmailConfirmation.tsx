/* eslint-disable no-catch-shadow */
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
import { showErrorToast } from '@/utils/helpers/toastHelper';
import useValidateOtp from '@/utils/hooks/Auth/useValidateOtp';
import useSendOtp from '@/utils/hooks/Auth/useSendOtp';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { maskContactInfo } from '@/utils/helpers/maskInfo';

const EmailConfirmation: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { validateOtpCode, isLoading } = useValidateOtp();
  const { sendOtpRequest } = useSendOtp();
  const { registrationData } = useSelector((state: RootState) => state.user);

  const handleConfirmation = async () => {
    if (code.length !== 6) {
      setError('Please enter a 6-digit code.');
    } else {
      setError('');
      setIsSubmitting(true);
      try {
        const response = await validateOtpCode({
          email: registrationData.email!,
          otp: parseInt(code, 10),
        });

        if (response) {
          navigation.navigate('UsernameSelection');
        }
        // Remove
        // navigation.navigate('UsernameSelection');
      } catch (error: any) {
        showErrorToast(error?.message || 'Invalid OTP, please try again.');
        setError('Invalid OTP, please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const maskedContact = maskContactInfo(registrationData.email as string);

  const handleResend = async () => {
    setIsResending(true);
    await sendOtpRequest(registrationData.email!);
    setIsResending(false);
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
          To confirm your email address, enter the code sent to {maskedContact}
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
        isLoading={isLoading || isSubmitting}
        disabled={isLoading || isSubmitting || isResending}
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

      <TouchableOpacity onPress={handleResend} disabled={isResending}>
        <Text
          textAlign="center"
          mt="md"
          color={isResending ? 'primaryGrey' : 'primary'}
          variant="medium14">
          {isResending ? 'Resending...' : "Didn't receive code? Resend"}
        </Text>
      </TouchableOpacity>
    </MainWrapper>
  );
};

export default EmailConfirmation;
