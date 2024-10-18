import { useAddCommentMutation } from "@/reduxFolder/features/comments/service";
import { showErrorToast } from "@/utils/helpers/toastHelper";
import { nullFormat } from "numeral";

const useAddComment = () => {
    const [addComment, { isLoading, isError, isSuccess }] = useAddCommentMutation();

    const addNewComment = async (data: { eventId: number, userId: number, commentText: string }) => {
        console.log('data', JSON.stringify(data, null, 2));
        
        try {
            const response = await addComment(data).unwrap();
            console.log('response', JSON.stringify(response, null, 2));

            if (response) {
                return response;
            } else {
                throw new Error('Adding a comment failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occurred while adding a comment'
            );
        }
    };

    return { isLoading, addNewComment, isError, isSuccess };
};

export default useAddComment