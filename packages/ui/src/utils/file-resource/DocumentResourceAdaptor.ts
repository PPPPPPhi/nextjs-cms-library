import { NextAPIInstance } from "../api/index"
import { imageType } from "@nextjs-cms-library/db-services/index"

import path from "path"

export interface DocumentResourceAdaptorInterface {
    getFiles: (site: string) => void
    uploadFile: (file: File, site: string) => Promise<{ filePath: string }>
    storeFile: (file: File, addition: any) => Promise<{ success: boolean }>
    getFileById: (site: string, id: string) => any
}

export class DocumentResourceAdaptor
    implements DocumentResourceAdaptorInterface
{
    private fs: any
    private path: any

    constructor(fs?: any, path?: any) {
        this.fs = fs || null
        this.path = path || null
    }

    getFiles = async (site: string) => {
        const images = await NextAPIInstance.get(
            `/image/${site}/getDocumentFromNext`
        )

        return images
    }

    uploadFile = async (file: File, site: string) => {
        let formData = new FormData()
        formData.append("document", file)

        const uploadRes = await NextAPIInstance.post(
            `/document/${site}/uploadDocumentToNext`,
            formData
        )

        console.log(`uploadRes`, uploadRes)

        return {
            filePath: `/${file.name.replaceAll(" ", "_")}`
        }
    }

    storeFile = async (
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

    getFileById = async (site: string, id: string) => {
        const images = await NextAPIInstance.get(
            `/document/${site}/${id}/getImageByIdFromNext`
        )
        return images
    }
}
