export default {
  uploads: (folderName: string) =>
    `storage/uploads?folderName=${folderName}&bucketName=cloud-storage`,
};
