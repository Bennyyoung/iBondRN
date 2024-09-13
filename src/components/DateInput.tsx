import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SvgIcon } from '@/assets/icons/SvgIcon';
import { PaletteType, Theme } from '@/constants/theme';
import useDateInputModal from './BottomSheetHooks/useDateInputModal';
import Text from './Text';
import { triggerShakeAnimation } from '@/utils/helpers/shakeAnimation';
import Box from './Box';
import { SvgIconPackType } from '@/assets/icons/svgIconPack';

export type DateInputProps = {
  label: string;
  value?: Date | string;
  getSelectedDate: (inputValue: Date) => void;
  errorMessage?: string | boolean;
  maximumDate?: Date;
  minimumDate?: Date;
  modulePalette?: PaletteType;
  iconName?: SvgIconPackType;
  iconSize?: keyof Theme['iconSizes'];
};

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  getSelectedDate,
  errorMessage,
  maximumDate = new Date(2030, 10, 20),
  minimumDate = new Date(1950, 10, 20),
  modulePalette = 'primary',
  iconName,
  iconSize,
}) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
  const animValue = useRef(new Animated.Value(0)).current;
  const { openDateInputModal } = useDateInputModal();

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || selectedDate ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused, selectedDate]);

  useEffect(() => {
    if (errorMessage) {
      triggerShakeAnimation(animValue);
    }
  }, [animValue, errorMessage]);

  const onChange = (event: any, selectedDateProp?: Date) => {
    setShowCalendar(Platform.OS === 'ios');
    if (event.type === 'set' && selectedDateProp) {
      setSelectedDate(selectedDateProp);
      getSelectedDate(selectedDateProp);
    }
  };

  const handleOpenDatePicker = () => {
    setIsFocused(true);
    if (Platform.OS === 'ios') {
      openDateInputModal({
        value: selectedDate || new Date(),
        onConfirm: (date: Date) => {
          setSelectedDate(date);
          getSelectedDate(date);
          setIsFocused(false);
        },
        onCancel: () => setIsFocused(false),
        maximumDate,
        minimumDate,
        modulePalette,
      });
    } else {
      setShowCalendar(true);
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: Platform.OS === 'ios' ? RFValue(0) : RFValue(2),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFValue(16), RFValue(8)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFValue(14), RFValue(11)],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#888', '#888'],
    }),
  };

  return (
    <Animated.View style={{ transform: [{ translateX: animValue }] }}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleOpenDatePicker}
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
            errorMessage && styles.inputContainerError,
          ]}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            height="100%">
            <Box flex={1} justifyContent="center">
              <Animated.Text style={labelStyle}>{label}</Animated.Text>
              <Text style={styles.dateText}>
                {selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : ''}
              </Text>
            </Box>
            {iconName && iconSize && (
              <Box marginLeft="xs">
                <SvgIcon name={iconName} size={iconSize} />
              </Box>
            )}
          </Box>
        </TouchableOpacity>
        {errorMessage && typeof errorMessage === 'string' && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}
      </View>
      {Platform.OS === 'android' && showCalendar && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
          onTouchCancel={() => setShowCalendar(false)}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: RFValue(8),
  },
  inputContainer: {
    height: Platform.OS === 'ios' ? RFValue(48) : RFValue(56),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(6),
    justifyContent: 'center',
  },
  inputContainerFocused: {
    borderColor: '#CFB0F5',
  },
  inputContainerError: {
    borderColor: '#FF3B30',
  },
  dateText: {
    fontSize: RFValue(12),
    color: '#151619',
    left: Platform.OS === 'ios' ? RFValue(0) : RFValue(2),
    paddingTop: Platform.OS === 'ios' ? RFValue(24) : RFValue(26),
    paddingBottom: Platform.OS === 'ios' ? RFValue(26) : RFValue(10),
  },
  errorText: {
    color: '#FF3B30',
    fontSize: RFValue(12),
    marginTop: RFValue(4),
  },
});

export default DateInput;
