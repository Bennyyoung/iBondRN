import { useGetRepliesQuery } from "@/reduxFolder/features/comments/service";
import { showErrorToast } from "@/utils/helpers/toastHelper";

// Get Comment Replies Hook
const useGetCommentReplies = (parentCommentId: number) => {
    const { data, isLoading, isError, isSuccess } = useGetRepliesQuery(parentCommentId);

    if (isError) {
        showErrorToast('An error occurred while fetching comment replies');
    }

    return { data, isLoading, isError, isSuccess };
};

export default useGetCommentReplies