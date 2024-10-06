import { showErrorToast } from '@/utils/helpers/toastHelper';
import { useSearchEventQuery } from '@/redux/features/events/service';
import { SearchEventRequest, SearchEventResponse } from '@/redux/features/events/service.types';

const defaultTitle = 'hello'; // Default title if not provided
const defaultCategory = 'EDUCATION'; // Default category if not provided

const useSearchEvents = (title = defaultTitle, category = defaultCategory) => {
    const { data, isLoading, isError, isSuccess } = useSearchEventQuery({ title, category });

    const searchEvents = async (): Promise<SearchEventResponse | void> => {
        try {
            if (data) {
                return data;
            } else {
                throw new Error('Searching events failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occurred while searching for events'
            );
        }
    };

    return { isLoading, searchEvents, isError, isSuccess, data };
};

export default useSearchEvents;
