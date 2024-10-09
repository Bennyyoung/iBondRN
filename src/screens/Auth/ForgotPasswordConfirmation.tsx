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
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import useValidateOtp from '@/utils/hooks/Auth/useValidateOtp';
import useSendOtp from '@/utils/hooks/Auth/useSendOtp';
import { maskContactInfo } from '@/utils/helpers/maskInfo';

const ForgotPasswordConfirmation: React.FC = () => {
  const [formState, setFormState] = useState({
    code: '',
    error: '',
    isSubmitting: false,
    isResending: false,
  });

  const navigation = useNavigation<StackNavigationProp<any>>();
  const { registrationData } = useSelector((state: RootState) => state.user);
  const { validateOtpCode, isLoading } = useValidateOtp();
  const { sendOtpRequest } = useSendOtp();

  const handleConfirmation = async () => {
    if (formState.code.length !== 6) {
      setFormState(prev => ({
        ...prev,
        error: 'Please enter a 6-digit code.',
      }));
      return;
    }

    setFormState(prev => ({ ...prev, error: '', isSubmitting: true }));

    try {
      const response = await validateOtpCode({
        email: (registrationData.email || registrationData.phone) as string,
        otp: parseInt(formState.code, 10),
      });

      if (response) {
        navigation.navigate('ChangePassword');
      }
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        error: 'Failed to confirm OTP. Please try again.',
      }));
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handleResend = async () => {
    setFormState(prev => ({ ...prev, isResending: true }));

    try {
      await sendOtpRequest(
        (registrationData.email || registrationData.phone) as string,
      );
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        error: 'Failed to resend OTP. Please try again later.',
      }));
    } finally {
      setFormState(prev => ({ ...prev, isResending: false }));
    }
  };

  const maskedContact = maskContactInfo(
    (registrationData.email || registrationData.phone) as string,
  );

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
          To confirm your {registrationData.email ? 'email' : 'phone number'},
          enter the code sent to {maskedContact}.
        </Text>
      </Box>

      <OTPInput
        onCodeComplete={code => setFormState(prev => ({ ...prev, code }))}
        error={formState.error}
      />

      <CustomButton
        label="Continue"
        onPress={handleConfirmation}
        backgroundColor="primary"
        labelProps={{ color: 'white', variant: 'regular14' }}
        borderRadius="smm"
        marginTop="sm"
        marginBottom="xl"
        isLoading={formState.isSubmitting || isLoading}
        disabled={formState.isSubmitting || isLoading}
      />

      <TouchableOpacity onPress={handleResend}>
        <Text
          textAlign="center"
          mt="xl"
          color={formState.isResending ? 'grey' : 'primary'}>
          Didn't receive code?{' '}
          <Text
            color={formState.isResending ? 'grey' : 'primary'}
            variant="medium14">
            Resend
          </Text>
        </Text>
      </TouchableOpacity>
    </MainWrapper>
  );
};

export default ForgotPasswordConfirmation;
