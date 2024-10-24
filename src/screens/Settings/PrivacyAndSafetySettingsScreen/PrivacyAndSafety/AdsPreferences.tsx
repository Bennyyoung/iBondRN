import Box from '@/components/Box'
import CustomSwitch from '@/components/CustomSwitch/CustomSwitch'
import Paragraph from '@/components/Paragraph/Paragraph'
import SmallSizedParagraph from '@/components/SmallSizedParagraph/SmallSizedParagraph'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import React, { useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const AdsPreferences = () => {
    const [toggle, setToggle] = useState(true)
    return (
        <Box flex={1} backgroundColor={'whiteColor'}>
            <TitleBar>
                <Text style={styles.title}>Ads preferences</Text>
                <Box />
            </TitleBar>

            <Box style={{ paddingHorizontal: 20, marginTop: 40 }}>

                <Box flexDirection={'row'} justifyContent={'space-between'}>
                    <Paragraph>
                        Personalized ads
                    </Paragraph>

                    <CustomSwitch
                        value={toggle}
                        onValueChange={() => setToggle(prev => !prev)}
                    />
                </Box>

                <SmallSizedParagraph>
                    We serve you ads on iBond Elite based on your activity. Ads are further personalized when this setting is enabled by combining your platform activity with other online activity and information from our partners.
                    Learn more
                </SmallSizedParagraph>
            </Box>
        </Box>
    )
}

export default AdsPreferences

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
})