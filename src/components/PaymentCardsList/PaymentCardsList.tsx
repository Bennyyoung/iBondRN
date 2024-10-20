import { SvgIcon } from "@/assets/icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import Box from "../Box";
import PaymentCardItem from "../PaymentCardItem/PaymentCardItem";
import TitleBar from "../TitleBar/TitleBar";
import Text from "../Text";
import Heading from "../Heading/Heading";

type PaymentCardsListProps = {
    cards: {
        id: string;
        type: string;
        lastFour: string;
        icon: React.JSX.Element;
    }[]
    onAddCard: () => void
    onDeleteCard: (cardId: string) => void
}

const PaymentCardsList = ({ cards, onAddCard, onDeleteCard }: PaymentCardsListProps) => {
    return (
        <Box style={styles.container}>
            <TitleBar>
                <Text style={styles.title}>Payment cards</Text>
                <Box />
            </TitleBar>

            <Box padding="md">
                <Heading>Payment cards</Heading>

                {cards.map((card, index) => (
                    <PaymentCardItem
                        key={card.id}
                        card={card}
                        isDefault={index === 0}
                        onDelete={onDeleteCard}
                    />
                ))}

                <TouchableOpacity onPress={onAddCard} style={styles.addCardButton}>
                    <SvgIcon name="add" size="sm" />
                    <Text style={styles.addCardText}>Add payment card</Text>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};

export default PaymentCardsList

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
        backgroundColor: '#FBF7FF',
        borderColor: '#F0E6FC', 
        padding: 16,
        borderRadius: 8,
        marginTop: 20,
        justifyContent: 'center'
    },
    addCardText: {
        color: '#6200EE',
        marginLeft: 8,
        fontSize: 16,
    },
});