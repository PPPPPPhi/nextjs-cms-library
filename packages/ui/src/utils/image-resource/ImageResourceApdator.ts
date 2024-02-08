import { NextAPIInstance } from "../api/index"
import path from "path"

interface ImageResourceAdaptorInterface {
    getImages: (site: string) => void
    uploadImage: (file: File) => void
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
}

export class ImageResourceAdaptor implements ImageResourceAdaptorInterface {
    private writeFile: any
    private path: any

    constructor(writeFile?: any, path?: any) {
        this.writeFile = writeFile || null
        this.path = path || null
    }

    getImages = async (site: string) => {
        const images = await NextAPIInstance.get("/image/getImageFromNext", {
            params: {
                site
            }
        })
        return images
    }

    uploadImage = async (file: File) => {
        let formData = new FormData()
        formData.append("imageFile", file)
        formData.append("addition", JSON.stringify({}))

        const uploadRes = await NextAPIInstance.post(
            "/image/uploadImageToNext",
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

        await this.writeFile(
            this.path.join(process.cwd(), "public/uploads/" + filename),
            buffer
        )

        return { success: true }
    }
}
