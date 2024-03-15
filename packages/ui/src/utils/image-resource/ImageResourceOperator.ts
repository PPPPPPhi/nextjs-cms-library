import { imageResourceAdaptorType } from "./"

interface ImageResourceOperatorInterface {
    getImages: (site: string) => void
    uploadImage: (file: File, site: string) => Promise<{ filePath: string }>
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
    getImageById: (site: string, id: string) => void
}

class _ImageResourceOperator implements ImageResourceOperatorInterface {
    private apdator: imageResourceAdaptorType

    constructor(adp: imageResourceAdaptorType) {
        this.apdator = adp
    }

    getImages = async (site: string) => {
        return await this.apdator?.getImages(site)
    }

    uploadImage = async (file: File, site: string) => {
        return await this.apdator?.uploadImage(file, site)
    }

    storeImage = async (file: File, addition: any) => {
        return await this.apdator?.storeImage(file, addition)
    }

    getImageById = async (site: string, id: string) => {
        return await this.apdator?.getImageById(site, id)
    }
}

export class ImageResourceOperator {
    private static instance: _ImageResourceOperator

    static getInstance(adp?: imageResourceAdaptorType): _ImageResourceOperator {
        if (!ImageResourceOperator.instance) {
            ImageResourceOperator.instance = new _ImageResourceOperator(
                adp as imageResourceAdaptorType
            )
        }
        return ImageResourceOperator.instance
    }
}
