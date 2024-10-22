import React, { PropsWithChildren, ReactNode } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Box from '../Box'
import Text from '../Text'

const { height } = Dimensions.get('window')

type ParagraphProps = {
    children: ReactNode
    marginTop?: number
}

const Paragraph = ({ children, marginTop = 10 }: ParagraphProps) => {
    const styles = StyleSheet.create({
        paragraph: {
            fontWeight: '400',
            fontSize: RFValue(16, height),
            color: '#3D3F4B',
            lineHeight: 21,
            letterSpacing: -0.31,
            marginTop: marginTop
        }
    })
    return (
        <Text style={styles.paragraph}>{children}</Text>
    )
}

export default Paragraph
