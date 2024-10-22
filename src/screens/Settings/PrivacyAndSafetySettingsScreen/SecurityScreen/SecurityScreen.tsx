import Box from '@/components/Box'
import SettingsRow from '@/components/SettingsRow/SettingsRow'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import { StackParamsList } from '@/navigation/types'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const securitySettings = [
    {
        id: 1,
        title: 'Email addresses',
        link: 'EmailAddressesScreen',
    },
    {
        id: 2,
        title: 'Phone numbers',
        link: 'PhoneNumbersScreen',
    },
    {
        id: 3,
        title: 'Change password',
        link: 'ChangePasswordScreen',
    },
    {
        id: 4,
        title: 'Connected devices',
        link: 'ConnectedDevicesScreen',
    },
    {
        id: 5,
        title: 'Two-step authentication',
        link: 'TwoStepAuthenticationScreen',
    },
]

const SecurityScreen = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>(); // Get the navigation object

    return (
        <Box flex={1} backgroundColor={'white'}>
            <TitleBar>
                <Box style={styles.title}>
                    <Text style={styles.settings}>Security</Text>
                </Box>
                <Box />
            </TitleBar>
            <Box paddingHorizontal={"sml"} flex={1}>

                {
                    securitySettings.map(security => (
                        <TouchableOpacity
                            key={security.id}
                            style={styles.item}
                            onPress={() => navigation.navigate(security.link)} // Navigate to security.link

                        >
                            <SettingsRow title={security.title} />
                        </TouchableOpacity>
                    ))
                }
            </Box>
        </Box>
    )
}

export default SecurityScreen

const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 0.2,
        borderBottomColor: '#c6c6c8',
    },
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        paddingVertical: RFValue(10),
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    settings: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
        color: '#151619',
    },
})