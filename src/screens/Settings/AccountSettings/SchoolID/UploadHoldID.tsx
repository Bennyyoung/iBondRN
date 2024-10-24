import { SvgIcon } from '@/assets/icons/SvgIcon'
import Box from '@/components/Box'
import { CustomButton } from '@/components/CustomButton'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import VerificationItem from '@/components/VerificationItem/VerificationItem'
import { StackParamsList } from '@/navigation/types'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')
const data = [
    {
        id: 1,
        icon: <SvgIcon name="editBadge" size="lg" />,
        description: "To get it right make sure the photo is taken in good light"
    },
    {
        id: 2,
        icon: <SvgIcon name="editBadge" size="lg" />,
        description: "Details are in focus"
    },
    {
        id: 3,
        icon: <SvgIcon name="editBadge" size="lg" />,
        description: "There is no glare on the ID"
    },
]

const UploadHoldID = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
    return (
        <Box style={styles.container}>
            <TitleBar>
                <Box style={styles.titleContainer}>
                    {/* <Text style={styles.titleText}>School ID</Text> */}
                    <Box />
                </Box>
            </TitleBar>

            <Text style={styles.title}>
                Upload a photo of yourself
                holding your ID
            </Text>
            {
                data.map(datum => (
                    <VerificationItem
                        key={datum.id}
                        icon={datum.icon}
                        description={datum.description}
                    />
                ))
            }



            <Box style={styles.buttonContainer}>
                <CustomButton
                    label={'Continue'}
                    labelProps={{ color: 'whiteColor' }}
                    borderRadius="sm"
                    onPress={() => navigation.navigate('SelfieScreen')}
                />
            </Box>
        </Box>
    )
}

export default UploadHoldID

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30
    },
    titleContainer: {
        paddingVertical: RFValue(10),
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: '600',
        fontSize: RFValue(24, height),
        lineHeight: 26,
        letterSpacing: -0.26,
        width: 278,
        marginTop: 30,
        marginBottom: 40
    },
    buttonContainer: {
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
        backgroundColor: '#fff', // Optional background to separate from other content
    },
})