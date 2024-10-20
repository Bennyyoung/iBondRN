
import Box from '@/components/Box'
import { CustomButton } from '@/components/CustomButton'
import Image from '@/components/Image'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import { StackParamsList } from '@/navigation/types'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { Dimensions, Platform, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const SelfieTaken = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
    const route = useRoute<RouteProp<StackParamsList, 'SelfieTaken'>>()
    const { selfie } = route.params
    console.log('selfie', selfie);


    return (
        <Box style={styles.container}>
            <TitleBar>
                <Box style={styles.titleContainer}>
                    <Text style={styles.titleText}>Verify Account</Text>
                </Box>
                <Box />
            </TitleBar>
            <Text style={styles.documentType}>Document type</Text>
            <Text>Please choose the country that issued the ID document you have on hand.</Text>

            <Box style={styles.displayBox}>
                {selfie && <Image source={{ uri: selfie?.path }} style={styles.selectedImage} />}
            </Box>

            <Box paddingHorizontal={"lg"} flexDirection={'row'} justifyContent={"space-between"} marginTop={"Ml"}>
                <Box width={'40%'}>
                    <CustomButton
                        label={'Retake'}
                        style={{
                            borderWidth: 0.5,
                            borderColor: 'grey',
                            alignContent: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#F0E6FC'
                        }}
                    />
                </Box>
                <Box width={'40%'}>
                    <CustomButton
                        label={'Use Photo'}
                        labelProps={{ color: 'white' }}
                        onPress={() => navigation.navigate("VerificationRequestSubmitted")}

                    />
                </Box>
            </Box>
        </Box>
    )
}

export default SelfieTaken

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
    titleText: {
        color: '#151619',
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    documentType: {
        fontWeight: '600',
        fontSize: RFValue(24, height),
        marginTop: 80
    },
    subText: {
        fontWeight: '400',
        fontSize: RFValue(16, height)
    },
    displayBox: {
        width: 351,
        height: 411,
        borderColor: '#CDCED7',
        borderWidth: 1,
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10.79,
    }
})