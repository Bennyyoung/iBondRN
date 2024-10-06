import { showErrorToast } from '@/utils/helpers/toastHelper';
import { useCreateGroupMutation } from '@/redux/features/events/service';
import { CreateEventGroupRequest, CreateEventGroupResponse } from '@/redux/features/events/service.types';

const useCreateEventGroup = () => {
    const [createGroup, { isLoading, isError, isSuccess }] = useCreateGroupMutation();

    const createAnEventGroup = async (data: CreateEventGroupRequest): Promise<CreateEventGroupResponse | void> => {
        try {
            const response = await createGroup(data).unwrap();

            if (response) {
                return response;
            } else {
                throw new Error('Creating event group failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occurred while creating an event group'
            );
        }
    };

    return { isLoading, createAnEventGroup, isError, isSuccess };
};

export default useCreateEventGroup;
