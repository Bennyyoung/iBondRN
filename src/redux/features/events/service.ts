import paths from "./paths";
import { api } from '../rtkQuery/authApi';
import { CreateEventRequest, CreateEventResponse } from "./service.types";

export const iBondMobileApi = api.injectEndpoints({
    endpoints: build => ({
        createEvent: build.mutation<CreateEventResponse, CreateEventRequest>({
            query: eventData => ({
                body: eventData,
                method: 'POST',
                url: paths.createEvent
            })
        })
    })
})

export const { useCreateEventMutation } = iBondMobileApi