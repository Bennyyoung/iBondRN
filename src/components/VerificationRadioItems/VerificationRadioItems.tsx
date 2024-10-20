import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgIcon } from '@/assets/icons'
import Box from '@/components/Box'
import Paragraph from '@/components/Paragraph/Paragraph'

const { height } = Dimensions.get('window')

interface VerificationItemProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    checked: boolean;
    onPress: () => void;
}

const VerificationRadioItems: React.FC<VerificationItemProps> = ({ 
    icon, 
    title, 
    description, 
    checked, 
    onPress 
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.item}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Box style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {description && <Paragraph>{description}</Paragraph>}
            </Box>
            <SvgIcon 
                name={checked ? "radioChecked" : "radioUnchecked"} 
                size="sml"
            />
        </TouchableOpacity>
    );
};

export default VerificationRadioItems

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 26,
        // paddingHorizontal: 16,
        borderBottomWidth: 0.2,
        borderBottomColor: '#c6c6c8',
    },
    iconContainer: {
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: RFValue(16, height),
        color: '#151619',
        lineHeight: 21,
        marginBottom: 4,
    },
})