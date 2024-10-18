import { useReplyCommentMutation } from "@/reduxFolder/features/comments/service";
import { showErrorToast } from "@/utils/helpers/toastHelper";

const useReplyComment = () => {
    const [replyComment, { isLoading, isError, isSuccess }] = useReplyCommentMutation();

    const replyToComment = async (data: { parentCommentId: number, userId: number, replyData: any }) => {
        try {
            const response = await replyComment(data).unwrap();
            console.log('response', JSON.stringify(response, null, 2));

            if (response) {
                return response;
            } else {
                throw new Error('Replying to the comment failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occurred while replying to the comment'
            );
        }
    };

    return { isLoading, replyToComment, isError, isSuccess };
};

export default useReplyComment