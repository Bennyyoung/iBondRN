import { SvgIcon } from "@/assets/icons";
import { TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Box from "../Box";
import PaymentCardItem from "../PaymentCardItem/PaymentCardItem";
import TitleBar from "../TitleBar/TitleBar";
import Text from "../Text";
import Heading from "../Heading/Heading";
import { RFValue } from "react-native-responsive-fontsize";
import PaymentAndWithdrawalButton from "../PaymentAndWithdrawalButton/PaymentAndWithdrawalButton";
import WithdrawalBankItem from "../WithdrawalBankItem/WithdrawalBankItem";

const { height } = Dimensions.get('window')

type WithdrawalBankListProps = {
    banks: {
        id: string;
        bankName: string;
        bankNumber: string;
        icon: React.JSX.Element;
    }[]
    onAddCard: () => void
    onDeleteCard: (cardId: string) => void
}

const WithdrawalBankList = ({ banks, onAddCard, onDeleteCard }: WithdrawalBankListProps) => {
    return (
        <Box style={styles.container}>
            <TitleBar>
                <Text style={styles.title}>Payment cards</Text>
                <Box />
            </TitleBar>

            <Box padding="md">
                <Heading>Payment cards</Heading>

                {banks.map((bank, index) => (
                    <WithdrawalBankItem
                        key={bank.id}
                        bank={bank}
                        isDefault={index === 0}
                        onDelete={onDeleteCard}
                    />
                ))}

                <PaymentAndWithdrawalButton onPress={onAddCard}>
                    Add payment card
                </PaymentAndWithdrawalButton>
            </Box>
        </Box>
    );
};

export default WithdrawalBankList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: RFValue(17, height),
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