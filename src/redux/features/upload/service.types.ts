export type UploadImageResponse = {
    statusCode: number;
    message: string | null;
    data: Array<{
        bucketName: string;
        fileName: string;
        fileSize: number;
        fileExtension: string;
        filePath: string;
        fileUrl: string;
        folderName: string;
        etag: string;
    }>;
};

export type UploadImageRequest = {
    
}