import Box from '@/components/Box'
import Heading from '@/components/Heading/Heading'
import Paragraph from '@/components/Paragraph/Paragraph'
import SettingsListItem from '@/components/SettingsListItem/SettingsListItem'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import VerificationRadioItems from '@/components/VerificationRadioItems/VerificationRadioItems'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const vidoeData = [
    {
        id: 1,
        title: 'On Mobile data and Wi-Fi'
    },
    {
        id: 2,
        title: 'Wi-Fi only'
    },
    {
        id: 3,
        title: 'Never autoplay videos'
    },
]

const audioData = [
    {
        id: 1,
        label: 'Play sound effects',
        sublabel: "Sound effects are sometimes used to give you feedback on your actions and something that's about to happen.",
        switchProps: {
            value: true, // Switch is turned on
            onValueChange: (newValue: boolean) => {
                console.log("Push notification switched to: ", newValue);
            },
        },
    },
    {
        id: 2,
        label: 'Mute autoplayed videos',
        sublabel: "When autoplay is on, video audio is played by default. Toggle this on to mute. It will require you to always manually unmute each time a video is autoplayed",
        switchProps: {
            value: true, // Switch is turned on
            onValueChange: (newValue: boolean) => {
                console.log("Push notification switched to: ", newValue);
            },
        },
    },
]

const AutoPlayScreen = () => {
    const [selectedPreference, setSelectedPreference] = useState<number | null>(null)

    const handlePreferenceChange = (id: number) => {
        setSelectedPreference(id)
    }
    return (
        <Box style={styles.container}>
            <TitleBar>
                <Box style={styles.mainTitleContainer}>
                    <Text style={styles.title}>
                        Autoplay
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { /* Handle save action */ }}>
                    <Text style={styles.action}>
                        Save
                    </Text>
                </TouchableOpacity>
            </TitleBar>
            <Box style={{ marginBottom: 70 }} />
            <Heading>
                Select your preferred feed content.
            </Heading>

            <Box style={{ marginTop: 30 }} />

            <Paragraph>Videos</Paragraph>

            {
                vidoeData.map(data => (
                    <VerificationRadioItems
                        title={data.title}
                        checked={selectedPreference === data.id}
                        onPress={() => handlePreferenceChange(data.id)}
                    />

                ))
            }
            <Box style={{ marginTop: 80 }} />
            <Paragraph>Audio</Paragraph>

            {
                audioData.map(data => (
                    <SettingsListItem
                        key={data.id}
                        label={data.label}
                        sublabel={data.sublabel}
                        switchProps={data.switchProps}
                    />

                ))
            }
        </Box>
    )
}

export default AutoPlayScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
    mainTitleContainer: {
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    title: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
    },
    action: {
        color: '#6500E0',
        fontWeight: '400',
        fontSize: RFValue(17, height),
    }
})