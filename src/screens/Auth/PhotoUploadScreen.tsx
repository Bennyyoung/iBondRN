/* eslint-disable no-catch-shadow */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { CustomButton } from '@/components/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { ChevronLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IconVector } from '@/assets/icons/IconVector';
import usePhotoUploadBottomSheet from '@/components/BottomSheetHooks/usePhotoUploadModal';
import {
  showErrorToast,
  showSuccessToast,
  showToast,
} from '@/utils/helpers/toastHelper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import Image from '@/components/Image';
import { useUploadFilesMutation } from '@/redux/features/uploads/service';
import { updateRegistrationData } from '@/redux/features/auth/slices';
import { useDispatch, useSelector } from 'react-redux';
import useRegisterUser from '@/utils/hooks/Auth/useRegisterUser';
import { RootState } from '@/redux/store';
import { RegisterRequest } from '@/redux/features/auth/services.types';

const PhotoUploadScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { openPhotoUploadBottomSheet } = usePhotoUploadBottomSheet();
  const [pictureData, setPictureData] = useState({
    photograph: '',
    path: '',
  });
  const dispatch = useDispatch();

  const [uploadFiles, { isLoading, error }] = useUploadFilesMutation();
  const { registerUser, isLoading: userSignUpLoading } = useRegisterUser();
  const { registrationData } = useSelector((state: RootState) => state.user);

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

  const handleAddPhoto = () => {
    openPhotoUploadBottomSheet(option => {
      if (option.id === 'take_photo') {
        requestCameraPermission();
      }

      if (option.id === 'choose_library' || option.id === 'browse_file') {
        handleLaunchImageLibrary();
      }
    });
  };

  const handleUpload = async (files: File[]) => {
    try {
      const result = await uploadFiles({
        files,
        folderName: 'profile-picture',
      });

      if (result.data) {
        dispatch(
          updateRegistrationData({
            profilePicture: result.data.data[0].fileUrl,
          }),
        );
        showSuccessToast('File uploaded successfully!');
      }
      if (error) {
        showErrorToast('File upload failed.');
      }
    } catch (err) {
      showErrorToast('Error during upload');
    }
  };

  const handleRegister = async () => {
    const response = await registerUser(registrationData as RegisterRequest);

    if (response) {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            position: 'relative',
            top: RFValue(10),
            zIndex: 1,
            padding: RFValue(10),
          }}>
          <ChevronLeft color="black" size={RFValue(30)} />
        </TouchableOpacity>
        <Box flex={1} padding="md" backgroundColor="white" position="relative">
          <Text variant="medium22" textAlign="left" mb="sm">
            Adding a photo helps people recognize you
          </Text>
          <Text variant="regular14" textAlign="left" color="black" mb="xxl">
            Just a little more to personalize your experience
          </Text>

          {pictureData?.photograph ? (
            <Box alignItems="center" justifyContent="center">
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${pictureData?.photograph}`,
                }}
                style={{
                  borderRadius: RFValue(50),
                  height: RFValue(100),
                  width: RFValue(100),
                }}
              />
              <TouchableOpacity onPress={() => handleAddPhoto()}>
                <Box
                  alignItems="center"
                  flexDirection="row"
                  justifyContent="center"
                  mt="md">
                  <IconVector name="edit" size="sm" />
                  <Text color="primary" variant="medium14" ml="sm">
                    Change Photo
                  </Text>
                </Box>
              </TouchableOpacity>
            </Box>
          ) : (
            <TouchableOpacity onPress={() => handleAddPhoto()}>
              <Box alignSelf="center" justifyContent="center" mb="xxl" mt="xl">
                <IconVector
                  name="upload_avatar"
                  size="xxxl"
                  color="primaryPurple"
                />
              </Box>
            </TouchableOpacity>
          )}
        </Box>
      </ScrollView>
      <Box
        position="absolute"
        bottom={Platform.OS === 'ios' ? RFValue(20) : RFValue(10)}
        left={0}
        right={0}
        paddingHorizontal="md">
        <CustomButton
          label={
            pictureData?.photograph ? 'Complete Registration' : 'Add a Photo'
          }
          onPress={pictureData?.photograph ? handleRegister : handleAddPhoto}
          backgroundColor="primary"
          labelProps={{ color: 'white', variant: 'regular14' }}
          borderRadius="smm"
          height={Platform.OS === 'ios' ? RFValue(42) : RFValue(52)}
          disabled={isLoading || userSignUpLoading}
          isLoading={isLoading || userSignUpLoading}
        />
      </Box>
    </SafeAreaView>
  );
};

export default PhotoUploadScreen;
