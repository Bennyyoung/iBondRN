import { SvgIcon } from '@/assets/icons'
import Box from '@/components/Box'
import Paragraph from '@/components/Paragraph/Paragraph'
import SettingsListItem from '@/components/SettingsListItem/SettingsListItem'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const switchProps = {
    value: true, // Switch is turned on
    onValueChange: (newValue: boolean) => {
        console.log("Push notification switched to: ", newValue);
    },
}

const TwoStepAuthenticationSetupComplete = () => {
    return (
        <Box flex={1} backgroundColor={'whiteColor'}>
            <TitleBar>
                <Text style={styles.title}>Connected Devices</Text>
                <Box />
            </TitleBar>
            <Box style={{ paddingHorizontal: 20, marginTop: 40 }}>
                <Paragraph>
                    Multi-factor authentication adds extra layer of security to your account.
                </Paragraph>

                <SettingsListItem
                    label={'Multifactor authentication'}
                    sublabel={'We will send an authentication code via SMS, email or get code from registered authentication app when using an unrecognized device to sign in'}
                    switchProps={switchProps}
                />
                <Box flexDirection={'row'} paddingVertical={'sml'} justifyContent={'space-between'} borderBottomWidth={0.2} style={{ borderBottomColor: '#c6c6c8' }}>
                    <Paragraph>Email</Paragraph>
                    <SvgIcon name="editBadge" size="lg" />
                </Box>
                <Box flexDirection={'row'} paddingVertical={'sml'} justifyContent={'space-between'} borderBottomWidth={0.2} style={{ borderBottomColor: '#c6c6c8' }}>
                    <Paragraph>SMS</Paragraph>
                    <SvgIcon name="editBadge" size="lg" />
                </Box>
                <Box flexDirection={'row'} paddingVertical={'sml'} justifyContent={'space-between'} borderBottomWidth={0.2} style={{ borderBottomColor: '#c6c6c8' }}>
                    <Paragraph>Authentication app</Paragraph>
                    <Text style={{ fontWeight: '400', fontSize: RFValue(17, height), color: '#6500E0' }}>Setup</Text>
                </Box>
            </Box>

        </Box>
    )
}

export default TwoStepAuthenticationSetupComplete

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
})