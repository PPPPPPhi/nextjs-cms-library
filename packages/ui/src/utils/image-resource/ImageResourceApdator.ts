import { NextAPIInstance } from "../api/index"
import { imageType } from "@nextjs-cms-library/db-services/index"

import path from "path"

interface ImageResourceAdaptorInterface {
    getImages: (site: string) => void
    uploadImage: (file: File, site: string) => Promise<{ filePath: string }>
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
    getImageById: (site: string, id: string) => any
}

export class ImageResourceAdaptor implements ImageResourceAdaptorInterface {
    private fs: any
    private path: any

    constructor(fs?: any, path?: any) {
        this.fs = fs || null
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

        return {
            filePath: `/${file.name.replaceAll(" ", "_")}`
        }
    }

    storeImage = async (
        file: File,
        addition: any
    ): Promise<{ success: boolean }> => {
        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = file.name.replaceAll(" ", "_")
        const site = addition.site

        const siteFolder = this.path.join(
            process.cwd(),
            `public/uploads/${site}/`
        )

        try {
            await this.fs.access(siteFolder)
        } catch (err) {
            await this.fs.mkdir(siteFolder)
        }

        await this.fs.writeFile(this.path.join(siteFolder, filename), buffer)

        return { success: true }
    }

    getImageById = async (site: string, id: string) => {
        const images = await NextAPIInstance.get(
            `/image/${site}/${id}/getImageByIdFromNext`
        )
        return images
    }
}
