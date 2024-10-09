import { uploadsApi } from './api';
import paths from './paths';
import { UploadsResponse } from './services.types';

export const uploadApi = uploadsApi.injectEndpoints({
  endpoints: build => ({
    uploadFiles: build.mutation<
      UploadsResponse,
      { files: File[]; folderName: string }
    >({
      query: ({ files, folderName }) => {
        const formData = new FormData();

        files.forEach(file => {
          formData.append('files', file);
        });

        return {
          url: paths.uploads(folderName),
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadFilesMutation } = uploadApi;
