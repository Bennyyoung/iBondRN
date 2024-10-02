export type CreateEventResponse = {
    message: string
}

export type CreateEventRequest = {
    eventTitle: string,
    date: string,
    startDateTime: string,
    endDateTime: string,
    location: string,
    eventType: string,
    eventPrivacy: string,
    category: string,
    hostName: string,
    eventUrl: string,
    imageUrl: string,
    attendees: [],
    channel: string,
    otherDetails: string,
    groupName: string,
    createdBy: string
}