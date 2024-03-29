import { imageType } from "@nextjs-cms-library/db-services/index"

export type imageResourceAdaptorType = {
    getImages: (site: string) => void
    uploadImage: (file: File, site: string) => Promise<{ filePath: string}>
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
    getImageById: (site: string, id: string) => any
}
