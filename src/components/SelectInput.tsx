/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SelectType } from './types';
import { PaletteType, Theme } from '@/constants/theme';
import useTextInputDropdown from './BottomSheetHooks/useSelectInputDropdown';
import Text from './Text';
import { SvgIcon } from '@/assets/icons/SvgIcon';
import { triggerShakeAnimation } from '@/utils/helpers/shakeAnimation';
import contexts from '../contexts';
import Box from './Box';
import { SvgIconPackType } from '@/assets/icons/svgIconPack';

export type SelectInputProps = {
  label: string;
  selectedValue?: string | number;
  placeholder?: string;
  list: SelectType[];
  getSelectedValue: (value: string | number) => void;
  errorMessage?: string | boolean;
  searchable?: boolean;
  modulePalette?: PaletteType;
  selectedTextColor?: PaletteType;
  unselectedColor?: PaletteType;
  unselectedTextColor?: PaletteType;
  iconName?: SvgIconPackType;
  iconSize?: keyof Theme['iconSizes'];
  showHeader: boolean;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  selectedValue = '',
  placeholder = '',
  list = [],
  getSelectedValue,
  errorMessage,
  searchable,
  selectedTextColor = 'primary',
  unselectedTextColor = 'textColor',
  iconName,
  iconSize,
  showHeader,
}) => {
  const [, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(selectedValue);
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(
    new Animated.Value(selectedValue ? 1 : 0),
  ).current;
  const animValue = useRef(new Animated.Value(0)).current;
  const { openSelectInputDropdown } = useTextInputDropdown();
  const { dismissBottomSheet } = contexts.BottomSheet.useBottomSheetContext();

  const handleItemPress = useCallback(
    (listElement: SelectType) => {
      if (listElement.id === '') {
        return;
      }
      setSelected(listElement.id);
      setShowDropdown(false);
      getSelectedValue(listElement.id);
    },
    [getSelectedValue],
  );

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || selected ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedIsFocused, isFocused, selected]);

  useEffect(() => {
    if (errorMessage) {
      triggerShakeAnimation(animValue);
    }
  }, [animValue, errorMessage]);

  const handleOpenDropdown = () => {
    setIsFocused(true);
    setShowDropdown(true);
    openSelectInputDropdown({
      searchable: searchable,
      list: list,
      handleItemPress: handleItemPress,
      selected: selected,
      selectedTextColor: selectedTextColor,
      unselectedTextColor: unselectedTextColor,
      dismissBottomSheet: dismissBottomSheet,
      placeholder: placeholder,
      showHeader,
    });
  };

  const labelStyle = {
    position: 'absolute',
    left: RFValue(4),
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFValue(16), RFValue(8)],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [RFValue(16), RFValue(12)],
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
          onPress={handleOpenDropdown}
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
            errorMessage && styles.inputContainerError,
          ]}>
          <Box
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between">
            <Box flex={1}>
              <Animated.Text style={labelStyle}>{label}</Animated.Text>
              <Text style={styles.selectText}>
                {selected ? list.find(l => l.id === selected)?.value : ''}
              </Text>
            </Box>
            {iconName && iconSize && (
              <Box>
                <SvgIcon name={iconName} size={iconSize} />
              </Box>
            )}
          </Box>
        </TouchableOpacity>
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: RFValue(16),
  },
  inputContainer: {
    height: RFValue(58),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(12),
    justifyContent: 'center',
  },
  inputContainerFocused: {
    borderColor: '#CFB0F5',
  },
  inputContainerError: {
    borderColor: '#FF3B30',
  },
  selectText: {
    fontSize: RFValue(16),
    color: '#151619',
    paddingTop: RFValue(26),
    paddingBottom: RFValue(8),
    paddingHorizontal: RFValue(4),
  },
  chevronIcon: {
    position: 'absolute',
    right: RFValue(16),
  },
  errorText: {
    color: '#FF3B30',
    fontSize: RFValue(12),
    marginTop: RFValue(4),
  },
});

export default React.memo(SelectInput);
