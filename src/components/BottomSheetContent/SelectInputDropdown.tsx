/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { SelectType } from '../types';
import Box from '../Box';
import Text from '../Text';
import { SearchBar } from '../SearchBar';
import { PaletteType } from '@/constants/theme';
import { IconVector } from '@/assets/icons/IconVector';
import { RFValue } from 'react-native-responsive-fontsize';

interface SelectInputDropdownProps {
  searchable?: boolean;
  list: SelectType[];
  handleItemPress: (listElement: SelectType) => void;
  selected: string | number;
  selectedTextColor: PaletteType;
  unselectedTextColor: PaletteType;
  dismissBottomSheet?: () => void;
  placeholder?: string;
}

const SelectInputDropdown = ({
  searchable = false,
  list,
  handleItemPress,
  selected,
  selectedTextColor,
  unselectedTextColor,
  dismissBottomSheet,
  placeholder = 'Search ...',
}: SelectInputDropdownProps) => {
  const [, setSearchText] = useState('');
  const [filteredList, setFilteredList] = useState<SelectType[]>(list);

  const filterList = useCallback(
    (query: string) => {
      const lowercasedQuery = query.toLowerCase();
      return list.filter(
        item =>
          item.value.toLowerCase().includes(lowercasedQuery) ||
          item.id.toLowerCase().includes(lowercasedQuery),
      );
    },
    [list],
  );

  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setFilteredList(filterList(text));
    }, 300),
    [filterList],
  );

  const handleSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      debouncedSearch(text);
    },
    [debouncedSearch],
  );

  useEffect(() => {
    setFilteredList(list);
  }, [list]);

  return (
    <Box paddingHorizontal="md" flex={1}>
      {searchable && (
        <SearchBar
          getSearchInput={handleSearch}
          marginTop={RFValue(1)}
          placeholder={placeholder}
        />
      )}

      <ScrollView style={{ flex: 1, paddingBottom: 100 }}>
        {filteredList.map(listElement => (
          <TouchableOpacity
            key={listElement.id}
            onPress={() => {
              handleItemPress(listElement);
              if (dismissBottomSheet) {
                dismissBottomSheet();
              }
            }}>
            <Box
              alignItems="center"
              backgroundColor={listElement.id === '' ? 'grey' : 'transparent'}
              borderBottomWidth={0.5}
              borderColor="grey"
              flexDirection="row"
              marginTop="md"
              paddingTop="md"
              paddingVertical="sm">
              {listElement?.iconName && (
                <IconVector
                  name={listElement.iconName}
                  size="lg"
                  style={{ marginRight: 15 }}
                />
              )}
              <Box>
                <Text
                  color={
                    listElement.id === selected
                      ? selectedTextColor
                      : unselectedTextColor
                  }
                  fontWeight={listElement.id === selected ? 'bold' : 'normal'}
                  numberOfLines={1}
                  variant={listElement.id === '' ? 'medium14' : 'regular14'}>
                  {listElement.value}
                </Text>
                {listElement?.label && (
                  <Box mt="sm">
                    <Text
                      color={
                        listElement.id === selected
                          ? selectedTextColor
                          : unselectedTextColor
                      }
                      fontWeight={
                        listElement.id === selected ? 'bold' : 'normal'
                      }
                      numberOfLines={1}
                      variant="medium16">
                      {listElement.label}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Box>
  );
};

export default SelectInputDropdown;
