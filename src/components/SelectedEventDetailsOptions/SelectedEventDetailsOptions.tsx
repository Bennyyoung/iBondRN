import { PaletteType } from "@/constants/theme";
import contexts from "../../contexts/index";
import { useCallback, useState } from "react";
import useDropdownItems from "../BottomSheetHooks/useDropdownItems";
import { CustomButton } from "../CustomButton";
import { SvgIcon } from "@/assets/icons";
import useSelectDropdown from "../BottomSheetHooks/useSelectDropdown";

type SelectedEventDetailsOptionsProps = {
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
    children: React.ReactNode
    action: string
}

const SelectedEventDetailsOptions = ({
    placeholder = '',
    list = [],
    searchable,
    showHeader,
    getSelectedValue,
    selectedTextColor = 'primary',
    unselectedTextColor = 'textColor',
    action
}: SelectedEventDetailsOptionsProps) => {
    const [selected, setSelected] = useState([])
    const { openSelectDropdownItems } = useSelectDropdown()
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

    const openMoreActionsForEventDetail = () => {
        openSelectDropdownItems({
            list: list,
            placeholder: placeholder,
            handleItemPress: handleItemPress,
            selected: selected,
            selectedTextColor: selectedTextColor,
            unselectedTextColor: unselectedTextColor,
            dismissBottomSheet: dismissBottomSheet,
            showHeader,
            action: action
        })
    }

    return (
        <SvgIcon
            onPress={() => openMoreActionsForEventDetail()}
            name="trailingButton"
            size="sml"
        />
    )
}

export default SelectedEventDetailsOptions