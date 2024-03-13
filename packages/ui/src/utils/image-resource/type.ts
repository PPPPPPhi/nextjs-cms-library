import { imageType } from "@nextjs-cms-library/db-services/index"

export type imageResourceAdaptorType = {
    getImages: (site: string) => void
    uploadImage: (file: File, site: string) => void
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
    getImageById: (site: string, id: string) => Promise<imageType>
}
