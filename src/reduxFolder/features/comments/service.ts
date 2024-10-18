import paths from "./path";
import { api } from '../rtkQuery/authApi';
import { AddCommentRequest, CommentResponse, GetReplies, LikeAComment, ReplyACommentRequest, UnlikeAComment } from "./service.types";

export const iBondMobileApi = api.injectEndpoints({
    endpoints: build => ({
        // Get Comments
        getComments: build.query<CommentResponse, any>({
            query: (eventId: number) => ({
                url: paths.getComment(eventId),
                method: 'GET',
            }),
        }),

        // Get Replies
        getReplies: build.query<CommentResponse, GetReplies>({
            query: (parentCommentId: number) => ({
                url: paths.getReplies(parentCommentId),
                method: 'GET',
            }),
        }),

        // Add Comment
        addComment: build.mutation<CommentResponse, AddCommentRequest>({
            query: ({ eventId, userId, commentText }) => ({
                url: paths.addComments(eventId, userId),
                method: 'POST',
                body: JSON.stringify(commentText), // commentText contains the text/content of the comment
            }),
        }),

        // Like Comment
        likeComment: build.mutation<CommentResponse, LikeAComment>({
            query: ({ commentId, userId }) => ({
                url: paths.likeComments(commentId, userId),
                method: 'POST',
            }),
        }),

        // Reply to Comment
        replyComment: build.mutation<CommentResponse, ReplyACommentRequest>({
            query: ({ parentCommentId, userId, commentText }) => ({
                url: paths.replyComment(parentCommentId, userId),
                method: 'POST',
                body: commentText, // commentText contains the text/content of the reply
            }),
        }),

        // Unlike Comment
        unlikeComment: build.mutation<CommentResponse, UnlikeAComment>({
            query: ({ commentId, userId }) => ({
                url: paths.unlikeComment(commentId, userId),
                method: 'POST',
            }),
        }),
        
    }),
    overrideExisting: false,
});

// Export hooks for components to use the API
export const {
    useGetCommentsQuery,
    useGetRepliesQuery,
    useAddCommentMutation,
    useLikeCommentMutation,
    useReplyCommentMutation,
    useUnlikeCommentMutation,
} = iBondMobileApi;
