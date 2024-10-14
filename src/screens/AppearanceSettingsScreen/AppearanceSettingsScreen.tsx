import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import TitleBar from '@/components/TitleBar/TitleBar';
import { RFValue } from 'react-native-responsive-fontsize';
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window')


const AppearanceSettingsScreen = () => {
    const [selectedOption, setSelectedOption] = useState('Light');

    const options = [
        { label: 'Light', value: 'Light' },
        { label: 'Dark', value: 'Dark' },
        {
            label: 'System',
            value: 'System',
            description: "We'll automatically adjust your appearance based on your system settings.",
        },
    ];


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TitleBar>
                <Box style={styles.mainTitleContainer}>
                    <Text style={styles.appearance}>
                        Privacy Policy
                    </Text>
                </Box>
                <TouchableOpacity onPress={() => { }}>
                    <Text>

                    </Text>
                </TouchableOpacity>
            </TitleBar>

            <Box style={{ marginTop: 30 }}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.value}
                        style={styles.option}
                        onPress={() => setSelectedOption(option.value)}
                    >
                        <Box flex={1}>
                            <Text style={styles.label}>{option.label}</Text>
                            {option.description && (
                                <Text style={styles.description}>{option.description}</Text>
                            )}
                        </Box>

                        <Box style={styles.radioCircle}>
                            {selectedOption === option.value && <Box style={styles.selectedCircle} />}
                        </Box>
                    </TouchableOpacity>
                ))}
            </Box>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainTitleContainer: {
        paddingRight: RFValue(16),
        paddingLeft: RFValue(0),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    appearance: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 0,
        backgroundColor: '#fff',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    selectedCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#6500E0',
    },
    label: {
        fontSize: 18,
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#6e6e6e',
    },
});

export default AppearanceSettingsScreen;
