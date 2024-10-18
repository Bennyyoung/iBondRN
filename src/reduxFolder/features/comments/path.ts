export default {
    getComment: (eventId: number) => `events/event/comment/event/${eventId}`,
    getReplies: (parentCommentId: number) => `events/event/comment/replies/${parentCommentId}`,
    addComments: (eventId: number, userId: number) => `events/event/comment/add?eventId=${eventId}&userId=${userId}`,
    likeComments: (commentId: number, userId: number) => `events/event/comment/like?commentId=${commentId}&userId=${userId}`,
    replyComment: (parentCommentId: number, userId: number) => `events/event/comment/reply?parentCommentId=${parentCommentId}&userId=${userId}`,
    unlikeComment: (commentId: number, userId: number) => `events/event/comment/unlike?commentId=${commentId}&userId=${userId}`,
}