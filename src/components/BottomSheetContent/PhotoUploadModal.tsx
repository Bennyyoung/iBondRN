/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Box from '../Box';
import Text from '../Text';
import { SvgIcon, SvgIconPackType } from '@/assets/icons';

export interface PhotoUploadOption {
  id: string;
  value: string;
  icon: SvgIconPackType;
}

interface PhotoUploadBottomSheetProps {
  handleItemPress: (option: PhotoUploadOption) => void;
  dismissBottomSheet?: () => void;
}

const photoUploadOptions: PhotoUploadOption[] = [
  {
    id: 'take_photo',
    value: 'Take Photo',
    icon: 'camera',
  },
  {
    id: 'choose_library',
    value: 'Choose from Library',
    icon: 'library',
  },
  {
    id: 'browse_file',
    value: 'Browse File',
    icon: 'file',
  },
];

const PhotoUploadModal: React.FC<PhotoUploadBottomSheetProps> = ({
  handleItemPress,
  dismissBottomSheet,
}) => {
  return (
    <Box paddingHorizontal="md" flex={1}>
      <ScrollView style={{ flex: 1, paddingBottom: 100 }}>
        {photoUploadOptions.map(option => (
          <TouchableOpacity
            key={option.id}
            onPress={() => {
              handleItemPress(option);
              if (dismissBottomSheet) {
                dismissBottomSheet();
              }
            }}>
            <Box
              alignItems="center"
              backgroundColor="transparent"
              borderBottomWidth={0.5}
              borderColor="grey"
              flexDirection="row"
              marginTop="sm"
              paddingTop="sm"
              paddingVertical="sm">
              <SvgIcon name={option.icon} size="sm" />
              <Box ml="sm">
                <Text color="black" variant="regular14">
                  {option.value}
                </Text>
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  );
};

export default PhotoUploadModal;
