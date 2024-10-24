import Box from "@/components/Box"
import { CustomButton } from "@/components/CustomButton"
import Heading from "@/components/Heading/Heading"
import Paragraph from "@/components/Paragraph/Paragraph"
import Text from "@/components/Text"
import TitleBar from "@/components/TitleBar/TitleBar"
import VerificationRadioItems from "@/components/VerificationRadioItems/VerificationRadioItems"
import { StackParamsList } from "@/navigation/types"
import { useNavigation } from "@react-navigation/core"
import { StackNavigationProp } from "@react-navigation/stack"
import { useState } from "react"
import { Dimensions, StyleSheet } from "react-native"
import { RFValue } from "react-native-responsive-fontsize"


const { height } = Dimensions.get('window')

const data = [
    {
        id: 1,
        title: 'Deactivate account',
        description: "Your account and all posts will not be seen by anyone. You can reactivate your account anytime and you won't lose anything, like you never left.",
    },
    {
        id: 2,
        title: 'Delete account',
        description: "Your account will be deleted permanently alongside all your posts. You can cancel the deletion and reinstate your account within 30 days.",
    },
]

const DeactivateDeleteAccountScreen = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
    const [selectedPreference, setSelectedPreference] = useState<number | null>(null)

    const handlePreferenceChange = (id: number) => {
        setSelectedPreference(id)
    }


    const handleContinue = () => {
        if (selectedPreference === 1) {
            navigation.navigate('DeactivateAccountScreen')
        } else {
            navigation.navigate("DeleteAccountScreen")

        }
    }
    return (
        <Box flex={1} backgroundColor={'white'}>
            <TitleBar>
                <Text style={styles.title}>Account Status</Text>
                <Box />
            </TitleBar>

            <Box paddingHorizontal={'lg'} flex={1}>
                <Heading>Deactivate or Delete Account</Heading>
                <Paragraph>Choose an option to deactivate temporarily or delete permanently.</Paragraph>
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

                <Box style={styles.buttonContainer}>

                    <CustomButton
                        alignItems="center"
                        backgroundColor="primary"
                        borderRadius="sm"
                        justifyContent="center"
                        label="Continue"
                        labelProps={{ color: 'whiteColor' }}
                        labelVariant="regular12"
                        onPress={handleContinue}
                    />
                </Box>

            </Box>
        </Box>
    )
}

export default DeactivateDeleteAccountScreen

const styles = StyleSheet.create({
    fullName: {
        fontWeight: '600',
        fontSize: RFValue(20, height)
    },
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        flex: 1
    },
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    buttonContainer: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        left: 0,
        right: 0,
        // width: '100%',
        padding: 20,
        // backgroundColor: 'red', // Optional background to separate from other content
    },
})