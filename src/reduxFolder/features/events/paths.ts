export default {
    // Event
    createEvent: 'events/event/create',
    getAllEvents: (page: number, size: number) => `events/event/all?page=${page}&size=${size}`,
    searchEvent: (title: string, category: string) => `events/event/search?title=${title}&category=${category}`,
    createGroup: 'events/event/group/create',
    deleteEvent: (eventId: number) => `events/event/delete/${eventId}`,
    cancelEvent: (eventId: number) => `events/event/cancel/${eventId}`,
    updateEvent: (eventId: number) => `events/event/update/${eventId}`,

    // Event Comment
    unlike: (commentId: number, userId: number) => `events/event/comment/unlike?commentId=${commentId}&userId=${userId}`,
    reply: (parentCommentId: number, userId: number) => `events/event/comment/unlike?parentCommentId=${parentCommentId}&userId=${userId}`,
    like: (commentId: number, userId: number) => `events/event/comment/unlike?commentId=${commentId}&userId=${userId}`,
    add: (eventId: number, userId: number) => `events/event/comment/unlike?eventId=${eventId}&userId=${userId}`

}