import { PaletteType } from '@/constants/theme';
import { SelectType } from '../types';
import contexts from '../../contexts';
import React from 'react';
import SelectInputDropdown from '../BottomSheetContent/SelectInputDropdown';

interface SelectInputDropdownProps {
  searchable?: boolean;
  list: SelectType[];
  handleItemPress: (listElement: SelectType) => void;
  selected: string | number;
  selectedTextColor: PaletteType;
  unselectedTextColor: PaletteType;
  dismissBottomSheet?: () => void;
  placeholder?: string;
  showHeader: boolean;
}

const useTextInputDropdown = () => {
  const { createBottomSheet, dismissBottomSheet } =
    contexts.BottomSheet.useBottomSheetContext();

  const openSelectInputDropdown = (props: SelectInputDropdownProps) => {
    createBottomSheet({
      _content: () => (
        <SelectInputDropdown
          {...props}
          dismissBottomSheet={dismissBottomSheet}
        />
      ),
      _snapPoints: props.list.length < 3 ? ['40%', '40%'] : ['70%', '70%'],
      _title: props.placeholder ? props.placeholder : 'Select Option',
      _showHeader: props?.showHeader,
    });
  };

  return {
    openSelectInputDropdown,
  };
};

export default useTextInputDropdown;
