import React, { useState } from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Dimensions, TextInput } from 'react-native';
import Box from '@/components/Box';
import Text from '@/components/Text';
import useLikeComment from '@/utils/hooks/Comments/useLikeComment';
import useReplyComment from '@/utils/hooks/Comments/useReplyComment';
import useUnlikeComment from '@/utils/hooks/Comments/useUnlikeComment';
import { CommentData } from '@/reduxFolder/features/comments/service.types';
import { RFValue } from 'react-native-responsive-fontsize';
import CommentInput from '../CommentInput/CommentInput';

type CommentProps = {
    comment: CommentData;
    userId: number;
    index: number;
    comments: CommentData[]
};

const { height } = Dimensions.get('window');

const Comment = ({ comment, userId, index, comments }: CommentProps) => {
    const [liked, setLiked] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const { likeAComment } = useLikeComment();
    const { unlikeAComment } = useUnlikeComment();
    const { replyToComment } = useReplyComment(); // Reply hook

    const handleLike = async () => {
        try {
            if (liked) {
                await unlikeAComment({ commentId: comment.parentComment ?? 0, userId });
            } else {
                await likeAComment({ commentId: comment.parentComment ?? 0, userId });
            }
            setLiked(!liked);
        } catch (error) {
            console.error('Error liking/unliking comment', error);
        }
    };

    const handleReply = async () => {
        if (!replyText.trim()) return;

        try {
            await replyToComment({
                commentId: comment.parentComment,
                userId,
                replyText: replyText.trim(),
            });
            setReplyText('');
            setIsReplying(false);
        } catch (error) {
            console.error('Error replying to comment', error);
        }
    };

    return (
        <Box style={[styles.container, { marginBottom: index === comments.length - 1 ? 60 : 0 }]}>
            {/* User Info */}
            <Image
                source={{ uri: 'https://via.placeholder.com/40' }} // Placeholder for user avatar
                style={styles.avatar}
            />
            <Box style={styles.commentContainer}>
                <View style={styles.userInfo}>
                    <View style={styles.textContainer}>
                        <Box style={{ flexDirection: 'row' }}>
                            <Text style={styles.username}>Lana Smith</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.timestamp}>2d</Text>
                        </Box>
                        <View style={styles.row}>
                            <Text style={styles.university}>Babcock University</Text>
                        </View>
                    </View>
                </View>

                {/* Comment Text */}
                <Text style={styles.commentText}>{comment.commentText}</Text>

                {/* Action Buttons */}
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => setIsReplying(!isReplying)}>
                        <Text style={styles.actionText}>Reply</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center' }} onPress={handleLike}>
                        <Text style={styles.actionText}>{liked ? 'Unlike' : 'Like'}</Text>
                        <Text style={styles.likeCount}>{comment.likeCount}</Text>
                    </TouchableOpacity>
                </View>

                {/* Reply Input */}
                {isReplying && (
                    // <Box style={styles.replyContainer}>
                    //     <TextInput
                    //         style={styles.replyInput}
                    //         placeholder="Write a reply..."
                    //         value={replyText}
                    //         onChangeText={setReplyText}
                    //     />
                    //     <TouchableOpacity onPress={handleReply} style={styles.replyButton}>
                    //         <Text style={styles.replyButtonText}>Send</Text>
                    //     </TouchableOpacity>
                    // </Box>
                    <CommentInput
                        key={comment.parentComment}
                        replyText={replyText}
                        setReplyText={setReplyText}
                        onPress={handleReply}
                    />
                )}
            </Box>
        </Box>
    );
};

export default Comment;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // width: '100%',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    commentContainer: {
        backgroundColor: '#F4F4F6',
        padding: 12,
        borderRadius: 16,
        width: 361,
    },
    textContainer: {
        flex: 1,
    },
    username: {
        fontWeight: '600',
        fontSize: RFValue(13, height),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    university: {
        color: '#999BAD',
        fontWeight: '400',
        fontSize: RFValue(12, height),
    },
    dot: {
        marginHorizontal: 4,
        fontSize: 14,
        color: '#888',
    },
    timestamp: {
        fontSize: RFValue(11, height),
        color: '#3D3F4B',
        fontWeight: '400',
    },
    commentText: {
        fontSize: RFValue(12, height),
        fontWeight: '400',
        lineHeight: 16,
        marginVertical: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        width: 71,
    },
    actionText: {
        color: '#999BAD',
        fontWeight: '400',
        fontSize: RFValue(12, height),
    },
    likeCount: {
        color: '#999BAD',
        fontWeight: '400',
        fontSize: RFValue(12, height),
        marginTop: -12
    },
    replyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        top: 140,
        position: 'absolute'
    },
    replyInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginRight: 8,
    },
    replyButton: {
        backgroundColor: '#6500E0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    replyButtonText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: RFValue(13, height)
    },
});
