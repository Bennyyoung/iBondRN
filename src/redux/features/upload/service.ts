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
            url: `http://34.224.213.147:9008/uploads?folderName=${folderName}&bucketName=${bucketName}`,
            method: "POST",
            body: formData,
          };
        },
      }),
    }),
  });