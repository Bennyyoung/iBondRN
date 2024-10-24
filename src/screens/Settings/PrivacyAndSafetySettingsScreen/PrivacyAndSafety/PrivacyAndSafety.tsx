import { SvgIcon } from '@/assets/icons';
import Box from '@/components/Box';
import CustomSwitch from '@/components/CustomSwitch/CustomSwitch';
import Paragraph from '@/components/Paragraph/Paragraph';
import SmallSizedParagraph from '@/components/SmallSizedParagraph/SmallSizedParagraph';
import TitleBar from '@/components/TitleBar/TitleBar';
import { StackParamsList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, TouchableOpacity, Switch, FlatList, StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const { height } = Dimensions.get('window')

const PrivacySettingItem = ({ label, description, toggle, onPress }) => (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={{ paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
                <Paragraph>{label}</Paragraph>
                {description && <SmallSizedParagraph>{description}</SmallSizedParagraph>}
            </View>
            {!toggle && <SvgIcon name="chevron_forward" />}
            {toggle !== undefined && (
                <CustomSwitch
                    value={toggle}
                    onValueChange={() => console.log(`${label} toggled`)}
                />
            )}
        </View>
    </TouchableOpacity>
);

const PrivacyAndSafety = () => {
    const navigation = useNavigation<StackNavigationProp<StackParamsList>>()
    const privacySettings = [
        {
            section: "Visibility",
            items: [
                { label: "Account privacy", onPress: () => navigation.navigate('AccountPrivacy') },
                { label: "Blocked", onPress: () => navigation.navigate('Blocked') },
                { label: "Account suggestion", description: "Allow your account to be suggested to others", toggle: true },
                { label: "Active status", description: "Show when you are online or last seen", toggle: true },
            ]
        },
        {
            section: "Activity",
            items: [
                {
                    label: "Posts", description: "Control your posts activities", onPress:
                        () => navigation.navigate('Posts')
                },
                { label: "Vibes", description: "Control your vibez activities", onPress: () => navigation.navigate('Vibez') },
                { label: "Comments", description: "Manage your comment interactions", onPress: () => navigation.navigate('Comments') },
                { label: "Messaging", description: "Manage your chat activities", onPress: () => navigation.navigate('Messaging') },
                { label: "Tags and Mentions", description: "Allow others to tag and mention you", toggle: true },
                { label: "Profile update", description: "Share profile update with your followers", toggle: true },
            ]
        },
        {
            section: "Ads preferences",
            items: [
                { label: "Ads preferences", description: "Manage your ads experience", onPress: () => navigation.navigate('AdsPreferences') },
                { label: "Location", description: "Allow iBond Elite to access your location", toggle: true },
            ]
        }
    ];
    return (
        <Box flex={1} backgroundColor={'white'}>
            <TitleBar>
                <Text style={styles.settings}>Privacy and safety</Text>
                <Box />
            </TitleBar>
            <Box style={{ paddingHorizontal: 20, marginTop: 40 }}>

                <FlatList
                    data={privacySettings}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Box>
                            {item.section && <SmallSizedParagraph>{item.section}</SmallSizedParagraph>}
                            {item.items.map((setting, idx) => (
                                <PrivacySettingItem key={idx} {...setting} />
                            ))}
                        </Box>
                    )}
                />
            </Box>
        </Box>
    );
};

export default PrivacyAndSafety;

const styles = StyleSheet.create({
    settings: {
        fontWeight: '600',
        fontSize: RFValue(17, height),
        color: '#151619',
    },
})