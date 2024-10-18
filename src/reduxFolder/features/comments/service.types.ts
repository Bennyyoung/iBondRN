// Type for an individual reply within a comment
export type CommentReply = {
    commentText: string;
    createdDate: string | null;
    likeCount: number;
    userId: number;
    parentComment: number | null;
};

// Type for a comment and its nested replies
export type CommentData = {
    commentReplies: CommentReply[]; // Array of replies to the comment
    commentText: string;
    createdDate: string;
    likeCount: number;
    parentComment: number;
    userId: number;
};

// Type for the API response structure
export type CommentResponse = {
    data: CommentData[];
    message: string;
    status: number;
};

// Request type for adding a new comment
export type AddCommentRequest = {
    eventId: number;
    userId: number;
    commentText: string;
};

// Request type for fetching replies of a parent comment
export type GetReplies = {
    parentCommentId: number;
};

// Request type for replying to a comment
export type ReplyACommentRequest = {
    parentCommentId: number;
    userId: number;
    commentText: string;
};

// Request type for liking a comment
export type LikeAComment = {
    commentId: number;
    userId: number;
};

// Request type for unliking a comment
export type UnlikeAComment = {
    commentId: number;
    userId: number;
};
