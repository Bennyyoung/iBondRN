import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import TitleBar from '@/components/TitleBar/TitleBar';
import { CustomButton } from '@/components/CustomButton';
import Text from '@/components/Text';
import Box from '@/components/Box';
import Paragraph from '@/components/Paragraph/Paragraph';
import Heading from '@/components/Heading/Heading';

const { height } = Dimensions.get('window');

const DeleteAccountScreen = () => {
    const [reasonForDeletion, setReasonForDeletion] = useState('');

    const handleDelete = () => {
        // Handle delete account logic
    };

    return (
        <View style={styles.container}>
            <TitleBar>
                <Box />
                <Box />
            </TitleBar>

            <View style={styles.contentContainer}>
                <Heading>Deactivate your account</Heading>
                <Paragraph>If you proceed with this permanent deletion:</Paragraph>

                <View style={styles.infoContainer}>
                    <Paragraph>• Your account will be deleted.</Paragraph>
                    <Paragraph>• You have 30 days to reverse this and reinstate your account, if not, after 30 days, data will be erased permanently.</Paragraph>
                </View>

                <Text style={styles.footnote}>
                    We value your feedback. Please let us know why you are deleting your account (optional):
                </Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setReasonForDeletion}
                        value={reasonForDeletion}
                        placeholder="Describe the issue"
                        placeholderTextColor="#8C8F9E"
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical="top"
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CustomButton
                    alignItems="center"
                    backgroundColor="primary"
                    borderRadius="sm"
                    justifyContent="center"
                    label="Delete Account Permanently"
                    labelProps={{ color: 'whiteColor' }}
                    labelVariant="regular12"
                    onPress={handleDelete}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    footnote: {
        fontSize: RFValue(13, height),
        fontWeight: '400',
        marginBottom: 16,
    },
    infoContainer: {
        marginTop: 24,
    },
    infoText: {
        fontSize: RFValue(16, height),
        marginVertical: 4,
    },
    inputContainer: {
        marginTop: 16,
        borderWidth: 1,
        borderColor: '#8C8F9E',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    input: {
        fontSize: RFValue(16, height),
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
});

export default DeleteAccountScreen;