import Box from '@/components/Box'
import { CustomButton } from '@/components/CustomButton'
import CustomSwitch from '@/components/CustomSwitch/CustomSwitch'
import Paragraph from '@/components/Paragraph/Paragraph'
import SmallSizedParagraph from '@/components/SmallSizedParagraph/SmallSizedParagraph'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const AccountPrivacy = () => {
    return (
        <Box flex={1} backgroundColor={'whiteColor'}>
            <TitleBar>
                <Text style={styles.title}>Account privacy</Text>
                <Box />
            </TitleBar>
            <Box style={{ paddingHorizontal: 20, marginTop: 40 }}>

                <Box>
                    <Paragraph>Private account</Paragraph>
                    <CustomSwitch
                        value={false}
                        onValueChange={() => { }} />
                </Box>

                <SmallSizedParagraph>
                    When your account is public, our profile and posts can be seen by anyone, on or off iBond Elite, even if they don't have an iBond Elite account.
                </SmallSizedParagraph>

                <SmallSizedParagraph>

                    When your account is private, only the followers you approve can see what you share, including your photos or videos on hashtag and location pages, and your followers and following lists.
                </SmallSizedParagraph>

                <Box style={styles.verficationBadgeContainer}>
                    <Box>
                        <Text style={styles.verificationBadgeTitle}>Get verification badge</Text>
                        <Text style={styles.verificationBadgeSubTitle}>Boost trust and show credibility</Text>
                    </Box>
                    <CustomButton
                        label={'Verify now'}
                        labelProps={{ color: 'whiteColor', fontSize: RFValue(13, height), fontWeight: '400' }}
                        borderRadius="sm"
                        style={{ width: 96, height: 34 }}
                    />
                </Box>

            </Box>
        </Box>
    )
}

export default AccountPrivacy

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    verificationBadgeTitle: {
        color: '#151619',
        fontWeight: '600',
        fontSize: RFValue(15, height),
    },
    verificationBadgeSubTitle: {
        color: '#3D3F4B',
        fontWeight: '400',
        fontSize: RFValue(12, height),
    },
    verficationBadgeContainer: {
        backgroundColor: '#F0E6FC',
        flexDirection: 'row',
        padding: 16,
        borderRadius: 8,
        justifyContent: 'space-between',
        marginTop: 60,
    },
})