import React from 'react';
import Comment from '../Comment/Comment';
import Box from '../Box';
import { CommentData, CommentResponse } from '@/reduxFolder/features/comments/service.types';

type CommentListProps = {
    comments: CommentData[]
    userId: number
}

const CommentList = ({ comments, userId }: CommentListProps) => {
    console.log('comments inside CommentList', JSON.stringify(comments, null, 2));
    console.log('comments.length', comments.length);
    
    return (
        <>
            {comments.length > 0 && comments.map((comment, index) => (
                <Comment key={index} index={index} comment={comment} comments={comments} userId={userId} />
            ))}
        </>
    );
};

export default CommentList;
