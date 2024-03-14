import { NextAPIInstance } from "../api/index"
import { imageType } from "@nextjs-cms-library/db-services/index"

import path from "path"

interface ImageResourceAdaptorInterface {
    getImages: (site: string) => void
    uploadImage: (file: File, site: string) => void
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
    getImageById: (site: string, id: string) => any
}

export class ImageResourceAdaptor implements ImageResourceAdaptorInterface {
    private writeFile: any
    private path: any

    constructor(writeFile?: any, path?: any) {
        this.writeFile = writeFile || null
        this.path = path || null
    }

    getImages = async (site: string) => {
        const images = await NextAPIInstance.get(
            `/image/${site}/getImageFromNext`
        )
        return images
    }

    uploadImage = async (file: File, site: string) => {
        let formData = new FormData()
        formData.append("imageFile", file)

        const uploadRes = await NextAPIInstance.post(
            `/image/${site}/uploadImageToNext`,
            formData
        )

        return uploadRes
    }

    storeImage = async (
        file: File,
        addition: any
    ): Promise<{ success: boolean }> => {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = file.name.replaceAll(" ", "_")
        const site = addition.site

        await this.writeFile(
            this.path.join(process.cwd(), `public/uploads/${site}/` + filename),
            buffer
        )

        return { success: true }
    }

    getImageById = async (site: string, id: string) => {
        const images = await NextAPIInstance.get(
            `/image/${site}/${id}/getImageByIdFromNext`
        )
        return images
    }
}
