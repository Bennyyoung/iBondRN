

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { SvgIcon } from '@/assets/icons'

type SlimSettingsButtonProps = {
    onPress: () => void
    children: ReactNode
}

const SlimSettingsButton = ({ onPress, children }: SlimSettingsButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.addCardButton}>
            <SvgIcon name="add" size="sm" />
            <Text style={styles.addCardText}>{children}</Text>
        </TouchableOpacity>
    )
}

export default SlimSettingsButton

const styles = StyleSheet.create({
    addCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FBF7FF',
        borderColor: '#F0E6FC',
        padding: 16,
        borderRadius: 8,
        marginTop: 20,
        justifyContent: 'center'
    },
    addCardText: {
        color: '#6200EE',
        marginLeft: 8,
        fontSize: 16,
    },
})