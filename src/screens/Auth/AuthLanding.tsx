import React from 'react';
import Box from '@/components/Box';
import Text from '@/components/Text';
import CustomInput from '@/components/CustomInput';
import background from '@/assets/images/bg-image.png';
import { CustomButton } from '@/components/CustomButton';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MainWrapper from '@/components/MainWrapper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import SelectInput from '@/components/SelectInput';
import { DateInput } from '@/components/DateInput';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch } from 'react-redux';
import { updateRegistrationData } from '@/redux/features/auth/slices';
import useSendOtp from '@/utils/hooks/Auth/useSendOtp';
import moment from 'moment';

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  referralCode: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .length(11, 'Phone number must be exactly 11 digits'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.string()
    .required('Date of Birth is required')
    .test(
      'is-18-years-old',
      'You must be at least 18 years old',
      function (value) {
        const today = moment();
        const dateOfBirth = moment(value, 'YYYY-MM-DD');
        return today.diff(dateOfBirth, 'years') >= 18;
      },
    ),
  email: Yup.string().email('Invalid email').required('Email is required'),
  referralCode: Yup.string(),
});

const SignUp: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();
  const { sendOtpRequest } = useSendOtp();

  const handleSignUp = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>,
  ) => {
    dispatch(
      updateRegistrationData({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: `+234${values.phoneNumber.slice(-10)}`,
        gender: values.gender.toLowerCase() === 'male' ? 'MALE' : 'FEMALE',
        dob: values.dateOfBirth,
        email: values.email,
        referralCode: values.referralCode,
      }),
    );

    const response = await sendOtpRequest(values.email);
    if (response) {
      navigation.navigate('EmailConfirmation');
    }

    setSubmitting(false);
  };

  return (
    <MainWrapper backgroundImage={background} hasBackButton={true}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          phoneNumber: '',
          gender: '',
          dateOfBirth: '',
          email: '',
          referralCode: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isSubmitting,
        }) => (
          <>
            <Box alignContent="center" justifyContent="center" mb="md">
              <Text variant="medium18" textAlign="center" mb="sml">
                Sign up to{' '}
                <Text variant="medium18" color="primary">
                  iBond
                </Text>
              </Text>
              <Text variant="regular12" textAlign="center" color="black">
                Let's get to know you. We'll send updates to the email address
                you provide.
              </Text>
            </Box>

            <Box flexDirection="row" justifyContent="space-between">
              <CustomInput
                label="First Name"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={touched.firstName && errors.firstName}
                containerProps={{ width: '48%' }}
              />
              <CustomInput
                label="Last Name"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={touched.lastName && errors.lastName}
                containerProps={{ width: '48%' }}
              />
            </Box>

            <Box flexDirection="row" justifyContent="space-between">
              <Box flex={1} marginRight="xs">
                <SelectInput
                  label="Gender"
                  getSelectedValue={value => {
                    setFieldValue('gender', value);
                  }}
                  list={[
                    { id: 'male', value: 'Male' },
                    { id: 'female', value: 'Female' },
                  ]}
                  placeholder="Select Gender"
                  selectedValue={values.gender}
                  errorMessage={touched.gender && errors.gender}
                  modulePalette="primary"
                  iconName="chevron_downward"
                  iconSize="sml"
                  showHeader={false}
                />
              </Box>
              <Box flex={1} marginLeft="xs">
                <DateInput
                  label="Date of Birth"
                  getSelectedDate={date => {
                    const formattedDate = date.toISOString().split('T')[0];
                    setFieldValue('dateOfBirth', formattedDate);
                  }}
                  value={values.dateOfBirth}
                  maximumDate={new Date()}
                  errorMessage={touched.dateOfBirth && errors.dateOfBirth}
                  modulePalette="primary"
                  iconName="calender"
                  iconSize="sml"
                />
              </Box>
            </Box>

            <CustomInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
            />

            <CustomInput
              label="Phone number"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              max={11}
              keyboardType="phone-pad"
              error={touched.phoneNumber && errors.phoneNumber}
            />

            <CustomInput
              label="Referral Code (optional)"
              value={values.referralCode}
              onChangeText={handleChange('referralCode')}
              onBlur={handleBlur('referralCode')}
              error={touched.referralCode && errors.referralCode}
              containerProps={{
                marginBottom: RFValue(10),
              }}
            />

            <CustomButton
              label="Continue"
              onPress={handleSubmit}
              backgroundColor="primary"
              labelProps={{ color: 'white', variant: 'regular14' }}
              borderRadius="smm"
              isLoading={isSubmitting}
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
              <Text textAlign="center" mt="md">
                Already have an account?{' '}
                <Text color="primary" variant="medium14">
                  Log In
                </Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </MainWrapper>
  );
};

export default SignUp;
