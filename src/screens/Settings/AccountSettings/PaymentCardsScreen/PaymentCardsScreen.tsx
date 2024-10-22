import { SvgIcon } from '@/assets/icons';
import CreditCardInputContainer from '@/components/CreditCardInputContainer/CreditCardInputContainer';
import PaymentCardsList from '@/components/PaymentCardsList/PaymentCardsList';
import SimpleBottomSheet from '@/components/SimpleBottomSheet/SimpleBottomSheet';
import React, { useState } from 'react'

const cards = [
    { id: '1', type: 'Visa', lastFour: '4125', icon: <SvgIcon name="visa" size="xl" /> },
    { id: '2', type: 'Mastercard', lastFour: '3856', icon: <SvgIcon name="mastercard" size="xl" /> },
    { id: '3', type: 'Visa', lastFour: '2664', icon: <SvgIcon name="visa" size="xl" /> }
];

const PaymentCardsScreen = () => {
    const [isSheetVisible, setIsSheetVisible] = useState(false);

    const handleAddCard = () => {
        setIsSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsSheetVisible(false);
    };

    const handleDeleteCard = (cardId: string) => {
        // Logic to delete a card
    };

    return (
        <>
            <PaymentCardsList
                cards={cards}
                onAddCard={handleAddCard}
                onDeleteCard={handleDeleteCard}
            />

            <SimpleBottomSheet
                title={"Add payment card"}
                content={<CreditCardInputContainer />}
                isVisible={isSheetVisible}
                onClose={handleCloseBottomSheet}
            />
        </>
    );
}

export default PaymentCardsScreen