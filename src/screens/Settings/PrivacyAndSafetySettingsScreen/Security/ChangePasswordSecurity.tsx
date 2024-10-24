import { SvgIcon } from '@/assets/icons'
import Box from '@/components/Box'
import { CustomButton } from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import Paragraph from '@/components/Paragraph/Paragraph'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import { StackParamsList } from '@/navigation/types'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
const { height } = Dimensions.get('window')
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Password is required'),
    newPassword: Yup.string().required('Password is required'),
    confirmNewPassword: Yup.string().required('Password is required'),
});

const ChangePasswordSecurity = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()

    const handleChangePassword = () => {
        navigation.navigate('ConfirmAccountScreen')
    }

    return (
        <Box flex={1}>
            <TitleBar>
                <Text style={styles.title}>Change password</Text>
                <Box />
            </TitleBar>

            <Box style={{ paddingHorizontal: 20 }}>
                <Formik
                    initialValues={{ currentPassword: '', newPassword: '', confirmNewPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleChangePassword}
                >
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
                            <Box style={{ marginTop: 30 }} />
                            <Paragraph>
                                Password should be at least 8 characters, containing letters, numbers, and symbols.
                            </Paragraph>
                            <Box style={{ marginBottom: 30 }} />

                            <CustomInput
                                label="Current Password"
                                value={values.currentPassword}
                                onChangeText={handleChange('currentPassword')}
                                onBlur={handleBlur('currentPassword')}
                                secureTextEntry
                                error={touched.currentPassword && errors.currentPassword}
                            />
                            <CustomInput
                                label="New Password"
                                value={values.newPassword}
                                onChangeText={handleChange('newPassword')}
                                onBlur={handleBlur('newPassword')}
                                secureTextEntry
                                error={touched.newPassword && errors.newPassword}
                            />
                            <CustomInput
                                label="Confirm New Password"
                                value={values.confirmNewPassword}
                                onChangeText={handleChange('confirmNewPassword')}
                                onBlur={handleBlur('confirmNewPassword')}
                                secureTextEntry
                                error={touched.confirmNewPassword && errors.confirmNewPassword}
                            />

                            <Box style={{ marginTop: 20 }} />

                            <Box style={{ marginTop: 5, marginBottom: 40, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                <SvgIcon name="verified" size="lg" style={{ marginRight: 20 }} />
                                <Paragraph marginTop={0}>
                                    Log out on all other devices
                                </Paragraph>
                            </Box>

                            <CustomButton
                                label="Change Password"
                                onPress={handleSubmit}
                                backgroundColor="primary"
                                labelProps={{ color: 'white', variant: 'regular14' }}
                                borderRadius="smm"
                                // isLoading={isLoading || isSubmitting}
                                disabled={
                                    !(values.currentPassword && values.newPassword && values.confirmNewPassword)
                                }
                            />

                            <TouchableOpacity
                                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                                <Text
                                    variant="medium12"
                                    letterSpacing={0.3}
                                    textAlign={'center'}
                                    marginTop={'lg'}
                                    color="primary"
                                    mb="md">
                                    Forgotten Password?
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Formik>

            </Box>
        </Box>
    )
}

export default ChangePasswordSecurity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
})