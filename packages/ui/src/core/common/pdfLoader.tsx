"use client"
import { useEffect, useState } from "react"
import _ from "lodash"
import { useParams } from "next/navigation"

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
import "@cyntler/react-doc-viewer/dist/index.css"

interface NextImageApdatorInterface {
    isStatic?: boolean
}

type loaderType = {
    src: string
}

type PDFApdatorType = {
    url: string
}

export const PDFAdaptor: React.FC<
    NextImageApdatorInterface & PDFApdatorType
> = (props) => {
    const { isStatic, url, ...rest } = props
    const { site } = useParams()

    const [renderPDF, setRenderPDF] = useState<any>(null)

    const getDocumentPathById = () => {
        const siteSlug = site ?? "gallery"
        const value = url

        return `${process.env.NEXT_IMAGE_UPLOAD_PATH}/${siteSlug}${value}`
    }

    const PDFLoader = ({ src }: loaderType) => {
        if (!isStatic) {
            const res = `${getDocumentPathById()}`
            console.log(`PDFLoader res`, res)

            return res
        } else return src
    }

    const getFileType = (url: string) => {
        return _.last(url.split("."))
    }

    useEffect(() => {
        if (url) {
            const docs = [
                {
                    uri: PDFLoader({ src: url }),
                    fileType: getFileType(url) ?? "pdf"
                }
            ]

            setRenderPDF(docs)
        } else setRenderPDF(null)
    }, [url])

    return (
        <div>
            {renderPDF && (
                <>
                    <DocViewer
                        pluginRenderers={DocViewerRenderers}
                        documents={renderPDF}
                        activeDocument={renderPDF[0]}
                        config={{
                            header: {
                                disableHeader: true,
                                disableFileName: false,
                                retainURLParams: false
                            }
                        }}
                    />
                </>
            )}
        </div>
    )
}
