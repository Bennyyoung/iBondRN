import { SvgIcon } from '@/assets/icons'
import usePhotoUploadBottomSheet from '@/components/BottomSheetHooks/usePhotoUploadModal'
import Box from '@/components/Box'
import { CustomButton } from '@/components/CustomButton'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import { StackParamsList } from '@/navigation/types'
import { setUserData, updateRegistrationData } from '@/reduxFolder/features/auth/slices'
import { useUploadFilesMutation } from '@/reduxFolder/features/uploads/service'
import { showToast, showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper'
import { useNavigation } from '@react-navigation/core'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useRef, useState } from 'react'
import { Alert, Dimensions, Image, Keyboard, Modal, NativeScrollEvent, NativeSyntheticEvent, Platform, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { check, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions'
import { RFValue } from 'react-native-responsive-fontsize'
import { useAppDispatch } from '@/reduxFolder/index'
import { useAppSelector } from '@/reduxFolder/index';
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Camera } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const { width, height } = Dimensions.get('window')

const slides = [
    {
        id: 1,
        icon: <SvgIcon name="documentUpload" size='sml' />,
        description: 'Upload the front side of your document'
    },
    {
        id: 2,
        icon: <SvgIcon name="documentUpload" size='sml' />,
        description: 'Upload the back side of your document'
    },
]



const SchoolID = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView | null>(null);
    const { openPhotoUploadBottomSheet } = usePhotoUploadBottomSheet();
    const [pictureData, setPictureData] = useState({
        photograph: '',
        path: '',
    });
    const dispatch = useAppDispatch();
    const [uploadFiles, { isLoading, error }] = useUploadFilesMutation();
    const userData = useAppSelector(state => state.user.userData)
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false); // Close modal handler

    const requestCameraPermission = async () => {
        try {
            const status = await check(
                Platform.OS === 'android'
                    ? PERMISSIONS.ANDROID.CAMERA
                    : PERMISSIONS.IOS.CAMERA,
            );

            if (status === RESULTS.GRANTED) {
                await launchCamera(
                    {
                        includeBase64: true,
                        mediaType: 'photo',
                        quality: 1,
                        saveToPhotos: true,
                        cameraType: 'front',
                    },
                    result => {
                        if (result.assets === undefined) {
                            return '';
                        }
                        const selectedFile = result.assets[0];
                        console.log('selectedFile', selectedFile);
                        

                        setPictureData({
                            photograph: selectedFile?.base64 as string,
                            path: selectedFile?.uri as string,
                        });

                        if (selectedFile?.uri) {
                            const file = {
                                uri: selectedFile.uri,
                                name: selectedFile.fileName || 'photo.jpg',
                                type: selectedFile.type || 'image/jpeg',
                            };
                            handleUpload([file]);
                        }
                    },
                );
            } else {
                const result = await request(
                    Platform.OS === 'android'
                        ? PERMISSIONS.ANDROID.CAMERA
                        : PERMISSIONS.IOS.CAMERA,
                );

                if (result === RESULTS.GRANTED) {
                    await launchCamera(
                        {
                            includeBase64: true,
                            mediaType: 'photo',
                            quality: 1,
                            saveToPhotos: true,
                            cameraType: 'front',
                        },
                        res => {
                            if (res.assets === undefined) {
                                return '';
                            }
                            const selectedFile = res.assets[0];

                            setPictureData({
                                photograph: selectedFile?.base64 as string,
                                path: selectedFile?.uri as string,
                            });

                            if (selectedFile?.uri) {
                                const file = {
                                    uri: selectedFile.uri,
                                    name: selectedFile.fileName || 'photo.jpg',
                                    type: selectedFile.type || 'image/jpeg',
                                };
                                handleUpload([file]);
                            }
                        },
                    );
                }
                if (result === RESULTS.BLOCKED) {
                    showToast('Enable permission in settings');
                    openSettings();
                }
            }
        } catch {
            showSuccessToast('An error occurred');
        }
    };

    const handleUpload = async (files: File[]) => {
        try {
            const result = await uploadFiles({
                files,
                folderName: 'profile-picture',
            });
            console.log('result.data', result.data);


            if (result.data) {
                // console.log('Actually stepped into here');
                dispatch(setUserData({
                    ...userData,  // This could be other user data like name, email, etc.
                    identificationDocument: {
                        schoolId: result?.data?.data[0]?.fileUrl,
                    }
                }));
                showSuccessToast('File uploaded successfully!');
            }
            if (error) {
                showErrorToast('File upload failed.');
            }
        } catch (err) {
            showErrorToast('Error during upload');
        }
    };

    const handleConfirmTakePhoto = () => {
        requestCameraPermission(); // Your existing function to request camera permission
    };

    const handleAddPhoto = () => {
        openPhotoUploadBottomSheet(option => {
            if (option.id === 'take_photo') {
                navigation.navigate('FrontID', {
                    handleConfirmTakePhoto: handleConfirmTakePhoto,
                    handleUpload: handleUpload,
                    pictureData: pictureData
                })
                // requestCameraPermission();
            }

            if (option.id === 'choose_library' || option.id === 'browse_file') {
                handleLaunchImageLibrary();
            }
        });
    };

    const handleLaunchImageLibrary = async () => {
        try {
            await launchImageLibrary(
                {
                    includeBase64: true,
                    mediaType: 'photo',
                    quality: 0.1,
                },
                result => {
                    if (result?.errorCode) {
                        return showToast(result?.errorCode);
                    }

                    if (result.assets === undefined) {
                        return '';
                    }

                    const selectedFile = result.assets[0];

                    setPictureData({
                        photograph: selectedFile?.base64 as string,
                        path: selectedFile?.uri as string,
                    });

                    if (selectedFile?.uri) {
                        const file = {
                            uri: selectedFile.uri,
                            name: selectedFile.fileName || 'photo.jpg',
                            type: selectedFile.type || 'image/jpeg',
                        };
                        handleUpload([file]);
                    }
                },
            );
        } catch (error) {
            showErrorToast(
                error?.data?.message || 'An error occurred during password reset',
            );
        }
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(scrollPosition / width);
        setActiveIndex(currentIndex);
    };

    const handleNext = () => {
        if (activeIndex < slides.length - 1) {
            const nextIndex = activeIndex + 1;
            setActiveIndex(nextIndex);
            scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        } else {
            handleAddPhoto()
        }
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <TitleBar>
                    <Box style={styles.title}>
                        <Text style={styles.titleText}>School ID</Text>
                        <Box />
                    </Box>
                </TitleBar>

                <Text style={styles.heading}>School ID</Text>
                <Text style={styles.subHeading}>Upload a photo or scan of your document</Text>

                <Text style={styles.underlineText}>Choose a different ID document</Text>

                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.slideContainer}
                >
                    {slides.map(slide => (
                        <Box key={slide.id} style={styles.iconContainer}>
                            {slide.icon}
                            <Text style={styles.description}>{slide.description}</Text>
                        </Box>
                    ))}
                </ScrollView>

                {/* Add pagination dots */}
                <View style={styles.pagination}>
                    {slides.map((_, index) => (
                        <View key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                    ))}
                </View>
            </ScrollView>

            <Box style={styles.buttonContainer}>
                <CustomButton
                    label="Continue"
                    labelProps={{ color: 'whiteColor' }}
                    borderRadius="sm"
                    onPress={handleNext}
                />
            </Box>

        </>
    );
};

export default SchoolID;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        paddingVertical: RFValue(10),
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleText: {
        fontSize: RFValue(18, height),
        fontWeight: '600',
    },
    heading: {
        color: '#151619',
        fontSize: RFValue(24, height),
        fontWeight: '600',
        marginTop: 70,
    },
    subHeading: {
        color: '#151619',
        fontSize: RFValue(16, height),
        fontWeight: '400',
    },
    underlineText: {
        textDecorationLine: 'underline',
        fontWeight: '600',
        fontSize: RFValue(15, height),
        textAlign: 'center',
        marginTop: 90,
    },
    slideContainer: {
        paddingVertical: 16,
    },
    iconContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#CFB0F5',
        width: width * 0.65, // Adjust the width to fit the design
        height: 177,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        marginLeft: width * 0.10, // Equal margin on each side to center
    },
    description: {
        marginTop: 16,
        fontSize: RFValue(14, height),
        textAlign: 'center',
        fontWeight: '600'
    },
    buttonContainer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 16,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#D8D8D8',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#5D2BFF',
    },
});
