
import Box from '@/components/Box'
import Heading from '@/components/Heading/Heading'
import SelectInput from '@/components/SelectInput'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import { Formik } from 'formik'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Yup from 'yup';
import { useAppSelector } from '@/reduxFolder/index';
import CustomInput from '@/components/CustomInput'
import { CustomButton } from '@/components/CustomButton'

const { height } = Dimensions.get('window')

const validationSchema = Yup.object().shape({
    authenticationMethod: Yup.string().required('Bank Name is required'),
    phoneNumber: Yup.string().when('authenticationMethod', {
        is: 'SMS',
        then: Yup.string().required('Phone number is required'),
    }),

    iBondPassword: Yup.string().required('iBond Password is required'),
});




const SelectAuthenticationMethodScreen = () => {
    const userData = useAppSelector(state => state.user.userData); // Make sure userData is needed.

    const authenticationMethods = [
        { id: 'sms', value: 'SMS' },
        { id: 'email', value: 'Email' },
    ];

    const phoneNumbers = [
        { id: 'userData?.phoneNumber', value: userData?.phoneNumber }, // Example number, replace as needed.
        { id: '+0987654321', value: '+0987654321' },
    ];

    return (
        <Box flex={1} backgroundColor="white">
            <TitleBar>
                <Box />
                <Box />
            </TitleBar>

            <Box paddingHorizontal="lg" paddingTop="lg">
                <Heading>Select authentication method</Heading>
                <Box marginTop="lg" />

                <Formik
                    initialValues={{
                        authenticationMethod: '',
                        phoneNumber: '',
                        iBondPassword: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log('Form Submitted:', values);
                    }}
                >
                    {({ handleChange, handleBlur, values, errors, touched, setFieldValue }) => {
console.log('values', values);

                        return (
                            <React.Fragment>
                                <SelectInput
                                    label="Authentication Method"
                                    selectedValue={values.authenticationMethod}
                                    list={authenticationMethods}
                                    getSelectedValue={(value) =>
                                        setFieldValue('authenticationMethod', value)
                                    }
                                    errorMessage={
                                        touched.authenticationMethod &&
                                        errors.authenticationMethod
                                    }
                                    showHeader
                                    iconName="chevron_downward"
                                    iconSize="sml"
                                />
    
                                {values.authenticationMethod === 'sms' && (
                                    <SelectInput
                                        label="Phone Number"
                                        selectedValue={values.phoneNumber}
                                        list={phoneNumbers}
                                        getSelectedValue={(value) =>
                                            setFieldValue('phoneNumber', value)
                                        }
                                        errorMessage={
                                            touched.phoneNumber && errors.phoneNumber
                                        }
                                        showHeader
                                        iconName="chevron_downward"
                                        iconSize="sml"
                                    />
                                )}
    
                                {values.authenticationMethod &&
                                    values.phoneNumber && (
                                        <CustomInput
                                            label="iBond Password"
                                            value={values.iBondPassword}
                                            onChangeText={handleChange('iBondPassword')}
                                            onBlur={handleBlur('iBondPassword')}
                                            error={
                                                touched.iBondPassword && errors.iBondPassword
                                            }
                                            secureTextEntry
                                        />
                                    )}
    
                                <Box marginTop="lg" />
    
                                <CustomButton
                                    label="Send code"
                                    backgroundColor="primary"
                                    alignItems="center"
                                    labelProps={{ color: 'whiteColor' }}
                                    borderRadius="sm"
                                    onPress={() => console.log('Button Pressed')}
                                />
                            </React.Fragment>
                        )
                    }}
                </Formik>
            </Box>
        </Box>
    );
};

export default SelectAuthenticationMethodScreen

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
})