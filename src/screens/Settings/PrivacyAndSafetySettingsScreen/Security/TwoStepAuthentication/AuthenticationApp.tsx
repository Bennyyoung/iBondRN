import React from 'react';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import Box from '@/components/Box';
import { CustomButton } from '@/components/CustomButton';
import Heading from '@/components/Heading/Heading';
import Text from '@/components/Text';
import TitleBar from '@/components/TitleBar/TitleBar';
import VerificationItem from '@/components/VerificationItem/VerificationItem';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Use icons as per your choice
import SmallSizedParagraph from '@/components/SmallSizedParagraph/SmallSizedParagraph';
import { SvgIcon } from '@/assets/icons';

const { height } = Dimensions.get('window');

const NumberBadge = ({ number }: { number: number }) => (
    <Box
        width={24}
        height={24}
        borderRadius={'sml'}
        backgroundColor="primary"
        justifyContent="center"
        alignItems="center"
    >
        <Text style={styles.badgeText}>{number}</Text>
    </Box>
);

const AuthenticationApp = () => {
    const infos = [
        {
            id: 1,
            description:
                'Install Google Authenticator app or any authenticator app of your choice on your mobile device',
        },
        {
            id: 2,
            description:
                'Open and click the + button (or its equivalent) on the bottom right of your screen, and select "Enter a setup key"',
        },
        {
            id: 3,
            description:
                'Use "iBond Elite" as the account name and enter the secret key below.',
        },
    ];

    const secretKey = 'EWNU3B8WIEUN EUVEIUIWQWOWE'; // Placeholder secret key

    const handleCopy = () => {
        // Implement your copy-to-clipboard logic here
        console.log('Secret key copied!');
    };

    return (
        <Box flex={1} backgroundColor="whiteColor">
            <TitleBar>
                <Text style={styles.title}>Multi-factor authentication</Text>
                <Box />
            </TitleBar>

            <Box style={styles.content}>
                <Heading>Set up an authentication app</Heading>

                {infos.map((info, index) => (
                    <View key={info.id} style={styles.infoRow}>
                        <NumberBadge number={index + 1} />
                        <VerificationItem marginTop={20} description={info.description} />
                    </View>
                ))}

                <Box style={styles.keyContainer}>
                    <Text color={'primary'} style={styles.secretKey}>{secretKey}</Text>
                    <TouchableOpacity onPress={handleCopy} style={styles.secretKeyContainer}>
                        <SmallSizedParagraph marginTop={0}>Copy</SmallSizedParagraph>
                        <SvgIcon name="contentCopy" size={'sml'} />
                    </TouchableOpacity>
                </Box>

                <CustomButton
                    label="Continue"
                    onPress={() => { }}
                    backgroundColor="primary"
                    labelProps={{ color: 'white', variant: 'regular14' }}
                    borderRadius="smm"
                />
            </Box>
        </Box>
    );
};

export default AuthenticationApp;

const styles = StyleSheet.create({
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600',
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 40,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    badgeText: {
        color: 'white',
        fontWeight: '600',
        fontSize: RFValue(14.5, height),
        lineHeight: 22
    },
    keyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FBF7FF',
        padding: 10,
        borderRadius: 8,
        marginVertical: 20,
    },
    secretKey: {
        fontWeight: '600',
        fontSize: RFValue(13, height),
        letterSpacing: 1.2,
    },
    secretKeyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        
        padding: 20
    }
});
