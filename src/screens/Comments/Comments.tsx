import Box from "@/components/Box"
import Comment from "@/components/Comment/Comment"
import Text from "@/components/Text"
import commentData from "@/utils/commentData"

const Comments = () => {

    return (
        <Box>
            {
                commentData.map((comment, index) => (
                    <Comment
                        profileImage={comment.profileImage}
                        userName={comment.userName}
                        userUniversity={comment.userUniversity}
                        timeAgo={comment.timeAgo}
                        commentText={comment.commentText} 
                        followText={comment.followText} 
                        subComments={comment.subComments}
                    />
                ))
            }
        </Box>
    )
}

export default Comments