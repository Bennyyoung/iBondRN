import { showErrorToast } from '@/utils/helpers/toastHelper';
import { UploadImageRequest } from '@/redux/features/upload/service.types';
import { useUploadImageMutation } from '@/redux/features/upload/service';

const useImageUpload = () => {
    const [uploadImage, { isLoading, isError, isSuccess }] = useUploadImageMutation();

    const uploadAnImage = async (data: UploadImageRequest) => {
        try {
            const response = await uploadImage(data).unwrap();

            if (response) {
                return response;
            } else {
                throw new Error('Uploading an image failed');
            }
        } catch (error: any) {
            showErrorToast(
                (error.message as string) || 'An error occured during uploading an image'
            )
        } finally {

        }
    };

    return { isLoading, uploadAnImage, isError, isSuccess }
}

export default useImageUpload