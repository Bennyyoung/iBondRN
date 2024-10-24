import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Box from '@/components/Box';
import TitleBar from '@/components/TitleBar/TitleBar';
import Paragraph from '@/components/Paragraph/Paragraph';
import Text from '@/components/Text';
import { RFValue } from 'react-native-responsive-fontsize';
import SmallSizedParagraph from '@/components/SmallSizedParagraph/SmallSizedParagraph';
import { SvgIcon } from '@/assets/icons';

const { height } = Dimensions.get('window')

const devices = [
    {
        id: '1',
        deviceName: 'iPhone 14 pro',
        isDefault: true,
        os: 'iOS',
        network: 'iBond Mobile',
        location: 'Lagos, Nigeria (approximate location)',
        lastUsed: 'Just now',
    },
    {
        id: '2',
        deviceName: 'Infinix X501',
        isDefault: false,
        os: 'Android',
        network: 'iBond Mobile',
        location: 'Ikotun, Lagos, Nigeria',
        lastUsed: 'Last week',
    },
    {
        id: '3',
        deviceName: 'Samsung (SM-A20GD)',
        isDefault: false,
        os: 'Android',
        network: 'iBond Mobile',
        location: 'Lagos, Nigeria',
        lastUsed: 'Oct 05, 21:09',
    },
];

const ConnectedDevices = () => {
    const renderItem = ({ item }: {
        item: {
            id: string;
            deviceName: string;
            isDefault: boolean;
            os: string;
            network: string;
            location: string;
            lastUsed: string;
        }
    }) => (
        <Box style={styles.deviceContainer}>
            <Box style={styles.iconContainer}>
                <SvgIcon name="bank" size="sml" />
            </Box>
            <Box style={styles.infoContainer}>
                <Box flexDirection={'row'} alignItems={'center'}>
                    <Paragraph marginTop={0}>
                        {item.deviceName} {item.lastUsed === 'Just now' && ('This Device')}
                    </Paragraph>
                    <Text style={styles.time}>• {item.lastUsed}</Text>

                </Box>
                <SmallSizedParagraph marginTop={0}>
                    {item.os} • {item.network}
                </SmallSizedParagraph>
                <SmallSizedParagraph marginTop={0}>{item.location}</SmallSizedParagraph>

            </Box>
            <Box style={styles.trashContainer}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <SvgIcon name="trash" size="sm" />
                </TouchableOpacity>
            </Box>
        </Box>
    );

    const handleDelete = (id) => {
        console.log('Deleted item with id:', id);
        // Logic for deletion
    };

    return (
        <Box flex={1} backgroundColor={'whiteColor'}>
            <TitleBar>
                <Text style={styles.title}>Connected Devices</Text>
                <Box />
            </TitleBar>

            <Box style={{ paddingHorizontal: 20, marginTop: 40 }}>
                <Paragraph>
                    These devices are currently used to access your account.
                </Paragraph>
                <Box marginTop={'lg'} />
                <SmallSizedParagraph>Primary phone number</SmallSizedParagraph>
                <Box style={{
                    borderBottomWidth: 0.4,
                    borderBottomColor: '#c6c6c8',
                    marginTop: 10
                }} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={devices}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />

                <TouchableOpacity>
                    <Text style={styles.signOutAllDevices}>
                        Sign out from all other devices
                    </Text>
                </TouchableOpacity>
            </Box>

        </Box>
    );
};

export default ConnectedDevices;

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    deviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 0.4,
        borderBottomColor: '#c6c6c8',
    },
    iconContainer: {
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
    },
    deviceName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    details: {
        color: '#777',
        fontSize: 14,
    },
    location: {
        color: '#555',
        fontSize: 12,
    },
    time: {
        fontSize: RFValue(13, height),
        color: '#888',
        marginLeft: 5
    },
    trashContainer: {
        marginLeft: 10,
    },
    defaultContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    defaultText: {
        marginRight: 5,
        fontSize: 12,
        color: '#4CAF50', // Green color for default text
    },
    signOutAllDevices: {
        fontWeight: '600',
        fontSize: RFValue(13, height),
        color: '#FF3B30',
        marginTop: 30,
        textAlign: 'center',
        lineHeight: 18,
        letterSpacing: -0.08
    }
});
