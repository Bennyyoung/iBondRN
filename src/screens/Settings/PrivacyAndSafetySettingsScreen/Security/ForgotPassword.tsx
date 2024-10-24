import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFormik } from 'formik'; // For form handling
import { CustomButton } from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import Box from '@/components/Box';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '@/components/Text';
import Heading from '@/components/Heading/Heading';
import Paragraph from '@/components/Paragraph/Paragraph';
import TitleBar from '@/components/TitleBar/TitleBar';
import { StackParamsList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
const { height } = Dimensions.get('window')

const ForgotPasswordScreen = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()


    const handleContinue = () => {
        navigation.navigate('ConfirmAccountScreen')
    }

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting
    } = useFormik({
        initialValues: { emailOrPhone: '' },
        // Add your validation schema here
        onSubmit: handleContinue
    });

    return (
        <Box flex={1}>
            <TitleBar>
                <Box />
                <Box />
            </TitleBar>
            <Box style={{ paddingHorizontal: 20 }}>
                <Box marginTop={"lg"} />
                <Heading>
                    Forgot password
                </Heading>
                <Paragraph>
                    Enter your email address to reset password
                </Paragraph>
                <Box marginTop={"sml"} />


                {/* Input for Email or Phone */}
                <CustomInput
                    label={'Email'}
                    value={values.emailOrPhone}
                    onChangeText={handleChange('emailOrPhone')}
                    onBlur={handleBlur('emailOrPhone')}
                    error={touched.emailOrPhone && errors.emailOrPhone}
                    keyboardType={"email-address"}
                />

                {/* Continue Button */}
                <CustomButton
                    label="Continue"
                    onPress={() => handleContinue()}
                    backgroundColor="primary"
                    labelProps={{ color: 'white', variant: 'regular14' }}
                    borderRadius="smm"
                    style={{
                        marginTop: RFValue(20),
                        marginBottom: RFValue(10),
                    }}
                    isLoading={isSubmitting}
                    disabled={!values.emailOrPhone}
                />

                {/* Toggle between email and phone number */}
                <TouchableOpacity onPress={() => {}}>
                    <Text style={{ color: '#6500E0', textAlign: 'center', marginTop: RFValue(10), fontSize: RFValue(13, height) }}>
                        Use Phone number instead
                    </Text>
                </TouchableOpacity>

            </Box>
        </Box>
    );
};

export default ForgotPasswordScreen;

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