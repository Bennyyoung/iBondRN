

import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import CustomInput from '../CustomInput'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomButton } from '../CustomButton';
import Box from '../Box';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const { height } = Dimensions.get('window')

const AddEmailAddressForm = () => {

    return (
        <>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log('Form Submitted: ', values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {

                    return (
                        <View>
                            <CustomInput
                                label={'New Email Address'}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                error={touched.email && errors.email}
                            />
                            <CustomInput
                                label={'iBond Password'}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                secureTextEntry
                                error={touched.password && errors.password}
                            />
                            <Text style={styles.confirmationText}>
                                A confirmation link will be sent to this email address. Click the link to verify and ad this email.
                            </Text>
                            <Box style={styles.buttonContainer}>

                                <CustomButton
                                    label="Submit"
                                    backgroundColor="primary"
                                    alignItems="center"
                                    labelProps={{ color: 'whiteColor' }}
                                    borderRadius="sm"
                                    onPress={() => handleSubmit()}
                                />
                            </Box>
                        </View>
                    )
                }
                }
            </Formik>

        </>
    )
}

export default AddEmailAddressForm

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 16,
        backgroundColor: '#fff',
        marginTop: 'auto',
    },
    confirmationText: {
        fontWeight: '400',
        fontSize: RFValue(13, height)
    }
})