import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import CustomInput from '../CustomInput'
import { Formik } from 'formik'
import * as Yup from 'yup';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomButton } from '../CustomButton';
import Box from '../Box';

const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10,15}$/, 'Phone number must be between 10 and 15 digits')
        .required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

const { height } = Dimensions.get('window')

type AddPhoneNumberFormProps = {
    handleNextSlide: () => void
}

const AddPhoneNumberForm = ({ handleNextSlide }: AddPhoneNumberFormProps) => {
    console.log('handleNextSlide', handleNextSlide);


    return (
        <>
            <Formik
                initialValues={{ phoneNumber: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => console.log('Form Submitted: ', values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {

                    return (
                        <View>
                            <CustomInput
                                label={'New Phone number'}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber}
                                onChangeText={handleChange('phoneNumber')}
                                error={touched.phoneNumber && errors.phoneNumber}
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
                                A confirmation link will be sent to this phone number address. Click the link to verify and add this phone number.
                            </Text>
                            <Box style={styles.buttonContainer}>

                                <CustomButton
                                    label="Submit"
                                    backgroundColor="primary"
                                    alignItems="center"
                                    labelProps={{ color: 'whiteColor' }}
                                    borderRadius="sm"
                                    onPress={() => handleNextSlide()}
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

export default AddPhoneNumberForm

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 16,
        backgroundColor: '#fff',
        marginTop: 'auto',
    },
    confirmationText: {
        fontWeight: '400',
        fontSize: RFValue(13, height)
    },
})