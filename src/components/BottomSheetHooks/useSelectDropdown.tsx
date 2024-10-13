import { PaletteType } from "@/constants/theme";
import contexts from "../../contexts";
import AddToArrayFromBottomSheet from "../BottomSheetContent/AddToArrayFromBottomSheet"
import SelectFromBottomSheet from "../BottomSheetContent/SelectFromBottomSheet";

interface SelectDropdownItemsProps {
    searchable?: boolean;
    list: any
    handleItemPress: (listElement: any) => void;
    dismissBottomSheet?: () => void
    selected: [];
    selectedTextColor: PaletteType;
    unselectedTextColor: PaletteType;
    placeholder: string
    showHeader: boolean
    setSelected: any
    action: string
}

const useSelectDropdown = () => {
    const { createBottomSheet, dismissBottomSheet } = contexts.BottomSheet.useBottomSheetContext()

    const openSelectDropdownItems = (props: SelectDropdownItemsProps) => {
        createBottomSheet({
            _content: () => (
                <SelectFromBottomSheet
                    {...props}
                    dismissBottomSheet={dismissBottomSheet} />
            ),
            _snapPoints: props.list.length < 3 ? ['30%', '30%'] : (props.list.length > 2 && props.list.length < 4 ) ? ['40%', '40%'] : ['50%', '50%'],
            // _title: props.placeholder ? props.placeholder : 'Select Option',
            // _showHeader: props?.showHeader,
            // _action: props?.action
        })
    }

    return {
        openSelectDropdownItems
    }
}

export default useSelectDropdown