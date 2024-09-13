import React from 'react';
import contexts from '../../contexts';
import PhotoUploadBottomSheet, {
  PhotoUploadOption,
} from '../BottomSheetContent/PhotoUploadModal';

const usePhotoUploadBottomSheet = () => {
  const { createBottomSheet, dismissBottomSheet } =
    contexts.BottomSheet.useBottomSheetContext();

  const openPhotoUploadBottomSheet = (
    handleItemPress: (option: PhotoUploadOption) => void,
  ) => {
    createBottomSheet({
      _content: () => (
        <PhotoUploadBottomSheet
          handleItemPress={handleItemPress}
          dismissBottomSheet={dismissBottomSheet}
        />
      ),
      _snapPoints: ['45%', '45%'],
      _title: 'Add Photo',
      _showHeader: true,
    });
  };

  return {
    openPhotoUploadBottomSheet,
  };
};

export default usePhotoUploadBottomSheet;
