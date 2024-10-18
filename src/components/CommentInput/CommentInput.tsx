import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Box from '../Box';
import { SvgIcon } from '@/assets/icons';

type CommentInputProps = {
    replyText: string;
    setReplyText: React.Dispatch<React.SetStateAction<string>>;
    onPress: () => Promise<void>;
};

const { width, height } = Dimensions.get('window');

const CommentInput = ({ replyText, setReplyText, onPress }: CommentInputProps) => {
    return (
        <Box style={{ flex: 1 }}>
            <Box style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Leave a reply..."
                    placeholderTextColor="#999BAD"
                    value={replyText}
                    onChangeText={setReplyText}
                    onSubmitEditing={() => setReplyText}
                    blurOnSubmit={false}
                />
                <Box style={styles.iconsContainer}>
                    <TouchableOpacity onPress={onPress}>
                        <SvgIcon name="sticker" size="sml" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SvgIcon name="camera" size="sml" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SvgIcon name="gift" size="sml" />
                    </TouchableOpacity>
                </Box>
            </Box>
        </Box>
    );
};

export default CommentInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#fff',
        paddingHorizontal: 20,
        width: '100%', // Full width
        height: 70, // Adjust height if needed
        // borderTopColor: 'grey',
        // borderTopWidth: 0.5,
        // position: 'absolute',
        // bottom: 0, // Stick to the bottom
    },
    input: {
        fontSize: RFValue(14, height),
        backgroundColor: '#FBF7FF',
        paddingVertical: 8,
        borderRadius: 8,
        width: '70%',
        marginRight: 10,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10, // Space between icons
    },
});
