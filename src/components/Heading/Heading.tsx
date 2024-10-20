
import React, { PropsWithChildren, ReactNode } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Box from '../Box'
import Text from '../Text'

const { height } = Dimensions.get('window')


type HeadingProps = {
    children: ReactNode
}

const Heading = ({ children }: HeadingProps) => {
    return (
        <Text style={styles.heading}>{children}</Text>

    )
}

export default Heading

const styles = StyleSheet.create({
    heading: {
        marginTop: 20,
        fontSize: RFValue(24, height),
        fontWeight: '600',
        color: '#151619',
    },
})