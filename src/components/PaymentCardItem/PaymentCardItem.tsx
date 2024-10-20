import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Box from '../Box';
import { SvgIcon } from '@/assets/icons';
import Text from '../Text';

type PaymentCardItemProps = {
    card: {
        id: string;
        type: string;
        lastFour: string;
        icon: React.JSX.Element;
    }
    isDefault: boolean
    onDelete: (cardId: string) => void
}

const PaymentCardItem = ({ card, isDefault, onDelete }: PaymentCardItemProps) => (
    <Box flexDirection="row" alignItems="center" paddingVertical="sm">
        {card.icon}
        <Box flex={1} marginLeft="sm">
            <Text style={styles.cardNumber}>{card.type} •••• {card.lastFour}</Text>
        </Box>
        {isDefault ? (
            <Box flexDirection="row" alignItems="center">
                <Text style={styles.defaultText}>Default</Text>
                <SvgIcon name="checkmark" size="sm" />
            </Box>
        ) : (
            <TouchableOpacity onPress={() => onDelete(card.id)}>
                <SvgIcon name="trash" size="sm" />
            </TouchableOpacity>
        )}
    </Box>
);

export default PaymentCardItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 17,
        fontWeight: '600',
    },
    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardNumber: {
        fontSize: 16,
    },
    defaultText: {
        fontSize: 14,
        color: '#6200EE',
        marginRight: 4,
    },
    addCardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3E5F5',
        padding: 16,
        borderRadius: 8,
        marginTop: 20,
    },
    addCardText: {
        color: '#6200EE',
        marginLeft: 8,
        fontSize: 16,
    },
})