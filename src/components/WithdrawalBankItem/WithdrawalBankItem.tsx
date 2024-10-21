import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Box from '../Box';
import { SvgIcon } from '@/assets/icons';
import Text from '../Text';
import { RFValue } from 'react-native-responsive-fontsize';

const { height } = Dimensions.get('window')

type WithdrawalBankItemProps = {
    bank: {
        id: string;
        bankName: string;
        bankNumber: string;
        icon: React.JSX.Element;
    }
    isDefault: boolean
    onDelete: (cardId: string) => void
}

const WithdrawalBankItem = ({ bank, isDefault, onDelete }: WithdrawalBankItemProps) => (
    <Box flexDirection="row" alignItems="center" paddingVertical="sm">
        {bank.icon}
        <Box flex={1} marginLeft="sm">
            <Text style={styles.bankName}>{bank.bankName}</Text>
            <Text style={styles.bankNumber}>{bank.bankNumber}</Text>
        </Box>
        {isDefault ? (
            <Box flexDirection="row" alignItems="center">
                <Text style={styles.defaultText}>Default</Text>
                <SvgIcon name="trash" size="sm" />
            </Box>
        ) : (
            <TouchableOpacity onPress={() => onDelete(bank.id)}>
                <SvgIcon name="trash" size="sm" />
            </TouchableOpacity>
        )}
    </Box>
);

export default WithdrawalBankItem

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
    bankName: {
        fontSize: 16,
    },
    bankNumber: {
        color: '#3D3F4B',
        fontWeight: '400',
        fontSize: RFValue(13, height)
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