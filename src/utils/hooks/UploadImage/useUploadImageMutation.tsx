import { showErrorToast } from '@/utils/helpers/toastHelper';
import { UploadImageRequest } from '@/reduxFolder/features/upload/service.types';
import { useUploadImageMutation } from '@/reduxFolder/features/upload/service';
import { useUploadFilesMutation } from '@/reduxFolder/features/uploads/service';

const useImageUpload = () => {
    const [uploadImage, { isLoading, isError, isSuccess }] = useUploadFilesMutation();

    const uploadAnImage = async ({ formData, folderName, bucketName }: UploadImageRequest) => {
        console.log('formData', formData);
        

        try {
            const response = await uploadImage({ formData, folderName, bucketName }).unwrap();

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