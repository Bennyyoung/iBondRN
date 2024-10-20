

import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import Box from '@/components/Box'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/core'
import { RFValue } from 'react-native-responsive-fontsize'
import { showToast, showSuccessToast, showErrorToast } from '@/utils/helpers/toastHelper'
import { launchCamera } from 'react-native-image-picker'
import { check, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions'
import { useUploadFilesMutation } from '@/reduxFolder/features/uploads/service'
import { useAppSelector, useAppDispatch } from '@/reduxFolder/hooks'
import { setUserData } from '@/reduxFolder/features/auth/slices'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParamsList } from '@/navigation/types'
const { width, height } = Dimensions.get('window')

const SelfieScreen = () => {
    const [selfie, setSelfie] = useState({
        path: '',
        photograph: '',
    });
    const [uploadFiles, { isLoading, error }] = useUploadFilesMutation();
    const userData = useAppSelector(state => state.user.userData)

    const insets = useSafeAreaInsets(); // To handle safe area margins
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
    const dispatch = useAppDispatch();


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
                        ...userData?.identificationDocument,
                        selfie: result?.data?.data[0]?.fileUrl,
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


                        setSelfie({
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

                        setTimeout(() => {
                            navigation.navigate('SelfieTaken', {
                                selfie,
                                requestCameraPermission
                            })
                        }, 3000)
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

                            setSelfie({
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

                            setTimeout(() => {
                                navigation.navigate('SelfieTaken', {
                                    selfie,
                                    requestCameraPermission
                                })
                            }, 3000)
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

    return (
        <Box style={[styles.frontIDContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                <Text style={styles.closeIcon}>×</Text>
            </TouchableOpacity>

            <Box style={styles.slideContent}>
                <Text style={styles.mainInstruction}>
                    We’re taking your selfie now
                </Text>
                <Text style={styles.subInstruction}>
                    A photo of you that we will compare with your ID document. Please keep your head within the oval
                </Text>

                <Box style={styles.iconContainer} />
                <TouchableOpacity style={styles.captureButton} onPress={requestCameraPermission}>
                    <Box style={styles.innerCircle} />
                </TouchableOpacity>
            </Box>
        </Box>
    )
}

export default SelfieScreen

const styles = StyleSheet.create({
    slideContent: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 8,
        // paddingHorizontal: 16,
        // width: width * 0.65,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: width * 0.15, // Equal margin on each side to center,
        marginRight: width * 0.10, // Equal margin on each side to center,
    },
    mainInstruction: {
        fontSize: RFValue(24, height),
        fontWeight: '400',
        color: 'white',
        textAlign: 'center',
        letterSpacing: -0.26,
        lineHeight: 28,
        marginTop: 40

    },
    subInstruction: {
        fontSize: RFValue(16, height),
        fontWeight: '400',
        color: '#CDCDCD',
        textAlign: 'center',
    },
    iconContainer: {
        width: 409,
        height: 409,
        borderWidth: 0.5,
        borderColor: '#D9D9D9',
        borderRadius: 250,
        paddingHorizontal: 30
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
    }
})