import React, { useState } from 'react';
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

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  referralCode: string;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  gender: Yup.string().required('Gender is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  referralCode: Yup.string(),
});

const SignUp: React.FC = () => {
  const handleSignUp = (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>,
  ) => {
    // Handle sign up logic here
    console.log(values);
    setSubmitting(false);
  };

  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <MainWrapper backgroundImage={background}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
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
              <Text variant="medium22" textAlign="center" mb="sml">
                Sign up to{' '}
                <Text variant="medium22" color="primary">
                  iBond
                </Text>
              </Text>
              <Text variant="regular14" textAlign="center" color="black">
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
                  placeholder="Select gender"
                  selectedValue={values.gender}
                  errorMessage={touched.gender && errors.gender}
                  modulePalette="primary"
                  iconName="chevron_downward"
                  iconSize="sml"
                />
              </Box>
              <Box flex={1} marginLeft="sm">
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
              label="Referral Code (optional)"
              value={values.referralCode}
              onChangeText={handleChange('referralCode')}
              onBlur={handleBlur('referralCode')}
              error={touched.referralCode && errors.referralCode}
            />

            <CustomButton
              label="Continue"
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
