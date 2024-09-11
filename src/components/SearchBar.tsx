/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { DimensionValue, TextInput, View } from 'react-native';

import { SvgIcon } from '@/assets/icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { palette } from '@/constants/theme';

type SelectInputSearchbarProps = {
  getSearchInput: (text: string) => void;
  placeholder?: string;
  searchInput?: string;
  marginTop?: DimensionValue;
  backgroundColor?: string;
  paddingHorizontal?: DimensionValue;
  height?: DimensionValue;
};

export const SearchBar: React.FC<SelectInputSearchbarProps> = ({
  getSearchInput,
  placeholder = 'Search for an item',
  backgroundColor,
  paddingHorizontal,
  marginTop,
  height,
}) => {
  const textInputRef = useRef(null);

  return (
    <View
      style={{
        backgroundColor: backgroundColor || '#f7f7f7',
        borderRadius: RFValue(10),
        paddingHorizontal: paddingHorizontal || RFValue(10),
        height: height || RFValue(50),
        alignItems: 'center',
        borderColor: palette.grey,
        borderWidth: 1,
        flexDirection: 'row',
        marginTop: marginTop || RFValue(10),
      }}>
      <SvgIcon name="appleIcon" size="sml" />
      <TextInput
        autoCorrect={false}
        onChangeText={getSearchInput}
        placeholder={placeholder}
        placeholderTextColor="black"
        ref={textInputRef}
        style={{
          height: '100%',
          flex: 1,
          color: '#000',
          textTransform: 'lowercase',
          paddingHorizontal: RFValue(10),
          fontSize: RFValue(11),
        }}
      />
    </View>
  );
};
