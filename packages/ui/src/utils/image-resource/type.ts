export type imageResourceAdaptorType = {
    getImages: (site: string) => void
    uploadImage: (file: File, site: string) => void
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
}
