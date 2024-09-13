import React from 'react';
import { PaletteType } from '@/constants/theme';
import contexts from '../../contexts';
import DateInputModal from '../BottomSheetContent/DateInputModal';

const useDateInputModal = () => {
  const { createBottomSheet, dismissBottomSheet } =
    contexts.BottomSheet.useBottomSheetContext();

  const openDateInputModal = (props: {
    value: Date;
    onConfirm: (date: Date) => void;
    onCancel: () => void;
    maximumDate?: Date;
    minimumDate?: Date;
    modulePalette?: PaletteType;
  }) => {
    createBottomSheet({
      _content: () => (
        <DateInputModal {...props} dismissBottomSheet={dismissBottomSheet} />
      ),
      _snapPoints: ['50%', '50%'],
      _title: 'Select Date',
    });
  };

  return {
    openDateInputModal,
  };
};

export default useDateInputModal;
