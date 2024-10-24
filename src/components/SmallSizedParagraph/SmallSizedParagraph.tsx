import React, { PropsWithChildren, ReactNode } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Box from '../Box'
import Text from '../Text'

const { height } = Dimensions.get('window')

type SmallSizedParagraphProps = {
    children: ReactNode
    marginTop?: number
}

const SmallSizedParagraph = ({ children, marginTop = 10 }: SmallSizedParagraphProps) => {
    const styles = StyleSheet.create({
        paragraph: {
            fontWeight: '400',
            fontSize: RFValue(13, height),
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

export default SmallSizedParagraph
