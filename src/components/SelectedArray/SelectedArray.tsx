import { Animated, Dimensions, StyleSheet, TouchableOpacity } from "react-native"
import PurplePlusIcon from "@/assets/svg/purplePlusIcon.svg"
import Text from '@/components/Text';
import { RFValue } from "react-native-responsive-fontsize";
import useTextInputDropdown from "../BottomSheetHooks/useSelectInputDropdown";
import contexts from "../../contexts/index";
import useDropdownItems from "../BottomSheetHooks/useDropdownItems";
import { useState, useCallback } from "react";
import { PaletteType } from "@/constants/theme";
import React from "react";

const { height } = Dimensions.get('window');

type SelectedArrayProps = {
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
    selectedTextColor?: PaletteType;
    unselectedColor?: PaletteType;
    unselectedTextColor?: PaletteType;
}

const SelectedArray = ({
    placeholder = '',
    list = [],
    searchable,
    showHeader,
    getSelectedValue,
    selectedTextColor = 'primary',
    unselectedTextColor = 'textColor',
}: SelectedArrayProps) => {
    const [selected, setSelected] = useState([])
    const { openDropdownItems } = useDropdownItems();
    const { dismissBottomSheet } = contexts.BottomSheet.useBottomSheetContext()

    const handleItemPress = useCallback(
        (listItem: any) => {
            if (listItem.id === '') {
                return;
            }
            setSelected(listItem.id)
            getSelectedValue(listItem)
        },
        [getSelectedValue],
    )

    const addHosts = () => {
        openDropdownItems({
            list: list,
            placeholder: placeholder,
            handleItemPress: handleItemPress,
            selected: selected,
            selectedTextColor: selectedTextColor,
            unselectedTextColor: unselectedTextColor,
            dismissBottomSheet: dismissBottomSheet,
            showHeader
        })
    }

    return (
        <Animated.View>
            <TouchableOpacity style={styles.addOtherHostsContainer} onPress={addHosts}>
                <>
                    <PurplePlusIcon />
                    <Text style={styles.addHostText}>Add other hosts</Text>
                </>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default SelectedArray

const styles = StyleSheet.create({
    addOtherHostsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 119,
        marginBottom: 30
    },
    addHostText: {
        fontSize: RFValue(13, height),
        fontWeight: '600',
        color: '#6500E0',
        lineHeight: 18,
    }
})