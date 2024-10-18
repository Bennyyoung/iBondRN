export default {
    // Event
    createEvent: 'events/event/create',
    getAllEvents: (page: number, size: number) => `events/event/all?page=${page}&size=${size}`,
    searchEvent: (title: string, category: string) => `events/event/search?title=${title}&category=${category}`,
    createGroup: 'events/event/group/create',
    deleteEvent: (eventId: number) => `events/event/delete/${eventId}`,
    cancelEvent: (eventId: number) => `events/event/cancel/${eventId}`,
    updateEvent: (eventId: number) => `events/event/update/${eventId}`,
}