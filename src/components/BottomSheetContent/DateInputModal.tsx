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
          display="default"
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
        <Box width="45%">
          <CustomButton
            alignItems="center"
            backgroundColor="primary"
            borderRadius="sm"
            justifyContent="center"
            label="CONFIRM"
            labelProps={{ color: 'whiteColor' }}
            labelVariant="regular12"
            onPress={handleConfirm}
          />
        </Box>
        <Box width="45%">
          <CustomButton
            alignItems="center"
            backgroundColor="white"
            borderWidth={1}
            borderColor="primary"
            borderRadius="sm"
            justifyContent="center"
            label="CANCEL"
            labelProps={{ color: 'primary' }}
            labelVariant="regular12"
            onPress={handleCancel}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DateInputModal;
