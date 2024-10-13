/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import CustomInput from '@/components/CustomInput';
import background from '@/assets/images/bg-image.png';
import { SvgIcon } from '@/assets/icons/SvgIcon';
import { CustomButton } from '@/components/CustomButton';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MainWrapper from '@/components/MainWrapper';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import useLoginUser from '@/utils/hooks/Auth/useLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginFormValues {
  username: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required('Username or email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const { logInUser, isLoading } = useLoginUser();
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    const userData = await logInUser({
      email: values.username,
      password: values.password,
    });

    // await AsyncStorage.setItem('@newlyregistered', 'true');
    // await AsyncStorage.setItem('@shouldupdateinterests', 'true');
    const shouldConnect = await AsyncStorage.getItem('@newlyregistered');
    const shouldUpdateInterests = await AsyncStorage.getItem(
      '@shouldupdateinterests',
    );

    if (userData && shouldConnect === 'true') {
      navigation.navigate('FindFriendsFromContacts');
      return;
    } else if (userData && shouldUpdateInterests === 'true') {
      navigation.navigate('SearchInterests');
      return;
    } else if (userData) {
      navigation.replace('DashboardTab');
      return;
    }
    setSubmitting(false);
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
              <Text variant="medium18" textAlign="center">
                Log in to{' '}
                <Text variant="medium18" color="primary">
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

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
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
              isLoading={isLoading || isSubmitting}
              disabled={
                !(values.username && values.password) ||
                isLoading ||
                isSubmitting
              }
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
              <SvgIcon name="authLine" size="xl" />
              <Text
                color="secondaryGrey"
                textAlign="center"
                variant="regular14"
                my="md">
                or sign in with
              </Text>
              <SvgIcon name="authLine" size="xl" />
            </Box>

            <Box flexDirection="row" justifyContent="space-between">
              <Box width={Platform.OS === 'ios' ? '48%' : '100%'}>
                <CustomButton
                  label="Google"
                  iconName="googleIcon"
                  iconSize="sm"
                  onPress={() => {}}
                  backgroundColor="white"
                  labelProps={{ color: 'black', variant: 'medium14' }}
                  borderRadius="smm"
                  paddingVertical="xs"
                  style={{
                    borderWidth: 0.5,
                    borderColor: 'grey',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  isLoading={isLoading || isSubmitting}
                  disabled={isLoading || isSubmitting}
                />
              </Box>
              {Platform.OS === 'ios' && (
                <Box width="48%">
                  <CustomButton
                    label="Apple"
                    iconName="appleIcon"
                    iconSize="sm"
                    onPress={() => {}}
                    backgroundColor="black"
                    labelProps={{ color: 'white', variant: 'medium14' }}
                    borderRadius="smm"
                    paddingVertical="xs"
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    isLoading={isLoading || isSubmitting}
                    disabled={isLoading || isSubmitting}
                  />
                </Box>
              )}
            </Box>
            <TouchableOpacity
              onPress={() => navigation.navigate('AuthLanding')}>
              <Text textAlign="center" mt="lg">
                New to iBond?{' '}
                <Text color="primary" variant="medium14">
                  Create an account
                </Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </MainWrapper>
  );
};

export default Login;
