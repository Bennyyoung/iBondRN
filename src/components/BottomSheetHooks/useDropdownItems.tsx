import { PaletteType } from "@/constants/theme";
import contexts from "../../contexts";
import AddToArrayFromBottomSheet from "../BottomSheetContent/AddToArrayFromBottomSheet"

interface DropdownItemsProps {
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
}

const useDropdownItems = () => {
    const { createBottomSheet, dismissBottomSheet } = contexts.BottomSheet.useBottomSheetContext()

    const openDropdownItems = (props: DropdownItemsProps) => {
        createBottomSheet({
            _content: () => (
                <AddToArrayFromBottomSheet
                    {...props}
                    dismissBottomSheet={dismissBottomSheet} />
            ),
            _snapPoints: props.list.length < 3 ? ['30%', '30%'] : ['70%', '70%'],
            _title: props.placeholder ? props.placeholder : 'elect Option',
            _showHeader: props?.showHeader,
        })
    }

    return {
        openDropdownItems
    }
}

export default useDropdownItems