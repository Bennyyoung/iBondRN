import { api } from "../rtkQuery/authApi"
import paths from "./paths"
import { UploadImageResponse, UploadImageRequest } from "./service.types"

export const iBondMobileApi = api.injectEndpoints({
    endpoints: (build) => ({
        uploadImage: build.mutation<UploadImageResponse, UploadImageRequest>({
            query: ({ file, folderName, bucketName }) => {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("folderName", folderName);
                formData.append("bucketName", bucketName);

                return {
                    url: `${paths.upload}?folderName=${folderName}&bucketName=${bucketName}`,
                    method: "POST",
                    body: formData,
                };
            },
        }),
    }),
});

export const { useUploadImageMutation } = iBondMobileApi
