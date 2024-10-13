import { PaletteType } from "@/constants/theme";
import contexts from "../../contexts";
import SelectAnOptionFromBottomSheet from "../BottomSheetContent/SelectAnOptionFromBottomSheet";

interface SelectedOptionsDropdownProps {
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

const useSelectedOptionItems = () => {
    const { createBottomSheet, dismissBottomSheet } = contexts.BottomSheet.useBottomSheetContext()

    const openSelectedOptionItems = (props: SelectedOptionsDropdownProps) => {
        createBottomSheet({
            _content: () => (
                <SelectAnOptionFromBottomSheet
                    {...props}
                    dismissBottomSheet={dismissBottomSheet} />
            ),
            _snapPoints: props.list.length < 3 ? ['30%', '30%'] : (props.list.length > 2 && props.list.length < 4 ) ? ['50%', '50%'] : ['70%', '70%'],
            _title: props.placeholder ? props.placeholder : 'Select Option',
            _showHeader: props?.showHeader,
            _action: props?.action
        })
    }

    return {
        openSelectedOptionItems
    }
}

export default useSelectedOptionItems