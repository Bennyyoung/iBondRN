import { useGetCommentsQuery, useGetRepliesQuery } from "@/reduxFolder/features/comments/service";
import { showErrorToast } from "@/utils/helpers/toastHelper";

// Get Comments Hook
const useGetComments = (eventId: number) => {
    const { data, isLoading, isError, isSuccess } = useGetCommentsQuery(eventId);

    if (isError) {
        showErrorToast('An error occurred while fetching comments');
    }

    return { data, isLoading, isError, isSuccess };
};

export default useGetComments