import React, { useState, useEffect } from 'react';
import Box from '@/components/Box';
// import TextArea from '@/components/TextArea'; // Assume you have a TextArea component
import { commentData } from '@/utils/browseEventsData';
import CommentList from '@/components/CommentList/CommentList';
import useGetComments from '@/utils/hooks/Comments/useGetComment';
import useAddComment from '@/utils/hooks/Comments/useAddComment';
import Text from '@/components/Text';
import { CustomButton } from '@/components/CustomButton';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SvgIcon } from '@/assets/icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, StyleSheet } from 'react-native';
import CustomInput from '@/components/CustomInput';
import { Event } from '@/components/types';
import { Scroll } from 'lucide-react-native';

const { height } = Dimensions.get('window')

type EventComments = {
    eventId: number
    userId: number
    event: Event
}

const EventComments = ({ eventId, userId, event }: EventComments) => {

    const { data: comments, isLoading, isError } = useGetComments(eventId);
    console.log('comments', comments);

    const [newComment, setNewComment] = useState('');
    const { addNewComment } = useAddComment();

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                await addNewComment({ eventId, userId, commentText: newComment });
                setNewComment(''); // Clear input after adding
            } catch (error) {
                console.error('Error adding comment', error);
            }
        }
    };

    if (isLoading) return <Box><Text style={{ fontSize: RFValue(14, height), textAlign: 'center' }}>Loading comments...</Text></Box>;
    if (isError) return <Box><Text style={{ fontSize: RFValue(14, height), textAlign: 'center' }}>Error loading comments</Text></Box>;
    console.log('comments', comments?.data);

    return (
        <Box style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {comments?.data?.length ? (
                    <CommentList comments={comments?.data} userId={userId} />
                ) : (
                    <Text style={{ fontSize: RFValue(14, height), textAlign: 'center' }}>
                        Be the first to add a comment
                    </Text>
                )}
            </ScrollView>

            {/* <Box position="absolute" top={240} width={'100%'} backgroundColor="white" style={{zIndex: -2}}>
                <CustomInput
                    placeholder={`Add a comment for ${event.eventTitle}...`}
                    value={newComment}
                    onChangeText={(value) => setNewComment(value)}
                    label={''}
                    iconName="plusIcon"
                    iconSize="sml"
                    onPress={handleAddComment}
                />
            </Box> */}

            <Box style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Leave a comment..."
                    placeholderTextColor="#999BAD"
                    value={newComment}
                    onChangeText={(value) => setNewComment(value)}
                    onSubmitEditing={handleAddComment}
                    blurOnSubmit={false}
                />
                <Box style={styles.iconsContainer}>
                    <TouchableOpacity onPress={handleAddComment}>
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

export default EventComments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        width: '100%',
        height: '20%',
        alignSelf: 'center',
        // marginVertical: 4,
        borderTopColor: 'grey',
        // borderTopWidth: 0.2,
        position: 'absolute',
        bottom: 0,
        paddingBottom: 10,
        marginTop: 90,
    },
    input: {
        fontSize: RFValue(14, height),
        backgroundColor: '#FBF7FF',
        paddingVertical: 4,
        borderRadius: 8,
        width: '65%',
        marginRight: 10,
        marginTop: 10
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginTop: 10

    },
})