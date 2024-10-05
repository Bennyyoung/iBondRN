/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
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
  useSelectedValue?: boolean;
  isLoading?: boolean;
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
  isLoading = false,
  useSelectedValue = false,
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
      getSelectedValue(useSelectedValue ? listElement.value : listElement.id);
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
          onPress={handleOpenDropdown}
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
              <Text style={styles.selectText}>
                {selected ? list.find(l => l.id === selected)?.value : ''}
              </Text>
            </Box>
            {iconName && iconSize && !isLoading && (
              <Box marginLeft="xs">
                <SvgIcon name={iconName} size={iconSize} />
              </Box>
            )}
            {isLoading && (
              <Box marginLeft="xs">
                <ActivityIndicator size="small" color="#888" />
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
  selectText: {
    fontSize: RFValue(12),
    color: '#151619',
    left: Platform.OS === 'ios' ? RFValue(0) : RFValue(2),
    paddingTop: Platform.OS === 'ios' ? RFValue(24) : RFValue(26),
    paddingBottom: Platform.OS === 'ios' ? RFValue(26) : RFValue(10),
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
