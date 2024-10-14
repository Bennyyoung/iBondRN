import { EventResponse } from "@/components/types"

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
    hostName: string[],
    eventUrl: string,
    imageUrl: string,
    // attendees: [],
    channel: string,
    otherDetails: string,
    groupName: string | null,
    createdBy: string
}

export type GetAllEventsResponse = EventResponse

export type GetAllEventsRequest = {
    page: number;
    size: number
}

// Types for Event Responses
export type SearchEventRequest = {
    title: string;
    category: string;
};

export type SearchEventResponse = {
    status: number;
    message: string;
    data: {
        content: EventResponse[];
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;
        numberOfElements: number;
        first: boolean;
        last: boolean;
        empty: boolean;
    };
};

// Delete Event Response
export type DeleteEventResponse = {
    status: number;
    message: string;
};

// Update Event Request
export type UpdateEventRequest = {
    eventId: number;
    eventTitle?: string;
    date?: string;
    startDateTime?: string;
    endDateTime?: string;
    location?: string;
    eventType?: string;
    eventPrivacy?: string;
    category?: string;
    hostName?: string;
    eventUrl?: string;
    imageUrl?: string;
    attendees?: [];
    channel?: string;
    otherDetails?: string;
    groupName?: string;
    updatedBy?: string;
};

// Update Event Response
export type UpdateEventResponse = {
    status: number;
    message: string;
    data: EventResponse;
};

// Cancel Event Response
export type CancelEventResponse = {
    status: number;
    message: string;
};

export type CreateEventGroupResponse = {
    groupName: string,
    createdBy: string
}

export type CreateEventGroupRequest = {
    status: number,
    message: string,
    data: null
}