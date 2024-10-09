import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import CustomInput from '@/components/CustomInput';
import background from '@/assets/images/bg-image.png';
import { CustomButton } from '@/components/CustomButton';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MainWrapper from '@/components/MainWrapper';
import { RFValue } from 'react-native-responsive-fontsize';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import useSendOtp from '@/utils/hooks/Auth/useSendOtp';
import { useDispatch } from 'react-redux';
import { updateRegistrationData } from '@/redux/features/auth/slices';
import useValidateAccount from '@/utils/hooks/Auth/useValidateAccount';

interface ForgotPasswordFormValues {
  emailOrPhone: string;
}

const validationSchema = Yup.object().shape({
  emailOrPhone: Yup.string().required('Email or Phone Number is required'),
});

const ForgotPassword: React.FC = () => {
  const [useEmail, setUseEmail] = useState(true);
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const { sendOtpRequest } = useSendOtp();
  const { validateUserAccount } = useValidateAccount();

  const handleResetPassword = async (
    values: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>,
  ) => {
    setSubmitting(true);
    const isValidAccount = await validateUserAccount(values.emailOrPhone);
    if (!isValidAccount) {
      return '';
    }

    dispatch(
      updateRegistrationData({
        email: useEmail ? values.emailOrPhone : '',
        phone: !useEmail ? values.emailOrPhone : '',
      }),
    );
    const response = await sendOtpRequest(values.emailOrPhone);
    if (response) {
      navigation.navigate('ForgotPasswordConfirmation');
    }
  };

  const toggleInputType = () => {
    setUseEmail(!useEmail);
  };

  return (
    <MainWrapper backgroundImage={background} hasBackButton={true}>
      <Formik
        initialValues={{ emailOrPhone: '' }}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <Box alignContent="center" justifyContent="center" mb="md">
              <Text variant="medium18" textAlign="center" mb="sm">
                Forgot{' '}
                <Text variant="medium18" color="primary">
                  Password?
                </Text>
              </Text>
              <Text variant="regular12" textAlign="center" color="black">
                Enter your {useEmail ? 'email address' : 'phone number'} to
                reset password
              </Text>
            </Box>

            <CustomInput
              label={useEmail ? 'Email' : 'Phone Number'}
              value={values.emailOrPhone}
              max={useEmail ? 50 : 11}
              onChangeText={handleChange('emailOrPhone')}
              onBlur={handleBlur('emailOrPhone')}
              error={touched.emailOrPhone && errors.emailOrPhone}
              keyboardType={useEmail ? 'email-address' : 'phone-pad'}
            />

            <CustomButton
              label="Continue"
              onPress={handleSubmit}
              backgroundColor="primary"
              labelProps={{ color: 'white', variant: 'regular14' }}
              borderRadius="smm"
              style={{
                marginTop: RFValue(5),
                marginBottom: RFValue(70),
              }}
              isLoading={isSubmitting}
              disabled={!values.emailOrPhone}
            />

            <TouchableOpacity onPress={toggleInputType}>
              <Text
                variant="medium14"
                letterSpacing={0.3}
                color="primary"
                textAlign="center"
                mt="md">
                Use {useEmail ? 'Phone number' : 'Email address'} instead
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </MainWrapper>
  );
};

export default ForgotPassword;
