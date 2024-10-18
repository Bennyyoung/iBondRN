import { useLikeCommentMutation } from "@/reduxFolder/features/comments/service";
import { showErrorToast } from "@/utils/helpers/toastHelper";

const useLikeComment = () => {
    const [likeComment, { isLoading, isError, isSuccess }] = useLikeCommentMutation();

    const likeAComment = async (data: { commentId: number, userId: number }) => {
        try {
            const response = await likeComment(data).unwrap();
            console.log('response', JSON.stringify(response, null, 2));

            if (response) {
                return response;
            } else {
                throw new Error('Liking the comment failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occurred while liking the comment'
            );
        }
    };

    return { isLoading, likeAComment, isError, isSuccess };
};

export default useLikeComment