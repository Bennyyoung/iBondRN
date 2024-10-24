
import { SvgIcon } from '@/assets/icons'
import Box from '@/components/Box'
import { CustomButton } from '@/components/CustomButton'
import Paragraph from '@/components/Paragraph/Paragraph'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import VerificationItem from '@/components/VerificationItem/VerificationItem'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const infos = [
    {
        id: 1,
        icon: <SvgIcon name="editBadge" size="lg" />,
        description: "Multi-factor authentication adds extra layer of security to your account."
    },
    {
        id: 2,
        icon: <SvgIcon name="editBadge" size="lg" />,
        description: "This feature requires a verification code whenever you sign in on a new device."
    },
    {
        id: 3,
        icon: <SvgIcon name="editBadge" size="lg" />,
        description: "Turning this feature on will log you out anywhere you’re currently signed in, including your remembered devices."
    },
]

function TwoStepAuthenticationScreen() {
    return (
        <Box flex={1} backgroundColor={'white'}>
            <TitleBar>
                <Text style={styles.title}>Multi-factor authentication</Text>
                <Box />
            </TitleBar>

            <Box paddingHorizontal={'lg'} marginTop={'Ml'}>
                <Paragraph>
                    Multi-factor authentication adds extra layer of security to your account.
                </Paragraph>

                {
                    infos.map(info => (
                        <VerificationItem
                            key={info.id}
                            icon={info.icon}
                            description={info.description}
                        />
                    ))
                }
                <Box marginBottom={'lg'} />
                <CustomButton
                    label="Setup"
                    backgroundColor="primary"
                    alignItems="center"
                    labelProps={{ color: 'whiteColor' }}
                    borderRadius="sm"
                    onPress={() => { }}
                />

            </Box>
        </Box>
    )
}

export default TwoStepAuthenticationScreen

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    buttonContainer: {
        paddingVertical: 16,
        backgroundColor: '#fff',
        marginTop: 'auto',
    },
    bottomText: {
        fontSize: RFValue(13, height)
    }
})