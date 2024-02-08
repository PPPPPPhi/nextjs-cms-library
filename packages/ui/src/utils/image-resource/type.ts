export type imageResourceAdaptorType = {
    getImages: (site: string) => void
    uploadImage: (file: File) => void
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
}
