import { showErrorToast, showSuccessToast } from '@/utils/helpers/toastHelper';
import { CreateEventRequest } from '@/reduxFolder/features/events/service.types';
import { useCreateEventMutation } from '@/reduxFolder/features/events/service';

const useCreateEvent = () => {
    const [createEvent, { isLoading, isError, isSuccess }] = useCreateEventMutation();

    const createAnEvent = async (data: CreateEventRequest) => {
        try {
            const response = await createEvent(data).unwrap();
            console.log('response', JSON.stringify(response, null, 2));

            if (response) {
                showSuccessToast(response.message || 'Successful')
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