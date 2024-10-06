import { showErrorToast } from '@/utils/helpers/toastHelper';
import { CreateEventRequest } from '@/redux/features/events/service.types';
import { useCreateEventMutation } from '@/redux/features/events/service';

const useCreateEvent = () => {
    const [createEvent, { isLoading, isError, isSuccess }] = useCreateEventMutation();

    const createAnEvent = async (data: CreateEventRequest) => {
        try {
            const response = await createEvent(data).unwrap();

            if (response) {
                return response;
            } else {
                throw new Error('Creating an Event failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occured during creating an event'
            )
        } finally {

        }
    };

    return { isLoading, createAnEvent, isError, isSuccess }
};

export default useCreateEvent