import { PaletteType } from '@/constants/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import Box from '../Box';
import { CustomButton } from '../CustomButton';

type DateInputModalProps = {
  value: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  dismissBottomSheet: () => void;
  maximumDate?: Date;
  minimumDate?: Date;
  modulePalette?: PaletteType;
};

const DateInputModal: React.FC<DateInputModalProps> = ({
  value,
  onConfirm,
  onCancel,
  dismissBottomSheet,
  maximumDate,
  minimumDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(value);

  const onChange = (event: any, selected?: Date) => {
    const currentDate = selected || value;
    setSelectedDate(currentDate);
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
    dismissBottomSheet();
  };

  const handleCancel = () => {
    onCancel();
    dismissBottomSheet();
  };

  return (
    <Box>
      <Box alignItems="center" justifyContent="center">
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"
          onChange={onChange}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      </Box>
      <Box
        flexDirection="row"
        justifyContent="space-around"
        marginBottom="sm"
        marginTop="sm">
        <CustomButton
          alignItems="center"
          backgroundColor="primary"
          borderRadius="sm"
          justifyContent="center"
          label="CONFIRM"
          labelProps={{ color: 'whiteColor' }}
          labelVariant="medium14"
          onPress={handleConfirm}
          paddingHorizontal="lg"
          paddingVertical="md"
        />
        <CustomButton
          alignItems="center"
          backgroundColor="grey"
          borderRadius="sm"
          justifyContent="center"
          label="CANCEL"
          labelProps={{ color: 'primary' }}
          labelVariant="medium14"
          onPress={handleCancel}
          paddingHorizontal="lg"
          paddingVertical="md"
        />
      </Box>
    </Box>
  );
};

export default DateInputModal;
