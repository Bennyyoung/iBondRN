
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Box from '../Box';
import { RFValue } from 'react-native-responsive-fontsize';

const { height } = Dimensions.get('window')

const Section = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
    <Box style={styles.section}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.text}>{children}</Text>
    </Box>
);

export default Section

const styles = StyleSheet.create({
    section: {
        marginBottom: RFValue(24, height),
    },
    heading: {
        fontSize: RFValue(18, height),
        fontWeight: 'bold',
        color: '#3D3F4B',
        marginBottom: 8,
    },
    text: {
        fontSize: RFValue(16, height),
        color: '#3D3F4B',
        lineHeight: 22,
    },
})