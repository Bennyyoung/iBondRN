import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Box from '../Box';
import Text from '../Text';
import { SearchBar } from '../SearchBar';
import { PaletteType } from '@/constants/theme';
import { IconVector } from '@/assets/icons/IconVector';
import { RFValue } from 'react-native-responsive-fontsize';

interface SelectFromBottomSheetProps {
    setSelected: any
    searchable?: boolean;
    list: any
    dismissBottomSheet?: () => void
    placeholder?: string
    handleItemPress: (listElement: any) => void;
    selected: [];
    selectedTextColor: PaletteType;
    unselectedTextColor: PaletteType;
}


const SelectFromBottomSheet = ({
    selected,
    selectedTextColor,
    unselectedTextColor,
    searchable = true,
    list,
    dismissBottomSheet,
    placeholder = 'Search ...',
    handleItemPress
}: SelectFromBottomSheetProps) => {

    const [, setSearchText] = useState('');
    const [filteredList, setFilteredList] = useState<[]>(list)

    useEffect(() => {
        setFilteredList(list)
    }, [list])

    const filterList = useCallback(
        (query: string) => {
            const lowercasedQuery = query.toLowerCase();
            return list.filter(
                (item: any) =>
                    item.value.toLowerCase().includes(lowercasedQuery)
                // || item.id.toLowerCase().includes(lowercasedQuery),
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


    return (
        <Box paddingHorizontal={'md'} flex={1}>

            <ScrollView style={{ flex: 1, paddingBottom: 100 }}>
                {
                    filteredList.map((listElement: any) => (
                        <TouchableOpacity
                            key={listElement.id}
                            onPress={() => {
                                handleItemPress(listElement);
                                if (dismissBottomSheet) {
                                    dismissBottomSheet();
                                }
                            }}

                        >
                            <Box
                                alignItems="center"
                                backgroundColor={listElement.id === '' ? 'grey' : 'transparent'}
                                borderBottomWidth={0.5}
                                borderColor="grey"
                                flexDirection="row"
                                marginTop="md"
                                paddingTop="md"
                                paddingVertical="sm"
                            >
                                {/* Display the icons */}
                                {listElement?.iconName ? (
                                    <IconVector
                                        name={listElement.iconName}
                                        size="xxl"
                                    style={{ marginRight: 15 }}
                                    />
                                ) : (
                                    listElement?.image
                                )
                                }

                                <Box>
                                    {/* Display the title */}
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
                                    {/* Display the Description */}
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
                                                variant="bold12">
                                                {listElement.label}
                                            </Text>
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </Box>
    )
}

export default SelectFromBottomSheet