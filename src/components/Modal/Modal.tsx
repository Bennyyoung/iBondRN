import Box from "@/components/Box"
import { useState } from "react";
import { StyleSheet, Modal as RNModal, TouchableWithoutFeedback } from "react-native"
import Text from "../Text";
// import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type ModalProps = {
    modalVisible: boolean
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

const Modal = ({ modalVisible, setModalVisible, children }: ModalProps) => {
    return (
        <Box style={styles.centeredView}>
            <RNModal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
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