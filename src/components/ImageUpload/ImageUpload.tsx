import { Dimensions, StyleSheet, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Box from "../Box"
import { RFValue } from "react-native-responsive-fontsize"
import ImageUploadIcon from "@/assets/svg/imageUploadIcon.svg"
import Text from "../Text"
import { FormikErrors } from "formik"
import { useState } from "react"
import { launchImageLibrary } from "react-native-image-picker"
import { SvgIcon } from "@/assets/icons"
import React from "react"

const { height } = Dimensions.get('window')

type ImageUploadProps = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<{
        eventPhoto: string;
        eventTitle: string;
        eventCategory: string;
        eventDate: string;
        startTime: string;
        endTime: string;
        eventType: '',
        location: '',
        eventPrivacy: '',
        group: '',
        otherDetails: string;
    }>>
}

const ImageUpload = ({ setFieldValue }: ImageUploadProps) => {
    const [imageUri, setImageUri] = useState(null)

    const handleImageUpload = async () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 1920,
            maxHeight: 1080,
            quality: 1
        }

        try {
            const result = await launchImageLibrary(options);
            if (result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0].uri;
                setImageUri(selectedImage)
                setFieldValue('eventPhoto', imageUri)
            }

        } catch (error) {

        }
    }

    return (
        <>
            <TouchableOpacity style={styles.roundedBox} onPress={handleImageUpload}>
                {
                    imageUri ? (
                        <>
                            <Image source={{ uri: imageUri }} style={styles.imagePreview} />

                            <Box style={styles.changePhotoContainer}>
                                <SvgIcon name="gallery_add" size="sml" />
                                <Text style={styles.changePhotoText}>Change photo</Text>
                            </Box>
                        </>
                    ) : (
                        <>
                            <ImageUploadIcon />
                            <Text style={styles.addPhoto}>Add Photo</Text>

                        </>
                    )
                }
            </TouchableOpacity >

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
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    changePhotoContainer: {
        zIndex: 1,
        position: 'absolute',
        alignItems: 'center'
    },
    changePhotoText: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: RFValue(11, height),
        lineHeight: 13,
        letterSpacing: 0.06
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