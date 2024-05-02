"use client"

import Image, { ImageProps } from "next/image"
import { FaImage } from "react-icons/fa"
import { useMemo, useState, useCallback, useEffect } from "react"

interface NextImageApdatorInterface {
    isStatic?: boolean
}

type loaderType = {
    src: string
}

export const NextImageApdator: React.FC<
    NextImageApdatorInterface & ImageProps
> = (props) => {
    const { isStatic, ...rest } = props

    const [imageSrc, setImageSrc] = useState<string>()

    const imageLoader = ({ src }: loaderType) => {
        if (!isStatic) return `${process.env.IMAGE_RESOURCES}/${src}`
        else return src
    }

    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        if (props?.src) setImageSrc(props?.src as string)
    }, [props?.src])

    //@ts-ignore
    return (
        <div className="w-100 h-100" style={{ display: "" }}>
            <div
                className="w-100 h-100"
                style={{ visibility: isError ? "hidden" : "visible" }}>
                {/*@ts-ignore*/}
                {imageSrc && (
                    <Image
                        loader={imageLoader}
                        {...rest}
                        src={imageSrc}
                        onError={() => {
                            setIsError(true)
                        }}
                    />
                )}
            </div>
            <div
                className="flex-column w-100 h-100 align-items-center justify-content-center text-level-remark text-font-light position-absolute"
                style={{ display: isError ? "flex" : "none", top: 0 }}>
                <FaImage style={{ width: 20, height: 20 }} />
                <span className="text-center">Image is not available now</span>
            </div>
        </div>
    )
}
