import Box from "@/components/Box";
import { StackParamsList } from "@/navigation/types";
import { showToast, showErrorToast, showSuccessToast } from "@/utils/helpers/toastHelper";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRef, useState } from "react";
import { Alert, TouchableOpacity, Text, Image, StyleSheet, Dimensions, Platform, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { check, PERMISSIONS, RESULTS, request, openSettings } from "react-native-permissions";
import { RFValue } from "react-native-responsive-fontsize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { width, height } = Dimensions.get('window')

type FrontIDProps = {
    closeModal: () => void
    onConfirmTakePhoto: () => void
}


const FrontID = () => {
    const route = useRoute<RouteProp<StackParamsList, 'FrontID'>>()
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView | null>(null);

    const { handleUpload } = route.params
    // console.log('pictureData', pictureData);

    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
    const [selectedImageFront, setSelectedImageFront] = useState({
        path: '',
        photograph: '',
    });
    const [selectedImageBack, setSelectedImageBack] = useState({
        path: '',
        photograph: '',
    });
    // console.log('selectedImageFront', selectedImageFront);

    const insets = useSafeAreaInsets(); // To handle safe area margins

    const requestCameraPermissionFront = async () => {
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


                        setSelectedImageFront({
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

                            setSelectedImageBack({
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

    const handleLaunchImageLibraryFront = async () => {
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

                    setSelectedImageFront({
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
    const requestCameraPermissionBack = async () => {
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


                        setSelectedImageBack({
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

                            setSelectedImageFront({
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

    const handleLaunchImageLibraryBack = async () => {
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

                    setSelectedImageBack({
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

    const slides = [
        // Front Of ID
        {
            id: 1,
            captureBox: (
                <TouchableOpacity style={styles.captureBox} onPress={handleLaunchImageLibraryFront}>
                    {selectedImageFront ? (
                        <Image source={{ uri: selectedImageFront?.path }} style={styles.selectedImage} />
                    ) : (
                        null
                    )}
                </TouchableOpacity>
            ),
            mainInstruction: 'Take a photo of the front of your ID',
            subInstruction: 'Please make sure that your ID fits in the box above.',
            captureButton: (
                <TouchableOpacity style={styles.captureButton} onPress={requestCameraPermissionFront}>
                    <Box style={styles.innerCircle} />
                </TouchableOpacity>
            )
        },
        // Back of ID
        {
            id: 2,
            captureBox: (
                <TouchableOpacity style={styles.captureBox} onPress={handleLaunchImageLibraryBack}>
                    {selectedImageBack ? (
                        <Image source={{ uri: selectedImageBack?.path }} style={styles.selectedImage} />
                    ) : (
                        null
                    )}
                </TouchableOpacity>
            ),
            mainInstruction: 'Take a photo of the back of your ID',
            subInstruction: 'Please make sure that your ID fits in the box above.',
            captureButton: (
                <TouchableOpacity style={styles.captureButton} onPress={requestCameraPermissionBack}>
                    <Box style={styles.innerCircle} />
                </TouchableOpacity>
            )
        },
    ]
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(scrollPosition / width);
        setActiveIndex(currentIndex);

        if(activeIndex === slides.length -1) {
            setTimeout(() => {
                navigation.navigate('UploadHoldID')
            }, 2000)
        }
    };

    const handleNext = () => {
        if (activeIndex < slides.length - 1) {
            const nextIndex = activeIndex + 1;
            setActiveIndex(nextIndex);
            scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        } else {
            navigation.navigate('UploadHoldID')
        }
    };

    return (
        <Box style={[styles.frontIDContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.slideContainer}
            >
                {
                    slides.map((slide) => (
                        <Box key={slide.id} style={styles.slideContent}>
                            {slide.captureBox}
                            <Text style={styles.mainInstruction}>
                                {slide.mainInstruction}
                            </Text>
                            <Text style={styles.subInstruction}>
                                {slide.subInstruction}
                            </Text>
                            {slide.captureButton}
                        </Box>
                    ))
                }
            </ScrollView>
            <Box style={styles.pagination}>
                {slides.map((_, index) => (
                    <Box key={index} style={[styles.dot, activeIndex === index && styles.activeDot]} />
                ))}
            </Box>

        </Box>

    );
};

export default FrontID

const styles = StyleSheet.create({
    frontIDContainer: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 400,
    },
    closeIcon: {
        fontSize: 28,
        color: 'white',
        textAlign: 'left',
    },
    slideContainer: {
        paddingVertical: 16,
    },
    slideContent: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 16,
        width: width * 0.65,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: width * 0.15, // Equal margin on each side to center,
        marginRight: width * 0.10, // Equal margin on each side to center,
    },
    captureBox: {
        width: 309,
        height: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CFB0F5', // Light purple border color
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    mainInstruction: {
        fontSize: RFValue(24, height),
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        letterSpacing: -0.26,
        lineHeight: 28
    },
    subInstruction: {
        fontSize: RFValue(15, height),
        fontWeight: '400',
        color: '#CDCDCD',
        textAlign: 'center',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    innerCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
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
})