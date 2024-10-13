import { showErrorToast } from '@/utils/helpers/toastHelper';
import { GetAllEventsRequest, GetAllEventsResponse } from '@/reduxFolder/features/events/service.types';
import { useGetAllEventQuery } from '@/reduxFolder/features/events/service';

const page = 0; // Default page if not provided
const size = 10; // Default size if not provided

const useGetAllEvents = () => {
    const { data, isLoading, isError, isSuccess } = useGetAllEventQuery({ page, size });

    const fetchAllEvents = async (): Promise<GetAllEventsResponse | void> => {
        try {
            if (data) {
                return data;
            } else {
                throw new Error('Fetching events failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occurred while fetching events'
            );
        }
    };

    return { isLoading, fetchAllEvents, isError, isSuccess, data };
};

export default useGetAllEvents;
