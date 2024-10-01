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
import { showToast } from '@/utils/helpers/toastHelper';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import Image from '@/components/Image';

const PhotoUploadScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { openPhotoUploadBottomSheet } = usePhotoUploadBottomSheet();
  const [pictureData, setPictureData] = useState({
    photograph: '',
    path: '',
  });

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
          setPictureData({
            photograph: result?.assets[0]?.base64 as string,
            path: result?.assets[0]?.uri as string,
          });
          return '';
        },
      );
    } catch (error) {
      showToast(error as string);
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
            setPictureData({
              photograph: result?.assets[0]?.base64 as string,
              path: result?.assets[0]?.uri as string,
            });

            return '';
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
              setPictureData({
                photograph: res?.assets[0]?.base64 as string,
                path: res?.assets[0]?.uri as string,
              });

              return '';
            },
          );
        }
        if (result === RESULTS.BLOCKED) {
          showToast('Enable permission in settings');
          openSettings();
        }
      }
    } catch {
      showToast('An error occurred');
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
          label="Add a Photo"
          onPress={() => navigation.navigate('FindFriendsFromContacts')}
          backgroundColor="primary"
          labelProps={{ color: 'white', variant: 'regular14' }}
          borderRadius="smm"
          height={Platform.OS === 'ios' ? RFValue(42) : RFValue(52)}
        />
      </Box>
    </SafeAreaView>
  );
};

export default PhotoUploadScreen;
