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
      _snapPoints: ['45%', '45%'],
      _title: 'Select Date',
      _showHeader: false,
    });
  };

  return {
    openDateInputModal,
  };
};

export default useDateInputModal;
