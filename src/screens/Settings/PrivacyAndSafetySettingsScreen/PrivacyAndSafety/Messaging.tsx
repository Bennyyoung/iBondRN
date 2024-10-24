import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Box from '@/components/Box';
import Text from '@/components/Text';
import { SvgIcon } from '@/assets/icons';
import CustomSwitch from '@/components/CustomSwitch/CustomSwitch';
import SimpleBottomSheet from '@/components/SimpleBottomSheet/SimpleBottomSheet';
import TitleBar from '@/components/TitleBar/TitleBar';
import Paragraph from '@/components/Paragraph/Paragraph';
import SmallSizedParagraph from '@/components/SmallSizedParagraph/SmallSizedParagraph';

const { height } = Dimensions.get('window');

const Messaging = () => {
    const [visibleSheet, setVisibleSheet] = useState('');
    const [settings, setSettings] = useState({
        whoCanSend: 'Everyone',
        whoCanCallYou: 'Everyone',
        readReceipt: true,
        spamFilter: true
    });

    const commentItems = [
        {
            label: "Who can send you a message",
            selected: settings.whoCanSend,
            onPress: () => setVisibleSheet('visibility')
        },
        {
            label: "Who can call you",
            selected: settings.whoCanCallYou,
            onPress: () => setVisibleSheet('comments')
        },
        {
            label: "Read receipt",
            description: "When turned on, people will be able to see when you are typing or read their message.",
            toggle: settings.readReceipt,
            onToggle: () => setSettings(prev => ({ ...prev, readReceipt: !prev.readReceipt }))
        },
        {
            label: "Spam Filter",
            description: "Our system automatically detect messages that violates policy such as harassment.",
            toggle: settings.spamFilter,
            onToggle: () => setSettings(prev => ({ ...prev, spamFilter: !prev.spamFilter }))
        },
    ];

    const commentOptions = [
        { label: 'Everyone', description: 'Anyone on iBond Elite', icon: 'globe' },
        { label: 'Followers only', description: 'Only those who follows you', icon: 'followers' },
        { label: 'Your follows', description: 'Only those you follow', icon: 'followers' },
        { label: 'Followers except...', description: 'Exclude some of your followers', hasChevron: true, icon: 'followers' },
        { label: 'No one', description: 'Turn off commenting', icon: 'lock' }
    ];

    const renderOptionItem = ({ label, description, toggle, selected, onPress, onToggle }) => (
        <TouchableOpacity onPress={onPress} disabled={!onPress} style={styles.optionItem}>
            <Box style={styles.optionContent}>
                <Box>
                    <Paragraph>{label}</Paragraph>
                    {description && <SmallSizedParagraph>{description}</SmallSizedParagraph>}
                </Box>
                {selected && (
                    <Box style={styles.selectedContainer}>
                        <Text style={styles.selectedText}>{selected}</Text>
                        <SvgIcon name="chevron_forward" />
                    </Box>
                )}
                {toggle !== undefined && (
                    <CustomSwitch value={toggle} onValueChange={onToggle} />
                )}
            </Box>
        </TouchableOpacity>
    );

    const renderBottomSheetContent = (type) => {
        const options = commentOptions;
        const currentValue = type === 'visibility' ? settings.whoCanSend : settings.whoCanCallYou;

        return options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={styles.sheetOption}
                onPress={() => {
                    setSettings(prev => ({
                        ...prev,
                        [type === 'visibility' ? 'whoCanSend' : 'whoCanCallYou']: option.label
                    }));
                    setVisibleSheet('');
                }}
            >
                <Box style={styles.sheetOptionContent}>
                    <SvgIcon name={option.icon || 'globe'} size={"xl"} />
                    <Box style={styles.sheetOptionText}>
                        <Text style={styles.sheetOptionLabel}>{option.label}</Text>
                        <Text style={styles.sheetOptionDescription}>{option.description}</Text>
                    </Box>
                    {currentValue === option.label ? (
                        <SvgIcon name="radioChecked" size={'sml'} />
                    ) : <SvgIcon name="radioUnchecked" size={'sml'} />
                    }
                    {option.hasChevron && (
                        <SvgIcon name="chevron_forward" />
                    )}
                </Box>
            </TouchableOpacity>
        ));
    };

    return (
        <Box style={styles.container}>
            <TitleBar>
                <Text style={styles.title}>Messaging</Text>
                <Box />
            </TitleBar>

            <Box style={styles.content}>
                {commentItems.map((item, index) => renderOptionItem(item))}
            </Box>

            <SimpleBottomSheet
                title={''}
                isVisible={!!visibleSheet}
                onClose={() => setVisibleSheet('')}
                content={renderBottomSheetContent(visibleSheet)}
            />
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10
    },
    headerRight: {
        width: 24
    },
    title: {
        fontSize: RFValue(17, height),
        fontWeight: '600'
    },
    content: {
        paddingHorizontal: 20,
        marginTop: 40
    },
    optionItem: {
        paddingVertical: 12
    },
    optionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: '500'
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4
    },
    selectedContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectedText: {
        marginRight: 8,
        color: '#666',
        fontSize: RFValue(13, height),
        fontWeight: '400'
    },
    sheetOption: {
        paddingVertical: 16
    },
    sheetOptionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    sheetOptionText: {
        flex: 1,
        marginLeft: 16
    },
    sheetOptionLabel: {
        fontSize: 16,
        fontWeight: '500'
    },
    sheetOptionDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 2
    }
});

export default Messaging;