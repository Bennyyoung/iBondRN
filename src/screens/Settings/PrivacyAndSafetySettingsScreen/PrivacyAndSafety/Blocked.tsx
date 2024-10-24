import Box from '@/components/Box'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const { height } = Dimensions.get('window')

const Blocked = () => {
    return (
        <Box flex={1} backgroundColor={'whiteColor'}>
            <TitleBar>
                <Text style={styles.title}>Blocked</Text>
                <TouchableOpacity onPress={() => { /* Handle save action */ }}>
                    <Text style={styles.action}>
                        Save
                    </Text>
                </TouchableOpacity>
            </TitleBar>
            <Box style={{ paddingHorizontal: 20, marginTop: 40 }}>

            </Box>
        </Box>
    )
}

export default Blocked

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
})