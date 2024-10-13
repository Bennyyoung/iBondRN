import { PaletteType } from "@/constants/theme";
import contexts from "../../contexts/index";
import { useCallback, useState } from "react";
import useDropdownItems from "../BottomSheetHooks/useDropdownItems";
import { CustomButton } from "../CustomButton";
import useSelectedOptionItems from "../BottomSheetHooks/useSelectedOptionsDropdown";
import { useAppSelector } from "@/reduxFolder/index";
import Modal from "../Modal/Modal";
import Text from "../Text";
import Box from "../Box";
import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";

type SelectedChannelProps = {
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

const { height } = Dimensions.get('window')


const SelectedChannel = ({
    placeholder = '',
    list = [],
    searchable,
    showHeader,
    getSelectedValue,
    selectedTextColor = 'primary',
    unselectedTextColor = 'textColor',
    action
}: SelectedChannelProps) => {
    const [selected, setSelected] = useState([])
    const { openSelectedOptionItems } = useSelectedOptionItems();
    const { dismissBottomSheet } = contexts.BottomSheet.useBottomSheetContext()
    const modalVisible = useAppSelector(state => state.modal.value)


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

    const addChannel = () => {
        openSelectedOptionItems({
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
        <>
            <CustomButton
                label={'Create Event'}
                labelProps={{ color: 'whiteColor' }}
                borderRadius="sm"
                onPress={() => addChannel()}
            />


            {
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
            }
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
})