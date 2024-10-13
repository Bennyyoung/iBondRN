import Box from "@/components/Box"
import { useState } from "react";
import { StyleSheet, Modal as RNModal, TouchableWithoutFeedback } from "react-native"
import Text from "../Text";
import { useAppDispatch } from "@/reduxFolder/index";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { showModal } from '@/reduxFolder/reducers/modal.reducer';

type ModalProps = {
    modalVisible: boolean
    children: React.ReactNode
}

const Modal = ({ modalVisible, children }: ModalProps) => {
    const dispatch = useAppDispatch()

    return (
        <Box style={styles.centeredView}>
            <RNModal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    dispatch(showModal(false))
                }}
            >
                <TouchableWithoutFeedback onPress={() => dispatch(showModal(false))
                }>
                    {children}
                </TouchableWithoutFeedback>
            </RNModal>
        </Box>
    )
}

export default Modal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
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
})