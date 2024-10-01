/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { TextInput, View } from 'react-native';

import { SvgIcon, SvgIconProps } from '@/assets/icons';
import { RFValue } from 'react-native-responsive-fontsize';

type SearchBarProps = {
  getSearchInput: (text: string) => void;
  placeholder?: string;
  backgroundColor?: string;
  paddingHorizontal?: number;
  height?: number;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  getSearchInput,
  placeholder = 'Search for an item',
  backgroundColor = '#F7F7F7',
  paddingHorizontal = RFValue(16),
  height = RFValue(50),
}) => {
  return (
    <View
      style={{
        backgroundColor,
        borderRadius: RFValue(25),
        paddingHorizontal,
        height,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <SvgIcon name="search" size="sml" color="primaryGrey" />
      <TextInput
        autoCorrect={false}
        onChangeText={getSearchInput}
        placeholder={placeholder}
        placeholderTextColor="#888"
        style={{
          height: '100%',
          flex: 1,
          color: '#000',
          paddingHorizontal: RFValue(10),
          fontSize: RFValue(14),
        }}
      />
    </View>
  );
};
