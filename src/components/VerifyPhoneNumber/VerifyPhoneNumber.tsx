import React, { useState } from 'react'
import Box from '../Box'
import Text from '../Text'
import OTPInput from '../InputOtp';
import Paragraph from '../Paragraph/Paragraph';
import { useAppSelector } from '@/reduxFolder/index';

type VerifyPhoneNumberProps = {
    setCode: React.Dispatch<React.SetStateAction<string>>
    error: string
}

const VerifyPhoneNumber = ({ setCode, error }: VerifyPhoneNumberProps) => {

    return (
        <>
            <Paragraph>Enter the verification code sent to the new phone number</Paragraph>
            <Box style={{ marginTop: 30 }} />
            <OTPInput onCodeComplete={setCode} error={error} />

        </>
    )
}

export default VerifyPhoneNumber