import { imageResourceAdaptorType } from "./"

interface ImageResourceOperatorInterface {
    getImages: (site: string) => void
    uploadImage: (file: File, site: string) => void
    storeImage: (file: File, addition: any) => Promise<{ success: boolean }>
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
