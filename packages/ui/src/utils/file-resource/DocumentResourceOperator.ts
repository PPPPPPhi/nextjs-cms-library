import { DocumentResourceAdaptorInterface } from "./"

class _DocumentResourceOperator implements DocumentResourceAdaptorInterface {
    private apdator: DocumentResourceAdaptorInterface

    constructor(adp: DocumentResourceAdaptorInterface) {
        this.apdator = adp
    }

    getFiles = async (site: string) => {
        return await this.apdator?.getFiles(site)
    }

    uploadFile = async (file: File, site: string) => {
        return await this.apdator?.uploadFile(file, site)
    }

    storeFile = async (file: File, addition: any) => {
        return await this.apdator?.storeFile(file, addition)
    }

    getFileById = async (site: string, id: string) => {
        return await this.apdator?.getFileById(site, id)
    }
}

export class DocumentResourceOperator {
    private static instance: _DocumentResourceOperator

    static getInstance(
        adp?: DocumentResourceAdaptorInterface
    ): _DocumentResourceOperator {
        if (!DocumentResourceOperator.instance) {
            DocumentResourceOperator.instance = new _DocumentResourceOperator(
                adp as DocumentResourceAdaptorInterface
            )
        }
        return DocumentResourceOperator.instance
    }
}
