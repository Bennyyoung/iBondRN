import { Dimensions, StyleSheet } from "react-native";
import Box from "../Box";
import Text from "../Text";
import { RFValue } from "react-native-responsive-fontsize";
import React from "react";

const { height } = Dimensions.get('window')

interface VerificationItemProps {
    icon: React.ReactNode; // React element for rendering SVG
    title?: string;
    description: string;
}

const VerificationItem: React.FC<VerificationItemProps> = ({ icon, title, description }) => {
    return (
        <Box style={styles.item}>
            {icon}
            <Box style={styles.textContainer}>
                {
                    title ? (
                        <>
                            <Text style={styles.itemTitle}>{title}</Text>
                            <Text style={styles.itemDescription}>{description}</Text>
                        </>
                    ) : (
                        <>
                            <Text style={[styles.itemDescription, { marginTop: 10 }]}>{description}</Text>
                        </>
                    )
                }
                {/* {title ? <Text style={styles.itemTitle}>{title}</Text> : null}
                {description && <Text style={styles.itemDescription}>{description}</Text>} */}
            </Box>
        </Box>
    );
};

export default VerificationItem

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    textContainer: {
        marginLeft: 10,
        flex: 1,
    },
    itemTitle: {
        fontSize: RFValue(16, height),
        fontWeight: '400',
        color: '#333',
    },
    itemDescription: {
        fontSize: RFValue(17, height),
        fontWeight: '400',
        color: '#3D3F4B',
        lineHeight: 22,
        letterSpacing: -0.43
    },
}) 