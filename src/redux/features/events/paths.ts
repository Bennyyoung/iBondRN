export default {
    // Event
    createEvent: 'event/create',
    getAllEvents: (page: number, size: number) => `event/all?page=${page}&size=${size}`,
    searchEvent: (title: string, category: string) => `event/search?${title}=hello&category=${category}`,
    createGroup: 'event/group/create',
    deleteEvent: (eventId: number) => `event/delete/${eventId}`,
    cancelEvent: (eventId: number) => `event/cancel/${eventId}`,
    updateEvent: (eventId: number) => `event/update/${eventId}`,

    // Event Comment
    unlike: (commentId: number, userId: number) => `event/comment/unlike?commentId=${commentId}&userId=${userId}`,
    reply: (parentCommentId: number, userId: number) => `event/comment/unlike?parentCommentId=${parentCommentId}&userId=${userId}`,
    like: (commentId: number, userId: number) => `event/comment/unlike?commentId=${commentId}&userId=${userId}`,
    add: (eventId: number, userId: number) => `event/comment/unlike?eventId=${eventId}&userId=${userId}`

}