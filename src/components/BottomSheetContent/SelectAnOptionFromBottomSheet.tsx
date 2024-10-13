import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Animated, Platform, KeyboardType } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Box from '../Box';
import Text from '../Text';
import { SearchBar } from '../SearchBar';
import { PaletteType } from '@/constants/theme';
import { IconVector } from '@/assets/icons/IconVector';
import { RFValue } from 'react-native-responsive-fontsize';
import TextInput from '../TextInput';
import { triggerShakeAnimation } from '@/utils/helpers/shakeAnimation';

interface SelectAnOptionFromBottomSheetProps {
    setSelected: (selected: any) => void;
    searchable?: boolean;
    list: any[];
    dismissBottomSheet?: () => void;
    placeholder?: string;
    handleItemPress: (listElement: any) => void;
    selected: any;
    selectedTextColor: PaletteType;
    unselectedTextColor: PaletteType;
    value: string;
    onChangeText: (text: string) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    max?: number;
    secureTextEntry?: boolean;
    isPasswordVisible?: boolean;
    keyboardType?: KeyboardType;
    setExternalLink?: React.Dispatch<React.SetStateAction<string>>
}

const SelectAnOptionFromBottomSheet = ({
    selected,
    selectedTextColor,
    unselectedTextColor,
    searchable = true,
    list,
    dismissBottomSheet,
    placeholder = 'Search ...',
    handleItemPress,
    value,
    onChangeText,
    handleFocus,
    handleBlur,
    max,
    secureTextEntry,
    isPasswordVisible,
    keyboardType = 'default',
    containerProps,
    error,
    setExternalLink
}: SelectAnOptionFromBottomSheetProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [filteredList, setFilteredList] = useState<any[]>(list);
    const animatedIsFocused = useRef(
        new Animated.Value(value === '' ? 0 : 1),
    ).current;
    const animValue = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        setFilteredList(list);
    }, [list]);

    const RadioButton = ({ selected }: { selected: boolean }) => (
        <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
            {selected && <View style={styles.radioButtonInner} />}
        </View>
    );

    useEffect(() => {
        Animated.timing(animatedIsFocused, {
            toValue: isFocused || value !== '' ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [animatedIsFocused, isFocused, value]);

    useEffect(() => {
        if (error) {
            triggerShakeAnimation(animValue);
        }
    }, [animValue, error]);

    const labelStyle = {
        position: 'absolute',
        left: Platform.OS === 'ios' ? RFValue(6) : RFValue(8),
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
        <Box paddingHorizontal={'md'} flex={1}>

            <ScrollView style={{ flex: 1, paddingBottom: 100 }}>
                {
                    filteredList.map((listElement: any, index: number) => (
                        <React.Fragment key={listElement.id}>
                            <TouchableOpacity
                                onPress={() => {
                                    handleItemPress(listElement);
                                    if (dismissBottomSheet) {
                                        dismissBottomSheet();
                                    }
                                }}
                            >
                                <Box
                                    style={{
                                        borderTopWidth: index === 0 ? 0.2 : 0,
                                        borderBottomWidth: index === 2 ? 0 : 0.2,
                                        borderColor: index === 2 ? 'white' : "grey"

                                    }}
                                >

                                    <Box
                                        alignItems="center"
                                        backgroundColor='transparent'
                                        flexDirection="row"
                                        paddingVertical="sm"
                                        justifyContent="space-between"
                                        style={{
                                            marginTop: 20
                                        }}
                                    >
                                        <Box flexDirection="row" alignItems="center" flex={1}>
                                            {listElement?.iconName ? (
                                                <IconVector
                                                    name={listElement.iconName}
                                                    size="xxl"
                                                />
                                            ) : (
                                                listElement?.image
                                            )}

                                            <Box flex={1} marginLeft="sm">
                                                <Text
                                                    color={
                                                        listElement.id === selected
                                                            ? selectedTextColor
                                                            : unselectedTextColor
                                                    }
                                                    fontWeight={listElement.id === selected ? 'bold' : 'normal'}
                                                    numberOfLines={1}
                                                    variant='regular14'>
                                                    {listElement.value}
                                                </Text>
                                            </Box>
                                        </Box>
                                        <RadioButton selected={listElement.id === selected} />

                                    </Box>
                                    {index === 1 && (
                                        <Animated.View
                                            style={[{ transform: [{ translateX: animValue }] }, containerProps]}>
                                            <View
                                                style={[
                                                    styles.inputContainer,
                                                    // isFocused && styles.inputContainerFocused,
                                                    // error && styles.inputContainerError,
                                                ]}>
                                                <Animated.Text style={labelStyle}>Link</Animated.Text>
                                                <TextInput
                                                    style={styles.input}
                                                    value={value}
                                                    onChangeText={(value) => setExternalLink && setExternalLink(value)}
                                                    onFocus={handleFocus}
                                                    onBlur={handleBlur}
                                                    maxLength={max}
                                                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                                                    blurOnSubmit
                                                    keyboardType={keyboardType}
                                                    placeholder={'bit.ly/makingMoneyOnline'}
                                                />
                                            </View>
                                        </Animated.View>
                                    )}
                                </Box>
                            </TouchableOpacity>

                        </React.Fragment>
                    ))
                }
            </ScrollView>
        </Box>
    );
};

const styles = StyleSheet.create({
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: '#6200EE',
    },
    radioButtonInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#6200EE',
    },
    inputContainer: {
        height: Platform.OS === 'ios' ? RFValue(48) : RFValue(56),
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: RFValue(12),
        paddingHorizontal: RFValue(6),
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    inputContainerFocused: {
        borderColor: '#CFB0F5',
    },
    inputContainerError: {
        borderColor: '#FF3B30',
    },
    input: {
        fontSize: RFValue(14),
        color: '#151619',
        height: '100%',
    },
});

export default SelectAnOptionFromBottomSheet;