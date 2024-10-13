import { api } from "../rtkQuery/authApi"
import paths from "./paths"
import { UploadImageResponse, UploadImageRequest } from "./service.types"

export const iBondMobileApi = api.injectEndpoints({
    endpoints: (build) => ({
        uploadImage: build.mutation<UploadImageResponse, UploadImageRequest>({
            query: ({ formData, folderName, bucketName }) => {
                return {
                    url: paths.uploadImage(folderName, bucketName),
                    method: "POST",
                    body: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Accept': '*/*',
                    }
                };
            },
        }),
    }),
});

export const { useUploadImageMutation } = iBondMobileApi
