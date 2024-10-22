/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity, Platform, Alert } from 'react-native';
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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import { GOOGLE_AUTH_KEY } from '@env';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '@/utils/hooks/auth.config';
import { RFValue } from 'react-native-responsive-fontsize';
import useGoogleSignin from '@/utils/hooks/Auth/useGoogleSignin';
import { GoogleSigninRequest } from '@/reduxFolder/features/auth/services.types';

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
  const { googleLogin, isLoading: googleLoading } = useGoogleSignin();
  const navigation = useNavigation<StackNavigationProp<any>>();

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_AUTH_KEY,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const authData = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(
        authData.data?.idToken,
      );
      await signInWithCredential(auth, googleCredentials);
      const response = await googleLogin(authData as GoogleSigninRequest);

      if (response) {
        navigation.replace('DashboardTab');
        return;
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Google Sign-In was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign-In in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Google Play Services not available');
      } else {
        // console.error(error);
      }
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { user, email, fullName, identityToken } = appleAuthRequestResponse;

      const credentialState = await appleAuth.getCredentialStateForUser(user);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        console.log('Apple Sign-In successful:', {
          email,
          fullName,
          identityToken,
        });
      } else {
        Alert.alert('Apple Sign-In failed');
      }
    } catch (error) {
      console.error('Apple Sign-In error:', error);
      Alert.alert('Apple Sign-In failed');
    }
  };

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
                isSubmitting ||
                googleLoading
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

            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignContent="center">
              <Box width={Platform.OS === 'ios' ? '48%' : '100%'}>
                <CustomButton
                  label="Google"
                  iconName="googleIcon"
                  iconSize="sm"
                  onPress={handleGoogleSignIn}
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
                  disabled={isLoading || isSubmitting || googleLoading}
                />
              </Box>
              {Platform.OS === 'ios' && (
                <Box width="48%">
                  <AppleButton
                    buttonStyle={AppleButton.Style.BLACK}
                    buttonType={AppleButton.Type.SIGN_IN}
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: RFValue(41),
                    }}
                    onPress={handleAppleSignIn}
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
