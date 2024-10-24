

import { Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Box from '@/components/Box'
import Text from '@/components/Text'
import TitleBar from '@/components/TitleBar/TitleBar'
import Paragraph from '@/components/Paragraph/Paragraph'
import { RFValue } from "react-native-responsive-fontsize";
import SlimSettingsButton from '@/components/SlimSettingsButton/SlimSettingsButton'
import { SvgIcon } from '@/assets/icons'
import CreditCardInputContainer from '@/components/CreditCardInputContainer/CreditCardInputContainer'
import SimpleBottomSheet from '@/components/SimpleBottomSheet/SimpleBottomSheet'
import WithdrawalBankList from '@/components/WithdrawalBankList/WithdrawalBankList'
import WidthdrawalBankInputContainer from '@/components/WidthdrawalBankInputContainer/WidthdrawalBankInputContainer'

const { height } = Dimensions.get('window')

const banks = [
    { id: '1', bankName: 'United Bank of Africa', bankNumber: '2117879339', icon: <SvgIcon name="bank" size="sml" /> },
    { id: '2', bankName: 'First Bank', bankNumber: '3856', icon: <SvgIcon name="bank" size="sml" /> },
    { id: '3', bankName: 'Visa', bankNumber: '20012978949', icon: <SvgIcon name="bank" size="sml" /> }
];


const WithdrawalBank = () => {
    const [isSheetVisible, setIsSheetVisible] = useState(false);

    const handleAddCard = () => {
        // Logic to add a new card
        setIsSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsSheetVisible(false);
    };

    const handleDeleteCard = (cardId: string) => {
        // Logic to delete a card
    };
    return (
        <Box style={styles.container}>
            <TitleBar>
                <Text style={styles.title}>Withdrawal bank</Text>
                <Box />
            </TitleBar>
            <Paragraph>
                This is where funds you have saved in your wallet will be sent to when you initiate a withdrawal. You can add up to 3 banks
            </Paragraph>

            <WithdrawalBankList
                banks={banks}
                onAddCard={handleAddCard}
                onDeleteCard={handleDeleteCard}
            />

            <SimpleBottomSheet
                title={"Add withdrawal bank"}
                content={<WidthdrawalBankInputContainer />}
                isVisible={isSheetVisible}
                onClose={handleCloseBottomSheet}
            />
        </Box>
    )
}

export default WithdrawalBank

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        flex: 1
    },
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
})