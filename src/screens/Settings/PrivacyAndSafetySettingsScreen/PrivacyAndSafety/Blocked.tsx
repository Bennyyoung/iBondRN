import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import TitleBar from '@/components/TitleBar/TitleBar';
import { RFValue } from 'react-native-responsive-fontsize';
import Paragraph from '@/components/Paragraph/Paragraph';

const { height } = Dimensions.get('window');

// Sample Data for Blocked Users
const blockedUsers = [
    { id: '1', name: 'Margret Obinna', school: 'UNILAG', dept: 'Political Sci.', action: 'Unblock' },
    { id: '2', name: 'Olumide Jacobs', school: 'AAUA', dept: 'Architecture', action: 'Unblock' },
    { id: '3', name: 'Kamzi Mary', school: 'AAUA', dept: 'Laboratory Tech.', action: 'Unblock' },
    { id: '4', name: 'Abdul Abdul', school: 'OAU', dept: 'Mechanical Eng.', action: 'Follow back' },
];

// Blocked Screen Component
const Blocked = () => {
    const renderUserItem = ({ item }: { item: any }) => (
        <>

            <Box style={styles.userItem}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder avatar
                    style={styles.avatar}
                />
                <Box flex={1} style={styles.userInfo}>
                    <Paragraph>{item.name}</Paragraph>
                    <Text style={styles.details}>{`${item.school} • ${item.dept}`}</Text>
                </Box>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>{item.action}</Text>
                </TouchableOpacity>
            </Box>
        </>
    );

    return (
        <Box flex={1} backgroundColor={'whiteColor'}>
            <TitleBar>
                <Text style={styles.title}>Blocked</Text>
                <TouchableOpacity onPress={() => { /* Handle block action */ }}>
                    <Text style={styles.blockAction}>Block</Text>
                </TouchableOpacity>
            </TitleBar>

            <Box style={{
                borderTopColor: '#c6c6c8',
                borderBottomWidth: 0.2,
            }} />
            <Box style={styles.listContainer}>
                {blockedUsers.length > 0 ? (
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={blockedUsers}
                        keyExtractor={(item) => item.id}
                        renderItem={renderUserItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                ) : (
                    <Box style={styles.emptyState}>
                        <Text>No blocked users found.</Text>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Blocked;

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    blockAction: {
        color: '#6500E0',
        fontWeight: '400',
        fontSize: RFValue(17, height),
    },
    listContainer: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomColor: '#c6c6c8',
        borderBottomWidth: 0.2,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    name: {
        fontSize: RFValue(16, height),
        fontWeight: '500',
    },
    details: {
        fontSize: RFValue(14, height),
        color: '#6e6e6e',
    },
    actionButton: {
        backgroundColor: '#6500E0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        // width: 82
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        fontSize: RFValue(13, height)
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
