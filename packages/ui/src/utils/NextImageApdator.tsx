"use client"

import Image, { ImageProps } from "next/image"
import { FaImage } from "react-icons/fa"
import { useState } from "react"

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

    const imageLoader = ({ src }: loaderType) => {
        if (!isStatic) return `${process.env.IMAGE_RESOURCES}/${src}`
        else return src
    }

    const [isError, setIsError] = useState<boolean>(false)

    //@ts-ignore
    return (
        <div className="w-100 h-100" style={{ display: "" }}>
            <div style={{ visibility: isError ? "hidden" : "visible" }}>
                {/*@ts-ignore*/}
                <Image
                    loader={imageLoader}
                    {...rest}
                    onError={() => {
                        setIsError(true)
                    }}
                />
            </div>
            <div
                className="flex-column w-100 h-100 align-items-center justify-content-center text-level-remark text-font-light"
                style={{ display: isError ? "flex" : "none" }}>
                <FaImage style={{ width: 20, height: 20 }} />
                <span className="text-center">Image is not available now</span>
            </div>
        </div>
    )
}
