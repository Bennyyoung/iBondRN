import paths from "./paths";
import { api } from '../rtkQuery/authApi';
import {
    CreateEventRequest,
    CreateEventResponse,
    GetAllEventsRequest,
    GetAllEventsResponse,
    SearchEventRequest,
    SearchEventResponse,
    DeleteEventResponse,
    UpdateEventRequest,
    UpdateEventResponse,
    CancelEventResponse,
    CreateEventGroupRequest,
    CreateEventGroupResponse
} from "./service.types";

export const iBondMobileApi = api.injectEndpoints({
    endpoints: build => ({
        // Create Event
        createEvent: build.mutation<CreateEventResponse, CreateEventRequest>({
            query: eventData => ({
                body: eventData,
                method: 'POST',
                url: paths.createEvent,
            }),
        }),

        // Get All Events
        getAllEvent: build.query<GetAllEventsResponse, GetAllEventsRequest>({
            query: ({ page, size }) => ({
                url: paths.getAllEvents(page, size),
                method: 'GET',
            }),
        }),

        // Search Event
        searchEvent: build.query<SearchEventResponse, SearchEventRequest>({
            query: ({ title, category }) => ({
                url: paths.searchEvent(title, category),
                method: 'GET',
            }),
        }),

        // Delete Event
        deleteEvent: build.mutation<DeleteEventResponse, number>({
            query: eventId => ({
                url: paths.deleteEvent(eventId),
                method: 'DELETE',
            }),
        }),

        // Update Event
        updateEvent: build.mutation<UpdateEventResponse, UpdateEventRequest>({
            query: ({ eventId, ...eventData }) => ({
                url: paths.updateEvent(eventId),
                body: eventData,
                method: 'PUT',
            }),
        }),

        // Cancel Event
        cancelEvent: build.mutation<CancelEventResponse, number>({
            query: eventId => ({
                url: paths.cancelEvent(eventId),
                method: 'POST',
            }),
        }),

        // Create Group
        createGroup: build.mutation<CreateEventGroupResponse, CreateEventGroupRequest>({
            query: (groupData) => ({
                url: paths.createGroup,
                method: 'POST',
                body: groupData, // Pass the group data in the body of the request
            }),
        }),
        
    }),
    overrideExisting: false,
});

// Export hooks for components to use the API
export const {
    useCreateEventMutation,
    useGetAllEventQuery,
    useSearchEventQuery,
    useDeleteEventMutation,
    useUpdateEventMutation,
    useCancelEventMutation,
    useCreateGroupMutation
} = iBondMobileApi;
