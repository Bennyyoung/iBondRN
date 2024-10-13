import { PaletteType, Theme } from "@/constants/theme";
import contexts from "../../contexts/index";
import { useCallback, useEffect, useRef, useState } from "react";
import useDropdownItems from "../BottomSheetHooks/useDropdownItems";
import { CustomButton } from "../CustomButton";
import useSelectedOptionItems from "../BottomSheetHooks/useSelectedOptionsDropdown";
import { useAppSelector } from "@/reduxFolder/index";
import Modal from "../Modal/Modal";
import Text from "../Text";
import Box from "../Box";
import { ActivityIndicator, Animated, Dimensions, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import { eventType } from "@/utils/createEventsData";
import { values } from "lodash";
import SelectInput from "../SelectInput";
import { SvgIcon, SvgIconPackType } from "@/assets/icons";
import { triggerShakeAnimation } from "@/utils/helpers/shakeAnimation";

type SelectedChannelProps = {
    label: string;

    selectedValue?: string | number;
    placeholder: string,
    list: {
        id: number;
        value: string;
        image: React.JSX.Element;
        label: string;
    }[],
    searchable: boolean,
    showHeader: boolean
    getSelectedValue: (value: string | number) => void;
    errorMessage?: string | boolean;

    selectedTextColor?: PaletteType;
    unselectedColor?: PaletteType;
    unselectedTextColor?: PaletteType;
    children: React.ReactNode
    action: string
    isLoading?: boolean;
    iconName?: SvgIconPackType;
    iconSize?: keyof Theme['iconSizes'];
}

const { height } = Dimensions.get('window')

const SelectedChannel = ({
    label,

    placeholder = '',
    selectedValue = '',
    list = [],
    searchable,
    showHeader,
    getSelectedValue,
    selectedTextColor = 'primary',
    unselectedTextColor = 'textColor',
    isLoading = false,
    errorMessage,
    action,
    iconName,
    iconSize,
}: SelectedChannelProps) => {
    const [externalLink, setExternalLink] = useState('')
    const [, setShowDropdown] = useState(false);
    const [selected, setSelected] = useState(selectedValue);
    const { openSelectedOptionItems } = useSelectedOptionItems();
    const [isFocused, setIsFocused] = useState(false);
    const { dismissBottomSheet } = contexts.BottomSheet.useBottomSheetContext()
    const modalVisible = useAppSelector(state => state.modal.value)
    const animatedIsFocused = useRef(
        new Animated.Value(selectedValue ? 1 : 0),
    ).current;
    const animValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setSelected(externalLink)
    }, [externalLink])

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

    const handleItemPress = useCallback(
        (listItem: any) => {
            // console.log('listItem', listItem);
            
            if (listItem.id === '') {
                return;
            }
            if(listItem.id === 'externalLink') {
                // setSelected(externalLink)
                getSelectedValue(selected)
            } else {
                setSelected(listItem.id)
                getSelectedValue(listItem)
            }
        },
        [getSelectedValue, externalLink],
    )

    const addChannel = () => {
        openSelectedOptionItems({
            list: list,
            placeholder: placeholder,
            handleItemPress: handleItemPress,
            externalLink,
            setExternalLink,
            selected: selected,
            selectedTextColor: selectedTextColor,
            unselectedTextColor: unselectedTextColor,
            dismissBottomSheet: dismissBottomSheet,
            showHeader,
            action: action
        })
    }

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
        <>
            <Animated.View style={{ transform: [{ translateX: animValue }] }}>
                <View style={styles.container}>
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => addChannel()}
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
                                    {selected && ((selected?.startsWith('http') && selected) || (selected && list.find(l => l.id === selected)?.value))}
                                    {/* {externalLink} */}
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

            {/* {
                modalVisible && (
                    <Modal modalVisible={modalVisible}>
                        <Box style={styles.centeredView}>
                            <Box style={styles.modalView}>


                                <Text style={styles.modalTitle}>Exit?</Text>
                                <Text style={styles.modalSubTitle}>If you discard, the event information you've entered will be discarded.</Text>
                                <TouchableOpacity style={styles.bottomContainer}>
                                    <Text style={styles.discard}>
                                        Discard
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={styles.cancel}>
                                        Cancel
                                    </Text>
                                </TouchableOpacity>
                            </Box>
                        </Box>
                    </Modal>
                )
            } */}
        </>
    )
}

export default SelectedChannel

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        color: '#151619',
        fontSize: RFValue(17, height),
        fontWeight: '600',
        letterSpacing: -0.26,
        lineHeight: 26,
        // marginTop: 10
    },
    modalSubTitle: {
        color: '#151619',
        fontSize: RFValue(13, height),
        fontWeight: '400',
        textAlign: 'center',
        marginVertical: 20,
        // borderBottomWidth: 0.2,
        borderColor: 'grey'
    },
    bottomContainer: {
        // borderBottomWidth: 0.2,
        borderColor: 'grey',
        width: '100%'
    },
    discard: {
        color: '#FF3B30',
        fontSize: RFValue(17, height),
        fontWeight: '600',
        textAlign: 'center',
    },

    cancel: {
        color: '#151619',
        fontSize: RFValue(17, height),
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 20
    },

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
})
