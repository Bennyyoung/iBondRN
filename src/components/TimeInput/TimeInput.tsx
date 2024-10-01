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
import useDateInputModal from '@/components/BottomSheetHooks/useDateInputModal';
import Text from '@/components/Text';
import { triggerShakeAnimation } from '@/utils/helpers/shakeAnimation';
import Box from '@/components/Box';
import { SvgIconPackType } from '@/assets/icons/svgIconPack';

export type TimeInputProps = {
  label: string;
  value?: Date | string;
  getSelectedTime: (inputValue: Date) => void;
  errorMessage?: string | boolean;
  modulePalette?: PaletteType;
  iconName?: SvgIconPackType;
  iconSize?: keyof Theme['iconSizes'];
};

export const TimeInput: React.FC<TimeInputProps> = ({
  label,
  value,
  getSelectedTime,
  errorMessage,
  modulePalette = 'primary',
  iconName,
  iconSize,
}) => {
  const [showClock, setShowClock] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;
  const animValue = useRef(new Animated.Value(0)).current;
  const { openDateInputModal } = useDateInputModal(); // Can be adapted for time picker modal

  useEffect(() => {
    if (value) {
      setSelectedTime(new Date(value));
    }
  }, [value]);

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || selectedTime ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused, selectedTime]);

  useEffect(() => {
    if (errorMessage) {
      triggerShakeAnimation(animValue);
    }
  }, [animValue, errorMessage]);

  const onChange = (event: any, selectedTimeProp?: Date) => {
    setShowClock(Platform.OS === 'ios');
    if (event.type === 'set' && selectedTimeProp) {
      setSelectedTime(selectedTimeProp);
      getSelectedTime(selectedTimeProp);
    }
  };

  const handleOpenTimePicker = () => {
    setIsFocused(true);
    if (Platform.OS === 'ios') {
      openDateInputModal({
        value: selectedTime || new Date(),
        onConfirm: (time: Date) => {
          setSelectedTime(time);
          getSelectedTime(time);
          setIsFocused(false);
        },
        onCancel: () => setIsFocused(false),
        modulePalette,
      });
    } else {
      setShowClock(true);
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
          onPress={handleOpenTimePicker}
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
              <Text style={styles.timeText}>
                {selectedTime ? moment(selectedTime).format('HH:mm') : ''}
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
      {Platform.OS === 'android' && showClock && (
        <DateTimePicker
          value={selectedTime || new Date()}
          mode="time"
          display="default"
          onChange={onChange}
          onTouchCancel={() => setShowClock(false)}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: RFValue(10),
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
  timeText: {
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
