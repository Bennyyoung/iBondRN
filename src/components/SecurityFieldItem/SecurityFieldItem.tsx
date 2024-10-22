import { SvgIcon } from "@/assets/icons";
import { PaymentCardDetails, SecurityFieldItemProps } from "../types";
import Box from "../Box";
import Text from "../Text";
import { StyleSheet, TouchableOpacity } from "react-native";

const SecurityFieldItem: React.FC<SecurityFieldItemProps> = ({
    item,
    onDelete,
    onVerify,
    onChange,
    onSetDefault,
    fieldType,
    showVerificationStatus
}) => {
    const renderContent = () => {
        switch (fieldType) {
            case 'payment':
                const paymentCard = item as PaymentCardDetails;
                return (
                    <Box style={styles.container}>
                        <Box style={styles.row}>
                            {paymentCard.icon}
                            <Box style={styles.leftContent}>
                                <Box style={styles.row}>
                                    <Text style={styles.value}>
                                        {paymentCard.type} •••• {paymentCard.lastFour}
                                    </Text>
                                    {paymentCard.isDefault && (
                                        <Box style={styles.defaultBadge}>
                                            <Text style={styles.defaultText}>
                                                Default
                                            </Text>
                                        </Box>
                                    )}
                                </Box>
                                <Text style={styles.expiryText}>
                                    Expires {paymentCard.expiryDate}
                                </Text>
                            </Box>
                            <Box style={styles.rightContent}>
                                {!paymentCard.isDefault && onSetDefault && (
                                    <TouchableOpacity
                                        onPress={() => onSetDefault(paymentCard.id)}
                                        style={styles.actionButton}
                                    >
                                        <Text style={styles.actionButtonText}>
                                            Set Default
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                {!paymentCard.isDefault && onDelete && (
                                    <TouchableOpacity
                                        onPress={() => onDelete(paymentCard.id)}
                                        style={styles.deleteButton}
                                    >
                                        <SvgIcon name="trash" size="sm" />
                                    </TouchableOpacity>
                                )}
                            </Box>
                        </Box>
                    </Box>
                );

            default:
                return (
                    <Box style={styles.container}>
                        <Box style={styles.rowBetween}>
                            <Box style={styles.leftContent}>
                                <Text style={styles.label}>
                                    {item.label || (item.isPrimary ? 'Primary' : 'Secondary')}
                                </Text>
                                <Text style={styles.value}>
                                    {item.value}
                                </Text>
                            </Box>
                            <Box style={styles.rightContent}>
                                {showVerificationStatus && !item.isVerified && onVerify && (
                                    <TouchableOpacity
                                        onPress={() => onVerify(item.id)}
                                        style={styles.actionButton}
                                    >
                                        <Text style={styles.actionButtonText}>
                                            Verify
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                {onChange && (
                                    <TouchableOpacity
                                        onPress={() => onChange(item.id)}
                                        style={styles.actionButton}
                                    >
                                        <Text style={styles.actionButtonText}>
                                            Change
                                        </Text>
                                    </TouchableOpacity>
                                )}
                                {onDelete && !item.isPrimary && (
                                    <TouchableOpacity
                                        onPress={() => onDelete(item.id)}
                                        style={styles.deleteButton}
                                    >
                                        <SvgIcon name="trash" size="sm" />
                                    </TouchableOpacity>
                                )}
                            </Box>
                        </Box>
                    </Box>
                );
        }
    };

    return renderContent();
};

export default SecurityFieldItem

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    leftContent: {
        flex: 1,
        marginLeft: 12,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    defaultBadge: {
        marginLeft: 8,
        backgroundColor: '#E5E7EB',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    defaultText: {
        fontSize: 12,
        color: '#6B7280',
    },
    actionButton: {
        marginRight: 12,
    },
    actionButtonText: {
        color: '#4F46E5',
        fontSize: 14,
        fontWeight: '500',
    },
    deleteButton: {
        marginLeft: 4,
    },
    label: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },
    value: {
        fontSize: 14,
        color: '#111827',
    },
    expiryText: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 2,
    },
});