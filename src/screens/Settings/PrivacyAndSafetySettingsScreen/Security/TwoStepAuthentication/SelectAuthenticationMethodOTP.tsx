
import { SvgIcon } from '@/assets/icons'
import Box from '@/components/Box'
import { CustomButton } from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import Heading from '@/components/Heading/Heading'
import OTPInput from '@/components/InputOtp'
import Paragraph from '@/components/Paragraph/Paragraph'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import { StackParamsList } from '@/navigation/types'
import { useAppSelector } from '@/reduxFolder/index'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
const { height } = Dimensions.get('window')

const SelectAuthenticationMethodOTP = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const userData = useAppSelector(state => state.user.userData)
    const censoredEmail = `${userData?.email.slice(0, 2)} **** ${userData?.email.slice(-5)}`


    const handleContinue = () => {
        navigation.navigate("NewPasswordScreen");
    };

    return (
        <Box flex={1}>
            <TitleBar>
                <Box />
                <Box />
            </TitleBar>

            <Box style={{ paddingHorizontal: 20 }}>
                <Box style={{ marginTop: 30 }} />
                <Heading>
                    We sent a code to the choosen phone number
                </Heading>
                <Paragraph>
                    Enter the 6-digit code sent to +2348012345678
                </Paragraph>
                <Box style={{ marginBottom: 30 }} />

                <OTPInput onCodeComplete={setCode} error={error} />
                <Box style={{ marginBottom: 30 }} />

                <CustomButton
                    label="Complete setup"
                    onPress={() => handleContinue()}
                    backgroundColor="primary"
                    labelProps={{ color: 'white', variant: 'regular14' }}
                    borderRadius="smm"
                // isLoading={isLoading || isSubmitting}
                // disabled={
                //     !(values.currentPassword && values.newPassword && values.confirmNewPassword)
                // }
                />

                <Box flexDirection={"row"} alignSelf={'center'} marginTop={'lg'}>
                    <Text style={[styles.bottomText, { fontWeight: '400' }]}>
                        Didn’t receive code? {' '}
                    </Text>
                    <Text style={[styles.bottomText, { color: '#6500E0', fontWeight: '600' }]}>
                        Resend
                    </Text>
                </Box>
            </Box>
        </Box>
    )
}

export default SelectAuthenticationMethodOTP

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    bottomText: {
        fontSize: RFValue(13, height)
    }
})