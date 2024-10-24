import Box from '@/components/Box'
import { CustomButton } from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import Heading from '@/components/Heading/Heading'
import Paragraph from '@/components/Paragraph/Paragraph'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import { Formik } from 'formik'
import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Yup from 'yup';

const { height } = Dimensions.get('window')

const validationSchema = Yup.object().shape({
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  confirmNewPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const NewPasswordScreen = () => {

  return (
    <Box flex={1}>
      <TitleBar>
        <Box />
        <Box />
      </TitleBar>

      <Box style={{ paddingHorizontal: 20, marginTop: 40 }}>
        <Heading>
          New password
        </Heading>
        <Paragraph>
          Password should be at least 8 characters, containing letters, numbers, and symbols.
        </Paragraph>

        <Formik
          initialValues={{ newPassword: '', confirmNewPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={(values) => console.log('Form Submitted: ', values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {

            return (
              <Box>
                <Box style={{ marginTop: 30 }} />
                <CustomInput
                  label={'Confirm New Password'}
                  onBlur={handleBlur('confirmNewPassword')}
                  value={values.confirmNewPassword}
                  onChangeText={handleChange('confirmNewPassword')}
                  secureTextEntry
                  error={touched.confirmNewPassword && errors.confirmNewPassword}
                />
                <Box style={{ marginTop: 10 }} />

                <CustomInput
                  label={'New Password'}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                  onChangeText={handleChange('newPassword')}
                  secureTextEntry
                  error={touched.newPassword && errors.newPassword}
                />

                <Box style={{ marginTop: 30 }} />

                <CustomButton
                  label="Continue"
                  backgroundColor="primary"
                  alignItems="center"
                  labelProps={{ color: 'whiteColor' }}
                  borderRadius="sm"
                  onPress={() => { }}
                />

                <Box flexDirection={"row"} alignSelf={'center'}>
                  <Text style={[styles.bottomText, { fontWeight: '400' }]}>
                    Didn’t receive code? {' '}
                  </Text>
                  <Text style={[styles.bottomText, { color: '#6500E0', fontWeight: '600' }]}>
                    Resend
                  </Text>

                </Box>
              </Box>
            )
          }}
        </Formik>
      </Box>
    </Box >
  )
}

export default NewPasswordScreen

const styles = StyleSheet.create({
  bottomText: {
    fontSize: RFValue(13, height)
  }
})