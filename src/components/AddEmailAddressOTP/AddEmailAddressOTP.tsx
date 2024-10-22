

import React, { useState } from 'react'
import Box from '../Box'
import Text from '../Text'
import OTPInput from '../InputOtp';
import Paragraph from '../Paragraph/Paragraph';
import { useAppSelector } from '@/reduxFolder/index';

type AddEmailAddressOTPProps = {
    setCode: React.Dispatch<React.SetStateAction<string>>
    error: string
}



const AddEmailAddressOTP = ({ setCode, error }: AddEmailAddressOTPProps) => {
    const userData = useAppSelector(state => state.user.userData)

    const censoredEmail = `${userData?.email.slice(0, 2)} **** ${userData?.email.slice(-5)}`

    return (
        <>
            <Paragraph>To confirm it’s you, enter the code sent to your primary email at {censoredEmail}</Paragraph>
            <Box style={{ marginTop: 30 }} />
            <OTPInput onCodeComplete={setCode} error={error} />

        </>
    )
}

export default AddEmailAddressOTP