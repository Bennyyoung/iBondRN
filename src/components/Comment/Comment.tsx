import { Dimensions, StyleSheet } from "react-native"
import Box from "@/components/Box"
import Text from "@/components/Text"
import CommentDetails from "@/components/CommentDetails/CommentDetails"
import CommentActions from "@/components/CommentActions/CommentActions"
import { RFValue } from "react-native-responsive-fontsize"

const { height } = Dimensions.get('window')

type SubComment = {
    id: number;
    userName: string;
    profileImage: JSX.Element; // For React components like <OrganizerPicture />
    userUniversity: string;
    timeAgo: string;
    commentText: string;
    followText?: string; // Optional field
}

type CommentProps = {
    profileImage: React.JSX.Element,
    userName: string,
    userUniversity: string,
    timeAgo: string,
    commentText: string,
    followText?: string,
    gifImage?: React.JSX.Element,
    subComments?: SubComment[]
}


const Comment = (props: CommentProps) => {
    const { profileImage, userName, userUniversity, timeAgo, commentText, followText, gifImage, subComments } = props
    return (
        <>
            <Box style={{ flexDirection: 'row' }}>
                {profileImage}

                <Box style={styles.commentContainer}>
                    <Box style={styles.commentContent}>
                        <CommentDetails
                            userName={userName}
                            userUniversity={userUniversity}
                            timeAgo={timeAgo}
                        />
                        <Text style={styles.commentText}>{commentText}</Text>
                        {gifImage && gifImage}
                        <CommentActions />
                    </Box>
                </Box>
            </Box>

            {/*  Sub Comments*/}
            {
                subComments && subComments.map(subComment => (
                    <Box style={{ flexDirection: 'row', paddingLeft: 40, justifyContent: 'flex-end' }}>
                        {profileImage}

                        <Box style={styles.subCommentContainer}>
                            <Box style={styles.commentContent}>
                                <CommentDetails
                                    userName={subComment.userName}
                                    userUniversity={subComment.userUniversity}
                                    timeAgo={subComment.timeAgo}
                                    followText={subComment?.followText}
                                />
                                <Text style={styles.commentText}>{subComment.commentText}</Text>
                                {subComment?.gifImage && subComment?.gifImage}
                                <CommentActions />
                            </Box>
                        </Box>
                    </Box>
                ))
            }

        </>
    )
}

export default Comment

const styles = StyleSheet.create({
    commentContainer: {
        padding: 12,
        backgroundColor: '#F4F4F6',
        borderRadius: 16,
        marginVertical: 5,
    },
    subCommentContainer: {
        padding: 12,
        backgroundColor: 'lightblue',
        borderRadius: 16,
        marginVertical: 5,
    },
    oddCommentContainer: {
        flexDirection: 'row-reverse',
        backgroundColor: '#F4F4F6'
    },
    evenCommentContainer: {
        flexDirection: 'row',
        backgroundColor: '#F4F4F6'
    },
    commentContent: {
        flex: 1,
    },
    commentText: {
        marginVertical: 5,
        fontSize: RFValue(12, height),
        color: '#151619',
        fontWeight: '400',
    },
}) 