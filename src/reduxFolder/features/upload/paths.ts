export default {
    uploadImage: (folderName: string, bucketName: string) => `storage/uploads?folderName=${folderName}&bucketName=${bucketName}`
}