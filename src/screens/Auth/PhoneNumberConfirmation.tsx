/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-catch-shadow */
import React, { useState, useEffect } from 'react';
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
import { RootState } from '@/reduxFolder/store';
import { maskContactInfo } from '@/utils/helpers/maskInfo';

const PhoneNumberConfirmation: React.FC = () => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();

  const { validateOtpCode, isLoading } = useValidateOtp();
  const { sendOtpRequest } = useSendOtp();
  const { registrationData } = useSelector((state: RootState) => state.user);

  const sendPhoneNumberOtp = async () => {
    try {
      await sendOtpRequest(registrationData.phoneNumber as string);
    } catch (error: any) {
      showErrorToast(error?.message || 'Failed to send OTP. Please try again.');
    }
  };

  useEffect(() => {
    sendPhoneNumberOtp();
  }, []);

  const handleConfirmation = async () => {
    if (code.length !== 6) {
      setError('Please enter a 6-digit code.');
    } else {
      setError('');
      setIsSubmitting(true);
      try {
        const response = await validateOtpCode({
          email: registrationData.phoneNumber!,
          otp: parseInt(code, 10),
        });

        if (response) {
          navigation.navigate('UsernameSelection');
        }
      } catch (error: any) {
        showErrorToast(error?.message || 'Invalid OTP, please try again.');
        setError('Invalid OTP, please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const maskedPhoneNumber = maskContactInfo(
    registrationData.phoneNumber as string,
  );

  const handleResend = async () => {
    setIsResending(true);
    await sendPhoneNumberOtp();
    setIsResending(false);
  };

  return (
    <MainWrapper backgroundImage={background} hasBackButton={true}>
      <Box alignContent="center" justifyContent="center" mb="md">
        <Text variant="medium18" textAlign="center" mb="sml">
          Confirm your phone number
        </Text>
        <Text variant="regular12" textAlign="center" color="black" mb="lg">
          To confirm your phone number, enter the code sent to{' '}
          {maskedPhoneNumber}
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

export default PhoneNumberConfirmation;
