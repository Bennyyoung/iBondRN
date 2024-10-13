import { Dimensions, StyleSheet, Image } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Box from "../Box"
import { RFValue } from "react-native-responsive-fontsize"
import Text from "../Text"
import { FormikErrors } from "formik"
import { useState } from "react"
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker"
import { SvgIcon } from "@/assets/icons"
import React from "react"

const { height } = Dimensions.get('window')

type Placeholders = {
    default: {
        title: string;
        icon: React.JSX.Element;
    };
    withImage: {
        title: string;
        icon: React.JSX.Element;
    };
};

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
    error?: string | boolean;
    placeholders: Placeholders
    recommendedText?: string
}



const fetchFile = async (filePath: string): Promise<File> => {
    console.log('filePath', filePath);
    
    const response = await fetch(filePath);
    const blob = await response.blob();
    const file = new File([blob], filePath.split('/').pop() || 'file.jpg', {
        type: blob.type,
    });
    return file;
};

const ImageUpload = ({ setFieldValue, error, placeholders, recommendedText }: ImageUploadProps) => {
    const [imageUri, setImageUri] = useState<string | null>(null)

    const handleImageUpload = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            maxWidth: 1920,
            maxHeight: 1080,
            quality: 1
        }

        try {
            const result = await launchImageLibrary(options);
            if (result.assets && result.assets.length > 0) {
                const selectedImage = result.assets[0].uri;
                if (selectedImage) {
                    setImageUri(selectedImage)
                    // const image = selectedImage.split('/').pop()
                    const file = await fetchFile(selectedImage)

                    setFieldValue('eventPhoto', file)
                }
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
                                {placeholders.withImage.icon}
                                <Text style={styles.changePhotoText}>{placeholders.withImage.title}</Text>
                            </Box>
                        </>
                    ) : (
                        <>
                            {placeholders.default.icon}
                            <Text style={styles.addPhoto}>{placeholders.default.title}</Text>

                        </>
                    )
                }
            </TouchableOpacity >

            {recommendedText && <Text style={styles.photoRecommendation}>{recommendedText}</Text>}
            {error && typeof error === 'string' && (
                <Text style={styles.errorText}>{error}</Text>
            )}
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
    },
    errorText: {
        color: '#FF3B30',
        fontSize: RFValue(12),
        marginTop: RFValue(4),
    },
})

export default ImageUpload