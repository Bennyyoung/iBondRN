import { Dimensions, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Box from "../Box"
import { RFValue } from "react-native-responsive-fontsize"
import ImageUploadIcon from "@/assets/svg/imageUploadIcon.svg"
import Text from "../Text"

const { height } = Dimensions.get('window')

const ImageUpload = () => {

    return (
        <>
            <TouchableOpacity style={styles.roundedBox}>
                <ImageUploadIcon />
                <Text style={styles.addPhoto}>Add Photo</Text>
            </TouchableOpacity>

            <Text style={styles.photoRecommendation}>Add a 16:9 cover photo. 1920x1080 recommended.</Text>
        </>
    )
}


const styles = StyleSheet.create({
    roundedBox: {
        width: RFValue(431, height),
        height: RFValue(203.06, height),
        backgroundColor: '#FBF7FF',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#CFB0F5'
    },
    addPhoto: {
        color: '#6500E0',
        fontWeight: '400',
        fontSize: RFValue(11, height),
        lineHeight: 13,
        letterSpacing: 0.06,
        marginTop: 5
    },
    photoRecommendation: {
        color: '#616379',
        fontWeight: '400',
        fontSize: RFValue(11, height),
        lineHeight: 13,
        letterSpacing: 0.06,
        marginVertical: 10
    }
})

export default ImageUpload