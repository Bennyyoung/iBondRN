import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TitleBar from "@/components/TitleBar/TitleBar";
import Box from '@/components/Box';
import Text from '@/components/Text';
import { RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomButton } from '@/components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamsList } from '@/navigation/types';
import { SvgIcon } from '@/assets/icons';
import Paragraph from '@/components/Paragraph/Paragraph';
import Heading from '@/components/Heading/Heading';

const { height } = Dimensions.get('window');

const VerificationRequestSubmitted = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>();

    return (
        <Box style={styles.container}>
            <TitleBar>
                <Box style={styles.title} />
                <TouchableOpacity>
                    {/* Add functionality if needed */}
                </TouchableOpacity>
            </TitleBar>

            <Box style={styles.formContainer}>
                <SvgIcon name="payment" size="xxl" />
                <Heading>
                    Verification Request
                    Submitted
                </Heading>
                <Paragraph>
                    Verification takes 5 to 7 days. You will be
                    notified via email
                </Paragraph>
            </Box>

            <Box style={styles.buttonContainer}>
                <CustomButton
                    label={'Return to Settings'}
                    labelProps={{ color: 'whiteColor' }}
                    borderRadius="sm"
                    onPress={() => navigation.navigate("Settings")}
                />
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Ensures button stays at the bottom
        backgroundColor: '#fff',
    },
    title: {
        paddingVertical: RFValue(10),
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    createEvent: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
    },
    formContainer: {
        // flex: 1, // Takes up the available space
        justifyContent: 'center', // Centers the icon and text vertically
        alignItems: 'center', // Centers the icon and text horizontally
        padding: 20,
    },
    requestSubmitted: {
        marginTop: 20,
        fontSize: RFValue(24, height),
        fontWeight: '600',
        color: '#151619',
    },
    buttonContainer: {
        padding: 20,
        paddingBottom: 30, // Add space from the bottom if needed
    },
});

export default VerificationRequestSubmitted;
