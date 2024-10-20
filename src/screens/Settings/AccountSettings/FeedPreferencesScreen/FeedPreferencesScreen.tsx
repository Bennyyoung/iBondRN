import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Box from '@/components/Box'
import Heading from '@/components/Heading/Heading'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import VerificationRadioItems from '@/components/VerificationRadioItems/VerificationRadioItems'

const { height } = Dimensions.get('window')

const data = [
    {
        id: 1,
        title: 'Most relevant posts (recommended)',
        description: "We'll use your activities, interest and profile information to personalize your feed",
    },
    {
        id: 2,
        title: 'Most recent posts',
        description: "We also personalize your feed based on your activities, profile information and interests but it will be sorted in chronological order.",
    },
]

const FeedPreference = () => {
    const [selectedPreference, setSelectedPreference] = useState<number | null>(null)

    const handlePreferenceChange = (id: number) => {
        setSelectedPreference(id)
    }

    return (
        <Box style={styles.container}>
            <TitleBar>
                <Box style={styles.mainTitleContainer}>
                    <Text style={styles.title}>
                        Feed preference
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { /* Handle save action */ }}>
                    <Text style={styles.action}>
                        Save
                    </Text>
                </TouchableOpacity>
            </TitleBar>

            <Box style={{ marginTop: 70 }} />

            <Heading>
                Select your preferred feed content.
            </Heading>

            <Box style={{ marginTop: 30 }} />


            {data.map(datum => (
                <VerificationRadioItems
                    key={datum.id}
                    title={datum.title}
                    description={datum.description}
                    checked={selectedPreference === datum.id}
                    onPress={() => handlePreferenceChange(datum.id)}
                />
            ))}
        </Box>
    )
}

export default FeedPreference

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