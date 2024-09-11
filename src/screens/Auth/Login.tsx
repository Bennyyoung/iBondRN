/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import CustomInput from '@/components/CustomInput';
import background from '@/assets/images/bg-image.png';
import { SvgIcon } from '@/assets/icons/SvgIcon';
import { CustomButton } from '@/components/CustomButton';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MainWrapper from '@/components/MainWrapper';

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username or email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const handleLogin = (
    values: LoginFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<LoginFormValues>,
  ) => {
    setTimeout(() => {
      setFieldError('password', 'Incorrect password');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <MainWrapper backgroundImage={background}>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}>
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
              <Text variant="medium22" textAlign="center">
                Log in to{' '}
                <Text variant="medium22" color="primary">
                  iBond
                </Text>
              </Text>
            </Box>

            <CustomInput
              label="Username or email"
              value={values.username}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              error={touched.username && errors.username}
            />
            <CustomInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry
              error={touched.password && errors.password}
            />

            <TouchableOpacity>
              <Text
                variant="medium12"
                letterSpacing={0.3}
                color="primary"
                mb="md">
                Forgotten Password?
              </Text>
            </TouchableOpacity>

            <CustomButton
              label="Log In"
              onPress={handleSubmit}
              backgroundColor="primary"
              labelProps={{ color: 'white', variant: 'regular14' }}
              borderRadius="smm"
              paddingVertical="md"
              containerProps={{
                width: '100%',
              }}
              isLoading={isSubmitting}
            />

            <Box
              alignItems="center"
              flexDirection="row"
              justifyContent="space-evenly"
              paddingTop="md"
              paddingBottom="xs"
              style={{
                width: '100%',
              }}>
              <SvgIcon name="authLine" size="xll" />
              <Text
                color="secondaryGrey"
                textAlign="center"
                variant="regular14"
                my="md">
                or sign in with
              </Text>
              <SvgIcon name="authLine" size="xll" />
            </Box>

            <Box flexDirection="row" justifyContent="space-between">
              <CustomButton
                label="Google"
                iconName="googleIcon"
                iconSize="sm"
                onPress={() => {}}
                backgroundColor="white"
                labelProps={{ color: 'black', variant: 'medium14' }}
                borderRadius="smm"
                paddingVertical="md"
                containerProps={{
                  width: '43%',
                }}
                style={{
                  borderWidth: 0.5,
                  borderColor: 'grey',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              />
              <CustomButton
                label="Apple"
                iconName="appleIcon"
                iconSize="sm"
                onPress={() => {}}
                backgroundColor="black"
                labelProps={{ color: 'white', variant: 'medium14' }}
                borderRadius="smm"
                paddingVertical="md"
                containerProps={{
                  width: '43%',
                }}
                style={{
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              />
            </Box>

            <Text textAlign="center" mt="lg">
              New to iBond?{' '}
              <Text color="primary" variant="medium14">
                Create an account
              </Text>
            </Text>
          </>
        )}
      </Formik>
    </MainWrapper>
  );
};

export default Login;
