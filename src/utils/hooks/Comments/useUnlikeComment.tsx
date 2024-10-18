import { useUnlikeCommentMutation } from "@/reduxFolder/features/comments/service";
import { showErrorToast } from "@/utils/helpers/toastHelper";

// Unlike Comment Hook
const useUnlikeComment = () => {
    const [unlikeComment, { isLoading, isError, isSuccess }] = useUnlikeCommentMutation();

    const unlikeAComment = async (data: { commentId: number, userId: number }) => {
        try {
            const response = await unlikeComment(data).unwrap();
            console.log('response', JSON.stringify(response, null, 2));

            if (response) {
                return response;
            } else {
                throw new Error('Unliking the comment failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occurred while unliking the comment'
            );
        }
    };

    return { isLoading, unlikeAComment, isError, isSuccess };
};

export default useUnlikeComment