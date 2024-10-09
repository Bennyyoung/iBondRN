export type UploadsResponse = {
  statusCode: number;
  message: string;
  data: [
    {
      bucketName: string;
      fileName: string;
      fileContent: string;
      contentType: string;
      fileSize: number;
      fileExtension: string;
      filePath: string;
      fileUrl: string;
      fileType: string;
      fileKey: string;
      url: string;
      bucket: string;
      folderName: string;
      size: number;
      key: string;
      etag: string;
      versionId: string;
      lastModified: number;
      ownerId: string;
      ownerDisplayName: string;
      storageClass: string;
      location: string;
      region: string;
    },
  ];
};
