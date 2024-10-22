import { TouchableOpacity } from "react-native";
import { SecurityFieldManagerProps } from "../types";
import Box from "../Box";
import Text from "../Text";
import SlimSettingsButton from "../SlimSettingsButton/SlimSettingsButton";
import React from "react";
import SecurityFieldItem from "../SecurityFieldItem/SecurityFieldItem";


const SecurityFieldManager: React.FC<SecurityFieldManagerProps> = ({
    items,
    onAdd,
    addButtonLabel,
    fieldType,
    showVerificationStatus,
    onDelete,
    onVerify,
    onChange,
    onSetDefault
}) => {
    const getDefaultAddLabel = () => {
        switch (fieldType) {
            case 'email':
                return 'Add Email Address';
            case 'phone':
                return 'Add Phone Number';
            case 'payment':
                return 'Add Payment Method';
            default:
                return 'Add New';
        }
    };

    return (
        <Box>
            {items.map((item) => (
                <SecurityFieldItem
                    key={`${fieldType}-${item.id}`}
                    item={item}
                    fieldType={fieldType}
                    showVerificationStatus={showVerificationStatus}
                    onDelete={onDelete}
                    onVerify={onVerify}
                    onChange={onChange}
                    onSetDefault={onSetDefault}
                />
            ))}

            {onAdd && (
                <SlimSettingsButton onPress={onAdd}>
                    {getDefaultAddLabel()}
                </SlimSettingsButton>
            )}
        </Box>
    );
};

export default SecurityFieldManager;