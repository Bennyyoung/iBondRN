import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Box from '../Box';
import Text from '../Text';
import { SvgIcon } from '@/assets/icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

type PaymentSummaryCardProps = {
    setShowNext: React.Dispatch<React.SetStateAction<boolean>>
}

const PaymentSummaryCard = ({ setShowNext }: PaymentSummaryCardProps) => {
    return (
        <TouchableOpacity onPress={() => setShowNext(true)} style={styles.container}>
            {/* Icon and Title Section */}
            <Box style={styles.iconSection}>
                <SvgIcon
                    name="iBondLogo"
                    size="lg"
                />
                <Box style={styles.titleSection}>
                    <Text style={styles.appTitle}>iBond Verification</Text>
                    <Box style={{ flexDirection: 'row' }}>
                        <Text style={styles.appSubtitle}>
                            iBond Elite - Social, Videos & LIVE
                        </Text>
                        <Box style={styles.ageRating}>
                            <Text style={styles.ageRatingText}>12 +</Text>
                        </Box>

                    </Box>
                    <Text style={styles.appSubtitle}>In-App Purchase</Text>

                </Box>
            </Box>

            {/* Price Section */}
            <Box style={styles.priceSection}>
                <Text style={styles.price}>₦30,000.00</Text>
                <Text style={styles.priceDescription}>One-time charge</Text>
            </Box>

            {/* Account Section */}
            <Text style={styles.accountText}>Account: shegunowo@gmail.com</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginHorizontal: 20,
    },
    iconSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    titleSection: {
        marginLeft: 12,
    },
    appTitle: {
        fontSize: RFValue(15, height),
        fontWeight: '400',
        color: '#010101',
        lineHeight: 20
    },
    appSubtitle: {
        fontSize: RFValue(12, height),
        fontWeight: '400',
        color: '#8A898E',
        lineHeight: 16
    },
    ageRating: {
        // padding: 3,
        borderWidth: 0.3,
        borderColor: '#8A898E',
        marginLeft: 5,
        borderRadius: 4
    },
    ageRatingText: {
        color: '#8A898E',
        fontSize: RFValue(8, height),
        fontWeight: '600',
        lineHeight: 13

    },
    priceSection: {
        marginVertical: 16,
    },
    price: {
        fontSize: RFValue(17, height),
        fontWeight: '500',
        color: '#010101',
    },
    priceDescription: {
        fontSize: RFValue(14, height),
        color: '#666',
        marginTop: 4,
    },
    accountText: {
        fontSize: RFValue(14, height),
        color: '#666',
        marginTop: 8,
    },
});

export default PaymentSummaryCard;
